import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/Interfaces/FileInterface';
import { Testimonial } from 'src/app/Interfaces/Testimonials';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { FileUploadService } from 'src/app/services/file-upload-service/file-upload-service.service';
import { TestimonialsServiceService } from 'src/app/services/testimonials/testimonials-service.service';

@Component({
  selector: 'app-testimonials-dashboard',
  templateUrl: './testimonials-dashboard.component.html',
  styleUrls: ['./testimonials-dashboard.component.css']
})
export class TestimonialsDashboardComponent implements OnInit {
  newTestimonial=false;
  photoStatus:boolean=false;
  basePath: string;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number = 0;
  fileName: string;
  progressPhoto:number;

  constructor(public uploadService:FileUploadService, public testimonialService:TestimonialsServiceService,private router: Router,public authService:AuthServiceService) { }

  testimonial:Testimonial={Uid:"",Name:"",Testimonial:"",ImageUrl:"",Achievement:""}

  ngOnInit(): void {
    if (this.authService.user) {
      if (this.authService.loggedInUser.Admin===false) {
        this.router.navigate([''])
      }
    }
    else{
    // this.popupService.loginPopup=true
    this.router.navigate([''])
    }
 this.testimonialService.getTestimonial()
  }

  showNewTestimonial(){
    this.newTestimonial=true;
  }

  photoUpload(event:any)
  {
    this.photoStatus=true;
      const file = event.target.files.item(0);
      const folderName="Testimonial"
  
      this.currentFileUpload = new FileUpload(file);
      this.fileName = this.currentFileUpload.file.name;
      this.basePath='Photo'
  
      this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, folderName)
      .subscribe({
        next: (percentage) =>{
          if(percentage)
          this.progressPhoto = Math.round(percentage);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Getting Percentage Data Complete")
          this.photoStatus=false;
         
        }
        }
      );
  }

submit(){
 this.testimonial.ImageUrl=this.uploadService.testimonialUrl;
 this.testimonialService.addTestimonial(this.testimonial);
}

}

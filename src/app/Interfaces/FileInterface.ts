export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }

  export interface FileData {
    Uid:string;
    ApplicantName:string;
    FileUrl: string;
    Date: string;
    Time: string;
    File: string;
  }
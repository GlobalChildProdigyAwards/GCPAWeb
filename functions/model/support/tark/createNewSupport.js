/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { createSupport } = require("../lib");
const { updateData } = require("../../raw-data/tark/updateRawData");
const { getRawData } = require("../../raw-data/lib");

const { createActivityList, getSupportData, updateSupportData } = require("../lib");


const createActivity = function(sendor, message, date, time, ticketId) {
    let status = 200;
    getSupportData(ticketId).then((doc) => {
        const actId = "A" + (doc.NumberOfActivity + 1);
        createActivityList(actId, sendor, message, date, time, ticketId).then(() => {
            const result = { data: "Activity created Successfully" };
            console.log("Activity created Successfully");
            const inputJson = {
                NumberOfActivity: doc.NumberOfActivity + 1,
            };
            updateSupportData(doc.TicketId, inputJson).then(() => {
                console.log("Number Of Activity Updated.");
            });
            // eslint-disable-next-line no-undef
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
            const result = { data: error };
            console.error("Error Creating Activity", error);
            // eslint-disable-next-line no-undef
            return response.status(status).send(result);
        });
    });
};


exports.createNewSupport = function(request, response) {
    const support = request.body.data;
    const UserUid = support.userUid;
    const Name = support.name;
    const SupportType = support.supportType;
    const Message = support.message;
    const ContactEmail = support.contactEmail;
    const date = support.date;
    const time = support.time;

    const status = 200;
    getRawData().then((doc) => {
        const ticketId = "T" + (doc[0].NumberOfSupport + 1);
        createSupport(UserUid, Name, SupportType, Message, ContactEmail, ticketId, date, time).then(() => {
           const result = { data: "Support created Successfully" };
            console.log("Support created Successfully");
            updateData("support").then(() => {
                console.log("User Raw Data Updated.");
            });
            createActivity("user", Message, date, time, ticketId);
            return response.status(status).send(result);
        }).catch((error) => {
          const result = { data: error };
            console.error("Error Creating Support", error);
            return response.status(status).send(result);
        });
    });
};
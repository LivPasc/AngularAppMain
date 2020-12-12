export class NotificationModel {
    public id: number;
    public dateTime: Date;
    public microcontrollerID: number;
    public notificationDetails: string;

    constructor(){
        this.id = 0;
        this.dateTime = null;
        this.microcontrollerID = 0;
        this.notificationDetails = "";
    }
}
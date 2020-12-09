export class ValuesModel {
    public dateTime: Date;
    public microcontrollerID: number;
    public temperature: number;
    public humidity: number;
    public dust: number;
    public doorOpen: boolean;
    public power: number;

    constructor(){
        this.dateTime = new Date();
        this.microcontrollerID = 0;
        this.temperature = 0;
        this.humidity = 0;
        this.dust = 0;
        this.doorOpen = false;
        this.power = 0;
    }
}
export class Processor{
    id: string;
    name: string;
    prodYear: number;
    speed: string;
    userid: string;
    constructor(id: string, name: string, prodYear: number, speed: string, userid: string){
        this.id = id;
        this.name = name;
        this.prodYear = prodYear;
        this.speed = speed;
        this.userid = userid;
    }
}


let processors: Processor[] = [];

export default processors;
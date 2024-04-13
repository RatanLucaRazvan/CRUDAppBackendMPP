export class Processor{
    id: string;
    name: string;
    prodYear: number;
    speed: string;
    constructor(id: string, name: string, prodYear: number, speed: string){
        this.id = id;
        this.name = name;
        this.prodYear = prodYear;
        this.speed = speed;
    }
}


let processors: Processor[] = [];

export default processors;
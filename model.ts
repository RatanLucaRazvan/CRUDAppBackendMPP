export class Phone{
    id: number;
    name: string;
    price: number;
    prodYear: number;
    description: string;
    constructor(id: number, name: string, price: number, prodYear: number, description: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.prodYear = prodYear;
        this.description = description;
    }
}

let phones = [new Phone(1, "Iphone", 2000, 2010, "Good phone")];

export default phones
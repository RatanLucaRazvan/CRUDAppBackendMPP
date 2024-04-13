import { v4 } from "uuid";
import { uuid } from "uuidv4";

export class Phone{
    id: string;
    name: string;
    price: number;
    prodYear: number;
    description: string;
    constructor(id: string, name: string, price: number, prodYear: number, description: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.prodYear = prodYear;
        this.description = description;
    }
}

let phones = [new Phone(v4(), "Iphone", 2000, 2010, "Good phone")];

export let phoneNamesToChoose = ["Samsung", "Nothing", "IPhone 6", "iPhone 7", "Xioami Mi 7"]
export let pricesToChoose = [4000, 3000, 2000, 2500, 3700];
export let prodYearsToChoose = [2010, 2013, 2015, 2023, 2021];
export let descriptionsToChoose = ["Good phone", "Good camera", "Small battery", "120Hz refresh rate display", "Snapdragon 850 processor"];

export default phones

import phones, { Phone } from "../model/Phone";

const createObjects = () => {
    phones.push(new Phone(2, "Samsung Galaxy S3", 1000, 2010, "Good Phone"));
    phones.push(new Phone(3, "Samsung Galaxy S4", 1500, 2011, "Improved phone"));
}
export default createObjects
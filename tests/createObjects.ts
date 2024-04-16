import phones, { Phone } from "../model/Phone";
import processors, { Processor } from "../model/Processor";

const createObjects = () => {
    phones.push(new Phone("2", "processorID", "Samsung Galaxy S3", 1000, 2010, "Good Phone"));
    phones.push(new Phone("3", "prcessorID", "Samsung Galaxy S4", 1500, 2011, "Improved phone"));
    processors.push(new Processor("1", "Kirin", 2015, "high"));
}
export default createObjects
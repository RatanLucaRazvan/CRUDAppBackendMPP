import { Client, Query } from "pg";
import PGMock2 from "pgmock2";

// class MockClient{
//     public queries: Query[];

//     constructor() {
//       this.queries = [];
//     }

//       public async connect(): Promise<void> {
//     // Simulate the behavior of connecting to a database
//     return new Promise<void>((resolve, reject) => {
//       console.log('MockClient connected to database');
//       resolve();
//     });
//   }
  
//     public async query(queryString: string, values: any[] = []): Promise<void> {
//       // Simulate the behavior of a successful query
//       return new Promise<void>((resolve, reject) => {
//         this.queries.push( new Query(queryString, values) );
//         resolve();
//       });
//     }
// }
const mockClient = new PGMock2();
mockClient.add('INSERT INTO phones(id, price, name, prodYear, description, processorID) VALUES ($1, $2, $3, $4, $5, $6)', ['string', 'number', 'string', 'number', 'string', 'string'], {
    rowCount: 0,
    rows: []
});

mockClient.add('INSERT INTO processors(id, name, prodyear, speed) VALUES ($1, $2, $3, $4)', ['string', 'string', 'number', 'string'], {
    rowCount: 0,
    rows: []
})

mockClient.add('DELETE FROM phones WHERE id=$1', ['string'], {
    rowCount: 0,
    rows: []
})
mockClient.add('DELETE FROM processors WHERE id=$1', ['string'], {
    rowCount: 0,
    rows: []
})
mockClient.add('SELECT * FROM phones', [], {
    rowCount: 1,
    rows: [
        {id: '1', price: 20, name: 'IPhone', prodyear: 2003, description: 'good', processorID: 'processor1'}
    ]
})
mockClient.add('SELECT * FROM processors', [], {
    rowCount: 1,
    rows: [
        {id: '1', name: 'Kirin', prodyear: 2003, speed: 'high'}
    ]
})
mockClient.add('SELECT * FROM phones WHERE id=$1', ['string'], {
    rowCount: 1,
    rows: [
        {id: '2', price: 1000, name: 'Samsung Galaxy S3', prodyear: 2010, description: 'Good Phone', processorID: 'processorID'}
    ]
})
mockClient.add('SELECT * FROM processors WHERE id=$1', ['string'], {
    rowCount: 1,
    rows: [
        {id: '1', name: 'Kirin', prodyear: 2015, speed: 'high'}
    ]
})
mockClient.add('UPDATE phones SET price=$1, name=$2, prodYear=$3, description=$4, processorid=$5 WHERE id=$6', ['number', 'string', 'number', 'string', 'string', 'string'], {
    rowCount: 0,
    rows: []
})
mockClient.add('UPDATE processors SET name=$1, prodYear=$2, speed=$3 WHERE id=$4', ['string', 'number', 'string', 'string'], {
    rowCount: 0,
    rows: []
})
// const port = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 3000;
const client = process.env.NODE_ENV === 'test' ? mockClient : new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "patru#raton03",
    database: "MPPDatabase"
})



export default client
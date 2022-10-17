export default class Database {
    
    constructor() {
        //Create a new instance of Set object to let us simulate
        this.database = new Set();
    }
    //~Methods
    async create(data){
        // the .add() method will add in the Set object
        return this.database.add(data);
    }
    
    async read() {
        //return all data from database
        // the .values() method will get all data from the database
        return [...this.database.values()];
    }
}

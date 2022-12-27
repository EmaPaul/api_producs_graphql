import {Db, MongoClient} from "mongodb";
import config from "../config";


export default class MongoLib{
    private client: MongoClient
    private dbName: any = config.dbName
    private mongoUri: any = config.mongoUri
    private static connection: Db

    constructor(){
        this.client = new MongoClient(this.mongoUri)
    }

    async connect(){
        if(!MongoLib.connection){
            try{
                await this.client.connect()
                console.log('[mongodb] Connected succesfully to mongo')
                MongoLib.connection=this.client.db(this.dbName)
            }catch(err){
                console.log(err)
            }
        }
        return MongoLib.connection
    }
}
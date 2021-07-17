import {MongoClient, ObjectId} from "mongodb";
import {DB_URI} from "./config";

export interface ListItem {
    id: string,
    title: string,
    quanity?: number,
    complete: boolean,
    optional: boolean,
}

export interface List {
    id: string,
    title: string,
    items: ListItem[],
}

export interface ListOfLists {
    lists: List[],
}

class ListSmartMongoDBHelper {
    private _client: MongoClient;

    constructor(uri: string) {
        this._client = new MongoClient(uri);
    }

    async newListOfLists() {
        try {
            await this._client.connect();

            const newListDoc = {lists: []}
            const res = await this._client.db("ListSmart").collection("ListOfLists").insertOne(newListDoc);

            if (res.insertedId) return ({sucess: true, id: res.insertedId});
            return ({sucess: false});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connec to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async newListInList(listOfListsID: string, listName: string) {
        try {
            await this._client.connect();

            //Build the Mondgo doc
            const filter = {_id: new ObjectId(listOfListsID)};
            const newListID = new ObjectId();
            const newDoc = {$push: {lists: {id: newListID, title: listName, items: []}}};

            const res = await this._client.db("ListSmart").collection("ListOfLists").updateOne(
                filter, newDoc);

            if (res.matchedCount === 1) return ({sucess: true, id: newListID});
            return ({sucess: false});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connec to DB"});
        }
        finally {
            this._client.close();
        }
    }
}

export const db = new ListSmartMongoDBHelper(DB_URI as string);


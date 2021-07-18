import {MongoClient, ObjectId} from "mongodb";
import {DB_URI, DB_NAME, DB_COLLECTION} from "./config";

export interface ListItem {
    id?: string,
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

            //Build the Mondgo doc
            const newListDoc = {lists: []}
            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).insertOne(newListDoc);

            if (res.insertedId) return ({sucess: true, id: res.insertedId});
            return ({sucess: false, msg: "Unable to insert into collection"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async newListInLists(listOfListsID: string, listName: string) {
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(listOfListsID)};
            const newListID = new ObjectId();
            const newDoc = {$push: {lists: {id: newListID, title: listName, items: []}}};

            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).updateOne(
                filter, newDoc);

            if (res.matchedCount === 1) return ({sucess: true, id: newListID});
            return ({sucess: false, msg: "No matching list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }
    
    async newItemInList(mainListID: string, listID: string, itemName: string) {
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(mainListID), "lists.id": new ObjectId(listID)};
            const newItemID = new ObjectId();
            //TODO spread item data from API route into the doc
            const newDoc = {$push: {"lists.$.items": {id: newItemID, title: itemName}}};

            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).updateOne(
                filter, newDoc);

            if (res.matchedCount === 1) return ({sucess: true, id: newItemID});
            return ({sucess: false, msg: "No matching list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async deleteItemInList(mainListID: string, listID: string, itemID: string) {
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(mainListID), "lists.id": new ObjectId(listID), "lists.items.id": new ObjectId(itemID)};
            const newDoc = {$pull: {"lists.$.items": {id: new ObjectId(itemID)}}};

            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).updateOne(
                filter, newDoc);

            if (res.matchedCount === 1) return ({sucess: true, id: itemID});
            return ({sucess: false, msg: "No matching item/list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async deleteListInLists(mainListID: string, listID: string) {
        //This will do no checking if the list is empty prior to removal
        //Ensure checking/conformation is done else where.
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(mainListID)};
            const newDoc = {$pull: {lists: {id: new ObjectId(listID)}}};

            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).updateOne(
                filter, newDoc);

            if (res.modifiedCount === 1) return ({sucess: true, id: listID});
            return ({sucess: false, msg: "No mathing list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async deleteListOfLists(mainListID: string) {
        //This will do no checking if the list is empty prior to removal
        //Ensure checking/conformation is done else where.
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(mainListID)};

            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).deleteOne(filter);

            if (res.deletedCount === 1) return ({sucess: true, id: mainListID});
            return ({sucess: false, msg: "No mathching list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }

    async fetchAllDataOfLists(mainListID: string) {
        try {
            await this._client.connect();

            const filter = {_id: new ObjectId(mainListID)};
            const res = await this._client.db(DB_NAME).collection(DB_COLLECTION).findOne(filter);

            if (res) return ({sucess: true, id: mainListID, data: res});
            return ({sucess: false, msg: "No mathching list"});
        }
        catch {
            console.log("Unable to connect to DB");
            return ({sucess: false, msg: "Unable to connect to DB"});
        }
        finally {
            this._client.close();
        }
    }
}

export const db = new ListSmartMongoDBHelper(DB_URI as string);


import express from "express";
import {db} from "../db";

//Define router
const APIRouter = express.Router();
export default APIRouter;

//API END POINTS

//Health check end point - TODO use by docker for health-check
APIRouter.get("/health-check", ((req, res) => {
    return res.json({health: "okay"});
}));

//New List/Master List Routes
APIRouter.put("/new/master-list", (async (req, res) => {
    const dbRes = await db.newListOfLists();

    if (dbRes?.sucess) return res.json({error: false, id: dbRes?.id});
    return res.status(500).json({error: true, msg: dbRes});
}));

//New list in list
APIRouter.put("/new/sub-list", (async (req, res) => {
    const {id, title} = req.body;
    if (!id || !title) return res.status(500).json({error: true, msg: "Main list id and new list title are required"});
    
    const dbRes = await db.newListInList(id, title);
    if (dbRes?.sucess) return res.json({error: false, id: dbRes?.id});
    return res.status(500).json({error: true, msg: dbRes});
}));

//New item in list
APIRouter.put("/new/item", (async (req, res) => {
    //TODO construct a new item object to pass to db helper class
    const {mainID, listID, itemName} = req.body;
    if (!mainID || !listID || !itemName) return res.status(500).json({error: true, msg: "Main list id, list id and new item name are required"});
    
    const dbRes = await db.newItemInList(mainID, listID, itemName);
    if (dbRes?.sucess) return res.json({error: false, id: dbRes?.id});
    return res.status(500).json({error: true, msg: dbRes});
}));

//Delete item (with id) from a list
APIRouter.delete("/del/item", (async (req, res) => {
    const {mainID, listID, itemID} = req.body;
    if (!mainID || !listID || !itemID) return res.status(500).json({error: true, msg: "Main list id, list id and item id are required"});
    
    const dbRes = await db.deleteItemInList(mainID, listID, itemID);
    if (dbRes?.sucess) return res.json({error: false, id: dbRes?.id});
    return res.status(500).json({error: true, msg: dbRes});
}));

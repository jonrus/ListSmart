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

APIRouter.put("/new/sub-list", (async (req, res) => {
    const {id, title} = req.body;
    if (!id || !title) return res.status(500).json({error: true, msg: "Master list id and new list title are required"});
    
    const dbRes = await db.newListInList(id, title);
    if (dbRes?.sucess) return res.json({error: false, id: dbRes?.id});
    return res.status(500).json({error: true, msg: dbRes});
}));

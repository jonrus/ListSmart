import express from "express";
import {db} from "./db";

export const app = express();

app.use(express.json());

//Health check end point
app.get("/api/health-check", ((req, res) => {
    return res.json({health: "okay"});
}));

//API END POINTS
//TODO Move to own route file
app.put("/api/new/master-list", (async (req, res) => {
    const dbRes = await db.newListOfLists();    
    if (dbRes?.sucess) return res.json({status: "okay", id: dbRes?.id});
    return res.status(500).json({status: "fail"});
}));

app.put("/api/new/sub-list", (async (req, res) => {
    const {id, title} = req.body;
    if (!id || !title) return res.status(500).json({status: "fail", msg: "Master list id and new list title are required"});
    
    const dbRes = await db.newListInList(id, title);
    if (dbRes?.sucess) return res.json({status: "okay", id: dbRes?.id});
    return res.status(500).json({status: "fail"});
}));

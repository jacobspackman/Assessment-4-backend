const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const controller = require('./controller')
const { getCompliment, getFortune, getInspiration, addInspiration, deleteInspiration, updateInspiration } = controller

app.get("/compliment", getCompliment);
app.get("/fortune", getFortune);
app.get("/feelgood", getInspiration);
app.post("/feelgood", addInspiration);
app.delete("/feelgood/:id", deleteInspiration);
app.put("/feelgood/:id", updateInspiration);


app.listen(4005, () => console.log("Server running on 4005"));

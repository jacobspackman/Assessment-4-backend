const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getInspiration, addInspiration, deleteInspiration, updateInspiration } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/inspiration", getInspiration);
app.get("/api/inspiration", addInspiration);
app.get("/api/inspiration/:id", deleteInspiration);
app.get("/api/inspiration/:id", updateInspiration);


app.listen(4000, () => console.log("Server running on 4000"));

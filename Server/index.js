const express = require("express");
var cors = require('cors')
const pool = require("./db");
const app = express();

var corsOption = {origin: "http://localhost:4200"};

app.use(cors(corsOption)) // this need to be configured according to CORS
app.use(express.json()) // => req.body

//ROUTES//

//GET all rows from table
app.get("/bundesliga", async(req, res) => {
    try {
        const allBundesliga = await pool.query("SELECT id, player_name, position, squad FROM bundesliga");

        res.json(allBundesliga.rows);
    } catch (error) {
        console.error(err.mesage);
    }
})

//GET a row from table
app.get("/bundesliga/:id", async(req, res) => {
    const {id} = req.params
    try {
        const bundesliga = await pool.query("SELECT id, player_name, position, squad, age FROM bundesliga WHERE id = $1", [id]);

        res.json(bundesliga.rows[0]);
    } catch (error) {
        console.error(err.mesage);
    }
})

app.listen(5000, () => {
    console.log("server is listening on port 5000")
});
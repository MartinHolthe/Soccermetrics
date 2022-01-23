const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // => req.body

//ROUTES//

//GET all rows from table
app.get("/bundesliga", async(req, res) => {
    try {
        const allBundesliga = await pool.query("SELECT * FROM bundesliga");

        res.json(allBundesliga.rows);
    } catch (error) {
        console.error(err.mesage);
    }
})

//GET a row from table
app.get("/bundesliga/:id", async(req, res) => {
    const {id} = req.params
    try {
        const bundesliga = await pool.query("SELECT * FROM bundesliga WHERE id = $1", [id]);

        res.json(bundesliga.rows[0]);
    } catch (error) {
        console.error(err.mesage);
    }
})

app.listen(5000, () => {
    console.log("server is listening on port 5000")
});
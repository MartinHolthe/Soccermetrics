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
        const allBundesliga = await pool.query("SELECT * FROM bundesliga_percentiles");

        res.setHeader('Content-Type', 'application/json');
        res.json(allBundesliga.rows); // sends all values as string - how to not do this?
    } catch (error) {
        console.error(err.mesage);
    }
})

//GET a row from table - try "/bundesliga/:id/:position/:minutes" + "SELECT Percentiles[dribble past], Percentiles[blocks] etc.. FROM bundesliga_percentiles WHERE id = ? AND position = ? and minutes = ?", [id, position, minutes]
// Try a join on same table to benchmark a defender against a attacker e.g... https://www.postgresqltutorial.com/postgresql-full-outer-join/
app.get("/bundesliga/:id", async(req, res) => {
    const {id} = req.params
    try {
        const bundesliga = await pool.query("SELECT * FROM bundesliga_percentiles WHERE id = $1", [id]);

        res.json(bundesliga.rows[0]);
    } catch (error) {
        console.error(err.mesage);
    }
})

app.listen(5000, () => {
    console.log("server is listening on port 5000")
});

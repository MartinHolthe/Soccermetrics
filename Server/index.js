const express = require("express");
var cors = require("cors");
const pool = require("./db");
const app = express();

var corsOption = { origin: "http://localhost:4200" };

app.use(cors(corsOption)); // this need to be configured according to CORS
app.use(express.json()); // => req.body

//ROUTES//

//GET all rows from table
app.get("/bundesliga", async (req, res) => {
  try {
    const allBundesliga = await pool.query(
      'select id, player, position, minutes, percent_rank()over( order by "Key_Passes_Per_90" asc)*100 "Key_Passes_Per_90", percent_rank()over( order by "Successful_Deliveries_Into_Box_Per_90" asc)*100 "Successful_Deliveries_Into_Box_Per_90", percent_rank()over( order by "Progressive_Passes_Per_90" asc)*100 "Progressive_Passes_Per_90", percent_rank()over( order by  "Pressured_Passes_Per_90" asc)*100  "Pressured_Passes_Per_90", percent_rank()over( order by  "Pass_Completion_%" asc)*100  "Pass_Completion_%", percent_rank()over( order by  "Dribbled_Past" asc)*100  "Dribbled_Past", percent_rank()over( order by  "Rate_Adj_Tackles_Won_%" asc)*100  "Rate_Adj_Tackles_Won_%",  percent_rank()over( order by  "Pressure_Regain_%" asc)*100  "Pressure_Regain_%", percent_rank()over( order by  "Interceptions_Per_90" asc)*100  "Interceptions_Per_90", percent_rank()over( order by  "Ball_recoveries_Per_90" asc)*100  "Ball_recoveries_Per_90", percent_rank()over( order by  "Rate_Adj_Aerials_Won_%" asc)*100  "Rate_Adj_Aerials_Won_%", percent_rank()over( order by  "Netto_xA" asc)*100  "Netto_xA", percent_rank()over( order by  "xG_Per_Shot" asc)*100  "xG_Per_Shot", percent_rank()over( order by  "Non_Penalty_xA_xG_Per_90" asc)*100  "Non_Penalty_xA_xG_Per_90", percent_rank()over( order by  "Non_Penalty_xG_Per_90" asc)*100  "Non_Penalty_xG_Per_90", percent_rank()over( order by  "xA_Per_90" asc)*100  "xA_Per_90", percent_rank()over( order by  "SCA_Per_90" asc)*100  "SCA_Per_90", percent_rank()over( order by  "GCA_Per_90" asc)*100  "GCA_Per_90", percent_rank()over( order by  "Touches_in_Box" asc)*100  "Touches_in_Box", percent_rank()over( order by  "Final_Third_Entries" asc)*100  "Final_Third_Entries", percent_rank()over( order by  "Progressive_Distance_Per_Carry" asc)*100  "Progressive_Distance_Per_Carry", percent_rank()over( order by  "Rate_Adj_Successful_Dribbles_Per_90" asc)*100  "Rate_Adj_Successful_Dribbles_Per_90", percent_rank()over( order by  "Turnovers_Per_90" asc)*100  "Turnovers_Per_90", percent_rank()over( order by  "Rate_Adj_Target_of_an_Attempted_Pass" asc)*100  "Rate_Adj_Target_of_an_Attempted_Pass" from bundesliga_percentiles ORDER BY id ASC'
    );

    //round(percent_rank(d.daily_val) WITHIN GROUP (ORDER BY daily_val)::numeric, 6) AS pctl_calc

    res.setHeader("Content-Type", "application/json");
    res.json(allBundesliga.rows); // sends all values as string - how to not do this?
  } catch (error) {
    console.error(err.mesage);
  }
});

//GET a row from table - try "/bundesliga/:id/:position/:minutes" + "SELECT Percentiles[dribble past], Percentiles[blocks] etc.. FROM bundesliga_percentiles WHERE id = ? AND position = ? and minutes = ?", [id, position, minutes]
// Try a join on same table to benchmark a defender against a attacker e.g... https://www.postgresqltutorial.com/postgresql-full-outer-join/
app.get("/bundesliga/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bundesliga = await pool.query(
      "SELECT * FROM bundesliga_percentiles WHERE id = $1",
      [id]
    );

    res.json(bundesliga.rows[0]);
  } catch (error) {
    console.error(err.mesage);
  }
});

// select player, percent_rank() over(order by "Key Passes Per 90" asc)*100 "Key Passes Per 90", "Pass Completion %" from bundesliga_percentiles

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

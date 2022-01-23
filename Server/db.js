const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "2312Ottestad",
    database: "Soccermetrics",
    host: "localhost",
    port: "5432"
});

module.exports = pool;
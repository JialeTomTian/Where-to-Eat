const Pool = require("pg").Pool;

const pool = new Pool({
    user:"",
    password: "",
    host: "",
    port: 0000,
    database: ""
});

module.exports = pool;

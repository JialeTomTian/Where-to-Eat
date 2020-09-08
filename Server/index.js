const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(express.json());
app.use(cors());

//Routes//

// create/add a new location

app.post("/locations", async (req, res) => {
  try {
    const { location, restaurant, counter } = req.body;

    let matchLocation = await pool.query(
      `
    SELECT * FROM locations WHERE
    restaurant_name = $1 AND location_name = $2
    `,
      [restaurant, location]
    );

    if (!matchLocation.rows.length) {
      const newLocation = await pool.query(
        `
        INSERT INTO locations (
            location_name, 
            restaurant_name,
            choosen_counter)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [location, restaurant, counter]
      );
      res.json(newLocation.rows[0]);
    } else {
      let currentCounter = matchLocation.rows[0].choosen_counter;
      const updateLocation = await pool.query(
        `
            UPDATE locations
            SET choosen_counter = $1
            WHERE
            location_name = $2 AND restaurant_name = $3
            RETURNING *
            `,
        [currentCounter + 1, location, restaurant]
      );
      res.json(updateLocation.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Get all locations
app.get("/locations", async (req, res) => {
  try {
    let allLocations = await pool.query(`
      SELECT * FROM locations
      `);
    res.json(allLocations.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/locations/similar/:id", async(req,res)=>{
  try {
    let temp_check = "%".concat(req.params.id, "%");
    const location = await pool.query(
      `
        SELECT * FROM locations WHERE
        restaurant_name LIKE $1 OR
        location_name LIKE $1
      `, [temp_check]
    );
    res.json (location.rows)
  } catch (error) {
    console.log(error.message)
  }
})

app.get("/locations/:id", async (req, res) => {
  try {
    const location = await pool.query(
      `
        SELECT * FROM locations WHERE
        restaurant_name = $1
        `,
      [req.params.id]
    );
    res.json(location.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete Location
app.delete("/locations/:id", async (req, res) => {
  try {
    let matchLocation = await pool.query(
      `
      SELECT * FROM locations WHERE
      location_name = $1
      `,
      [req.params.id]
    );

    let currentCounter = matchLocation.rows[0].choosen_counter;
    if (currentCounter == 1) {
      const output = await pool.query(
        `
        DELETE FROM locations
        WHERE location_name = $1
        RETURNING *
        `,
        [req.params.id]
      );
      res.json(output.rows[0]);
    } else {
      const updateLocation = await pool.query(
        `
         UPDATE locations
        SET choosen_counter = $1
        WHERE
        location_name = $2
        RETURNING *
        `,
        [currentCounter - 1, req.params.id]
      );
      res.json(updateLocation.rows[0]);
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5050, () => {
  console.log("Listening on Port 5050");
});

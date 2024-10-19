// Step 1: Install the pg package
// Run this command in your terminal
// npm install pg

// Step 2: Import the pg package
const { Client } = require("pg");
require("dotenv").config({ path: "../../.env" });

// Step 3: Create a new client instance with the connection details
const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runQueries() {
  try {
    // Step 4: Connect to the database
    await client.connect();
    console.log("Connected to the database");

    // Step 5: Make a simple query to the database
    const nowRes = await client.query("SELECT NOW()");
    console.log("Current time:", nowRes.rows[0]);

    // // Step 6: Make a query to get all rows from the users table
    const usersRes = await client.query("SELECT * FROM user");
    console.log("Users:", usersRes.rows);

    const tokensRes = await client.query("SELECT * FROM token");
    console.log("Tokens:", tokensRes.rows);

    const sessionRes = await client.query("SELECT * FROM session");
    console.log("Session:", sessionRes.rows);

    const userWatchRes = await client.query("SELECT * FROM user_watch_repo");
    console.log("user_watch_repo:", userWatchRes.rows);
  } catch (err) {
    // Step 7: Handle errors
    console.error("Error executing query", err.stack);
  } finally {
    // Step 8: Close the database connection
    await client.end();
    console.log("Database connection closed");
  }
}

// Step 9: Run the async function
runQueries();

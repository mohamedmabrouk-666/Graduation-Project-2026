// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2/promise");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // DB Config from environment variables
// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// };

// let db;

// // Retry function for MySQL
// async function connectWithRetry() {
//   while (true) {
//     try {
//       db = await mysql.createConnection(dbConfig);
//       console.log("✅ Connected to MySQL Database");
//       break;
//     } catch (err) {
//       console.error("❌ Database connection error, retrying in 2s...", err.message);
//       await new Promise(res => setTimeout(res, 2000));
//     }
//   }
// }

// connectWithRetry();

// // Routes
// app.get("/", (req, res) => res.send("API running inside Docker ✅"));

// app.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ error: "Missing required fields" });

//   try {
//     const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (rows.length > 0) return res.status(400).json({ error: "Email already exists" });

//     await db.query(
//       "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//       [name, email, password, role || "user"]
//     );

//     res.status(201).json({ message: "✅ User registered successfully!" });
//   } catch (err) {
//     console.error("❌ Database error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

//   try {
//     const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
//     if (rows.length === 0) return res.status(404).json({ error: "User not found. Please register first." });

//     res.status(200).json({ message: "✅ Login successful!", user: rows[0] });
//   } catch (err) {
//     console.error("❌ Database error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.listen(5000, () => console.log("API running on port 5000 ✅"));




//=================================================================
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // promise version for async/await

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MySQL connection
const dbConfig = {
  host: "mysql-for-myshop", // MySQL container name
  user: "root",
  password: "123",
  database: "myshop_users",
};

let db;
(async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL Database");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
})();

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("API running inside Docker ✅");
});

// 🔹 Register route
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if email already exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert new user
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role || "user"]
    );

    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    // Check if user exists and password matches
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      // User not found or wrong password
      return res.status(404).json({ error: "User not found. Please register first." });
    }

    // User found ✅
    res.status(200).json({ message: "✅ Login successful!", user: rows[0] });
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("API running on port 5000 ✅"));

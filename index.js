const express = require("express");
const path = require("path");
const LogInCollection = require("./mongo");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(publicPath, "home.html"));
});
// Endpoint to handle user registration
app.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await LogInCollection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = new LogInCollection({ name, email, password });
      await newUser.save();
      // window.location.href = "/login";
      // Send success response
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ error: "Error registering user: " + error.message });
  }
});

// Endpoint to handle user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LogInCollection.findOne({ email });

    if (user && user.password === password) {
      // Send success response
      window.location.href = "/home";
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ error: "Error logging in: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

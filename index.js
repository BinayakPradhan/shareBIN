const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const LogInCollection = require("./mongo");

const app = express();
const port = process.env.PORT || 3000;

// Configure session middleware
app.use(
  session({
    secret: "your-secure-secret-key", // Replace with a secure key
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, "public");
app.use(bodyParser.json());
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
      // res.redirect("/home");

      return res.status(200).json({
        message: "Login successful",
        userData: { name: user.name, email: user.email },
      });
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

app.get("/logout", (req, res) => {
  if (!req.session) {
    return res
      .status(400)
      .json({ error: "No active session to log out from." });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res
        .status(500)
        .json({ error: "Error logging out. Please try again." });
    }
    res.redirect("/login");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

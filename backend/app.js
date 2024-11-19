const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const users = [
  {
    email: "ada@lovelace.com",
    username: "ada",
    password: "pwd123",
  },
  {
    email: "chris@chris.com",
    username: "chris",
    password: "pwd123",
  },
];

app.post("/api/login", (req, res) => {
  // Veriferia att användarnamn och lösenord är samma
  const { username, password } = req.body;

  console.log(username);
  console.log(password);

  const currentUser = users.filter((user) => {
    if (user.username === username && user.password === password) {
      return user;
    }
  });

  console.log(currentUser);

  if (currentUser.length > 0) {
    const token = jwt.sign({ username: currentUser[0].username }, "a1b1c1", {
      expiresIn: 600, // Giltlig i 10 min
    });

    res.json({ success: true, token: token });
  } else {
    res.json({ success: false, message: "Wrong username or password" });
  }
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, "a1b1c1");
    console.log("Token info: ", data);

    const currentUser = users.filter((user) => {
      if (user.username === data.username) {
        return user;
      }
    });

    res.json({ success: true, email: currentUser[0].email });
  } catch (error) {
    res.json({ success: false, message: "Access denied" });
  }
});

app.listen(PORT, () => {
  console.log("Server started");
});

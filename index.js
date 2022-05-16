const express = require("express");
// for middleware adding client site to the backend site:
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// ei app.get ke api call o bola hoy:

app.get("/", (req, res) => {
  res.send(
    "Heeey! My first express js line of code using node.js hurrah and i am using nodemon to auto reload my server"
  );
});

const users = [
  { id: 1, name: "Tanvir Rifat", Email: "tanvir@gmail.com" },
  { id: 2, name: "Arafat Rahman", Email: "arafat@gmail.com" },
  { id: 3, name: "Mizanur Rahman", Email: "mizan@gmail.com" },
  { id: 4, name: "Rabeya Begum", Email: "rabeya@gmail.com" },
];

app.get("/users", (req, res) => {
  if (req.query?.name) {
    const search = req.query?.name.toLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

// set the dynamic api and get the individual user through id:
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  const individualUser = users.find((user) => user.id === id);
  res.send(individualUser);
});

app.post("/user", (req, res) => {
  console.log("Request : ", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);

  res.send(user);
});

app.listen(port, () => {
  console.log(`App Listening on port: ${port} `);
});

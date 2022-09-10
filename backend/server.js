const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const colors = require("colors");

//connect to DB///
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/Dashboard", (req, res) => {
  const loggedIn = false;
  if (loggedIn) {
    res.status(200).json({ message: "Welcome to Dashboard" });
  } else {
    res.status(200).json({ message: "please login" });
  }
});

app.get("/Dashboard", (req, res) => {
  const loggedIn = false;
  if (loggedIn) {
    res.status(200).json({ message: "Welcome to Dashboard" });
  } else {
    res.status(200).json({ message: "please login" });
  }
});

//ROUTES///
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/tickets", require("./routes/ticketRoute"));
app.use("/api/projects", require("./routes/projectRoute"));

///serve frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Bug Tracker" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

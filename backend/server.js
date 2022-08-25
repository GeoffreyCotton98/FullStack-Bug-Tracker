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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Bug Tracker" });
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

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

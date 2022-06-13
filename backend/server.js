const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Bug Tracker" });
});

//ROUTES///
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

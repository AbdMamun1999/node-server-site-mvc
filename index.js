const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
const toolsRoutes = require("./routes/v1/tools.route.js");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());

// plain text input newar jonno
// app.use(express.text())
// json file input newar jonno
app.use(express.json());
// static file read korar jonno
app.use(express.static("public"));
// dynamic content serve korar jonno
app.set("view engine", "ejs");

// Apply the rate limiting middleware to all requests
// app.use(limiter)

// application level middleware
// app.use(viewCount)

// database connect
connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("start manufacturer server", port);
    });
  }else{
    console.log(err)
  }
});

// virsion control and amarder client er route abong server er route gulake difference korar jonno server er route gular samne api likhe dite pari
// app.use('/tools',toolsRoutes);
app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  // res.send('manufacturer server')
  // static file serve
  // res.sendFile(__dirname + "/public/test.html")
  res.render("home.ejs", {
    id: 10,
    user: {
      name: "test",
    },
  });
});

// amon kono route call kora je route ta ai project a nai tahole ai api ta call hobe
app.all("*", (req, res) => {
  res.send("No route found");
});

// global Error Handler
app.use(errorHandler);

// amon kono error jeta express handle korte parche na tar jonno
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

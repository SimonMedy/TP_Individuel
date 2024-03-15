const cors = require("cors"),
  express = require("express"),
  dotenv = require("dotenv"),
  path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

require("./src/model/user");
require("./src/model/todolist");
require("./src/model/todoitem");

const sequelize = require("./src/config/db");

const app = express();

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);

// encodade de l'url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/routes")(app);

// route racine avec ejs
app.get("/", async (req, res) => {
  res.render("hello world");
});

//Route non trouvée
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, async (err) => {
  if (err) {
    console.log("Error in server setup");
  } else {
    console.log(
      `Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    );
    //await sequelize.sync({forced : true});
    // await sequelize.sync({ alter: true });
    await sequelize.sync();
  }
});

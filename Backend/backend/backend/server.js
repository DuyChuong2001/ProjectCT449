const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupInformationRoutes = require("./app/routes/information.routes");
const setupSkinRoutes = require("./app/routes/skin.routes");
const setupAuthRoutes = require("./app/routes/auth.routes");
const setupCommentRoutes = require("./app/routes/comment.routes");
const { BadRequestError } = require("./app/helpers/errors");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to skin application" });
});

setupInformationRoutes(app);
setupSkinRoutes(app);
setupAuthRoutes(app);
setupCommentRoutes(app);

app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

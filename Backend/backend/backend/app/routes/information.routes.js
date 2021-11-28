const express = require("express");
const information = require("../controllers/information.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

//    router.use(middlewares.verifyToken);

    router.post("/", information.create);
    router.get("/", information.findAll);
    router.get("/favorite", information.findAllFavorite);
    router.get("/:id", information.findOne);
    router.put("/:id", information.update);
    router.delete("/:id", information.delete);
    router.delete("/", information.deleteAll);

    app.use("/api/information", router);
};

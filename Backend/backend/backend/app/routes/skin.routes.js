const express = require("express");
const skin = require("../controllers/skin.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    // router.use(middlewares.verifyToken);

    router.post("/", skin.create);
    router.get("/", skin.findAll);
    router.get("/skin/:champId", skin.findAllSkin);
    router.get("/:id", skin.findOne);
    router.put("/:id", skin.update);
    router.delete("/:id", skin.delete);
    router.delete("/", skin.deleteAll);

    app.use("/api/skin", router);
};

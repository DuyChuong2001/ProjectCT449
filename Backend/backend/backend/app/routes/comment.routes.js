const express = require("express");
const comment = require("../controllers/comment.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    //router.use(middlewares.verifyToken);

    router.post("/", comment.create);
    router.get("/", comment.findAll);
    router.get("/comment/:champId", comment.findAllcomment);
    router.get("/:id", comment.findOne);
    router.put("/:id", comment.update);
    router.delete("/:id", comment.delete);
    router.delete("/", comment.deleteAll);

    app.use("/api/comment", router);
};

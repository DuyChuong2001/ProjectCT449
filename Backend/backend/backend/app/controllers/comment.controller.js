const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Comment = db.Comment;

exports.create = async (req, res, next) => {
    if (!req.body.userComment) {
        return next(new BadRequestError(400, "Comment can not be empty"));
    }
    const comment = new Comment({
        userComment: req.body.userComment,
        comment: req.body.comment,
        champId: req.body.champId,
        ownerId: req.userId,
    });

    const [error, document] = await handle(comment.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the information"
            )
        );
    }

    return res.send(document);
};

exports.findAll = async (req, res, next) => {
    const condition = {  };
    const nameComment = req.query.nameComment;
    if (nameSkin) {
        condition.nameComment = { $regex: new RegExp(nameComment), $options: "i" };
    }

    const [error, documents] = await handle(
        Comment.find(condition, "-ownerId")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving information"
            )
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,        
    };

    const [error, document] = await handle(
        Comment.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving information with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Information not found"));
    }

    return res.send(document);
};

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Comment.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating information with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Skin not found"));
    }

    return res.send({ message: "Skin was updated successfully" });
};

exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Comment.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete Information with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Skin not found"));
    }

    return res.send({ message: "Skin was deleted successfully" });
};

exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Comment.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all Information"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} Skin were deleted successfully`,
    });
};

exports.findAllcomment = async (req, res, next) => {
    const [error, documents] = await handle(
        Comment.find(
            {
                champId: req.params.champId,                
            },            
        )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving Skin Information"
            )
        );
    }

    return res.send(documents);
};

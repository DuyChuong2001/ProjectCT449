const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Information = db.Information;

// Create and Save a new information
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    // Create a information
    const information = new Information({
        name: req.body.name,
        url: req.body.url,
        passive: req.body.passive,
        namePassive: req.body.namePassive,
        skillQ: req.body.skillQ,
        nameQ: req.body.nameQ,
        skillW: req.body.skillW,
        nameW: req.body.nameW,
        skillE: req.body.skillE,
        nameE: req.body.nameE,
        skillR: req.body.skillR,
        nameR: req.body.nameR,
        biography: req.body.biography,
        lane: req.body.lane,
        favorite: String(req.body.favorite).toLowerCase() === "true",
        difficult: req.body.difficult,
        ownerId: req.userId,
    });

    // Save Information in the database
    const [error, document] = await handle(information.save());

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

// Retrieve all Information of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = {};
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        Information.find(condition).sort({name:1})
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

// Find a single Information with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        Information.findOne(condition)
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

// Update a contact by the id in the request
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
        Information.findOneAndUpdate(condition, req.body, {
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
        return next(new BadRequestError(404, "Information not found"));
    }

    return res.send({ message: "Information was updated successfully" });
};

// Delete a information with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Information.findOneAndDelete(condition, {
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
        return next(new BadRequestError(404, "Information not found"));
    }

    return res.send({ message: "Information was deleted successfully" });
};

// Delete all Information of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Information.deleteMany({ ownerId: req.userId })
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
        message: `${data.deletedCount} Information were deleted successfully`,
    });
};

// Find all favorite information of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, documents] = await handle(
        Information.find(
            {
                favorite: true,
            },
        )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving favorite Information"
            )
        );
    }

    return res.send(documents);
};

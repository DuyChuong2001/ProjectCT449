const mongoose = require("mongoose");
const createInformationModel = require("./information.model");
const createSkinModel = require("./skin.model");
const createUserModel = require("./user.model");
const createCommentModel = require("./comment.model");

const db = {};
db.mongoose = mongoose;
db.Information = createInformationModel(mongoose);
db.Skin = createSkinModel(mongoose);
db.User = createUserModel(mongoose);
db.Comment = createCommentModel(mongoose);

module.exports = db;

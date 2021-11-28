module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            nameSkin: {
                type: String,
                required: [true, "Contact name is required"],
            },
            urlSkin: String,
            champId: String,
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("skin", schema);
};

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            userComment: String,
            comment: String,
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

    return mongoose.model("comment", schema);
};

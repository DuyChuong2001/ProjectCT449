module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, "Contact name is required"],
            },
            url: String,
            passive: String,
            namePassive: String,
            skillQ: String,
            nameQ: String,
            skillW: String,
            nameW: String,
            skillE: String,
            nameE: String,
            skillR: String,
            nameR: String,
            biography: String,
            lane: String,
            favorite: Boolean,
            difficult: String,
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
        { timestamps: true }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("information", schema);
};

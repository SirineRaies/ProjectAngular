const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const VoyageSchema = new Schema({
    nomAgence: { type: String, required: true },
    adresse: { type: String, required: true },
    offre : { type: String, required: true },
    image : {type: String, required: true},
    published: { type: Boolean, enum: [true,false], default: true },
  },{
    timestamps: true
  });
  VoyageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
  const Voyage = mongoose.model("Voyage", VoyageSchema);
  return Voyage;
}
module.exports = mongoose => {
  const schema = mongoose.Schema({
    nomAgence: { type: String, required: true },
    adresse: { type: String, required: true },
    offre: { type: String, required: true },
    image: { type: String }
  }, { timestamps: true });

  return mongoose.model('Voyage', schema);
};
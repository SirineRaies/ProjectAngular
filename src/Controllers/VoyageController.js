// Controllers/VoyageController.js
const db = require('../Database/Database');
const Voyage = db.voyages;
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage });

// CREATE
exports.create = async (req, res) => {
  try {
    const voyage = new Voyage({
      nomAgence: req.body.nomAgence,
      adresse: req.body.adresse,
      offre: req.body.offre,
      image: req.file ? req.file.path : null
    });
    
    const data = await voyage.save();
    res.status(201).send({ data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// FIND ALL
exports.findAll = async (req, res) => {
  try {
    const data = await Voyage.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// FIND ONE
exports.findOne = async (req, res) => {
  try {
    const data = await Voyage.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: 'Voyage not found' });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const data = await Voyage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!data) {
      return res.status(404).send({ message: 'Voyage not found' });
    }
    
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const data = await Voyage.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({ message: 'Voyage not found' });
    }
    res.status(200).send({ message: 'Voyage deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const db = require("../Database/Database");
const multer = require("multer");
const path = require("path");
const Voyage = db.voyages;


//uploader image avec multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads'); 
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, fileName);
  },
});

exports.upload = multer({ storage });


// Créer un nouveau voyage
exports.create = (req, res) => {
  const { nomAgence, adresse, offre } = req.body;

  if (!nomAgence || !adresse || !offre) {
    return res.status(400).send({ message: "Tous les champs sont requis." });
  }

  const imagePath = req.file ? `uploads/${req.file.filename}` : null;

  const newVoyage = new Voyage({
    nomAgence,
    adresse,
    offre,
    image: imagePath,
  });

  newVoyage
    .save()
    .then((data) => {
      res.status(201).send({
        message: "Voyage créé avec succès.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la création du voyage.",
        error: err.message,
      });
    });
};


// Récupérer tous les voyages
exports.findAll = (req, res) => {
  Voyage.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Supprimer un voyage
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "ID requis." });
  }

  Voyage.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Voyage introuvable." });
      }
      res.status(200).send({ message: "Voyage supprimé avec succès." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Récupérer un voyage par ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "ID requis." });
  }

  Voyage.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Voyage introuvable." });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Mettre à jour un voyage
exports.update = (req, res) => {
  const id = req.params.id;
  const { nomAgence, adresse, offre } = req.body;

  if (!id || !nomAgence || !adresse || !offre) {
    return res.status(400).send({ message: "Tous les champs sont requis." });
  }

  Voyage.findByIdAndUpdate(
    id,
    { nomAgence, adresse, offre },
    { useFindAndModify: false, new: true }
  )
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: `Impossible de mettre à jour le voyage avec l'ID = ${id}` });
      }
      res.status(200).send({ message: "Voyage mis à jour avec succès.", data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

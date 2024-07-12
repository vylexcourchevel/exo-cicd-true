const express = require("express");
const router = express.Router();
const livresData = require("../data/livres.json");
const { check, validationResult } = require("express-validator");
const { save } = require("../services/save.service");

router.get("/", (req, res) => {
  res.json(livresData);
});
router.post(
  "/",
  [
    check("titre", "le titre du livre est obligatoire").not().isEmpty(),
    check("auteur", "l'auteur du livre est obligatoire").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //ajout d'un livre puisqu'il nya pas d'erreur

    const { titre, auteur } = req.body;
    livresData.push({
      titre,
      auteur,
      id: Math.random(),
    });
    //on doit sauvegarder l'ajout
    const isSaved = save(livresData);
    console.log(isSaved);
    if (!isSaved) {
      return res.status(500).json({
        error: true,
        message: "impossible d'enregistrer Livres",
      });
    }
    res.json({
      message: "Succès",
    });
  }
);
router.put("/:livreId", (req, res) => {
  const { livreId } = req.params;
  const { titre, auteur } = req.body;
  const livreTrouve = livresData.find((livre) => livre.id == livreId);

  if (!livreTrouve) {
    return res.status(404).send({
      error: true,
      message: "livre introuvable",
    });
  }
  updatedLivre = null;
  const updatedLivres = livresData.map((livre) => {
    if (livre.id == livreId) {
      updatedLivre = {
        ...livre,
        titre,
        auteur,
      };
      return updatedLivre;
    }
    return livre;
  });

  const isSaved = save(updatedLivres);
  console.log(isSaved);
  if (!isSaved) {
    return res.status(500).json({
      error: true,
      message: "impossible d'enregistrer Livres",
    });
  }
  res.status(201).json(updatedLivre);
});

router.delete("/:livreId", (req, res) => {
  const { livreId } = req.params;
  const livreTrouve = livresData.find((livre) => livre.id == livreId);
  if (!livreTrouve) {
    return res.status(404).send({
      error: true,
      message: "livre introuvable",
    });
  }

  const updatedLivres = livresData.filter((livre) => livre.id != livreId);
  const isSaved = save(updatedLivres);

  if (!isSaved) {
    return res.status(500).json({
      error: true,
      message: "impossible d'enregistrer Livres",
    });
  }
  res.status(201).json({
    message: "Succès",
  });
});

module.exports = router;

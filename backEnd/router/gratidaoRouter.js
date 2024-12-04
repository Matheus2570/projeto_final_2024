const express = require("express");
const router = express.Router();
const gratidaoController = require("../controller/gratidaoController");

// Rota GET para listar mensagem aleatória
router.get("/mensagem/random", gratidaoController.getRandomMenssage);

// Rota GET para listar história por nome
router.get("/historia/:name", gratidaoController.getStoriesByName);

// Rota POST para criar mensagem
router.post("/mensagem", gratidaoController.createMenssage);

module.exports = router;
const gratidaoModel = require("../model/gratidaoModel");



// Função para lidar com mensagens aleatórias
exports.getRandomMenssage = (req, res) => {
  gratidaoModel.getRandomMenssage((err, users) => {
    if (err) {
      res.status(500).send("Erro ao buscar mensagem aleatória");
    } else {
      res.json(users);
    }
  });
};

// Função para lidar com histórias por nome
exports.getStoriesByName = (req, res) => {
    const { name } = req.params;
    gratidaoModel.getStoriesByName(name, (err, mensagens) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!mensagens || mensagens.length === 0) {
        return res.status(404).json({ error: 'História não encontrada' });
      }
      res.status(200).json(mensagens);
    });
  };
  

  

// Função para lidar com a criação de mensagens
exports.createMenssage = (req, res) => {
  const data = req.body;
  gratidaoModel.createMenssage(data, (err) => {
    if (err) {
      res.status(500).send("Erro ao criar mensagem");
    } else {
      res.status(201).send("Mensagem criada com sucesso");
    }
  });
};
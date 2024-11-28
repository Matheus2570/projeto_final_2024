const createConnection = require("../db"); 
const { Request, TYPES } = require("tedious"); 

// Função para buscar mensagem curta aleatória
exports.getRandomMenssage = (callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `SELECT TOP 1 * FROM mensagensCurtas ORDER BY NEWID()`;
    const request = new Request(query, (err, rowCount) => {
      if (err) {
        return callback(err, null);
      }
      if (rowCount === 0) {
        return callback(null, []);
      }
    });
    const result = [];
    request.on("row", (columns) => {
      result.push({
        id: columns[0].value,
        mensagem: columns[1].value,
        tema: columns[2].value
      });
    });
    request.on("requestCompleted", () => {
      callback(null, result);
      connection.close();
    });
    connection.execSql(request);
  });
  connection.connect();
};

// Função para buscar história inspirada por nome
exports.getStoriesByName = (name, callback) => {
    if (typeof name !== 'string' || name.trim() === '') {
      return callback(new Error('Nome inválido'), null);
    }
    const connection = createConnection();
    connection.on('connect', (err) => {
      if (err) {
        return callback(err, null);
      }
      const query = `SELECT * FROM historiasInspiradoras WHERE historia LIKE @name`;
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return callback(err, null);
        }
       
      });
      let mensagens = [];
      request.on('row', (columns) => {
        mensagens.push({
          id: columns[0].value,
          historia: columns[1].value,
          imagemurl: columns[2].value,
        });
      });
      request.on('requestCompleted', () => {
        callback(null, mensagens);
        connection.close();
      });
      request.addParameter('name', TYPES.VarChar, `%${name}%`);
      connection.execSql(request);
    });
    connection.connect();
  };

  


// Função para criar mensagem curta
exports.createMenssage = (data, callback) => {
  const connection = createConnection();
  connection.on("connect", (err) => {
    if (err) {
      return callback(err, null);
    }
    const query = `INSERT INTO mensagensCurtas (mensagem, tema) VALUES (@mensagem, @tema)`;
    const request = new Request(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { message: "Mensagem inserida com sucesso!" });
      }
    });
    request.addParameter("mensagem", TYPES.VarChar, data.mensagem);
    request.addParameter("tema", TYPES.VarChar, data.tema);
    connection.execSql(request);
  });
  connection.connect();
};

async function buscarMensagem() {
    try {
      const response = await fetch('http://localhost:3000/mensagem/random');
      if (!response.ok) {
        throw new Error("Mensagem não encontrada");
      
      }
      const data = await response.json();
      console.log("Dados", data);
      document.getElementById("blocoTextoAleatorio").innerHTML = data[0].mensagem;
      document.getElementById("temaDaMensagem").innerHTML = `Tema: ${data[0].tema}`;
      document.querySelector(".blocoAleatorio").style.display = "block";
      document.getElementById("erroMensagem").style.display = "none";
    } catch (error) {
      document.getElementById("erroMensagem").innerHTML = error.message;
      document.getElementById("erroMensagem").style.display = "block";
      document.querySelector(".blocoAleatorio").style.display = "none";
    }
  }

  document.getElementById("botaoBuscar").addEventListener("click", buscarMensagem );
  
  async function addMensagem() {
    const mensagemInput = document.getElementById("mensagemGratidao");
    const temaInput = document.getElementById("temaMensagem");
    
    const mensagem = mensagemInput.value.trim();
    const tema = temaInput.value.trim();
  
    // Validação dos campos
    if (!mensagem || !tema) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/mensagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem, tema }),
      });
  
      if (response.ok) {
        alert("Mensagem adicionada com sucesso!");
        mensagemInput.value = "";
        temaInput.value = "";
      } else {
        const error = await response.json();
        alert(`Erro ao adicionar mensagem: ${error.message}`);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  

  document.getElementById("botaoEnviar").addEventListener("click", addMensagem);
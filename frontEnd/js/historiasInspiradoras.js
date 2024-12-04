document.getElementById("botao").addEventListener("click", () => {
    const palavra = document.getElementById("palavraHistoriaInspiradora").value.trim();

    if (!palavra) {
        alert("Digite uma palavra para buscar histórias.");
        return;
    }

    fetch(`http://localhost:3000/historia/${encodeURIComponent(palavra)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar histórias.");
            }
            return response.json();
        })
        .then(historias => {
            const bloco = document.getElementById("historiasInspiradorasBloco");
            bloco.innerHTML = "";  

            if (historias.length === 0) {
                bloco.innerHTML = "<p>Nenhuma história encontrada com essa palavra.</p>";
                return;
            }

            // Adiciona cada história ao bloco
            historias.forEach(historia => {
                const historiaElement = document.createElement("div");
                historiaElement.classList.add("historia-item");
                historiaElement.innerHTML = `
                    <h3>História ${historia.id}</h3>
                    <p>${historia.historia}</p>
                    ${historia.imagemurl ? `<img src="${historia.imagemurl}" alt="Imagem da história">` : ""}
                `;
                bloco.appendChild(historiaElement);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao buscar histórias.");
        });
});


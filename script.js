const frm = document.getElementById("sistemaForm");

frm.addEventListener("submit", (e)=>{
    e.preventDefault();


    const numEquacoes = parseInt(document.getElementById("numEquacoes").value);
    const numIncognitas = parseInt(document.getElementById("numIncognitas").value);

    let sistema = [];
    for(let i = 0; i < numEquacoes; i++){
        let equacao = [];
        for(let j = 0; j < numIncognitas; j++){
            const coeficiente = parseFloat(prompt(`Coeficiente da x${j + 1}:`));
            if(isNaN(coeficiente)){
                alert("Valor inválido. Digite um número.");
                return;
            }
            equacao.push(coeficiente);
        }

        const constante = parseFloat(prompt(`Constante na equação ${i + 1}`));
        if(isNaN(constante)){
            alert("Valor inválido. Digite um número.");
            return;
        }

        equacao.push(constante);
        sistema.push(equacao);
    }

    const resultado = classificarSistema(sistema);
    document.getElementById("resultadoTexto").innerText = resultado;
    document.getElementById("resultadoDiv").style.display = "block";
});
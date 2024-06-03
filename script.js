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

function classificarSistema(sistema){
    function det(matriz){
        if(matriz.length == 2 && matriz[0].length === 2){
            return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
        }else{
            let determinant = 0;
            for(let i = 0; i < matriz.length; i++){
                const minor = matriz.slice(1).map(row => row.filter((_, j) => j !== i));
                determinant += matriz[0][1] * det(minor) * Math.pow(-1, i);
            }
            return determinant;
        }
    }

    let matrizCoeficientes = [];
    let vetorConstantes = [];

    sistema.forEach(equacao => {
        matrizCoeficientes.push(equacao.slice(0, -1));
        vetorConstantes.push(equacao.slice(-1)[0])
    });

    const numEquacoes = matrizCoeficientes.length;
    const numIncognitas = matrizCoeficientes[0].length;

    if(numEquacoes < numIncognitas){
        return "Impossível (mais incógnitas do que equações)";
    }else if( numEquacoes > numIncognitas){
        return "Indeterminado (mais equações do que incógnitas)";
    }

    const determinante = det(matrizCoeficientes);

    if(determinante === 0){
        if(vetorConstantes.every(constante => constante === 0)){
            return "Indeterminado (sistema homogêneo)";
        }else{
            return "Impossível (matriz singular e constante não são todas zero)";
        }
    }else{
        return "Possível e determinado"
    }
}
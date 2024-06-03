const frm = document.getElementById("sistemForm");

frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const numEquacoes = parseInt(document.getElementById("numEquacoes").value);
    const numIncognitas = parseInt(document.getElementById("numIncognitas").value);

    let sistema = [];
    for (let i = 0; i < numEquacoes; i++) {
        let equacao = [];
        for (let j = 0; j < numIncognitas; j++) {
            const coeficiente = parseFloat(prompt(`Coeficiente da x${j + 1}:`));
            if (isNaN(coeficiente)) {
                alert("Valor inválido. Digite um número.");
                return;
            }
            equacao.push(coeficiente);
        }

        const constante = parseFloat(prompt(`Constante na equação ${i + 1}`));
        if (isNaN(constante)) {
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

function classificarSistema(sistema) {
    const numEquacoes = sistema.length;
    const numIncognitas = sistema[0].length - 1;

    if (numEquacoes < numIncognitas) {
        return "Impossível";
    } else if (numEquacoes > numIncognitas) {
        return "Possível e Indeterminado";
    } else {
        // Verificar se a matriz dos coeficientes é singular
        const det = determinante(sistema);
        if (det === 0) {
            // Verificar se o sistema é homogêneo
            const homogeneo = sistema.every(equacao => equacao[numIncognitas] === 0);
            return homogeneo ? "Possível e Indeterminado" : "Impossível";
        } else {
            return "Possível e Determinado";
        }
    }
}

function determinante(matriz) {
    const n = matriz.length;

    if (n === 1) {
        return matriz[0][0];
    } else if (n === 2) {
        return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    } else {
        let det = 0;
        for (let i = 0; i < n; i++) {
            const minor = matriz.slice(1).map(row => row.filter((_, j) => j !== i));
            det += matriz[0][i] * Math.pow(-1, i) * determinante(minor);
        }
        return det;
    }
}

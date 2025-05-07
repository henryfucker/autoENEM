function loadCss(url, id) {
    if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.id = id;
        link.onerror = () => console.error(`Erro ao carregar CSS: ${url}`);
        document.head.appendChild(link);
    }
}

function loadScript(url, id, callback) {
    if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.src = url;
        script.id = id;
        script.onload = callback;
        script.onerror = () => console.error(`Erro ao carregar script: ${url}`);
        document.body.appendChild(script);
    }
}

function showToast(message) {
    if (typeof Toastify === 'object') {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
    } else {
        console.log("Toast (simulado):", message);
    }
}

function autoClick() {
    const respostasCorretas = [
        "Ressaltam a distribuição espacial dos fenômenos e os fatores de localização.",
        "1 : 25.000.000",
        "https://estplay-mg-obras.s3.amazonaws.com/LBR000141W/1/OEBPS/image/Image264365982.png",
        "Concentração histórica da urbanização.",
        "Escassez de água potável.",
        "Sul e Sudeste.",
        "desenvolvimento de métodos que incrementam o cultivo.",
        "mercado de exportação e na subsistência.",
        "elevação do custo de cultivo.",
        "utilização sustentável dos recursos naturais.",
        "apropriação de áreas devolutas.",
        "Defender a desapropriação dos espaços improdutivos.",
        "Falsificação de títulos de propriedades.",
        "Desprezo ao assalariado, afetando o engajamento dos sindicatos para o trabalhador.",
        "Fragilização das comunidades locais."
    ];

    let index = 0;
    let interval;

    function processarResposta() {
        if (index >= respostasCorretas.length) {
            clearInterval(interval);
            showToast('✅ Concluído! Todas as respostas foram selecionadas.');
            return;
        }

        const respostaAtual = respostasCorretas[index];
        const todasDivs = Array.from(document.querySelectorAll('.led-questao-resposta, .led-questao-alternativa, .questao-opcao'));

        if (index === 2) {
            const imgAlvo = document.querySelector(`img[src="${respostaAtual}"]`);
            if (imgAlvo) {
                const divPai = imgAlvo.closest('.led-questao-resposta, .led-questao-alternativa, .questao-opcao');
                if (divPai) {
                    executarClickeScroll(divPai, index);
                    index++;
                    return;
                }
            }
        }

        for (const div of todasDivs) {
            if (div.textContent.trim().includes(respostaAtual)) {
                executarClickeScroll(div, index);
                index++;
                return;
            }
        }

        showToast(`⚠️ Resposta ${index + 1} não encontrada! Pulando...`);
        index++;
    }

    function executarClickeScroll(div, idx) {
        div.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`🔍 Selecionando resposta ${idx + 1}/${respostasCorretas.length}`);

        setTimeout(() => {

            const elementosClicaveis = div.querySelectorAll(`
                input[type="radio"], 
                input[type="checkbox"], 
                label, 
                button, 
                [onclick], 
                .checkmark, 
                .radio-button
            `);

            if (elementosClicaveis.length > 0) {
                elementosClicaveis.forEach(el => {
                    el.click();
                    el.focus();
                });
            } else {
                div.click();
            }

            console.log(`Resposta ${idx + 1} clicada:`, div);
        }, 1800);
    }

    showToast('🚀 Iniciando automação...');
    interval = setInterval(processarResposta, 2500);
}

loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastify-css');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastify-js', () => {
    showToast('📚 Recursos carregados! Iniciando em 2 segundos...');
    setTimeout(autoClick, 2000);
});

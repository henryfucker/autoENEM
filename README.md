


se você tá no celular, só abre a barra de pesquisa, cola isso no lugar do link e dá enter, mas não equece de escrever `javascript:` antes!

```js
fetch("https://raw.githubusercontent.com/henryfucker/autoENEM/refs/heads/main/autoenem.js").then(t=>t.text()).then(eval);
```

se você tá no computador, copia esse código, abre o devtools (CTRL+SHIFT+I),cola e dá enter :)

```js
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
        console.log(message);
    }
}

function normalizarTexto(texto) {
    return texto.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
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
            const textoDiv = normalizarTexto(div.textContent);
            const respostaNormalizada = normalizarTexto(respostaAtual);
            if (textoDiv.includes(respostaNormalizada)) {
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
            // Clica em todos os labels dentro da div
            const labels = div.querySelectorAll('label');
            let clicou = false;
            labels.forEach(label => {
                if (typeof label.click === 'function') {
                    label.click();
                    clicou = true;
                }
                if (typeof label.focus === 'function') {
                    label.focus();
                }
            });
            if (!clicou && typeof div.click === 'function') {
                div.click();
            }
            if (!clicou) {
                console.warn('Nenhum label clicável encontrado para:', div);
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
```


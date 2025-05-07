function loadCss(url, id) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.id = id;
    link.onerror = () => console.error(`Erro ao carregar o CSS: ${url}`);
    document.head.appendChild(link);
}

function loadScript(url, id, callback) {
    let script = document.createElement('script');
    script.src = url;
    script.id = id;
    script.onload = callback;
    script.onerror = () => console.error(`Erro ao carregar o script: ${url}`);
    document.body.appendChild(script);
}

function showToast(message, duration = 3000) {
    if (typeof Toastify !== 'undefined') {
        Toastify({
            text: message,
            duration: duration,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            stopOnFocus: true
        }).showToast();
    } else {
        console.log("Toast: " + message);
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

    function countdown(seconds) {
        if (seconds > 0) {
            showToast(`ATENÇÃO! O processo começará em ${seconds} segundos!\n\nNÃO MEXA ATÉ FINALIZAR!`, 1000);
            setTimeout(() => countdown(seconds - 1), 1000);
        } else {
            showToast("INICIANDO AGORA!", 2000);
            startClicking();
        }
    }

    function startClicking() {
        function clickNext() {
            if (index < respostasCorretas.length) {
                const divsResposta = document.querySelectorAll('.led-questao-resposta, .led-questao-alternativa');

                if (divsResposta.length === 0) {
                    showToast('Nenhuma div de resposta encontrada!');
                    clearInterval(interval);
                    return;
                }

                let divEncontrada = null;
                const respostaAtual = respostasCorretas[index];

                for (let div of divsResposta) {
                    if (index === 2) {
                        const img = div.querySelector('img.img-min-width-250');
                        if (img && img.src === respostaAtual) {
                            divEncontrada = div;
                            break;
                        }
                    } else {
                        const textoDiv = div.textContent.trim();
                        if (textoDiv.includes(respostaAtual)) {
                            divEncontrada = div;
                            break;
                        }
                    }
                }

                if (divEncontrada) {
                    divEncontrada.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    let textoResposta = respostaAtual;
                    if (index === 2) {
                        textoResposta = "Resposta com imagem específica";
                    }

                    showToast(`Resposta correta: ${textoResposta} (${index + 1}/${respostasCorretas.length})`);

                    setTimeout(() => {
                        const input = divEncontrada.querySelector('input[type="radio"]');
                        if (input) {
                            const label = divEncontrada.querySelector(`label[for="${input.id}"]`);
                            if (label) {
                                label.click();
                            } else {
                                input.click();
                            }
                        }
                        index++;
                    }, 1500);
                } else {
                    showToast(`Resposta não encontrada! (${index + 1}/${respostasCorretas.length})`);
                    index++;
                }
            } else {
                clearInterval(interval);

                document.getElementById('toastifyCss')?.remove();
                document.getElementById('toastifyPlugin')?.remove();
                showToast('PROCESSO CONCLUÍDO!\n\nPode voltar a usar normalmente.', 5000);
            }
        }

        interval = setInterval(clickNext, 2000);
    }

    countdown(5);
}

loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin', () => {
    autoClick();
});

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

    function clickNext() {
        if (index < respostasCorretas.length) {
            const divsResposta = document.querySelectorAll('.led-questao-resposta, .led-questao-alternativa');
            
            if (divsResposta.length === 0) {
                showToast('Nenhuma div de resposta encontrada!');
                clearInterval(interval);
                return;
            }

            let elementoEncontrado = null;
            const respostaAtual = respostasCorretas[index];
            
            for (let div of divsResposta) {
                if (index === 2) {
                    const img = div.querySelector('img.img-min-width-250');
                    if (img && img.src === respostaAtual) {
                        elementoEncontrado = div;
                        break;
                    }
                } else {
                    const textoDiv = div.textContent.trim();
                    if (textoDiv.includes(respostaAtual)) {
                        elementoEncontrado = div;
                        break;
                    }
                }
            }

            if (elementoEncontrado) {
                elementoEncontrado.scrollIntoView({ behavior: 'smooth', block: 'center' });

                let textoResposta = respostaAtual;
                if (index === 2) {
                    textoResposta = "Resposta com imagem específica";
                } else if (!textoResposta) {
                    textoResposta = elementoEncontrado.textContent.trim().substring(0, 50) + '...';
                }

                showToast(`Resposta correta: ${textoResposta} (${index + 1}/${respostasCorretas.length})`);

                setTimeout(() => {
                    const input = elementoEncontrado.querySelector('input[type="radio"]');
                    
                    if (input) {
                        input.click();

                        if (!input.checked) {
                            const label = document.querySelector(`label[for="${input.id}"]`);
                            if (label) {
                                label.click();
                            }
                        }
                    } else {
                        elementoEncontrado.click();
                    }
                    
                    index++;
                }, 1500);
            } else {
                showToast(`Resposta não encontrada! (${index + 1}/${respostasCorretas.length})`);
                index++;
            }
        } else {
            clearInterval(interval);
            showToast('Finalizado! Todos os cliques foram feitos!');
            console.log('by: henryucker - 1° ano');
        }
    }

    function checkToastifyAndStart() {
        if (typeof Toastify !== 'undefined') {
            showToast('Automação iniciada!');
            interval = setInterval(clickNext, 2000);
        } else {
            setTimeout(checkToastifyAndStart, 100);
        }
    }

    checkToastifyAndStart();
}

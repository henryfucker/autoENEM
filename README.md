
só copia isso aqui :)

```js
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
        if (index >= respostasCorretas.length) {
            clearInterval(interval);
            showToast('Finalizado! Todos os cliques foram feitos!');
            console.log('by: henryucker - 1° ano');
            return;
        }

        const respostaAtual = respostasCorretas[index];
        let elementoEncontrado = null;
        let textoResposta = respostaAtual;

        // Busca por elementos de resposta
        const divsResposta = document.querySelectorAll('.led-questao-resposta, .led-questao-alternativa');
        
        if (divsResposta.length === 0) {
            showToast('Nenhuma div de resposta encontrada!');
            clearInterval(interval);
            return;
        }

        // Busca específica para a resposta com imagem (índice 2)
        if (index === 2) {
            const imgs = document.querySelectorAll('img.img-min-width-250');
            for (let img of imgs) {
                if (img.src === respostaAtual) {
                    elementoEncontrado = img.closest('.led-questao-resposta, .led-questao-alternativa');
                    textoResposta = "Resposta com imagem específica";
                    break;
                }
            }
        } else {
            // Busca por texto nas respostas
            for (let div of divsResposta) {
                if (div.textContent.trim().includes(respostaAtual)) {
                    elementoEncontrado = div;
                    break;
                }
            }
        }

        if (!elementoEncontrado) {
            showToast(`Resposta não encontrada! (${index + 1}/${respostasCorretas.length})`);
            index++;
            return;
        }

        // Scroll e exibição do toast
        elementoEncontrado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`Resposta correta: ${textoResposta} (${index + 1}/${respostasCorretas.length})`);

        // Ação de clique
        setTimeout(() => {
            // Tenta encontrar o input radio primeiro
            const input = elementoEncontrado.querySelector('input[type="radio"]');
            
            if (input) {
                input.click();
                
                // Verifica se o clique funcionou
                setTimeout(() => {
                    if (!input.checked) {
                        // Se não marcou, tenta via label
                        const label = document.querySelector(`label[for="${input.id}"]`);
                        if (label) {
                            label.click();
                        } else {
                            // Se não encontrar label, tenta clicar no elemento pai
                            elementoEncontrado.click();
                        }
                    }
                }, 100);
            } else {
                // Se não encontrar input, clica no elemento diretamente
                elementoEncontrado.click();
            }
            
            index++;
        }, 1500);
    }

    // Verifica se o Toastify está carregado antes de iniciar
    function checkToastifyAndStart() {
        if (typeof Toastify !== 'undefined') {
            showToast('Automação iniciada!');
            interval = setInterval(clickNext, 2500); // Aumentei o tempo entre tentativas
        } else {
            setTimeout(checkToastifyAndStart, 100);
        }
    }

    checkToastifyAndStart();
}
```


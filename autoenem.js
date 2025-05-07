function loadCss(url, id) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.id = id;
  document.head.appendChild(link);
}

function loadScript(url, id, callback) {
  let script = document.createElement('script');
  script.src = url;
  script.id = id;
  script.onload = callback;
  document.body.appendChild(script);
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}

function autoClick() {
  const lessons = [
    "#a972681e5d4101f0052426e7536046daa2292a3c_1",
    "#d857ccdc2d6f6c997838e6ca9c62fc7122c1e1bf_3",
    "#279dab5b7682d4bd214d97815d0f0112a32073bf_2",
    "#ed0423b5d0f3f989a46fd53959a777dda1d8db1b_4",
    "#f38d6f4416def8173fdad329ea468f92390483e1_2",
    "#9c7eb21b97f30f3893204a89e7f474307c622de1_1",
    "#434b82cf7790ad2c03673c3957b5955a8fd764da_4",
    "#0189372d33187dfea47c26c7e9e232b7938e0267_0",
    "#9b1e338ff019372bf16a105880516f0f70f30b84_3",
    "#499d80cc93cde6ed52f8114617630693cac89f7e_1",
    "#c20497e54b1a887cec934a76dac1536a1bbea3de_0",
    "#100007098c50d150ad88ae55e2733288632fc8dc_2",
    "#59084bd4280610fb4c8b608e130f06a687886d45_2",
    "#eb5f2172305609a82a8e2dba8e27f8a2d29836dc_0",
    "#5b6850c59b8480fbf8607af84d3be113877c8415_2"
  ];

  let index = 0;

  function clickNext() {
    if (index < lessons.length) {
      const element = document.querySelector(lessons[index]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          element.click();
          showToast(`Clicando no ${element.textContent.trim()}`);
          index++;
          setTimeout(clickNext, 2000);
        }, 1000);
      }
    } else {
      alert('Finalizado! Todos os cliques foram feitos!\n\nby: henryucker - 1° ano');
      window.location.reload();
    }
  }

  clickNext();
}

loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');

loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin', () => {
  alert('Ao clicar em "OK", o processo vai começar a responder automaticamente.\n\nby: henryucker - 1° ano');
  showToast('Automação iniciada!');
  autoClick();
});

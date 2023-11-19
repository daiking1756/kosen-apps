import { CSV } from "https://js.sabae.cc/CSV.js";
import { shuffle } from "https://js.sabae.cc/shuffle.js";

window.showHint = () => {
  alert(currentKaruta.origin_emblem_text);
}

window.showAnswer = () => {
  const taregetKaruta = document.getElementById(currentKaruta.id);
  taregetKaruta.border = 10;
}

window.drawNextKaruta = () => {
  disableDraw = true;
  toggleBtn();
  const drawnKaruta = data.pop()
  questionText.textContent = drawnKaruta.name_ja;
  currentKaruta = drawnKaruta;
  if (data.length == 0) {
    if(wrongCount == 0) {
    alert("素晴らしい！君は高専博士だ！")
    } else if (wrongCount > 1 && wrongCount < 10) {
    alert("すごい！君は高専マニアだ！")
    } else if (wrongCount > 11 && wrongCount < 20) {
    alert("いいね！君は高専人だ！")
    } else {
    alert("お疲れ様。それぞれの高専のことを覚えてくれたかな？")
    }
  }
}

const toggleBtn = () => {
  showHintBtn.disabled = !disableDraw;
  showAnswerBtn.disabled = !disableDraw;
  drawKarutaBtn.disabled = disableDraw;
}

const url = "https://codeforkosen.github.io/kosen-opendata/data/kosen_school_emblem.csv";
const data = await CSV.fetchJSON(url);
const questionText = document.getElementById("question-text");
const wrongCountText = document.getElementById("wrong-count-text");
const showHintBtn = document.getElementById("show-hint-button");
const showAnswerBtn = document.getElementById("show-answer-button");
const drawKarutaBtn = document.getElementById("draw-karuta-button");
let wrongCount = 0;
let currentKaruta;
let disableDraw = true;
shuffle(data);

for (const d of data) {
  const img = new Image();
  img.id=d.id
  img.src = d.img_emblem;
  main.appendChild(img);
  img.onclick = (event) => {
    alert(`${d.name_ja}\n${d.name_en}\n\n校章の由来:\n${d.origin_emblem_text}\n出典:${d.origin_emblem_url}`);
    if (currentKaruta.id == event.target.id) {
      alert('正解です');
      event.target.remove();
      disableDraw = false;
      toggleBtn();
    } else {
      alert('御手付きです');
      wrongCount ++;
      wrongCountText.textContent = wrongCount;
    }
  }
}

shuffle(data);
drawNextKaruta();

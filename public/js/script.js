'use strict';
const socket = io();
var response;

const chatLogs = document.querySelector('.chatlogs');
//const outputBot = document.querySelector('.chatright');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  const textResult = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  if (e.results[0].isFinal) {
    const divHuman = document.createElement('div');
    divHuman.className = "chat friend";
    divHuman.innerHTML = `<img src=\'/images/user.png\'><p class=\'chat-message\'>${textResult}</p>`;
    chatLogs.appendChild(divHuman); }

 // outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);
  response = 0;
  socket.emit('chat message', text);
});

function send(text) {
  const divHuman = document.createElement('div');
    divHuman.className = "chat friend";
    divHuman.innerHTML = `<img src=\'/images/user.png\'><p class=\'chat-message\'>${text}</p>`;
    chatLogs.appendChild(divHuman);
    response = 1;
  socket.emit('chat message', text);
}

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  //outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  if(response ==0){
  synth.speak(utterance);}
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);
  if(replyText == '') replyText = '(No answer...)';


/*
<div class="chat friend right" id = "bot">
<p class="chat-message"><em class="output-bot"></em></p>
<div class="user-photo"><img src="images/bot1.jpg"></div> */


  var para = document.createElement("p");
  para.className = "chat-message";    
  para.innerHTML = `${replyText}`;

  const srcImg = document.createElement('img');
  srcImg.src = "/images/bot-icon.png";

  const divUserPhotoContainer = document.createElement('div');
  divUserPhotoContainer.className = "user-photo";
  divUserPhotoContainer.appendChild(srcImg);


  const divBot = document.createElement('div');
  divBot.className = "chat friend right";
  divBot.appendChild(para);
  divBot.appendChild(divUserPhotoContainer);

  chatLogs.appendChild(divBot); 

});

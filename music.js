'use strict';

const result = fetch("https://github.com/Tastuaki/OPED", {
  // method: "GET"
}).then(function(response) {
  return response.text();
}).then(function(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");
  const message = doc.getElementById("message").innerHTML
  return message;
});

// console.log(music_list)
// console.log(music_list.text())
const music = new Audio('https://github.com/Tastuaki/OPED/blob/main/C%C2%B3%20-%E3%82%B7%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96-%20OP1(Endless%20Story).mp3?raw=true');
const play = document.getElementById('play');
const mute = document.getElementById('mute');
const loop = document.getElementById('loop');
const volume_index = document.getElementById('volume');
const volume_text = document.getElementById('volume-text');
// 再生ボタン
play.addEventListener('click', function(){
  if(!music.paused){
    play.innerHTML ='<i class="fa-solid fa-play"></i>';
    music.pause();
  }else{
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    music.play();
  }
});

//音量
volume_index.addEventListener('change',function(){
    music.volume = volume_index.value / 100.00;
})

volume_index.addEventListener('input',function(){
    volume_text.innerText = volume_index.value;
})

// 継続再生
var intervalId = setInterval(check_sound, 1000);

function check_sound(){
  console.log(music.ended)
  if(music.ended){
    play.innerHTML ='<i class="fa-solid fa-play"></i>';
    music.src = 'https://raw.githubusercontent.com/Tastuaki/OPED/main/CHAOS%3BHEAD%20ED.mp3';
    music.play();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

// ミュートボタン
mute.addEventListener('click', function(){
  if(music.muted){
    music.muted = false;
    mute.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }else{
    music.muted = true;
    mute.innerHTML = '<i class="fa-solid fa-volume"></i>';
  }
});

//ループ再生
loop.addEventListener('click', function(){
  if(music.loop){
    music.loop = false;
    loop.innerHTML = '<i class="fa-solid fa-repeat"></i>';
  }else{
    music.loop = true;
    loop.innerHTML = '<i class="fa-solid fa-rotate"></i>';
  }
});
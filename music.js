'use strict';

var buf = [""]
const file = new File(buf,"https://github.com/Tastuaki/OPED/blob/main/%2Btitle.txt");
const reader = new FileReader();
reader.onload = function () {
	console.log(reader.result);
}
reader.readAsText(file);
fname = reader.result
console.log(fname[0])

const music = new Audio('https://github.com/Tastuaki/OPED/blob/main/C%C2%B3%20-%E3%82%B7%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96-%20OP1(Endless%20Story).mp3?raw=true');

const title = document.getElementById('title');
const play = document.getElementById('play');
const mute = document.getElementById('mute');
const loop = document.getElementById('loop');
const volume_index = document.getElementById('volume');
const volume_text = document.getElementById('volume-text');
// 再生ボタン
play.addEventListener('click', function(){
  if(!music.paused){
    play.innerHTML ='<i class="fas fa-play"></i>';
    music.pause();
  }else{
    play.innerHTML = '<i class="fas fa-pause"></i>';
    music.play();
    title.innerHTML = '<i class="fas fa-music"></i>'+" "
  }
});


// 継続再生
var intervalId = setInterval(check_sound, 1000);

function check_sound(){
  console.log(music.ended)
  if(music.ended){
    play.innerHTML ='<i class="fas fa-play"></i>';
    music.src = 'https://raw.githubusercontent.com/Tastuaki/OPED/main/CHAOS%3BHEAD%20ED.mp3';
    music.play();
    play.innerHTML = '<i class="fas fa-pause"></i>';
    title.innerHTML = '<i class="fas fa-music"></i>'+" 次の曲"
  }
}

//音量
volume_index.addEventListener('change',function(){
    music.volume = volume_index.value / 100.00;
})
volume_index.addEventListener('input',function(){
    volume_text.innerText = volume_index.value;
})
window.addEventListener("beforeunload",function(){
    volume_index.value = 20;
})

// ミュートボタン
mute.addEventListener('click', function(){
  if(music.muted){
    music.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }else{
    music.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});

//ループ再生
loop.addEventListener('click', function(){
  if(music.loop){
    music.loop = false;
    loop.innerHTML = '<i class="fas fa-sync"></i>';
  }else{
    music.loop = true;
    loop.innerHTML = '<i class="fas fa-stop"></i>';
  }
});
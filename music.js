'use strict';

async function get_music_list(url="https://github.com/Tastuaki/OPED"){
    const res = await fetch(url,{
      credentials: 'same-origin'
    }).then((data) => consol.log(data))
    return res.json();
}
// console.log(music_list)
// console.log(music_list.text())
const music = new Audio('https://github.com/Tastuaki/OPED/blob/main/C%C2%B3%20-%E3%82%B7%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%BC%E3%83%96-%20OP1(Endless%20Story).mp3?raw=true');
const play = document.getElementById('play');
const volumeUp = document.getElementById('volume-up');
const volumeDown = document.getElementById('volume-down');
const mute = document.getElementById('mute');
const volume_index = document.getElementById('volume');
const volume_text = document.getElementById('volume-text');
// 再生ボタン
play.addEventListener('click', function(){
  if(!music.paused){
    play.innerHTML ="再生";
    music.pause();
  }else{
    play.innerHTML = "停止";
    music.play();
  }
});

// 音量ボタン
volumeUp.addEventListener('click', function(){
  const volume = music.volume;
  if(volume < 1){
    music.volume = (volume * 10 + 1) / 10;
    volume_text.innerText = music.volume;
  }
});
volumeDown.addEventListener('click', function(){
  const volume = music.volume;
  if(volume > 0){
    music.volume = (volume * 10 - 1) / 10;
    volume_text.innerText = music.volume;
  }
});

volume_index.addEventListener('change',function(){
    music.volume = volume_index.value;
    volume_text.innerText = music.volume;
})

volume_index.addEventListener('input',function(){
    volume_text.innerText = volume_index.value;
})

// ミュートボタン
mute.addEventListener('click', function(){
  if(music.muted){
    music.muted = false;
    mute.innerHTML = '<i class="fas fa-volume-mute">';
  }else{
    music.muted = true;
    mute.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});
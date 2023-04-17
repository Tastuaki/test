'use strict';

//リスト取得
var fname = [""];
var data = [""];
var titletext = [""];
var cnt = 0;
var mcnt = 0;
const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/Tastuaki/OPED/main/%2Btitle.txt');
xhr.send();
xhr.onreadystatechange = function() {
  if( xhr.readyState === 4 && xhr.status === 200) {
    data = this.responseText;

    let i = 0;
    let n = 0;
    var l = data.length;
    while(true){
      fname[n] += data[i];
      if(fname[n].includes("\n")){
        fname[n] = fname[n].replace("undefined","");
        fname[n] = fname[n].slice(0,-1);
        titletext[n] = fname[n];
        fname[n] = encodeURI(fname[n]);
        n += 1;
      }
      i += 1;
      if(i == l){
        break;
      }
    }
  }
}

// function fname(){
//   let i = 0;
//   var l = fname[0].length;
//   while(true){
//     fname += data[i];
//     if(fname.includes("\n")){
//       fname.replace("\n","");
//       console.log(fname);
//       return fname;
//     }
//     i += 1;
//   }
// }

const music = new Audio('https://github.com/Tastuaki/OPED/blob/main/'+fname[cnt]+'?raw=true');
const title = document.getElementById('title');
const play = document.getElementById('play');
const mute = document.getElementById('mute');
const loop = document.getElementById('loop');
const before = document.getElementById('before');
const after = document.getElementById('after');
const volume_index = document.getElementById('volume');
const volume_text = document.getElementById('volume-text');

function play_music(){
  // play.innerHTML ='<i class="fas fa-play"></i>';
  music.src = 'https://github.com/Tastuaki/OPED/blob/main/'+fname[cnt]+'?raw=true';
  console.log(music.src+"\n"+titletext[cnt]);
  music.play();
  play.innerHTML = '<i class="fas fa-pause"></i>';
  title.innerHTML = '<i class="fas fa-music"></i>　'+ titletext[cnt];
}

// 再生ボタン
play.addEventListener('click', function(){
  if(!music.paused){
    play.innerHTML ='<i class="fas fa-play"></i>';
    music.pause();
  }else{
    play_music();
  }
});


// 継続再生
var intervalId = setInterval(check_sound, 1000);

function check_sound(){
  console.log(music.ended)
  if(music.ended){
    cnt += 1;
    play_music();
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

// 曲選択
function next(){
  cnt -= 1;
  console.log(cnt);
  console.log(mcnt);
  if(cnt < 0){
    mcnt = cnt;
    cnt = fname.length + cnt;
  }else{
    mcnt = 0;
  }
  music.pause();
  play_music();
  if(mcnt != 0){
    cnt = mcnt;
  }
}
function prev(){
  cnt += 1;
  console.log(cnt);
  console.log(mcnt);
  if(cnt > fname.length){
    cnt = 0;
  }else if(cnt < 0){
    mcnt = cnt;
    cnt = fname.length + cnt;
  }
  music.pause();
  play_music();
  if(mcnt != 0){
    cnt = mcnt;
  }
}
before.addEventListener('mousedown',function(){
  next();
})
after.addEventListener('mousedown',function(){
  prev();
})
before.addEventListener('touchstart',function(){
  next();
})
after.addEventListener('touchstart',function(){
  prev();
})
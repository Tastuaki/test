'use strict';

//リスト取得
var fname = [""];
var data = [""];
var titletext = [""];
var animetitle = [""];
var musictitle = [""];
var btext = [".mp3","：","／"];
var ctext = ["",":","/"];
var cnt = 0;
var mcnt = 0;
const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/Tastuaki/OPED/main/%2Btitle.txt');
xhr.send();
xhr.onreadystatechange = function() {
  if( xhr.readyState === 4 && xhr.status === 200) {
    data = this.responseText;

    let i = 0;
    let j = 0;
    let n = 0;
    var sig = 0;
    var dsig = 0;
    var l = data.length;
    while(true){
      fname[n] += data[i];
      if(fname[n].includes("\n")){
        fname[n] = fname[n].replace("undefined","");
        fname[n] = fname[n].slice(0,-1);
        titletext[n] = fname[n]
        for(j=0; j < btext.length; j++){
          while (titletext[n].includes(btext[j])){
            titletext[n] = titletext[n].replace(btext[j],ctext[j]);
          }
        }
        dsig = titletext[n].lastIndexOf("))")
        sig = titletext[n].lastIndexOf("(")
        if(dsig != -1){
          dsig = sig
          sig = titletext[n].slice(0,sig).lastIndexOf("(")
          if(sig == -1){
            sig = dsig
          }
        }

        if(sig != -1){
          musictitle[n] = titletext[n].slice(sig+1,-1)
          animetitle[n] = titletext[n].slice(0,sig)
        }else{
          musictitle[n] = titletext[n]
          animetitle[n] = titletext[n]
        }
        fname[n] = encodeURI(fname[n]);
        n += 1;
      }
      i += 1;
      if(i == l){
        const mlist =  document.getElementById('mlist');
        for(i=0;i < titletext.length;i++){
          var li = document.createElement('li');
          li.innerHTML = '<button id="smusic" value="'+ i + '" onclick="list_select('+ i +')"><label class="tt">' + musictitle[i] + '</label><label class="tt">' + animetitle[i] + '</label></button>';
          mlist.appendChild(li);
        }
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
var ls = 0;
var so = false;

const music = new Audio('https://github.com/Tastuaki/OPED/blob/main/'+fname[cnt]+'?raw=true');
const title = document.getElementById('title');
const anime = document.getElementById('anime');
const play = document.getElementById('play');
const mute = document.getElementById('mute');
const loop = document.getElementById('loop');
const rec = document.getElementById('rec');
const before = document.getElementById('before');
const after = document.getElementById('after');
const volume_index = document.getElementById('volume');
const volume_text = document.getElementById('volume-text');
const ser = document.getElementById('search');
const ser_on = document.getElementById('search_on');
const test = document.getElementById('test');

function play_music(){
  var src ='https://github.com/Tastuaki/OPED/blob/main/'+fname[cnt]+'?raw=true';
  // play.innerHTML ='<i class="fas fa-play"></i>';
  if(music.src != src){
    music.src = src;
    music.loop = false;
    loop.innerHTML = '<i class="fas fa-sync"></i>';
  }
  console.log(music.src+"\n"+titletext[cnt]);
  music.play();
  play.innerHTML = '<i class="fas fa-pause"></i>';
  title.innerHTML = '<i class="fas fa-music"></i>　'+ musictitle[cnt];
  anime.innerHTML = animetitle[cnt];
}

// 再生ボタン
function ply(){
  if(!music.paused){
    play.innerHTML ='<i class="fas fa-play"></i>';
    music.pause();
  }else{
    play_music();
  }
}
play.addEventListener('click', function(){
  ply();
});

// 継続再生
var intervalId = setInterval(check_sound, 1000);

function check_sound(){
  console.log(music.ended)
  if(music.ended){
    if(ls == 0){
      cnt += 1;
      if(cnt > fname.length){
        cnt = 0;
      }
    }else{
      cnt -= 1;
      if(cnt < 0){
        mcnt = cnt;
        cnt = fname.length + cnt;
      }else{
        mcnt = 0;
      }
    }
    play_music();
    if(mcnt < 0){
      cnt = mcnt;
    }
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

// 逆順再生
rec.addEventListener('click', function(){
  if(ls == 0){
    ls = 1;
    rec.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>';
  }else{
    ls = 0;
    rec.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
  }
});

// 曲選択
function prev(){
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
  if(mcnt < 0){
    cnt = mcnt;
  }
}
function next(){
  cnt += 1;
  console.log(cnt);
  console.log(mcnt);
  if(cnt > fname.length){
    cnt = 0;
  }else if(cnt < 0){
    mcnt = cnt;
    cnt = fname.length + cnt;
  }else{
    mcnt = 0;
  }
  music.pause();
  play_music();
  if(mcnt < 0){
    cnt = mcnt;
  }
}
before.addEventListener('mousedown',function(){
  prev();
})
after.addEventListener('mousedown',function(){
  next();
})
before.addEventListener('touchstart',function(){
  prev();
})
after.addEventListener('touchstart',function(){
  next();
})

// リスト選択
function list_select(num) {
  console.log(num);
  cnt = num;
  play_music();
}

// 曲検索
ser_on.addEventListener('click', function(){
  if(!so){
    so = false 
    test.innerText = "ser_on"
    ser.innerHTML = '<input id="keyword" type="search" name="search" placeholder="曲名検索"><br><button id="search_on" class=""></button>';
    document.getElementById('keyword').addEventListener('keyup',function (e) {
      search(document.getElementById('keyword').value)
    })
  }else{
    so = true
    test.innerText = "ser_off"
    ser.innerHTML = '<button id="search_on" class=""></button>';
  }
})
function search(key){
  test.innerText = key
}

//キーボード入力
document.addEventListener('keydown', keydown_ivent);

function keydown_ivent(e) {
  switch (e.key) {
    case 'Enter':
      ply();
      break;
    //曲選択
    case 'ArrowLeft':
      prev();
      setTimeout(800);
      break;
    case 'ArrowRight':
      next();
      setTimeout(800);
      break;
  }
}
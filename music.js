'use strict';

//リスト取得
var fname = [""];
var titletext = [""];
var animetitle = [""];
var musictitle = [""];
var btext = [".mp3","：","／"];
var ctext = ["",":","/"];
var lname = [""]
var pastfname = [""]
var pastanime = [""];
var pastmusic = [""];
var p_title = [""]
pastfname.length = 0
var cnt = 0;
var mcnt = 0;
var lsig = 0;
var pl = 0;

function get_index(){
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://raw.githubusercontent.com/Tastuaki/OPED/main/p/list');
  xhr.send();
  let i = 0;
  let n = 0;
  var listtext = [""]
  xhr.onreadystatechange = function() {
    if( xhr.readyState === 4 && xhr.status === 200) {
      listtext = this.responseText;
      var ll = listtext.length
      while(true){
        lname[n] += listtext[i];
        if(lname[n].includes("\n")){
          lname[n] = lname[n].replace("undefined","");
          lname[n] = lname[n].slice(0,-1);
          lname[n] = encodeURI(lname[n])
          n += 1
        }
        i += 1
        if(i == ll){
          get_list(0)
          break
        }
      }
    }
  }
}

function get_list(c){
  let url = ""
  lsig = c
  var xhr = new XMLHttpRequest();

  url = 'https://raw.githubusercontent.com/Tastuaki/OPED/main/p/' + lname[c]
  xhr.open('get', url);
  xhr.send();
  xhr.onreadystatechange = function() {
    var data = [""];
    if( xhr.readyState === 4 && xhr.status === 200) {
      data = this.responseText;

      let i = 0;
      let j = 0;
      let n = 0;
      var sig = 0;
      var dsig = 0;
      var l = data.length;
      fname.length = 0
      titletext.length = 0
      animetitle.length = 0
      musictitle.length = 0
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

          if(c == 2){
            animetitle[n] = titletext[n].slice(sig+1,-1)
            musictitle[n] = titletext[n].slice(0,sig)
            musictitle[n] = musictitle[n].replace("v/","");
          }else if(sig != -1){
            musictitle[n] = titletext[n].slice(sig+1,-1)
            animetitle[n] = titletext[n].slice(0,sig)
          }else{
            musictitle[n] = titletext[n]
            animetitle[n] = ""
          }
          fname[n] = encodeURI(fname[n]);
          n += 1;
        }
        i += 1;
        if(i == l){
          const mlist =  document.getElementById('mlist');
          make_list(-1)
          break;
        }
      }
    }
  }
}

function make_list(sig){
  let i = 0;
  if(sig == -1){
    mlist.innerHTML = "";
    for(;i < fname.length;i++){
      var li = document.createElement('li');
      li.innerHTML = '<button class="smusic" id="smusic_'+ i +'" value="'+ i + '" onclick="list_select('+ i +')"><label class="tt">' + musictitle[i] + '</label><label class="tt">' + animetitle[i] + '</label></button>';
      mlist.appendChild(li);
    }
  }else{
    var li = document.createElement('li');
    li.innerHTML = '<button class="smusic" value="'+ sig + '" onclick="list_select('+ sig +')"><label class="tt">' + musictitle[sig] + '</label><label class="tt">' + animetitle[sig] + '</label></button>';
    mlist.appendChild(li);
  }
}

const test = document.getElementById('test');
get_index()
var ls = false;
var ra = false;
var so = false;
var hheader = document.getElementById("control").getBoundingClientRect().bottom

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
const ser = document.getElementById('search');
const ran = document.getElementById('rand');
const list = document.getElementById('on_list');
const lists = document.getElementById('lists')
const but = document.getElementById('buttons')

function slide_list(b,list,data){
  let i = 0
  if(b > 0){
    i = b
  }
  for(;i < list.length-1;i++){
    list[i] = list[i+1]
  }
  list[list.length-1] = data
  return list
}

function play_music(){
  let same = false
  console.log(cnt)
  var src ='https://github.com/Tastuaki/OPED/raw/main/'+fname[cnt];
  // play.innerHTML ='<i class="fas fa-play"></i>';
  if(music.src != src){
    music.src = src;
    music.loop = false;
    loop.innerHTML = '<i class="fas fa-sync"></i>';
    // autoscroll()
  }
  console.log(music.src+"\n"+titletext[cnt]);
  music.play();
  play.innerHTML = '<i class="fas fa-pause"></i>';
  title.innerHTML = '<i class="fas fa-music"></i>　'+ musictitle[cnt];
  anime.innerHTML = animetitle[cnt];
  if(animetitle[cnt] == ""){
    document.title = musictitle[cnt] + " - PLAYER"
  }else{
    document.title = musictitle[cnt] + " - " + animetitle[cnt] + " - PLAYER"
  }
  
  pl = pastfname.length
  let i = 0
  for(;i < pl;i++){
    if(pastfname[i] == fname[cnt]){
      same = true
      slide_list(i,pastfname,fname[cnt])
      slide_list(i,pastanime,animetitle[cnt])
      slide_list(i,pastmusic,musictitle[cnt])
      break
    }
  }
  if(!same){
    if(pl > 29){
      slide_list(0,pastfname,fname[cnt])
      slide_list(0,pastanime,animetitle[cnt])
      slide_list(0,pastmusic,musictitle[cnt])
    }else if(pastfname.length == 0){
      pastfname[0] = fname[cnt]
      pastanime[0] = animetitle[cnt]
      pastmusic[0] = musictitle[cnt]
    }else{
      pastfname.push(fname[cnt])
      pastanime.push(animetitle[cnt])
      pastmusic.push(musictitle[cnt])
    }
  }
}

function past_list(){
  let max = 0
  let i = 0
  lsig = -1
  base()
  but.style.display = "none"
  fname.length = 0
  titletext.length = 0
  animetitle.length = 0
  musictitle.length = 0
  if(pastfname.length != 0){
    for(i = pastfname.length - 1;i > -1;i--){
        var li = document.createElement('li');
        li.innerHTML = '<button class="smusic" value="'+ i + '" onclick="list_select('+ i +')"><label class="tt">' + pastmusic[i] + '</label><label class="tt">' + pastanime[i] + '</label></button>';
        mlist.appendChild(li);
        fname[i] = pastfname[i]
        animetitle[i] = pastanime[i]
        musictitle[i] = pastmusic[i]
    }
  }else{
    mlist.innerHTML = '<h2 class="white_text">NO MUSIC!</h2>'
  }
  xlist()
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
  if(music.ended && lsig != -1){
    if(ra){
      var ocnt = cnt
      while(ocnt == cnt){
        cnt = Math.floor( Math.random() * ((fname.length - 1) + 1 - 0) ) + 0
      }
    }else if(!ls){
      cnt += 1;
      if(cnt > fname.length - 1){
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
  document.getElementById('volume-text').innerText = volume_index.value;
})
window.addEventListener("beforeunload",function(){
    volume_index.value = 20;
    window.scrollTo({ top : 0,behavior: 'smooth'});
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
  if(!ls){
    ls = true;
    rec.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>';
  }else{
    ls = false;
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
  cnt = num;
  play_music();
}

// 曲検索
document.getElementById('search_on').addEventListener('click', function(){
  let checkValue = 1
  if(!so){
    so = true
    ser.innerHTML = '<input id="keyword" type="search" name="search" placeholder="検索したいワードをいれてください" style="width:100%;"><br><label class="white_text"><input type="radio" name="list_select" value="0">全検索</label><label class="white_text"><input type="radio" name="list_select" value="1" checked>作品名検索</label><label class="white_text"><input type="radio" name="list_select" value="2">曲名検索</label>';
    for(let target of document.querySelectorAll(`input[type='radio'][name='list_select']`)){
      target.addEventListener('change',function (e) {
        checkValue = Number(target.value)
        search_list(checkValue)
      })
    }
    document.getElementById('keyword').addEventListener('keyup',function (e) {
      window.scrollTo({ top : 0,behavior: 'smooth'});
      search_list(checkValue)
    })
  }else{
    so = false
    ser.innerHTML = '';
    make_list(-1)
  }
})

function search_list(checkValue){
  mlist.innerHTML = "";
  switch(checkValue){
    case 0: search(document.getElementById('keyword').value,titletext); break
    case 1: search(document.getElementById('keyword').value,animetitle); break
    case 2: search(document.getElementById('keyword').value,musictitle); break
    default: break
  }
}

function search(key,list){
  let fi = false
  let k = 0
  let max = 0
  let i = 0
  let sig = -1
  var sigs = []
  var d_titles = []
  if(key != ""){
    for(k=0;k < list.length;k++){
      sig = list[k].indexOf(key)
      if(sig != -1){
        sigs.push(sig)
        d_titles.push(k)
        fi = true
      }
    }
    if(!fi){
      mlist.innerHTML = '<h2 class="white_text">NO MUSIC!</h2>'
    }else{
      max = Math.max.apply(null,sigs);
      for(let j = 0;j <= max;j++){
        for(i = 0;i < sigs.length;i++){
          if(sigs[i] == j){
            make_list(d_titles[i])
          }
        }
      }
    }
  }else{
    make_list(-1)
    autoscroll()
  }
}

// リスト変更
list.addEventListener('click', function(){
  document.getElementById('full').style.display = "flex"
  document.getElementById('full').style.top = window.pageYOffset + "px"
  document.getElementById('body').style.overflow = "visible hidden"
  var li = document.createElement('li');
  li.innerHTML = '<button class="smusic" onclick="past_list()">履歴</button>';
  for(let i = 0;i < lname.length;i++){
    li.innerHTML += '<button class="smusic" id="list_'+ i +'" value="'+ i + '" onclick="clist('+ i +')">'+ lname[i] +'</button>';
  }
  lists.appendChild(li);
});

function xlist(){
  document.getElementById('full').style.display = "none"
  document.getElementById('body').style.overflow = "visible visible"
  lists.innerHTML = ""
}

function clist(csig){
  if(lsig != csig){
    lsig = csig
    but.style.display = "block"
    base()
    get_list(csig)
    xlist()
  }
}

function base(){
  mlist.innerHTML = "";
  ls = false;
  rec.innerHTML = '<i class="fas fa-long-arrow-alt-left"></i>';
  ra = false;
  rand.innerHTML = '<i class="fas fa-random"></i>'
  so = false;
  music.pause();
  play.innerHTML ='<i class="fas fa-play"></i>';
  title.innerHTML = '<i class="fas fa-music"></i>';
  anime.innerHTML = '';
  document.title = "PLAYER"
  cnt = 0
}

// 自動スクロール
var targetPosition = 0
var onum = -1
function autoscroll(){
  var num = 0
  if(onum == cnt){
    return
  }else if(cnt != 0){
    num = cnt - 1
  }
  var targetbase = document.getElementById("smusic_" + num).getBoundingClientRect().top
  // test.textContent += targetbase + ":" + hheader + " "
  if(targetbase != hheader){
    var nowp = window.pageYOffset
    if(targetbase > nowp){
      targetPosition = targetbase - (hheader + nowp);
    }else{
      targetPosition = targetbase - (hheader - nowp);
    }
    window.scrollTo({ top : targetPosition ,behavior: 'smooth'});
  }
  onum = cnt
}

// ランダム
rand.addEventListener('click', () => {console.log("aaaaaa");
  rand_play()
})

function rand_play(){
  if(!ra){
    ra = true
    let bm = false
    let i = 0
    if(fname.length != 1){
      while(!bm){
        cnt = Math.floor( Math.random() * fname.length )
        if(cnt < 0){
          cnt = 0
        }
        if(pl != 0){
          for(;i < pl;i++){
            if(pastfname[i] == fname[cnt]){
              bm = false
              break
            }else{
              bm = true
            }
          }
        }else{
          bm = true
        }
      }
    }
    rand.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
    ls = false
    play_music()
  }else{
    ra = false
    rand.innerHTML = '<i class="fas fa-random"></i>'
  }
}

//キーボード入力
document.addEventListener('keydown', keydown_ivent);

function keydown_ivent(e) {
  if(!so){
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
      // case "r":
      //   if(e.ctrlKey){
      //     rand_play();
      //   }
      //   break;
    }
  }
}
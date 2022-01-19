

var spe=250;
var timer=null;
var index=0;
var text="";

window.onload=function(){
    able(true);
    var animation=document.getElementById("Animation");
    animation.onchange=aniChange;
    var size=document.getElementById("size");
    size.onchange=sizeChange;
    var start=document.getElementById("start");
    start.onclick=clickStart;
    var stop=document.getElementById("stop");
    stop.onclick=clickStop;
    stop.disabled=true;
    var speed=document.getElementById("speed");
    speed.onchange=speedChange;
    
};
function speedChange(){
    
    if(this.checked){
        spe =50;
    }
    else{
        spe= 250;
    }
}
function able(flag){
    var stop=document.getElementById("stop");
    stop.disabled=flag;
    var start=document.getElementById("start");
    start.disabled=!flag;
    var animation=document.getElementById("Animation");
    animation.disabled=!flag;
}
function clickStart(){
    var animation=document.getElementById("Animation");
    var contents=ANIMATIONS[animation.value];
    var box=document.getElementById("box");
    text=box.value;
    var arr=contents.split("=====\n");
    var i=0;
    var len=arr.length;
    able(false);
    timer=setInterval(frames,spe,arr,len);
}
function clickStop()
{
    var box=document.getElementById("box");
    box.value=text;
    text="";
    clearInterval(timer);
    timer=null;
    index=0;
    able(true);
}
function frames(arr,len){
    //alert(arr);
    //alert(index);
    var box=document.getElementById("box");
    box.value=arr[(index%len)];
    index++;
// alert(index);
    
}

function aniChange(){
    var animation=document.getElementById("Animation");
    // alert(animation.value);
    var box=document.getElementById("box");
    box.value=ANIMATIONS[animation.value];
//$("box").value=
    
}
function sizeChange(){
    var size=document.getElementById("size");
    // alert(animation.value);
    var box=document.getElementById("box");
    box.style.fontSize=size.value;    
}


var f = function style_adjust() {
   window.onresize = function (){
       var content = document.getElementById("content-div");
       content.style.height = (window.innerHeight - 80) + "px";
   } 
};

f();



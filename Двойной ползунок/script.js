var inputsRy = {
   sliderWidth: 212,
   minRange: 1, // Минимальное значение цены 
   maxRange: 20000, // Максимальная цена 
   outputWidth: 30, // output ширина
   thumbWidth: 10, // thumb ширина
   trackHeight: 1, // толщина линии 
   theValue: [7000, 13685] // theValue[0] < theValue[1] //Автоматическое отображение диапозона цены
};
var isDragging0 = false;
var isDragging1 = false;

var range = inputsRy.maxRange - inputsRy.minRange; // диапозон от минимальной до максимальной цены (19 999р.)
var rangeK = inputsRy.sliderWidth / range; //Ширина контейнера деленая на общий диапозон 0,01
var container = document.querySelector(".container"); // Общий див  со шкалой


// styles
var slider = document.querySelector(".slider");// Элемент с общей шкалой
slider.style.paddingLeft = (inputsRy.theValue[0] - inputsRy.minRange) * rangeK + "px"; // Паддинг слева серго слайдера, зависит от значения ползунка левого

// slider.style.paddingRight = inputsRy.sliderWidth - inputsRy.theValue[1] * rangeK + "px"; // Паддинг справа, зависит от значения ползунка правого

var track = document.querySelector(".track"); //Черный заполненный диапозон
track.style.width = inputsRy.theValue[1] * rangeK - inputsRy.theValue[0] * rangeK + "px"; // Ширина черного диапозона, в зависимости от выбранного значения ползунков



var thumbs = document.querySelectorAll(".thumb"); // Элементы ползунки
for (var i = 0; i < thumbs.length; i++) {

   // thumbs[i].style.width = thumbs[i].style.height = inputsRy.thumbWidth + "px";
   console.log(inputsRy.thumbWidth + "px");
   // thumbs[i].style.borderWidth = inputsRy.thumbBorderWidth + "px";                                                          
   // thumbs[i].style.top = -(inputsRy.thumbWidth / 2 //+ inputsRy.thumbBorderWidth 
   //    - inputsRy.trackHeight / 2) + "px";        
   thumbs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - (inputsRy.thumbWidth / 2) + "px";  // Перемещение ползунков          

}
var outputs = document.querySelectorAll(".output");
var outs = document.querySelectorAll(".out"); //инпуты со значениями
for (var i = 0; i < outs.length; i++) {
   // outputs[i].style.width = outputs[i].style.height = outputs[i].style.lineHeight = outputs[i].style.left  + "px";
   // outputs[i].style.top = -(Math.sqrt(2 * inputsRy.outputWidth * inputsRy.outputWidth) + inputsRy.thumbWidth / 2 - inputsRy.trackHeight / 2) + "px";
   // outputs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
   // outputs[i].innerHTML = "<p>" + inputsRy.theValue[i] + "</p>";
   outs[i].value = inputsRy.theValue[i];
}

//events

thumbs[0].addEventListener("mousedown", function (evt) {
   isDragging0 = true;
}, false);
thumbs[1].addEventListener("mousedown", function (evt) {
   isDragging1 = true;
}, false);
container.addEventListener("mouseup", function (evt) {
   isDragging0 = false;
   isDragging1 = false;
}, false);
container.addEventListener("mouseout", function (evt) {
   isDragging0 = false;
   isDragging1 = false;
}, false);

container.addEventListener("mousemove", function (evt) {
   var mousePos = oMousePos(this, evt);
   var theValue0 = (isDragging0) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[0];
   var theValue1 = (isDragging1) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[1];

   if (isDragging0) {

      if (theValue0 < theValue1 - (inputsRy.thumbWidth / 2) &&
         theValue0 >= inputsRy.minRange) {
         inputsRy.theValue[0] = theValue0;
         thumbs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - (inputsRy.thumbWidth / 2) + "px";
         // outputs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
         outs[0].value = theValue0;
         slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK + "px";
         track.style.width = (theValue1 - theValue0) * rangeK + "px";

      }
   } else if (isDragging1) {

      if (theValue1 > theValue0 + (inputsRy.thumbWidth / 2) &&
         theValue1 <= inputsRy.maxRange) {
         inputsRy.theValue[1] = theValue1;
         thumbs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - (inputsRy.thumbWidth / 2) + "px";
         // outputs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
         outs[1].value = theValue1 ;
         slider.style.paddingRight = (inputsRy.maxRange - theValue1) * rangeK + "px";
         track.style.width = (theValue1 - theValue0) * rangeK + "px";

      }
   }

}, false);

// helpers

function oMousePos(elmt, evt) {
   var ClientRect = elmt.getBoundingClientRect();
   return { //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
   }
}
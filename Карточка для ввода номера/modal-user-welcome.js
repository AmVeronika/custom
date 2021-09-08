
function setCursorPosition(pos, e) {
   e.focus();
   if (e.setSelectionRange) e.setSelectionRange(pos, pos)//устанавливает начальное и конечное положение выделения текста в элементе <input>
   else if (e.createTextRange) {
      let range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
   }
}

function mask(e) {
   //console.log('mask',e);
   let matrix = this.placeholder,// .defaultValue
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
   def.length >= val.length && (val = def);
   matrix = matrix.replace(/[_\d]/g, function (a) {
      return val.charAt(i++) || "_"
   });
   this.value = matrix;
   i = matrix.lastIndexOf(val.substr(-1));
   i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
   setCursorPosition(i, this)
}
window.addEventListener("DOMContentLoaded", function () {
   var inputPphone = document.querySelector("#online_phone");
   inputPphone.addEventListener("input", mask, false);
   setCursorPosition(3, inputPphone);
   inputPphone.focus();
});
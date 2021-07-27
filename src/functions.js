const inputbox = document.getElementById("inputbox");
const upbutton = document.getElementById("up");
const downbutton = document.getElementById("down");

let count = 200;
inputbox.value = count;

function countUp() {
  checkValue(++count);
  if (count > 300) return;
  inputbox.value = count;
}
function countDown() {
  checkValue(--count);
  if (count < 100) return;
  inputbox.value = count;
}
function clearValue() {
  const temp = inputbox.value.split("");
  const result = temp.map(function(num) {
    if (isNaN(num)) return "";
    else return num;
  });

  count = result.join("");
  checkValue(count);
}
function checkValue(num) {
  if(num >= 300) {
    count = 300;
    inputbox.value = count;
    addDisabled(upbutton);
  }
  else if(num <= 100) {
    count = 100;
    inputbox.value = count;
    addDisabled(downbutton);
  }
  else {
    removeDisabled(upbutton);
    removeDisabled(downbutton);
  }
}
function addDisabled(button) {
  button.disabled = true;
}
function removeDisabled(button) {
  button.disabled = false;
}

let flag = -1;
upbutton.addEventListener('mousedown', function(){
  if(flag == -1) {
    flag = setInterval(countUp, 100);
  }
});
downbutton.addEventListener('mousedown', function(){
  if(flag == -1) {
    flag = setInterval(countDown, 100);
  }
});
upbutton.addEventListener('mouseup', function(){
  if(flag != -1) {
    clearInterval(flag);
    flag = -1;
  }
});
downbutton.addEventListener('mouseup', function(){
  if(flag != -1) {
    clearInterval(flag);
    flag = -1;
  }
});
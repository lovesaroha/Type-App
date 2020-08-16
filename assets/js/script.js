"use-strict";

/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// Choose theme at random.
const colors = ["#D64163", "#fa625f", "#4874E2"];
const colorsDark = ["#c13b59", "#e15856", "#4168cb"];
const selColor = Math.floor(Math.random() * colors.length);
document.documentElement.style.setProperty('--primary', colors[selColor]);
document.documentElement.style.setProperty('--primary-dark', colorsDark[selColor]);

// All keys defined.
var keys = [
    [65, "A"],
    [66, "B"],
    [67, "C"],
    [68, "D"],
    [69, "E"],
    [70, "F"],
    [71, "G"],
    [72, "H"],
    [73, "I"],
    [74, "J"],
    [75, "K"],
    [76, "L"],
    [77, "M"],
    [78, "N"],
    [79, "O"],
    [80, "P"],
    [81, "Q"],
    [82, "R"],
    [83, "S"],
    [84, "T"],
    [85, "U"],
    [86, "V"],
    [87, "W"],
    [88, "X"],
    [89, "Y"],
    [90, "Z"],
    [32, "Space"],
    [8, "Delete"],
    [13, "Enter"],
    [20, "Caps"]
];
var pressed = [];
var phcap = false;
let words = 0;
let seconds = 1;

// Key press event.
function key_press(key, code, value) {
    if (!key.classList.contains("press") && code != 20) {
        key.classList.add("press");
        setTimeout(function () {
            key.classList.remove('press');
        }, 500);
    }
    let caps = document.querySelector(`div[data-key="20"]`);
    if (code == 20) {
        if (caps.classList.contains('press') && !phcap) {
            key.classList.remove('press');
        } else {
            key.classList.add('press');
        }
        return;
    }
    if (!caps.classList.contains('press')) {
        value = value.toLowerCase();
    } else {
        value = value.toUpperCase();
    }
    if (code > 64) {
        pressed.push(value);
    }
    if (code == 32) {
        if(pressed.length > 0) {
            if (pressed[pressed.length - 1] != "&nbsp;") {
                words++;
                document.getElementById("words_ID").innerText = words;
            }
        }
        pressed.push("&nbsp;");
    }
    if (code == 8) {
        pressed.pop();
    }
    if (code == 13) {
        pressed.push('<br>');
    }
    document.getElementById('pressed_keys').innerHTML = `<h4>${pressed.join('')}<small class="text-muted" style="font-size: 30px;">|</small></h4>`;
}

// Show keys on page.
document.getElementById("keys").innerHTML = keys.map(key => {
    return `<div class="col" data-key="${key[0]}"><h2>${key[1]}</h2></div>`;
}).join('');

// Key down event windows.
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 8) {
        e.preventDefault();
    }
    phcap = e.getModifierState && e.getModifierState('CapsLock');
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    key_press(key, e.keyCode, e.key);
});

// Update key press on click.
let keysel = document.querySelectorAll('.col');
keysel.forEach(key => {
    key.addEventListener('click', function (e) {
        let v = this.lastChild.innerHTML;
        key_press(this, this.dataset.key, v);
    });
});

// Timer function to check speed.
setInterval(function() {
    let wordsPerSecond = words / seconds;
    let minutes = parseInt(seconds / 60);
    let wordsPerMinute = wordsPerSecond * 60;
    if(minutes > 0) {
        wordsPerMinute *= minutes;
    }
    document.getElementById("speed_ID").innerHTML = `${parseInt(wordsPerMinute)} / min`;
    seconds++;
} , 1000);
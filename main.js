
import { MyControls } from './control.js';

let stuffContainer;
let viewControls;

export function init() {

    stuffContainer = document.getElementById('stuffView');

    const width = stuffContainer.offsetWidth;
    const height = stuffContainer.offsetHeight;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    stuffContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    viewControls = new MyControls(canvas);

    console.log("Ready");
}

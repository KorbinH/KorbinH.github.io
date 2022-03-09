const canvas = document.getElementById("canvas");
let gl = canvas.getContext("webgl");

let scene, player = null;

let pressed = {w: false, a: false, s: false, d: false, q: false, e: false};

function main() {
    if (gl === null) {
        alert("Unable to initialize WebGL. That's bad");
        return;
    }

    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    initRenderer(gl);


    player = new Player(0, 10, 0);
    scene = new Scene(gl, 4, 4, [1,0,0,1,1,0,0,1,1,1,0,1,1,1,1,1], [], {r: 1, g: 1, b: 1}, gibProgramInfo());

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "w":
                pressed.w = true;
                break;
            case "a":
                pressed.a = true;
                break;
            case "s":
                pressed.s = true;
                break;
            case "d":
                pressed.d = true;
                break;
            case "q":
                pressed.q = true;
                break;
            case "e":
                pressed.e = true;
                break;

        }
    });

    document.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "w":
                pressed.w = false;
                break;
            case "a":
                pressed.a = false;
                break;
            case "s":
                pressed.s = false;
                break;
            case "d":
                pressed.d = false;
                break;
            case "q":
                pressed.q = false;
                break;
            case "e":
                pressed.e = false;
                break;

        }
    });

    setInterval(gameLoop, 1/60);
}

function gameLoop() {
    clearScreen(gl, {r: 1, g: 0, b: 1});
    render(gl, scene, player);
    if (pressed.w) player.y -= 0.01;
    if (pressed.a) player.x -= 0.01;
    if (pressed.s) player.y += 0.01;
    if (pressed.d) player.x += 0.01;
    if (pressed.q) player.a -= 0.01;
    if (pressed.e) player.a += 0.01;
}

window.onload = main
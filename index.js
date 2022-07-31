
import { GLTFLoader } from './imports/GLTFLoader.js'

var scene = new THREE.Scene();

var light = new THREE.HemisphereLight(0xffaa10, 0x000000, 30);
scene.add(light);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "canvas-model";
document.getElementById("app").appendChild(renderer.domElement);


var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

function updateCamera() {
    camera.position.set(0, 2, 3);
    camera.lookAt(scene.position);
}

updateCamera()
var loader = new GLTFLoader();

var obj = { rotation: {} };
loader.load("./model/scene.gltf", function (gltf) {
    obj = gltf.scene;
    scene.add(gltf.scene);
});



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    updateCamera();
})

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        obj.rotation.x += 0.05
    }
    else if (e.keyCode == '40') {
        // down arrow
        obj.rotation.x -= 0.05
    }
    else if (e.keyCode == '37') {
        moveLeft()
    }
    else if (e.keyCode == '39') {
        moveRight()
    }
}

function moveLeft() {
    obj.rotation.y -= 0.05
}

function moveRight() {
    obj.rotation.y += 0.05
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            moveLeft()
        } else {
            moveRight()
        }
    } else {
        if (yDiff > 0) {
            /* down swipe */
        } else {
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
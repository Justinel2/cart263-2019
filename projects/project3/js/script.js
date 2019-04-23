
/*****************
SURF THE WEB AS
******************/
GenerateBg({ el: 'background' });

"use strict";

$(document).ready(setup);

let introductions = ["I am your new friend. I'm really excited to meet you. Can you hear me?", "Good. Can I get to know you a little bit?", "Perfect. Let's start."];
let transitions = ["Mmm... I see. ", "and ", "Good! ", "So, ", "That's interesting. ", "Wow! I didn't expect that. And ", "Now, I wanna know "];
let $id;
let asked = 0;

let questions = [];
let responses = [];
let wordList = [];
let wordString = "";

let question;

function setup() {

  $.getJSON('data/data.json', getData);
   $('#submit-button').on('click',getID);
}

function getData(data) {
  for (var i = 0; i < data.length; i++) {
        questions.push(data[i]);
    }
}

function getID() {
  // console.log(("#name").val());
  if ($("#name").val() != "" && $("#age").val() != "" && $("#location").val() != "") {
    $id = [$("#name").val(), $("#age").val(), $("#location").val()];
    doIntroduction();
  }
  else {
    console.log("nothing entered");
    }
}

function doIntroduction () {
  if (annyang) {
    annyang.start();
    let i = 0;
    introductions[i] = ("Hello " + $id[0] + ". " + introductions[0]);
    speak(introductions[i]);
    i++;
    var commands = {
    'yes': function() {
      console.log("yes");
      speak(introductions[i]);
      i++
      if (i >= introductions.length){
        console.log("done intro")
        // $.getJSON('data/data.json', doQuestionning);
        doQuestionning();
      }
    }
  };
    // Add our commands to annyang
    annyang.addCommands(commands);
  }
}

function doQuestionning(data) {
  console.log("doQuestionning");
  let i = Math.floor(Math.random() * transitions.length);
  question = questions.splice(Math.random() * questions.length, 1)[0];
  if (asked == 0) {
    speak(question);
  }
  else {
    speak(transitions[i] + "." + question);
  }
  asked++;
  getResponse();
}

function getResponse() {
  annyang.addCallback('result',function(response) {
  var completeResponse = "";
  console.log(response[0]);
  completeResponse += response[0];
  var commands = {
    'done': function() {
      // saveResponse();
      annyang.pause();
      console.log("pause");
      responses.push(completeResponse);
      annyang.start();
      console.log("SAVED: " + responses);
      doQuestionning();
    }
  }
  // Add our commands to annyang
  annyang.addCommands(commands);
  });
}

function speak(text) {
  // annyang.pause();
  responsiveVoice.speak(text,'US English Female', {rate: 1 });
  // annyang.resume();
}



















function GenerateBg(conf) {
  conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 25,
    zCoef: 3,
    lightIntensity: 0.5,
    ambientColor: 0x000000,
    light1Color: 0x979797,
    light2Color: 0x979797,
    light3Color: 0x979797,
    light4Color: 0x979797,
    ...conf };


  let renderer, scene, camera, cameraCtrl;
  let width, height, cx, cy, wWidth, wHeight;
  const TMath = THREE.Math;

  let plane;
  const simplex = new SimplexNoise();

  const mouse = new THREE.Vector2();
  const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mousePosition = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  init();

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el), antialias: true, alpha: true });
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    updateSize();

    window.addEventListener('resize', updateSize, false);

    window.addEventListener( 'wheel', onMouseWheel, false );

    initScene();
    animate();
  }


  function initScene() {
    scene = new THREE.Scene();
    initLights();

    let mat = new THREE.MeshLambertMaterial({ color: 0xFFFF, side: THREE.DoubleSide });
    // let mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
    let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    plane.rotation.x = -Math.PI / 2 - 0.2;
    plane.position.y = -25;
    camera.position.z = 60;
    camera.position.y = 0.000;
  }

  function initLights() {
    const r = 30;
    const y = 10;
    const lightDistance = 500;

    // light = new THREE.AmbientLight(conf.ambientColor);
    // scene.add(light);

    light1 = new THREE.PointLight(conf.light1Color, conf.lightIntensity, lightDistance);
    light1.position.set(0, y, r);
    scene.add(light1);
    light2 = new THREE.PointLight(conf.light2Color, conf.lightIntensity, lightDistance);
    light2.position.set(0, -y, -r);
    scene.add(light2);
    light3 = new THREE.PointLight(conf.light3Color, conf.lightIntensity, lightDistance);
    light3.position.set(mouse.x,mouse.y,-r);
    scene.add(light3);
    light4 = new THREE.PointLight(conf.light4Color, conf.lightIntensity, lightDistance);
    light4.position.set(-r, y, 0);
    scene.add(light4);
  }

  function animate() {
    requestAnimationFrame(animate);

    animatePlane();
    animateLights();

    renderer.render(scene, camera);
  };

  function animatePlane() {
    gArray = plane.geometry.attributes.position.array;
    const time = Date.now() * 0.0002;
    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
    }
    plane.geometry.attributes.position.needsUpdate = true;
    // plane.geometry.computeBoundingSphere();
  }

  function animateLights() {
    const time = Date.now() * 0.001;
    const d = 50;
    light1.position.x = Math.sin(time * 0.1) * d;
    light1.position.z = Math.cos(time * 0.2) * d;
    light2.position.x = Math.cos(time * 0.3) * d;
    light2.position.z = Math.sin(time * 0.4) * d;
    light3.position.x = Math.sin(time * 0.5) * d;
    light3.position.y = -d;
    light3.position.z = Math.sin(time * 0.6) * d;
    light4.position.x = Math.sin(time * 0.7) * d;
    light4.position.y = -d;
    light4.position.z = Math.cos(time * 0.8) * d;
  }

  function updateSize() {
    width = window.innerWidth;cx = width / 2;
    height = window.innerHeight;cy = height / 2;
    if (renderer && camera) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const wsize = getRendererSize();
      wWidth = wsize[0];
      wHeight = wsize[1];
    }
  }

  function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    const vFOV = cam.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
    console.log(width, height);
  }

  function onMouseWheel(ev) {
    if(ev.deltaY < 0) {
      var i = 0.000;
      if (camera.position.y >= -30) {
        camera.position.y -= Math.pow(2, i);
        i = i+0.001;

        conf.zCoef += (i*1000);
        // console.log(conf.zCoef);
      }
    }
    if(ev.deltaY > 0) {
      var i = 0.00;
      if (camera.position.y < 0) {
        camera.position.y += Math.pow(2, i);
        i = i+0.001;
        conf.zCoef -= (i*1000);
      }
    }
	}

}

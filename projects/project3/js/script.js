
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

let mic, recorder, soundFile, amplitude;
let loop = 0;
let recordings = [];
let volume = 0;
let started = false;

var sun;

function setup() {

  $('#actions').css("display","visible");

  $.getJSON('data/data.json', getData);
  $('input').on('click', removeValue);
  $('#submit-button').on('click',getID);
  console.log ($("#name").val(),$("#age").val(), $("#location").val());
}

function removeValue() {
  $(this).val("");
}

function getData(data) {
  for (var i = 0; i < data.length; i++) {
        questions.push(data[i]);
    }

    // create an audio in
  mic = new p5.AudioIn();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);


  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}

function draw() {
  displaySun();
}

function getID() {
  // console.log(("#name").val());
  if ($("#name").val() != "" && $("#name").val() != "Name" && $("#age").val() != "" && $("#age").val() != "Age" && $("#location").val() != "" && $("#location").val() != "City") {
    $id = [$("#name").val(), $("#age").val(), $("#location").val()];
    $('input').fadeOut( "slow" );
    started = true;
    doIntroduction();
  }
  else {
    console.log("nothing entered");
    }
}

function doIntroduction () {
  // users must manually enable their browser microphone for recording to work properly!
  mic.start();
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
  var completeResponse = "";
  // Tell recorder to record to a p5.SoundFile which we will use for playback
  recorder.record(soundFile);
  var speachToLetters = function (response) {
    console.log(response[0]);
    completeResponse += response[0];
    annyang.removeCallback();
    annyang.addCallback('result', speachToLetters);
  };
  annyang.addCallback('result', speachToLetters);

  var commands = {
    'done': function() {
      // annyang.pause();
      responses.push(completeResponse);
      completeResponse = "";
      annyang.start();
      console.log("SAVED: " + responses);
      recorder.stop(); // stop recorder, and send the result to soundFile
      recordings.push(soundFile);
      console.log("SAVED SOUNDS: " + recordings);
      doQuestionning();
      // playRecordings();
    }
  }
  // Add our commands to annyang
  annyang.addCommands(commands);
}

function playRecordings(volume) {
  console.log("play recordings");
  if (asked >= 1) {
    for (var i = 0; i < recordings.length; i++) {
      // console.log("play recordings loop");
      // recordings[i].setVolume(volume);
      recordings[i].play();
      // saveSound(recordings[i], 'mySound' + [i] + '.wav'); // save file
    }
  }
}

function stopRecordings(volume){
  for (var i = 0; i < recordings.length; i++) {
    // console.log("play recordings loop");
    // recordings[i].setVolume(volume);
    recordings[i].stop(2);
    // saveSound(recordings[i], 'mySound' + [i] + '.wav'); // save file
  }
}

function speak(text) {
  // annyang.pause();
  responsiveVoice.speak(text,'US English Female', {rate: 1 });
  // annyang.resume();
}

function displaySun(){
  if (sun.position.y > 20 && started === true) {
    sun.translateY(-1);
  }
  if (sun.position.y <= 25) {
    sun.translateY(random(-0.5, 0.5));
    sun.translateX(random(-0.5, 0.5));
  }
}



















function GenerateBg(conf) {
  conf = {
    fov: 75,
    cameraZ: 75,
    xyCoef: 25,
    zCoef: 3,
    lightIntensity: 0.5,
    ambientColor: 0xffffff,
    light1Color: 0xffffff,
    light2Color: 0xffffff,
    light3Color: 0xffffff,
    light4Color: 0xffffff,
    ...conf };


  let renderer, scene, camera, cameraCtrl;
  let width, height, cx, cy, wWidth, wHeight;
  const TMath = THREE.Math;

  let plane;
  const simplex = new SimplexNoise();

  var mouse = new THREE.Vector2();
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

    window.addEventListener( 'mousemove', onMouseMove, false );
    // renderer.domElement.addEventListener("click", onclick, true);

    initScene();
    animate();
  }


  function initScene() {
    scene = new THREE.Scene();

    initLights();

    // load a texture, set wrap mode to repeat
    // var texture = new THREE.TextureLoader().load( "/assets/images/skin_SPEC.png" );
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 1, 1 );

    let materialPlane = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: false, shininess: 60, metalness: 0.8, side: THREE.DoubleSide});

    materialPlane.bumpMap = new THREE.TextureLoader().load( "/assets/images/skin_DISP.png" );
    // materialPlane.bumpScale = 0.8;
    materialPlane.displacementMap = new THREE.TextureLoader().load( "/assets/images/skin_DISP.png" );
    materialPlane.displacementScale = 3;
    let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth*4, wHeight*4);
    plane = new THREE.Mesh(geo, materialPlane);
    scene.add(plane);

    var geometry = new THREE.SphereGeometry(10, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
    var material =  new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, transparent: true, blending: THREE.AdditiveBlending } )  ;
    sun = new THREE.Mesh(geometry, material);
    sun.name = "sun";
    scene.add(sun);

    plane.rotation.x = -Math.PI / 2 - 0.2;
    plane.position.y = -25;

    sun.position.y = 60;

    camera.position.z = 60;
    camera.position.y = 0.000;
  }

  // function getMaterialPlane() {
  //   // set canvas as bumpmap
  //   materialPlane.bumpMap = new THREE.TextureLoader.load( "/assets/images/skin_DISP.png" );
  //   materialPlane.bumpScale = 0.8;
  //   materialPlane.displacementMap = new THREE.TextureLoader.load( "/assets/images/skin_DISP.png" );
  //   materialPlane.displacementScale = 30;
  // }


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

    render();
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
    // light1.position.x = Math.sin(time * 0.1) * d;
    // light1.position.z = Math.cos(time * 0.2) * d;
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
        volume += 0.001;
        playRecordings(volume);
      }
    }
    if(ev.deltaY > 0) {
      var i = 0.00;
      if (camera.position.y < 0) {
        camera.position.y += Math.pow(2, i);
        i = i+0.001;
        conf.zCoef -= (i*1000);
        volume -= 0.01;
        stopRecordings(volume);

      }
      else {
        volume = 0;
      }
    }
	}

  function onMouseMove( event ) {
    console.log("mouse moves");
  	// calculate mouse position in normalized device coordinates
  	// (-1 to +1) for both components

  	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  }

  function render() {
    // update the picking ray with the camera and mouse position
	  raycaster.setFromCamera( mouse, camera );

	  // calculate objects intersecting the picking ray
	  var intersects = raycaster.intersectObject( scene.getObjectByName( "sun" ) );

	  for ( var i = 0; i < intersects.length; i++ ) {

      console.log("DO BRUTAL CODE");
		    // intersects[ i ].object.material.color.set( 0xff0000 );

	  }
    renderer.render(scene, camera);
  }
}

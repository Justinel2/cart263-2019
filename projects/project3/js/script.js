
/*****************
THE SIREN SONG
Justine Lardeux

Program that contains a responsive voice and speech recognition system (annyang)
that is meant to interact with the user with questions (from data.json).

The voice is embedded in a sphere, sun-like entity, that will retain the user's responses.

If the user hover on the entity, the entity approaches so the user can see the knowledge
that it contains. The 3D scene, camera, objects and animation are made with three.js library.

If the user scrolls down to go under the skin/water, the user can listen to himself through
iterations of recordings. This process is made with p5.js and p5.sound.js

The overall code is made from JQuery.
******************/

// Boolean that gives authorization to the user to zoom on the sun on hover
let zoomAllowed = false;

// Function to generate the 3D scene and actions with three.js
GenerateBg({ el: 'background' });

"use strict";

// VARIABLES (page actions)

// responsive voice texts
let introductions = ["I am your new friend. I'm really excited to meet you. Can you hear me?", "Good. Can I get to know you a little bit?", "Perfect. Let's start."];
let transitions = ["Mmm... I see. ", "and ", "Good! ", "So, ", "That's interesting. ", "Wow! I didn't expect that. And ", "Now, I wanna know "];
let questions = [];
let question;

// question counter
let asked = 0;

// users inputs
let $id;
let responses = [];
let recordings = [];
var completeResponse = "";

// p5.sound
let mic, recorder, soundFile;

// the 3D sphere
var sun;

// gives indication if the user has submitted a compatible id
let started = false;

// Start reading the script at the setup() function
$(document).ready(setup);

// setup()
//
// A function to define p5.sound variables, to declare different actions on click
// and to get the data.json
function setup() {

  // get the questions from the data.json file -> actions: getData()
  $.getJSON('data/data.json', getData);

  // create an audio in
  mic = new p5.AudioIn();
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();

  // actions on click of the input areas -> removeValue()
  $('input').on('click', removeValue);
  // actions on click of the submit button -> getId()
  $('#submit-button').on('click',getID);
}


// draw()
//
// A function that loops every frame (p5.js)
function draw() {
  // Calls the function to displays the 3D sphere
  displaySun();
}


// removeValue()
//
// function to remove the template value (Name, Age, City) from the input areas
// when the area is clicked
function removeValue() {
  $(this).val("");
}

// getData()
//
// function to get the data.json data / the questions
function getData(data) {
  // put each question at a single index of the data array
  for (var i = 0; i < data.length; i++) {
        questions.push(data[i]);
    }
}

// getID()
//
// function to get and store the user's written data (ID: name, age, location)
// when the user clicks the submit button
function getID() {
  // If the input values are NOT empty or are the template ones,
  if ($("#name").val() != "" && $("#name").val() != "Name" && $("#age").val() != "" && $("#age").val() != "Age" && $("#location").val() != "" && $("#location").val() != "City") {
    // Store each input in the $id array
    $id = [$("#name").val(), $("#age").val(), $("#location").val()];
    // Fade out the form
    $('input').fadeOut( "slow" );
    // Indicate that the user submitted a valid ID
    started = true;
    // Calls the introduction function
    doIntroduction();
  }
}

// doIntroduction()
//
// function to proceed to the introduction of the 'sun' before starting the
// questionning
function doIntroduction () {
  // If the responsive voice and speech recognition system is ready
  if (annyang) {
    // start the system (user's permission)
    annyang.start();
    // start the mic (user's permission)
    mic.start();
    // Define the first level of introduction by including the user's name
    introductions[0] = ("Hello " + $id[0] + ". " + introductions[0]);
    // set the starting index to 0 (first level of introduction)
    i = 0;
    // responsive voice reads the first level of introduction
    speak(introductions[i]);
    // If the user responds 'yes'
    let consent = function() {
      // set the index to the next level of introductions
      i++;
      // responsive voice reads the according introduction text
      speak(introductions[i]);
      console.log(i);
      // if the introduction levels are finished
      if (i >= introductions.length - 1){
        // start the questionning
        doQuestionning();
      }
    }
    // speech recognition commands
    var commands = {'yes': consent};
    // Add our commands to annyang
    annyang.addCommands(commands);
  }
}

// doQuestionning(data)
//
// function that allows the responsive voice to ask questions randomly to the
// user from the data.json file (data) // the data is by now in the data array
function doQuestionning(data) {
  // at this point, the zoom is allowed on the sphere
  zoomAllowed = true;

  // get a random transition text
  let i = Math.floor(Math.random() * transitions.length);
  // get a random question from the data array and remove it from the array
  question = questions.splice(Math.random() * questions.length, 1)[0];

  // If this is the first question
  if (asked == 0) {
    // responsive voice reads the question
    speak(question);
  }
  // If this is not the first question asked
  else {
    // responsive voice reads the question preceded by a transition
    speak(transitions[i] + "." + question);
  }
  // increment by one the amount of question asked
  asked++;
  // calls the function to get the user's response
  getResponse();
}

// getResponse()
//
// function to read and record the user's oral response to the questions
function getResponse() {
  // slowly display the instructions
  $("instructions").fadeIn("slow");
  // Tell recorder to record to a p5.SoundFile which we will use for playback
  recorder.record(soundFile);
  // get the written version of the user's response
  var speachToLetters = function (response) {
    // add the caught sentence in the string
    completeResponse += response[0];
    // remove the callback (the speech to letter translator)
    annyang.removeCallback();
    // add the callback (i do this process to make sure that every detected
    // speech get stored in the string)
    annyang.addCallback('result', speachToLetters);
  };
  annyang.addCallback('result', speachToLetters);
  // command when the user says 'done'
  var commands = {
    'done': function() {
      console.log(completeResponse);
      // push the complete response to the response array
      responses.push(completeResponse);
      // re-define the complete response to empty
      completeResponse = "";
      // stop the p5.sound recorder, and send the result to soundFile
      recorder.stop();
      // push the sound file to the recordings array
      recordings.push(soundFile);
      // go to the next question
      doQuestionning();
    }
  }
  // Add our commands to annyang
  annyang.addCommands(commands);
}

// playRecordings()
//
// function to play the user's recordings
function playRecordings() {
  // if there was at least one question asked
  if (asked >= 1) {
    // get a random index number
    let i = int(random(0,recordings.length));
    console.log(i);
    // play the random recording
    recordings[i].play();
  }
}


// stopRecordings()
//
// function to stop the recordings when the user goes back up
function stopRecordings(){
  // for each recording in the array
  for (var i = 0; i < recordings.length; i++) {
    // stop the recording after 4 seconds
    recordings[i].stop(4);
  }
}

// speak()
//
// function that commands the responsive voice to speak a (text)
function speak(text) {
  responsiveVoice.speak(text,'US English Female', {rate: 1 });
}

// displaySun()
//
// function to lower the 'sun' to the screen when the user submits valid ids
// and makes it randomly shake
function displaySun(){
  // If the sun is outside of the screen
  if (sun.position.y > 20 && started === true) {
    // decrement its position by 1 (until desired position)
    sun.translateY(-1);
  }
  // if the sun is at the desired position
  if (sun.position.y <= 25) {
    // randomly shake in x and y
    sun.translateY(random(-0.5, 0.5));
    sun.translateX(random(-0.5, 0.5));
  }
}

// getBrutalData()
//
// function that displays in text the data accumulated when the user hover the sun
function getBrutalData() {
  // create an empty string for the data
  var data = "";
  // create an variable that will be the value of the div's paragraph
  var par;

  // if there is one or more response stored
  if (responses.length >= 1) {
    // add each response to the data string
    for (var i = 0; i < responses.length; i++) {
      data += responses[i];
    }
    // defines the paragraph to be the identification + the responses
    par = $id[0] + ", " + $id[1] + ", " + $id[2] + ", " + data;
  }

  // if there is not yet a response stored
  if (responses.length < 1) {
    // defines the paragraph to be only the identification
    par = $id[0] + ", " + $id[1] + ", " + $id[2];
  }

  // put the new paragraph as the p in the according div
  $( "#data" ).text(par);
  // fade in slowly the data
  $( "#dataDiv" ).fadeIn("slow");
}

// hideBrutalData()
//
// function that fades out slowly the user's data when the 'sun'
// is not hovered
function hideBrutalData() {
  $( "#dataDiv" ).fadeOut("slow");
}

// GenerateBg()
//
// function to generate the scene, the camera and the 3d elements (and their actions)
function GenerateBg(conf) {

  // conf variables (helped with codepen)
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

  // variables for the objects
  let renderer, scene, camera, cameraCtrl;
  // variables for the parameters
  let width, height, cx, cy, wWidth, wHeight;
  // add TMath
  const TMath = THREE.Math;

  // plane variables
  let plane;
  const simplex = new SimplexNoise();

  // raycaster variables
  var mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  // sun variables
  let posY = 60;
  let posZ = 10;

  // calls init()
  init();


  // init()
  //
  // function that initialise the canvas, the camera and the events
  function init() {
    //initialization of the renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el), antialias: true, alpha: true });
    //initialization of the camera and its position
    camera = new THREE.PerspectiveCamera(conf.fov);
    camera.position.z = conf.cameraZ;

    // calls updateSize() for the canvas size
    updateSize();

    // event manager
    // resize window -> updateSize()
    window.addEventListener('resize', updateSize, false);
    // use the mouse wheel -> onMouseWheel()
    window.addEventListener( 'wheel', onMouseWheel, false );
    // moves the mouse -> onMouseMove()
    window.addEventListener( 'mousemove', onMouseMove, false );

    // calls to initialise the scene
    initScene();
    // calls to generate animations
    animate();
  }

  // initScene()
  //
  // function that initialise the scene: lights and 3D objects
  function initScene() {
    // Initialise scene
    scene = new THREE.Scene();

    // calls to initialise lights
    initLights();

    // Create new material for the skin/water
    let materialPlane = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: false, shininess: 60, metalness: 0.8, side: THREE.DoubleSide});
    // Define the material's bumpmap with displacement
    materialPlane.bumpMap = new THREE.TextureLoader().load( "/assets/images/skin_DISP.png" );
    materialPlane.displacementMap = new THREE.TextureLoader().load( "/assets/images/skin_DISP.png" );
    materialPlane.displacementScale = 3;

    // Create geometry for the skin/water
    let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth*4, wHeight*4);

    // Create the new skin/water
    plane = new THREE.Mesh(geo, materialPlane);
    // Initialise it to the scene
    scene.add(plane);

    // create new material for the 'sun'
    var material =  new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, transparent: true, blending: THREE.AdditiveBlending } )  ;
    // create new geometry for the 'sun'
    var geometry = new THREE.SphereGeometry(10, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
    // create the new 'sun'
    sun = new THREE.Mesh(geometry, material);
    // Initialise it to the scene
    scene.add(sun);

    // Initialise rotation and position parameters for the skin/water
    plane.rotation.x = -Math.PI / 2 - 0.2;
    plane.position.y = -25;
    // Initialise rotation and position parameters for the sun
    sun.position.y = posY;
    sun.position.z = posZ;
    // Initialise position of the camera
    camera.position.z = 60;
    camera.position.y = 0.000;
  }


  // initLights()
  //
  // function that initialises the lights in the scene (modified from codepen)
  function initLights() {
    // radius
    const r = 30;
    // y position
    const y = 10;
    // light distance
    const lightDistance = 500;

    // create, place and initialise the first light
    light1 = new THREE.PointLight(conf.light1Color, conf.lightIntensity, lightDistance);
    light1.position.set(0, y, r);
    scene.add(light1);
    // create, place and initialise the second light
    light2 = new THREE.PointLight(conf.light2Color, conf.lightIntensity, lightDistance);
    light2.position.set(0, -y, -r);
    scene.add(light2);
    // create, place and initialise the third light
    light3 = new THREE.PointLight(conf.light3Color, conf.lightIntensity, lightDistance);
    light3.position.set(mouse.x,mouse.y,-r);
    scene.add(light3);
    // create, place and initialise the fourth light
    light4 = new THREE.PointLight(conf.light4Color, conf.lightIntensity, lightDistance);
    light4.position.set(-r, y, 0);
    scene.add(light4);
  }

  // animate()
  //
  // function that handles the animation of the different objects in the scene (LOOPING)
  function animate() {

    // will loop like a draw() the animation function
    requestAnimationFrame(animate);

    // calls the animation functions for each object
    animatePlane();
    animateLights();

    // calls the render function
    render();
  };


  // animatePlane()
  //
  // function that animates the skin/water in a wavy way
  function animatePlane() {
    // codepen.io modified code
    // puts the geometry positions and will animate them with a noise filter
    // will also depend on the mouse position
    gArray = plane.geometry.attributes.position.array;
    const time = Date.now() * 0.0002;
    for (let i = 0; i < gArray.length; i += 3) {
      gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
    }
    // update the positions
    plane.geometry.attributes.position.needsUpdate = true;
  }

  // animateLights()
  //
  // function that handles the movements of the lights
  function animateLights() {

    const time = Date.now() * 0.001;
    const d = 50;

    // light1 is static

    // movements of the lights 2,3 and 4
    light2.position.x = Math.cos(time * 0.3) * d;
    light2.position.z = Math.sin(time * 0.4) * d;
    light3.position.x = Math.sin(time * 0.5) * d;
    light3.position.y = -d;
    light3.position.z = Math.sin(time * 0.6) * d;
    light4.position.x = Math.sin(time * 0.7) * d;
    light4.position.y = -d;
    light4.position.z = Math.cos(time * 0.8) * d;
  }

  // updateSize()
  //
  // function that updates the size of the canvas depending on the screen size
  function updateSize() {
    // widht and height are the size of the window screen
    width = window.innerWidth;cx = width / 2;
    height = window.innerHeight;cy = height / 2;

    // if the renderer and the camera are ready
    if (renderer && camera) {
      // set the size of the renderer to the screen size
      renderer.setSize(width, height);
      // set the aspect of the camera to the one of the screen
      camera.aspect = width / height;
      // update the camera projection
      camera.updateProjectionMatrix();
      // get the renderer size according to the focal optic view of the camera
      //and store the widht and height to wWidth and wHeight
      const wsize = getRendererSize();
      wWidth = wsize[0];
      wHeight = wsize[1];
    }
  }

  // getRendererSize()
  //
  // function that gets the renderer size (architectured taken from codepen.io)
  function getRendererSize() {
    // add a new perspective camera
    const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
    // recalculate the focal optic view
    const vFOV = cam.fov * Math.PI / 180;
    // height of the view
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    // width of the view
    const width = height * cam.aspect;
    // return the values
    return [width, height];
  }


  // onMouseWheel()
  //
  // function that causes actions on mouse wheel:
  // - moves the camera Y position (vertically)
  // - plays recordings
  function onMouseWheel(ev) {
    // if the user is scrolling to the bottom
    if(ev.deltaY < 0) {
      var i = 0.000;
      // until -30 max
      if (camera.position.y >= -30) {
        // adjust the camera position with a power function
        camera.position.y -= Math.pow(2, i);
        i = i+0.001;
        // increment strenght to the noise of the skin/waves
        conf.zCoef += (i*1000);
        // ..every three Y decrease of the camera (or so)
        if (camera.position.y % 3 === 0) {
          // play a new random recording
          playRecordings();
        }
      }
    }
    // if the user is scrolling up
    if(ev.deltaY > 0) {
      var i = 0.00;
      // if the camera is still not at its original position
      if (camera.position.y < 0) {
        // increment the camera y position with the same power function
        camera.position.y += Math.pow(2, i);
        i = i+0.001;
        // adjust the noise coefficient to the original one gradually
        conf.zCoef -= (i*1000);
        // stop each recordings
        stopRecordings();

      }
    }
	}

  // onMouseMove()
  //
  // function that calculates the mouse position in the device coordinates
  function onMouseMove( event ) {
  	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  // render()
  //
  // function that handles the raycaster and renders the scene
  function render() {
    // update the picking ray with the camera and mouse position
	  raycaster.setFromCamera( mouse, camera );

	  // calculate is the 'sun' is intersecting the picking ray
	  var intersects = raycaster.intersectObject(sun);

    // if there is an intersection and the zoom is allowed
    if (intersects[0] != undefined && zoomAllowed == true) {
      // animate the 'sun' with the looping intersection detection
      // puts it big at the middle of the screen
  	  for ( var i = 0; i < intersects.length; i++ ) {
          if (sun.position.z < 50) {
            sun.translateZ(1);
          }
          if (sun.position.y >= 5) {
            sun.translateY(-1);
          }
          // when at the right place
          else {
            // display the stored data
            getBrutalData();
          }
  	  }
    }
    // if there is no intersection of the mouse and the 'sun'
    if (intersects[0] === undefined && zoomAllowed == true) {
      // gradually (with looping detection) place back the 'sun'
      // to its original position
      if (sun.position.z > posZ) {
        sun.translateZ(-1)
      }
      if (sun.position.y < posY) {
        sun.translateY(1);
      }
      // hide the stored data
      hideBrutalData();
    }

    // render the scene and the camera
    renderer.render(scene, camera);
  }
}

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>

  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
  <meta http-equiv="Pragma" content="no-cache"/>
  <meta http-equiv="Expires" content="0"/>

  <!-- CSS stylesheet(s) -->
  <link rel="stylesheet" type="text/css" href="css/style.css" />

  <!-- Libraries -->
  <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>

  <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
  <script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>

  <!-- My script(s) -->
  <script src="js/script.js"></script>

  <link rel="shortcut icon" type="image/png" href=""/>
</head>
<body>
  <button id="world-button" onclick="window.location.href = 'submit.php'"> <h2> >>meepu world>></h2></button>
  <!-- <button id="world-button" onclick="window.location.href = 'https://pa-nina.com/meepu/world.php'"> <h2> >>meepu world>></h2></button> -->
  <div id="content">
  <div id="form">
    <h1> create meepu </h1>
    <h2> name:
    <input id="name" type="text" placeholder="" name="name" required>
    </h2>
    <!--  color input source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Appearance_variations-->
    <h2>
    color: <input type="color" id="skin-color" value="#ff0000" onchange="updateSkinColor()">
    </h2>
    <div id="word-bank">
      <h2> word bank: </h2>
      <div id = "word-box" style="overflow-y:scroll;">
      </div>
      <p>teach your meepu words or phrases (talk to it)</p>
      <button id="dictate" onclick="dictateWord()">activate microphone</button>
    </div>
    <h2>
      <button type="submit"  onclick="appendMeepu()" id= "submit" class="submit"><h2>submit meepu</h2></button>
    </h2>
  </div>
  <canvas id="myCanvas" width="130" height="200">
  </canvas>
  </div>
</body>

</html>

/*****************
SURF THE WEB AS
******************/

// Variables
// local variables

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  // Constructor function for Person objects
function Person(firstName, lastName, location, social, description, flags, platform) {
  this.firstName = first;
  this.lastName = last;
  this.location = location;
  this.social = social;
  this.description = description;
  this.flags = flags;
  this. platform = platform;
}


  // Attribute the page variables to their according divs
  $signInPage = $("#signin");

  // Attribute the actions (functions) associated to each button on click
  $('#sign-in-button').on('click',signIn);

}



//
// // restartGame()
// //
// // A function that reset the game without removing the content of the archive to keep the previous journal entries.
// function restartGame() {
//   // The browser is to be open again
//   browserOpen = false;
//   // The markov generation is to be computed again
//   generation = false;
//   // The journal entry needs to be written again
//   journalEntryWritten = false;
//   // The instruction page disappears
//   $instructionPage.css('display','none');
//   // The webpage tab closes
//   closeWebPage();
//   // The journal tab closes
//   closeJournal();
//   // The journal entry is pushed to the archive array
//   archive.push($textarea.val());
//   // The journal is put back to blank
//   $textarea.val("");
//   // The sign in page reappear
//   $signInPage.css('display','block');
// }
//
// // turnOffGame
// //
// // A function that is triggered by the OFF button.
// // It calls the restartGame() function, so reset the game.
// // It also display the score page so the user can see all the user entries
// function turnOffGame() {
//   // Reset the game without resetting the archive
//   restartGame();
//   // The sign in page disappears
//   $signInPage.css('display','none');
//   // The score page appears
//   $scorePage.css('display','block');
//   // Display each entry according to each day (each time resetted)
//   for (var k = archive.length-1; k >= 0; k--) {
//     day = k+1;
//     $scorePageEntry.last().after('<p span id= "day"> Day '+ day + '<p>' + archive[k] + '</p>');
//   }
// }
//
// // signIn()
// //
// // A function that handles the action after the user click on the sign in button on the
// // sign in page
// function signIn() {
//   // The sign in page (current) disappears
//   $signInPage.css('display','none');
//   // The computer desktop page appears
//   $homePage.css('display','block');
//   // The instruction page stays hidden
//   $instructionPage.css('display','none');
// }
//
// // openInternet()
// //
// // A function that handles the actions when the user clicks on the browser icon for the first time in a "day".
// // The function prompt the program to generate a random 4 Chan thread in real time. The forum comments
// // are extracted and accumulated so that RiTa markov generator generates a new one. This new comment will
// // be the generated with the purpose of being a new journal entry.
// // The thread page is also displayed in the user's browser tab.
// // The function also prompts the typing of the new comment in the journal text area
// function openInternet() {
//   // Display the web page tab
//   $webPage.css('display', 'block');
//   // If the browser has not been opened yet on that "day"
//   if (browserOpen === false) {
//     // Generate the random thread and display it in the tab
//     generateWebPage();
//     // Generate the new journal entry with RiMarkov
//     generateMarkov();
//     // Display the new journal entry character by character with each user's keydown when in the textarea
//     generateJournalEntry();
//     // Mark the browser as opened for the day
//     browserOpen = true;
//   }
// }
//
// // openJournal
// //
// // A function that displays the journal tab when the journal icon is clicked
// function openJournal() {
//   $journalPage.css('display', 'block');
// }
//
// // closeWebPage()
// //
// // A function that hides the web page tab when its 'x' icon is clicked
// function closeWebPage() {
//   $webPage.css('display', 'none');
// }
//
// // closeJournal()
// //
// // A function that hides the journal tab when its 'x' icon is clicked depending
// // on if the entry has been written entirely or not
// function closeJournal() {
//   // The entry has not been entirely written
//   if (journalEntryWritten === false) {
//     // Hide the journal tab
//     $journalPage.css('display', 'none');
//   }
//   // The entry has been written entirely
//   if (journalEntryWritten === true) {
//     // Display the instructions
//     $instructionPage.css('display', 'block');
//   }
// }
//
// // generateWebPage()
// //
// // A function that requests and gets the data of a random 4Chan thread.
// // It also isolate and accumulate the forum comments in a local variable
// function generateWebPage() {
//
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//       // If the request is successful
//       if (this.readyState === 4 && this.status === 200) {
//         // the content of the HTML page
//         content = this.responseText;
//         // Copy the content (HTML text) in the web area of the game
//         $webarea.html(content);
//         // Get all the posts of the thread and store it in 'comments'
//         comments = $("blockquote.postMessage").text();
//         // Add the comments in the textToMarkov accumulating all the comments of every opened thread
//         textToMarkov += comments;
//         // A function that removes the href tag to every a link of the page so that
//         // the user cannot quit the game
//         $(function(){
//           $('a').each(function() {
//             $(this).attr('href', ' ');
//           });
//         });
//       }
//     }
//     // open a randomly generated thread
//     xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://boards.4channel.org/" + links[(Math.floor(Math.random() * 48))] + "/");
//     // send the request
//     xhr.send();
// }
//
// // generateMarkov()
// //
// // A function that creates a new RiMarkov model and calls its generation every time the journal tab is clicked
// function generateMarkov() {
//   markov = new RiMarkov(3);
//   $journalPage.click(generate);
// }
//
// // generate()
// //
// // A function that generates the new comment if it hasn't been generated during the "day" yet.
// // The function also attemps to replace the numbers and the '>' characters from the string.
// function generate() {
//   // If there was not another comment generation during the same day
//   if (generation === false) {
//     // Load the text to the markov model
//     markov.loadText(textToMarkov);
//     if (!markov.ready()) return;
//     // Generate 4 sentences from the text loaded in the markov model
//     lines = markov.generateSentences(4);
//     // Store the 4 sentences, so the new comment, in the variable 'dataString'
//     dataString = lines.join(' ');
//
//     // Remove each number
//     for (var i = 0; i <= 20000000; i++) {
//       dataString = dataString.replace(String(i),"");
//     }
//     // Replace combinations of '>'
//     dataString = dataString.replace(" >","");
//     dataString = dataString.replace(">","");
//     dataString = dataString.replace(" > ","");
//     // Mark the generation as done for the day
//     generation = true;
//   }
// }
//
// // generateJournalEntry()
// //
// // A function that displays, character by character, the new comment in the text area of the journal.
// // Each character is displayed individually to replace the user's key typed until the comment is finished.
// function generateJournalEntry() {
//   (function($) {
//     var i = 0;
//     // The function is triggered at the key up of each character typed by the user
//     $textarea.keyup(function (e){
//       var prev = "";
//       if (i < dataString.length) {
//         for (var j = 0; j < i; j++) {
//           prev += dataString[j];
//         }
//         $(this).val(prev + dataString[i]);
//         i++;
//       }
//       // If the journal entry is completely written
//       if (i >= dataString.length) {
//         // Mark the journal entry as written for the day
//         journalEntryWritten = true;
//       }
//     })
//   })(jQuery);
// }

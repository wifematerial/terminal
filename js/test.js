var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var commands = [];

addLine("Type 'help' to see the available commands.");
addLine("<br>");
addLine("Type 'ready' to begin the test.");
addLine("<br>");

window.addEventListener("keyup", enterKey);

// Init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }

  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine("sigma@hood:~$ " + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }

  // Command history navigation
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    textarea.value = commands[git] === undefined ? "" : commands[git];
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "ready":
      startQuestions();
      break;
    case "help":
      loopLines(help2, "color2 margin", 80);
      break;
    case "reload":
      addLine("<br>");
      addLine("reloading. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", "color3 margin", 800);
      addLine("<br>","",800);
      setTimeout(() => location.reload(),1500);
      break;
    case "exit":
      addLine("<br>");
      addLine("---------------- BACK TO MAIN TERMINAL ----------------","color3",1500);
      addLine("<br>","",1500);
      setTimeout(() => window.location.href = "index.html",3000);
      break;
  }
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);
    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

function reload(){
  addLine("<br>");
  addLine("reloading. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .", "color3 margin", 800);
  addLine("<br>","",800);
  setTimeout(() => location.reload(),1500);
}

function exit(){
  addLine("<br>");
  addLine("---------------- BACK TO MAIN TERMINAL ----------------","color3",1500);
  addLine("<br>","",1500);
  setTimeout(() => window.location.href = "index.html",3000);
}

let questionIndex = 0; // This tracks which question we're on
let userResponses = [];
let rating = 10;

// Function to start or restart the questions
function startQuestions() {
  userResponses = []; // Reset responses
  rating = 10; // Reset rating
  questionIndex = 1; // Reset question index to start at the first question
  addLine("<br>");
  addLine("Hey woman,","color5 margin", 0);
  addLine("<br>");
  addLine("I'm gonna ask you a few questions","color5 margin",0);
  addLine("<br>");
  addLine("and all I want is a 'yes' or 'no' answer.","color5 margin",0);
  askQuestion(); // Start with the first question
}

// Function to ask questions based on the current question index
function askQuestion() {
  let question = "";

  switch (questionIndex) {
    case 1:
      question = "Are you a virgin?";
      break;
    case 2:
      question = "Do you have a male best friend?";
      break;
    case 3:
      question = "Do you dress provocatively?";
      break;
    case 4:
      question = "Say 'yes' if you have an ex (or exes💀).";
      break;
    case 5:
      question = "Are you willing to have kid(s) or atleast adopt one?";
      break;
    case 6:
      question = "Do you prioritize health like doing workouts or eating healthy and having good sleep?";
      break;
    case 7:
      question = "Are you very active on social media, like posting and stuff?";
      break;
    case 8:
      question = "Would you quit your job to take care of our home?";
      break;
    default:
      finalRating(); // End of questions and show final rating
      return; // Exit the function
  }

  addLine("<br>");
  addLine(question, "color4 margin", 1000); // Display the question
  addLine("<br>","",1000);
}

// Function to calculate and display the final rating based on responses
function finalRating() {
  addLine("<br>");
  addLine("result : ");
  addLine("<br>");
  addLine(`you a ${rating}/10.`, "color3 margin", 0);
  
  if (rating >= 5 && rating <= 7) {
    addLine("<br>");
    addLine("You can do better","color2 margin",0);
    addLine("<br>");
    addLine("Better luck next lifetime...", "color6 margin", 0);
    addLine("<br>");
  } else if (rating > 7 && rating < 10) {
    addLine("<br>");
    addLine("Maybe I can fix you. Maybe.","color2 margin",0);
    addLine("<br>");
    addLine("Lemme think about it..", "color6 margin", 0);
    addLine("<br>");
  } else if (rating === 10) {
    addLine("<br>");
    addLine("You are a wife material.❤️", "color6 margin", 0);
    addLine("<br>");
  } else if (rating <= 4) {
    addLine("<br>");
    addLine("ayo gtfo.", "color6 margin", 0);
    addLine("<br>");
  }
}

// Function to handle key events
function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }

  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine("sigma@hood:~$ " + command.innerHTML, "no-animation", 0);

    // Check if in question phase
    if (questionIndex >= 1 && questionIndex <= 8) { 
      handleResponse(command.innerHTML.toLowerCase());
    } else {
      commander(command.innerHTML.toLowerCase());
    }

    command.innerHTML = "";
    textarea.value = "";
  }

  // Command history navigation
  // ... existing command history navigation code ...
}

// Function to handle user responses and update the rating
function handleResponse(response) {
  userResponses.push(response); // Store the user's response

  switch (questionIndex) {
    case 1:
      if (response === 'no') {
        addLine("<br>");
        addLine("Thanks for your time. you can leave.", "color2 margin", 0);
        rating -= 9;
        finalRating(); // Show the final rating
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return; // Exit the function
      }
      else if (response === 'yes'){
        break;
      }
      else if (response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response !== 'yes' || response !== 'no'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
    case 2:
      if (response === 'yes') {
        addLine("<br>");
        addLine("Go marry him you dimwit.", "color2 margin", 0);
        rating -= 8;
        finalRating();
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return;
      }
      else if (response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response === 'no'){
        break;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
    case 3:
      if (response === 'yes') {
        addLine("<br>");
        addLine("you aint no hottie. you a hotspot.", "color2 margin", 0);
        rating -= 7;
        finalRating();
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return;
      }
      else if(response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response === 'no'){
        break;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
    case 4:
      if (response === 'yes') {
        addLine("<br>");
        addLine("I ain't got no time for used products.", "color2 margin", 0);
        rating -= 6;
        finalRating();
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return;
      }
      else if (response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if(response === 'no'){
        break;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
    case 5:
      if (response === 'no') {
        addLine("<br>");
        addLine("no? that's fine, you can leave.", "color2 margin", 0);
        rating -= 5;
        finalRating(); // Show the final rating
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return; // Exit the function
      }
      else if (response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if(response === 'yes'){
        break;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
    case 6:
      if (response === 'no') {
        rating -= 1; // Deduct rating for negative answer
      }
      else if(response === 'yes'){
        break;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
      break;
    case 7:
      if (response === 'yes') {
        rating -= 1; // Deduct rating for positive answer
      }
      else if(response === 'no'){
        break;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
      break;
    case 8:
      if (response === 'no') {
        rating -= 1; // Deduct rating for negative answer
        finalRating();
        addLine("<br>");
        addLine("Type 'reload' to startover.");
        addLine("<br>");
        return;
      }
      else if(response === 'yes'){
        break;
      }
      else if (response === 'reload'){
        reload();
        return;
      }
      else if (response === 'exit'){
        exit();
        return;
      }
      else if (response !== 'yes' || response !== 'no' || response !== 'reload' || response == 'exit'){
        addLine("<br>");
        addLine("Answer with 'yes' or 'no'","color5 margin");
        addLine("<br>");
        setTimeout(() => location.reload(), 3000);
        addLine("RESTARTING. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .","color3", 1000);
        addLine("<br>","",1000);
        return;
      }
      return;
  }

  questionIndex++; // Move to the next question
  askQuestion(); // Ask the next question
}


// A $( document ).ready() block.
$( document ).ready(function() {
    var correctAnswersTable = {};
//started stuff that was outside
var questionsAPI = {
    "response_code":0,
    "results":[
      {"category":"Science: Computers",
      "type":"multiple",
      "difficulty":"easy",
      "question":"Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
      "correct_answer":"Apple",
      "incorrect_answers":["Microsoft","Atari","Commodore"]},
      {"category":"Entertainment: Books",
      "type":"multiple",
      "difficulty":"medium",
      "question":"What was the pen name of novelist, Mary Ann Evans?",
      "correct_answer":"George Eliot",
      "incorrect_answers":["George Orwell","George Bernard Shaw","George Saunders"]},
      {"category":"Entertainment: Video Games",
      "type":"boolean",
      "difficulty":"easy",
      "question":"The ultimate phrase used by Pharah from Overwatch is: &quot;Justice rains from above!&quot;",
      "correct_answer":"True","incorrect_answers":["False"]},
      {"category":"Animals",
      "type":"boolean",
      "difficulty":"medium",
      "question":"The Platypus is a mammal.",
      "correct_answer":"True",
      "incorrect_answers":["False"]},
      {"category":"Entertainment: Books",
      "type":"multiple",
      "difficulty":"easy",
      "question":"What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
      "correct_answer":"Holden Caulfield",
      "incorrect_answers":["Fletcher Christian","Jay Gatsby","Randall Flagg"]
      }
    ]
}
var numberOfQuestions = questionsAPI.results.length;
function buildFormGroup(obj){

}
function shuffle(anArray) {
  if(anArray.length > 2){
    for (let i = anArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [anArray[i], anArray[j]] = [anArray[j], anArray[i]];
    }
    return anArray;
  } else {
    return anArray;
  }

}
function createTrivia(obj){
//  console.log("console.log.test=",obj);
  var resultsArray = questionsAPI.results;

// triviaForm.on( "click", function() {
//   //console.log( $( this ).text() );
//
//   return getScore(correctAnswersTable);
// });
  var triviaFormGroup = $("#triviaFormGroup");
  //var submitButton = $('<button class="btn btn-primary " name="submit" type="button" data-toggle="modal" data-target="#exampleModal">Done</button>');
//  var submitButton = $('<button name="submit" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Done</button>');
var submitButton = $('<button name="submit" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Done</button>');
    submitButton.on('click', function() {
    getScore(correctAnswersTable);
});
  // var objAnswers = {};
  // localStorage.setItem('ls', objAnswers);
  // var answerStorage = localStorage.getItem("ls");
  //console.log("console.log.ls=",answerStorage);

  resultsArray.forEach(function(element,i){
        // Add one to match question number
        var i = i +1;

        // Testing
        //console.log("console.log.i=",element);
        //console.log(element);

        // Adding question to variable and displaying in console.
        var theQuestion = element.question;
      //  console.log(theQuestion);

        // Creating form elements from api results
        var questionFormGroup = $('<div>');
        questionFormGroup.addClass( "form-group" );
        var labelWithQuestion = $('<label class="control-label"><span id="q'+i+ '" class="questionsBold"></span></label>');
        var radioDiv = $('<div>');
        radioDiv.addClass( "radio" );
        var radioLabel = $('<label>');


        triviaFormGroup.append(questionFormGroup);
        questionFormGroup.append(labelWithQuestion);
        triviaFormGroup.append(radioDiv);
        radioDiv.append(radioLabel);

        //var questionsAPI.
        var incorrectAnswersArray = element.incorrect_answers;
        var correctAnswerArray = [];
         correctAnswerArray.push(element.correct_answer);
      //  console.log("console.log.incorrect_answers=",incorrectAnswersArray);

      correctAnswerArray.forEach(function(correctAnswer,k){
        // console.log(k);
        //var count = k++;
        // console.log("count=",count);
        // var theKey = correctAnswersTable['key' + i];
        // correctAnswersTable = {theKey: element.correct_answer};
        // localStorage.setItem('ls', correctAnswersTable);
        // console.log("console.log.correctAnswerTableIn=",correctAnswersTable);
        //console.log(correctAnswer);
        correctAnswersTable['q'+i+'-answer'] = correctAnswer;
      //  console.log("correctAnswersTable=",correctAnswersTable);
        var allAnswers = correctAnswerArray.concat(incorrectAnswersArray);
        var shuffledAnswers = shuffle(allAnswers);
      //  console.log("console.log.allAnswers=",allAnswers);
        shuffledAnswers.forEach(function(anAnswer,j){
          // var c = incorrectAnswersArray.concat(correctAnswerArray);
          // console.log("console.log.c=",c);
          var j = j +1;
        //  console.log("console.log.j=",i+' '+j);
      //    console.log("console.log.wrongAnswer=",wrongAnswer);
          //                 <label id="label-q2-pos2"></label>
          //radioDiv.appendTo(radioLabel).after( ' ' + wrongAnswer[j]);

          var radioInput = $('<input id="input-q'+i+'-pos'+j+'" type="radio" name="q'+i+'-answer" value="'+anAnswer+'" >');
          radioInput.appendTo(radioLabel).after( ' ' + anAnswer + ' ' );
        //  radioLabel.append(radioInput);
        //  $('<input id="input-q2-pos1" type="radio" name="q2-answer" value="' +posibilitiesTwo[0] +'">').appendTo('#label-q2-pos1').after( ' ' + posibilitiesTwo[0]);
        });


      });

  });
  //var cat = localStorage.getItem("ls");
  //var myJSON = JSON.stringify(cat);
  //console.log("console.log.correctAnswerTableOut=",correctAnswersTable);
  triviaFormGroup.append(submitButton);
//  setAnswers();

};
//var createTrivia = function createTrivia(){

//   <div class="form-group"> <!-- Radio group !-->
//   <label class="control-label"><span id="q1" class="questionsBold"></span></label>
//   <div class="radio">
//     <label>
//     <input type="radio" name="q1-answer" value="pizza">
//     Pizza
//     </label>
//   </div>
//   <div class="radio">
//     <label>
//     <input type="radio"  name="q1-answer" value="hamburger">
//     Hamburgers
//     </label>
//   </div>
// </div>
// <div class="form-group"> <!-- Radio group !-->
// <label class="control-label"><span id="q2" class="questionsBold"></span></label>
// <div class="radio">
//   <label id="label-q2-pos1"></label>
// </div>
// <div class="radio">
//   <label id="label-q2-pos2"></label>
// </div>
// <div class="radio">
//   <label id="label-q2-pos3"></label>
// </div>
// <div class="radio">
//   <label id="label-q2-pos4"></label>
// </div>
// </div>

//};
var deadline = '2018-05-29';

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function setQuestions(){

   var question1 = $('#q1').text(questionsAPI.results[0].question);
   var question2 = $('#q2').text(questionsAPI.results[1].question);
   var question3 = $('#q3').text(questionsAPI.results[2].question);
   var question4 = $('#q4').text(questionsAPI.results[3].question);
   var question5 = $('#q5').text(questionsAPI.results[4].question);



}


function getScore(correctAnswersTable){
  var selectedAnswers = {};
  var answersTable = correctAnswersTable;
  //console.log("answersTable=",answersTable);
  var answersArray = [];
       // Get the selected score (assuming one was selected)
// correctAnswersTable
var theString = "";
var count = 0;
for (var property in correctAnswersTable) {

  count++;
//  console.log("property=",property);
  //var answer1 = $('input[name="'+property+'"]:checked').val();
//  selectedAnswers['answer'+count] = $('input[name="'+property+'"]:checked').val();
selectedAnswers[property] = $('input[name="'+property+'"]:checked').val();
//  theString = correctAnswersTable[property];
  // console.log("console.log.string=",theString);
}
//console.log("selectedAnswers",selectedAnswers);
var aProps = Object.getOwnPropertyNames(correctAnswersTable);
var bProps = Object.getOwnPropertyNames(selectedAnswers);
var correctCount = 0;
var incorrectCount = 0;
var summary = {title:"All Done!"};
for (var l = 0; l < aProps.length; l++) {
        var propName = aProps[l];

        // If values of same property are not equal,
        // objects are not equivalent
        if (correctAnswersTable[propName] == selectedAnswers[propName]) {
          correctCount++;
          //  console.log("correctAnswers=",correctCount);
            summary.correctAnswers = correctCount;
        }
        if (correctAnswersTable[propName] !== selectedAnswers[propName]) {
          incorrectCount++;
          //  console.log("incorrectAnswers=",incorrectCount);
            summary.incorrectAnswers = incorrectCount;
        }
    }
    console.log("summary=",summary);
    var contentHeading = summary.title;
    $( "#clockdiv" ).remove();
    var cardContent = $( "#cardContent" );
    //cardContent.remove();
     cardContent.empty();
     cardContent.append('<h1>'+summary.title+'</h1>');
     cardContent.append('<h2>Correct Answers:'+summary.correctAnswers+'</h2>');
     cardContent.append('<h2>Incorrect Answers:'+summary.incorrectAnswers+'</h2>');
    // $("h1").appendTo(cardContent);
    // $('<h2>Correct Answers:'+summary.correctAnswers+'</h2>').appendTo(cardContent);
    // $('<h2>Incorrect Answers:'+summary.incorrectAnswers+'</h2>').appendTo(cardContent);

         // var answer1 = $('input[name="q1-answer"]:checked').val();
         // var answer2 = $('input[name="q2-answer"]:checked').val();
         // var answer3 = $('input[name="q3-answer"]:checked').val();
         // var answer4 = $('input[name="q4-answer"]:checked').val();
         // var answer5 = $('input[name="q5-answer"]:checked').val();


   //     if( answer1 ) {
   //      // var answer1 = document.querySelector('input[name="q1-answer"]:checked').value;
   //       console.log("answer1");
   //       answersArray.push(answer1);
   //     }
   //     if(answer2) {
   //      // var answer2 = document.querySelector('input[name="q2-answer"]:checked').value;
   //       answersArray.push(answer2);
   //     }
   //     if(answer3) {
   //    //   var answer3 = document.querySelector('input[name="q3-answer"]:checked').value;
   //       answersArray.push(answer3);
   //     }
   //     if(answer4) {
   //      // var answer4 = document.querySelector('input[name="q4-answer"]:checked').value;
   //       answersArray.push(answer4);
   //     }
   //     if(answer5) {
   //       //var answer5 = document.querySelector('input[name="q5-answer"]:checked').value;
   //       answersArray.push(answer5);
   //     }
   //     console.log("console.log.answersArray=",answersArray);
   //     alert(answersArray);
   $('#exampleModal').on('shown.bs.modal', function () {
   $('#myInput').trigger('focus')
 })

}


function initializeClock(id, endtime){
  console.log("Initializing the Clock");
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = 'Time Remaining: ' +
                      'days: ' + t.days + ' ' +
                      'hours: '+ t.hours + ' ' +
                      'minutes: ' + t.minutes + ' ' +
                      'seconds: ' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
}
  //end stuff that was outside above

    console.log( "ready!" );
    createTrivia(numberOfQuestions);
    setQuestions();
  //  setAnswers();
    // if there's a cookie with the name myClock, use that value as the deadline
    if(document.cookie && document.cookie.match('myClock')){
      // get deadline value from cookie
      var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
    }

    // otherwise, set a deadline 10 minutes from now and
    // save it in a cookie with that name
    else{
      // create deadline 10 minutes from now
      var timeInMinutes = 10;
      var currentTime = Date.parse(new Date());
      var deadline = new Date(currentTime + timeInMinutes*60*1000);
      console.log("else.deadline:",deadline);
      // store deadline in cookie for future reference
      document.cookie = 'myClock=' + deadline + '; path=/; domain=.yourdomain.com';
    }
    initializeClock('clockdiv', deadline);
    // $('form').submit(false);
    var triviaForm = $("#triviaForm");
//     triviaForm.on('click', function() {
//     getScore(correctAnswersTable);
// });
  //   triviaForm.submit(function() {
  // //event.preventDefault();
  //     return getScore(correctAnswersTable);
  // });
});

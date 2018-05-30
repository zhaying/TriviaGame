// Wait for DOM to load
$(document).ready(function() {
    $.get("https://opentdb.com/api.php?amount=5", function(data, status) {
        function run() {
            console.log("questionsAPI=", questionsAPI);
            // Initializing variables
            var correctAnswersTable = {};
            // Get number of questions
            var numberOfQuestions = questionsAPI.results.length;
            // Randomize the position of answer selections
            function shuffle(anArray) {

                if (anArray.length > 2) {
                    for (let i = anArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [anArray[i], anArray[j]] = [anArray[j], anArray[i]];
                    } //end for

                    return anArray;

                } else {
                    return anArray;
                } //end if else
            }; //end shuffle


            // Draw out the trivia game to the UI
            function createTrivia(obj) {

                // Testing
                // fconsole.log("console.log.test=",obj);
                // Get the API results from the response
                var resultsArray = questionsAPI.results;
                // Set jquery names
                var triviaFormGroup = $("#triviaFormGroup");
                // Draw button on page
                var submitButton = $('<button name="submit" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Done</button>');

                // Attach onclick to the done button
                submitButton.on('click', function() {
                    getScore(correctAnswersTable);
                }); //end submitButton

                // Loop through results to draw all questions and answers to the UI
                resultsArray.forEach(function(element, i) {
                    // Add one to match question number
                    var i = i + 1;

                    // Testing
                    //var theQuestion = element.question;
                    //console.log("theQuestion=",theQuestion);

                    // Testing
                    // console.log(theQuestion);

                    // Creating form elements from api results
                    var questionFormGroup = $('<div class="questionFormGroup">');
                    questionFormGroup.addClass("form-group mb-0");

                    var labelWithQuestion = $('<label class="control-label"><span id="q' + i + '" class="questionsBold"></span></label>');
                    var radioDiv = $('<div class="radioDiv">');
                    radioDiv.addClass("radio mt-0 mb-3");

                    // Construct the html by appending html elements
                    triviaFormGroup.append(questionFormGroup);
                    questionFormGroup.append(labelWithQuestion);
                    radioDiv.appendTo(triviaFormGroup);

                    // Get incorrect answers
                    var incorrectAnswersArray = element.incorrect_answers;

                    // Initialize an array for correctAnswers
                    var correctAnswerArray = [];

                    // Assign elements to the array.
                    correctAnswerArray.push(element.correct_answer);

                    // Testing
                    // console.log("console.log.incorrect_answers=",incorrectAnswersArray);

                    correctAnswerArray.forEach(function(correctAnswer, k) {

                        // Testing
                        // console.log(k);
                        // console.log(correctAnswer);
                        correctAnswersTable['q' + i + '-answer'] = correctAnswer;
                        // Testing
                        // console.log("correctAnswersTable=",correctAnswersTable);
                        // Combine correct and incorrect answers to display on UI
                        var allAnswers = correctAnswerArray.concat(incorrectAnswersArray);
                        // Testing
                        // console.log("console.log.allAnswers=",allAnswers);
                        // Assing shuffled answers to variable
                        var shuffledAnswers = shuffle(allAnswers);

                        // Shuffle the answers
                        shuffledAnswers.forEach(function(anAnswer, j) {
                            // Start at one
                            var j = j + 1;
                            // Create input radio buttons
                            var radioLabel = $('<label class="pl-1">')
                                .html('<input id="input-q' + i + '-pos' + j + '" type="radio" name="q' + i + '-answer" value="' + anAnswer + '" >' + ' ' + anAnswer);
                            // Attach the radio label onto the div
                            radioLabel.appendTo(radioDiv);
                        }); //end shuffledAnswers.forEach

                    }); //end correctAnswerArray.forEach

                }); //end resultsArray.forEach

                // Testing
                // console.log("console.log.correctAnswerTableOut=",correctAnswersTable);
                // Attach button to the form
                triviaFormGroup.append(submitButton);

            }; //end createTrivia


            function getTimeRemaining(endtime) {
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            }; //end getTimeRemaining


            function setQuestions() {
                var question1 = $('#q1').html(questionsAPI.results[0].question);
                var question2 = $('#q2').html(questionsAPI.results[1].question);
                var question3 = $('#q3').html(questionsAPI.results[2].question);
                var question4 = $('#q4').html(questionsAPI.results[3].question);
                var question5 = $('#q5').html(questionsAPI.results[4].question);
            }; //end setQuestions


            function reportSummary(summary) {

                // Set Variables
                var cardContent = $("#cardContent");

                // Remove timer from UI
                $("#clockdiv").remove();

                // Empty container before adding summary of results
                cardContent.empty();

                // Testing
                // console.log("console.log.In.summary=", summary);

                // Set values of status of 0 for Timer timeout
                if (summary.status === 0) {
                    summary.correctAnswers = 0;
                    summary.incorrectAnswers = 0;
                    summary.unanswered = numberOfQuestions;
                    console.log("console.log.In.summary.status.0=", summary);
                } //end if 0

                if (summary.status === 1) {

                    // Check to see if two variables are numbers and sum them if so.
                    if ($.isNumeric(summary.correctAnswers) && $.isNumeric(summary.incorrectAnswers)) {
                        var subtotal = summary.correctAnswers + summary.incorrectAnswers;
                    } //end if numeric

                    // Assign a value to unanswered
                    summary.unanswered = numberOfQuestions - subtotal;

                    // Testing
                    // console.log("console.log.In.summary.status.0=", summary);
                } //end if 1

                uiSummaryDisplay(summary);

                function uiSummaryDisplay(summary) {
                    // Display summary values to the UI
                    cardContent.append('<h1>' + summary.title + '</h1>');
                    cardContent.append('<h2>Correct Answers:' + summary.correctAnswers + '</h2>');
                    cardContent.append('<h2>Incorrect Answers:' + summary.incorrectAnswers + '</h2>');
                    if (summary.status === 0) {
                        cardContent.append('<h2>Unanswered:' + summary.unanswered + '</h2>');
                    }
                }

            }; //end reportSummary


            function getScore(correctAnswersTable) {

                var selectedAnswers = {};
                var answersTable = correctAnswersTable;
                var answersArray = [];
                var theString = "";
                var count = 0;

                for (var property in correctAnswersTable) {
                    count++;
                    selectedAnswers[property] = $('input[name="' + property + '"]:checked').val();
                } //end for loop on correctAnswersTable

                // Testing
                // console.log("selectedAnswers",selectedAnswers);
                var aProps = Object.getOwnPropertyNames(correctAnswersTable);
                var bProps = Object.getOwnPropertyNames(selectedAnswers);
                var correctCount = 0;
                var incorrectCount = 0;

                var summary = {
                    title: "All Done!",
                    status: 1,
                    incorrectAnswers: 0,
                    correctAnswers: 0,
                    unanswered: 0
                }; //end summary obj

                for (var l = 0; l < aProps.length; l++) {
                    var propName = aProps[l];
                    // If values of same property are not equal, objects are not equivalent
                    if (correctAnswersTable[propName] == selectedAnswers[propName]) {
                        correctCount++;
                        // console.log("correctAnswers=", correctCount);
                        summary.correctAnswers = correctCount;
                    } //end if
                    if (correctAnswersTable[propName] !== selectedAnswers[propName]) {
                        incorrectCount++;
                        // console.log("incorrectAnswers=", incorrectCount);
                        summary.incorrectAnswers = incorrectCount;
                    } //end if
                } //end for

                // Run summary when user clicks done
                reportSummary(summary);

            }; //end getScore


            function initializeClock(id, endtime) {
                console.log("Initializing the Clock");
                var clock = document.getElementById(id);
                //var daysSpan = clock.querySelector('.days');
                var hoursSpan = clock.querySelector('.hours');
                var minutesSpan = clock.querySelector('.minutes');
                var secondsSpan = clock.querySelector('.seconds');

                function updateClock() {
                    var t = getTimeRemaining(endtime);
                    //daysSpan.innerHTML = t.days;
                    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                    if (t.total <= 0) {
                        clearInterval(timeinterval);
                        var summary = {
                            title: "Times up!",
                            status: 0,
                            incorrectAnswers: 0,
                            correctAnswers: 0,
                            unanswered: 0
                        }; //end summary obj
                        // Run summary when time runs out
                        reportSummary(summary);
                    }
                }
                updateClock(); // run function once at first to avoid delay
                var timeinterval = setInterval(updateClock, 1000);

            } //end initializeClock


            // DOM has finished loading
            console.log("ready!");
            // Run createTrivia
            createTrivia(numberOfQuestions);
            // Run setQuestions
            setQuestions();

            // if there's a cookie with the name myClock, use that value
            if (document.cookie && document.cookie.match('myClock')) {
                // get deadline value from cookie
                var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];

            } else { //Set a deadline from now and save it in a cookie
                // create deadline 5 minutes from now
                var timeInMinutes = 2.5;
                var currentTime = Date.parse(new Date());
                var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
                console.log("else.deadline:", deadline);
                // store deadline in cookie for future reference
                document.cookie = 'myClock=' + deadline + '; path=/; domain=.github.io';
            } //end if else

            // Run initializeClock
            initializeClock('clockdiv', deadline);

        }; //end run()

        console.log("console.log.status=", status);
        if (status === "success") {
            console.log("console.log.data=", data);
            var questionsAPI = data;
            run();
        } else {
            var obj = { // MOCK API Response for testing
                "response_code": 0,
                "results": [{
                        "category": "Science: Computers",
                        "type": "multiple",
                        "difficulty": "easy",
                        "question": "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
                        "correct_answer": "Apple",
                        "incorrect_answers": ["Microsoft", "Atari", "Commodore"]
                    },
                    {
                        "category": "Entertainment: Books",
                        "type": "multiple",
                        "difficulty": "medium",
                        "question": "What was the pen name of novelist, Mary Ann Evans?",
                        "correct_answer": "George Eliot",
                        "incorrect_answers": ["George Orwell", "George Bernard Shaw", "George Saunders"]
                    },
                    {
                        "category": "Entertainment: Video Games",
                        "type": "boolean",
                        "difficulty": "easy",
                        "question": "The ultimate phrase used by Pharah from Overwatch is: &quot;Justice rains from above!&quot;",
                        "correct_answer": "True",
                        "incorrect_answers": ["False"]
                    },
                    {
                        "category": "Animals",
                        "type": "boolean",
                        "difficulty": "medium",
                        "question": "The Platypus is a mammal.",
                        "correct_answer": "True",
                        "incorrect_answers": ["False"]
                    },
                    {
                        "category": "Entertainment: Books",
                        "type": "multiple",
                        "difficulty": "easy",
                        "question": "What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
                        "correct_answer": "Holden Caulfield",
                        "incorrect_answers": ["Fletcher Christian", "Jay Gatsby", "Randall Flagg"]
                    }
                ]
            }; //end obj obj
            console.log("console.log.obj=", obj);
            var questionsAPI = obj;
            run();
        } //end if else
    }); //end $.get jquery

}); //end document.ready

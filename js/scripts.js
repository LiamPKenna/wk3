// GLOBAL VARIABLES

// TEMPLATING
// function makeListItem(string) {
//   return `<span>${string} - </span>`
// }

function beepToHtml(beepArray) {
  // const beepListItems = beepArray.map(makeListItem);
  return `<p> ${beepArray.join(' - ')} </p>`
}

// MAIN LOGIC

function beepBoop(num, name) {
  var number = parseInt(num);
  if (isNaN(number)) return "Please Enter A Number!";
  const beepArray = [];
  for (let i = 0; i <= number; i++) {
    if (/[3]/.test(i)) {
      beepArray.push(`I'm sorry, ${name}. I'm afraid I can't do that.`);
    } else if (/[2]/.test(i)) {
      beepArray.push("Boop!");
    } else if (/[1]/.test(i)) {
      beepArray.push("Beep!");
    } else {
      beepArray.push(i);
    }
  }
  const beepHtml = beepToHtml(beepArray)
  return beepHtml;
}

// UI
$(document).ready(function() {

  $("#userInput").submit(function(event) {
    event.preventDefault();
    let userNumber = $("#userNumber").val();
    let userName = $("#userName").val();
    let beepBoopResults = beepBoop(userNumber, userName);
    $('#results').text('');
    $('#results').hide();
    $('#results').append(beepBoopResults);
    $('#results').fadeIn();
  });

});


/*
JavaScript business logic and user interface logic are separate.

Logic is broken down into "plain English" specs, listed in README.

Required functionality is in place by Friday deadline.

Project demonstrates understanding of this week's concepts. If prompted, you are able to discuss your code with an instructor using correct terminology.

Application implements a loop and works as expected.

All previous standards are in place (see below).

The user can use the app repeatedly and see new results.
*/

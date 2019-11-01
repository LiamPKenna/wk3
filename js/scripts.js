// GLOBAL VARIABLES
var backgroundColors = [
  "#362f40",
  "#402f32",
  "#2f4035",
  "#2f4035"
];

// TEMPLATING
function beepToHtml(beepArray) {
  return `<p> ${beepArray.join(' - ')} </p>`
}

const robotText = {
  1: "Beep!",
  2: "Boop!",
  3: function(name) {return `I'm sorry, ${name}. I'm afraid I can't do that.`}
};

// MAIN LOGIC
function beepBoop(number, name, reversed) {
  let beepArray = [];
  for (let i = 0; i <= number; i++) {
    if (/[3]/.test(i)) {
      beepArray.push(robotText[3](name));
    } else if (/[2]/.test(i)) {
      beepArray.push(robotText[2]);
    } else if (/[1]/.test(i)) {
      beepArray.push(robotText[1]);
    } else {
      beepArray.push(i);
    }
  }
  if (reversed) beepArray.reverse();
  let beepHtml = beepToHtml(beepArray)
  return beepHtml;
}

function randomizer(number) {
  if (number % 2 === 0) {
    return 0;
  } else if (number % 3 === 0) {
    return 1;
  } else if (number % 5 === 0) {
    return 2;
  } else {
    return 3;
  }
}

function toBinary(intInput) {
  if (isNaN(intInput)) return intInput;
  if (intInput < 2) return intInput;
  function getBitAndMatrix(number) {
    let matrix = [0,0];
    let currentMaxBit = 2;
    while ((currentMaxBit * 2) <= number) {
      currentMaxBit *= 2;
      matrix.push(0);
    }
    return [currentMaxBit, matrix];
  }
  let bitMatrixArray = getBitAndMatrix(intInput);
  let maxBit = bitMatrixArray[0];
  let matrix = bitMatrixArray[1];
  for (var i = 0; i < matrix.length; i++) {
    if (intInput >= maxBit) {
      matrix[i] = 1;
      intInput -= maxBit;
    };
    maxBit /= 2;
  };
  return parseInt(matrix.join(''));
};

function factorial(number) {
	function recursiveFactorial(number, a) {
		if (number < 1) return a;
  	return recursiveFactorial(number - 1, number * a);
	};
	return recursiveFactorial(number, 1);
};

// UI
$(document).ready(function() {

  $("#userInput").submit(function(event) {
    event.preventDefault();
    let userNumber = parseInt($("#userNumber").val());
    let userName = $("#userName").val();
    let reverse = $('#reverse').is(":checked");
    if (userName && userNumber) {
      let binary = toBinary(userNumber);
      $('#binary').text(`${userName} said ${binary}`);
      $('#binaryDiv').fadeIn();
    }
    let beepBoopResults = (userName && userNumber) ?
                          beepBoop(userNumber, userName, reverse) :
                          "<h2>PLEASE GIVE ME A NAME AND NUMBER!</h2>";
    let backgroundColor = backgroundColors[randomizer(userNumber)];
    $('body').css('background-color', backgroundColor);
    $('#roboResults').text('');
    $('#results').hide();
    $('#userInput').hide();
    $('#goAgain').fadeIn();
    $('#roboResults').append(beepBoopResults);
    $('#results').fadeIn();
  });

  $('#goAgain').click(function() {
    $('#goAgain').hide();
    $('#binaryDiv').hide();
    $('#results').hide();
    $('#userInput').fadeIn();
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

// GLOBAL VARIABLES
var backgroundColors = [
  "#362f40",
  "#402f32",
  "#2f4035",
  "#2f4035"
];


// TEMPLATING
function beepToHtml(beepArray) {
  return `<p> ${beepArray.join(' - ')} </p>`;
};

const robotText = {
  1: "Beep!",
  2: "Boop!",
  3: function(name) {return `I'm sorry, ${name}. I'm afraid I can't do that.`;}
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
  };
  if (reversed) beepArray.reverse();
  let beepHtml = beepToHtml(beepArray);
  return beepHtml;
};

function randomizer(number) {
  if (Math.round(Math.random()) === 0 && number) {
    if (number % 2 === 0) {
      return 0;
    } else if (number % 3 === 0) {
      return 1;
    } else if (number % 5 === 0) {
      return 2;
    } else {
      return 3;
    }
  } else {
    let random = Math.round(Math.random() * 3);
    return random;
  }
};

function toBinary(number) {
  if (number < 2) return number;
  function getBitAndMatrix(number) {
    let matrix = [0,0];
    let currentMaxBit = 2;
    while ((currentMaxBit * 2) <= number) {
      currentMaxBit *= 2;
      matrix.push(0);
    };
    return [currentMaxBit, matrix];
  };
  let bitMatrixArray = getBitAndMatrix(number);
  let maxBit = bitMatrixArray[0];
  let matrix = bitMatrixArray[1];
  for (var i = 0; i < matrix.length; i++) {
    if (number >= maxBit) {
      matrix[i] = 1;
      number -= maxBit;
    };
    maxBit /= 2;
  };
  return `Binary: ${matrix.join('')}`;
};

function factorial(number) {
	function recursiveFactorial(number, accumulator) {
		if (number < 1) return accumulator;
  	return recursiveFactorial(number - 1, number * accumulator);
	};
	return `Factorial: ${recursiveFactorial(number, 1)}`;
};

function digitSwap(number) {
  let numberString = number + '';
  if (numberString.length < 2) return `Backwards it's still ${numberString}`;
  let digitArray = numberString.split('');
  let resultArray = [];
  digitArray.forEach(function(digit) {
    resultArray.unshift(digit);
  });
  return `Digit Swapped: ${resultArray.join('')}`;
}

function randomMath(number) {
  let results = [
    `Square Root: ${Math.sqrt(number)}`,
    `Cube Root: ${Math.cbrt(number)}`,
    `Cubed: ${number * number * number}`,
    `Cosine: ${Math.cos(number)}`
  ];
  return results[Math.round(Math.random() * 3)];
}

const bonusFunctions = [
  toBinary,
  factorial,
  randomMath,
  digitSwap
];


// UI
$(document).ready(function() {

  $("#userInput").submit(function(event) {
    event.preventDefault();
    let userNumber = parseInt($("#userNumber").val());
    let userName = $("#userName").val();
    let reverse = $('#reverse').is(":checked");
    let randomNumber = randomizer(userNumber);
    if (userName && userNumber) {
      let bonus = bonusFunctions[randomNumber](userNumber);
      $('#bonus').text(`${userName} said ${userNumber} (${bonus})`);
      $('#bonusDiv').fadeIn();
    };
    let beepBoopResults = (userName && userNumber) ?
                          beepBoop(userNumber, userName, reverse) :
                          "<h2>PLEASE GIVE ME A NAME AND NUMBER!</h2>";
    let backgroundColor = backgroundColors[randomNumber];
    $('body').css('background-color', backgroundColor);
    $('#roboResults').text('');
    $('#userInput').hide();
    $('#goAgain').fadeIn();
    $('#roboResults').append(beepBoopResults);
    $('#results').hide().fadeIn();
    if (userName && userNumber) $('.footer').text('').append(beepBoopResults).fadeIn();
  });

  $('#goAgain').click(function() {
    $('#goAgain').hide();
    $('#bonusDiv').hide();
    $('#results').hide();
    $('.footer').hide();
    $('#userInput').fadeIn();
  });

});

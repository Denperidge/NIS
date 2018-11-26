// Function goal: return a random number between min and max, max excluded
function random(min, max) {
    // Since I cannot write it any shorter than from the source,
    // copied from https://www.w3schools.com/js/js_random.asp
    return Math.floor(Math.random() * (max - min)) + min;
}

// Function goal: generate a new exercise
function NewExercise() {
    Reset(); // Reset the table

    var decimalValue = document.getElementById("decimalValue");
    // Remove the CalculateBits onclick used in calculator.js
    decimalValue.removeEventListener("input", CalculateBits);
    // and by default, do not allow the user to modify the decimal value
    decimalValue = document.getElementById("decimalValueClone");
    decimalValue.removeEventListener("input", CalculateBits);

    var checkAnswer = document.getElementById("checkAnswer");
    checkAnswer.style.display = "initial";
    // Set the CheckAnswer button to check the asked decimal value
    checkAnswer.addEventListener("click", CheckAskedDecimalValue);
    // Show the checkAnswer button

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        // By default, do not allow the user to modify the bits
        bit.disabled = true;
        // Remove the ChangeBit onclick used in calculator.js
        bit.removeEventListener("click", ChangeBit);
        // Add the ChangeBit onclick used in this file
    }

    BinaryToDecimal();
}

// Function goal: generate an exercise that gives a random bit value,
// asking the user to enter the corresponding decimal value
function BinaryToDecimal() {
    // Randomly put 0's and 1's in the bits
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length / 2; i++) {
        var randomNumber = random(0, 2);
        var bitsToChange = document.querySelectorAll(".bit[value='" + bits[i].value + "']");
        for (var j = 0; j < bitsToChange.length; j++) {
            var bit = bitsToChange[j]; // Get the clicked bit
            // Check the bits' value, and change it accordingly
            bit.innerHTML = randomNumber;
        }
    }
}

// Function goal: check if the decimal value the user
// entered equals the bit value given by the exercise
function CheckAskedDecimalValue() {
    // Get the decimal value the user entered into the input
    var answer = parseInt(document.getElementById("decimalValue").value);

    correctValue = 0; // Calculate the correct decimal value, start from 0
    // Loop through all the bits -
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length/2; i++) {
        var bit = bits[i];
        // - and if their value is 1, append the value of
        // their value property to the total correct decimal value
        if (bit.innerHTML == "1") correctValue += parseInt(bit.value);
    }

    // If the correct decimal value equals what the user entered,
    // the exercise is done correctly
    if (correctValue == answer) alert("Correct!");
    // Otherwise, show the user the correct answer
    else alert("Incorrect! The answer you gave was " + answer + ", but the correct answer is " + correctValue + "!");

    // Start a new exercise now that this one is finished
    NewExercise();
}

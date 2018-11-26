// Function goal: remove event listeners from practice.js and add
// event listeners for the functions in this file, allowing the table
// to work as a calculator
function SetupCalculator() {
    Reset(); // Reset the table

    var decimalValue = document.getElementById("decimalValue");
    // Allow the user to freely enter the decimal value
    decimalValue.disabled = false;
    // When the decimal value is changed, call CalculateBits
    decimalValue.addEventListener("input", CalculateBits);
    decimalValue = document.getElementById("decimalValueClone");
    decimalValue.disabled = false;
    decimalValue.addEventListener("input", CalculateBits);

    // Hide the checkAnswer button
    document.getElementById("checkAnswer").style.display = "none";

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        bit.disabled = false; // Enable the bit buttons
        // Remove the ChangeBit onclick used in practice.js
        try {
            bit.removeEventListener("click", ChangeBitPractice);
        } catch {
            
    }
        // Add the ChangeBit onclick used in this file
        bit.addEventListener("click", ChangeBit);
    }
}

// Function goal: change the value of a bit from 0 to 1 or vica versa,
// calculating the decimal value afterwards
function ChangeBit(e) {
    // Check the bits' value, and change it accordingly
    var bitsToChange = document.querySelectorAll(".bit[value='" + e.srcElement.value + "']");
    for (var i = 0; i < bitsToChange.length; i++) {
        var bit = bitsToChange[i]; // Get the clicked bit
        // Check the bits' value, and change it accordingly
        if (bit.innerHTML == "0") bit.innerHTML = "1";
        else bit.innerHTML = "0";
    }
    CalculateDecimalValue(); // Calculate the decimal value based of the bits
}

// Function goal: calculate the decimal value 
// when one of the bit values is changed
function CalculateDecimalValue() {
    value = 0; // Start from 0
    // Loop through all the bits -
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length / 2; i++) {
        var bit = bits[i];
        // - and if their value is 1, append the value of
        // their value property to the total decimal value
        if (bit.innerHTML == "1") value += parseInt(bit.value);
    }
    // Set the value of the decimalValue input to the calculated value
    document.getElementById("decimalValue").value = value;
    document.getElementById("decimalValueClone").value = value;
}

// Function goal: calculate the bits
// when the decimal value is changed
function CalculateBits() {
    // Get the decimal value from the input
    value = parseInt(document.getElementById("decimalValue").value);

    // Loop through the bits top to bottom (thus 128 to 1)
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length / 2; i++) {
        var bit = bits[i];
        var bitValue = parseInt(bit.value);
        // If the bit value can be subtracted from
        // the current leftover decimal value -
        if (value - bitValue >= 0) {
            value -= bitValue; // - subtract it -
            var bitsToChange = document.querySelectorAll(".bit[value='" + bitValue + "']");
            for (var j = 0; j < bitsToChange.length; j++)
                bitsToChange[j].innerHTML = "1"; // - and set the bit value to 1
        }
        // If it cannot be subtracted, set the bit value to 0
        else {
            var bitsToChange = document.querySelectorAll(".bit[value='" + bitValue + "']");
            for (var j = 0; j < bitsToChange.length; j++) 
                bitsToChange[j].innerHTML = "0";
        }
    }
}

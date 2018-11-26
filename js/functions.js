// Function goal: assign functions to the buttons next to the table
// and setup the default mode (calculator)
function UISetup() {
    // Assign ChangeTableStyle (switching between dynamic, landscape and portrait)
    // on the click event of those buttons
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].addEventListener("click", ChangeTableStyle);

    // Assign ChangeMode (switching between calculator and practice)
    // on the click event of those buttons as well
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].addEventListener("click", ChangeMode);

    document.getElementById("decimalValue").addEventListener("input", ChangeInput);
    document.getElementById("decimalValueClone").addEventListener("input", ChangeInput);
    
    // This function is called after everything has been loaded in. At
    // this point, set the tablestyle and mode to what the user had before

    // However, if GetPreferences returns false, something went wrong
    // whilst fetching from localStorage. This presumably means that the
    // user hasn't been on this page before. If so, setup the default mode
    // (calculator) to make the table usable

    // (tableStyle doesn't need a fallback, as it will
    //  default to dynamic due to how the HTML is coded)
    if (!GetPreferences()) {
        SetupCalculator();  // Calculator is default mode
    }
}

// Function goal: set decimal value and bits to 0
function Reset() {
    document.getElementById("decimalValue").value = 0;
    document.getElementById("decimalValueClone").value = 0;
    
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) bits[i].innerHTML = "0";
}

function ChangeInput(e){
    var value = e.srcElement.value;
    var test = document.getElementById("decimalValue")
    test.value = value;
    var test = document.getElementById("decimalValueClone");
    test.value = value;
    
}

// Function goal: allow the user to switch the table style
function ChangeTableStyle(e) {
    // Enable all buttons -
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++) {
        tableStyles[i].disabled = false;
        tableStyles[i].classList.add("teal");
        tableStyles[i].classList.add("lighten-4");
    }

    // - except the one of the currently pressed button/activated style
    var selectedTableStyle = e.srcElement;
    selectedTableStyle.disabled = true;
    selectedTableStyle.classList.remove("teal");
    selectedTableStyle.classList.remove("lighten-4");

    // Get the CSS HTML elements
    var portrait = document.getElementById("portrait");
    var landscape = document.getElementById("landscape");

    switch (selectedTableStyle.value) {
        // If dynamic is selected -
        case "dynamic":
            // - enable the CSS for portrait and landscape -
            landscape.className = "hide-on-med-and-down";
            portrait.className = "hide-on-large-only";
            landscape.style.display = "";
            portrait.style.display = "";
            break;
        // If landscape is selected, force the landscape style by -
        case "landscape":
            landscape.style.display = "";
            portrait.style.display = "none";
            landscape.className = "";
            break;
        // If portrait is selected, force portrait.
        // This is done in the same manner as above for landscape
        case "portrait":
            portrait.style.display = "";
            landscape.style.display = "none";
            portrait.className = "";
            break;
    }

    // After changing the preferred tableStyle, save that tableStyle to preferences
    SavePreferences();
}

// Function goal: allow the user to switch between calculator and practice mode
function ChangeMode(e) {
    // Enable all mode buttons -
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++) {
        modes[i].disabled = false;
        modes[i].classList.add("teal");
        modes[i].classList.add("lighten-4");
    }

    // - and disable the button of the currently selected mode
    var selectedMode = e.srcElement;
    selectedMode.disabled = true;
    selectedMode.classList.remove("teal");
    selectedMode.classList.remove("lighten-4");

    switch (e.srcElement.value) {
        // If the calculator button has been pressed -
        case "calculator":
            // - setup calculator, which allows the user to
            // freely modify the decimal value and bits.
            // When the decimal value is modified, the bits
            // are modified to equal to the decimal value, and
            // vica versa
            SetupCalculator();
            break;
        // If the practice button has been pressed -
        case "practice":
            // - start a new exercise, either giving bits 
            // or a decimal value, and asking the user to
            // calculate the other
            NewExercise();
            break;
    }

    // Save the last mode the user was using in localStorage
    SavePreferences();
}

// Function goal: get the user preferences from localstorage,
// and apply them by triggering the button click events.
// On success, return true. On fail, return false
function GetPreferences() {
    try {
        // Get the value of the to-press-button from localStorage
        var tableStyle = localStorage.getItem("tableStyle")
        var mode = localStorage.getItem("mode");

        // Trigger the click event of the button that has that value
        document.querySelector(".tableStyle[value=" + tableStyle + "]").click();
        document.querySelector(".mode[value=" + mode + "]").click();

        // If the code got this far, everything went well. Return true. -
        return true;
    }
    catch {
        // - Else, return false
        return false;
    }
}

// Function goal: save the user preferences to localStorage
function SavePreferences() {
    // Get the currently disabled (and thus selected) tableStyle and mode button
    var tableStyle = document.querySelector(".tableStyle[disabled]").value;
    var mode = document.querySelector(".mode[disabled]").value;
    // Save their values to localStorage
    localStorage.setItem("tableStyle", tableStyle);
    localStorage.setItem("mode", mode);
}

UISetup();

document.addEventListener("DOMContentLoaded", () => {
    const maxDigits = 3;
    const keyDisplay = document.getElementById("key");
    const guessDisplay = document.getElementById("guess");
    const tbodyStat = document.getElementById("tbody-stat");
    const digitButtons = document.querySelectorAll(".digit");
    const newButton = document.getElementById("new");

    // Create an instance of the BaseballGame class
    const game = new BaseballGame(maxDigits);

    // Update the secret key display with digits separated by commas
    function updateKeyDisplay() {
        keyDisplay.textContent = game.secretKey.join(", ");
    }

    // Update the current guess display with digits separated by commas
    function updateGuessDisplay() {
        guessDisplay.textContent = game.currentGuess.join(", ");
    }

    // Update the stats table with the current guess, balls, and strikes
    function updateStatsTable(balls, strikes) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${game.currentGuess.join(", ")}</td>
            <td>${balls}</td>
            <td>${strikes}</td>
        `;
        tbodyStat.appendChild(row);
    }

    // Check the user's guess and display the result
    function checkGuess() {
        const { strikes, balls } = game.checkGuess();

        // Update stats table
        updateStatsTable(balls, strikes);

        // Check if the user wins (maxDigits strikes means correct guess)
        if (strikes === maxDigits) {
            endGame(true); // End the game with success
            alert("Strike Out ---\nThe Key was " + game.secretKey.join(", ") + "\n<New> to play again");
        } else {
            // Clear the guess after each incorrect attempt
            game.currentGuess = [];
            updateGuessDisplay();

            // Re-enable all digit buttons for the next guess attempt
            digitButtons.forEach(button => {
                button.disabled = false;
                button.classList.remove("disabled"); // Remove the "disabled" class
            });
        }
    }

    // End the game by disabling all digit buttons except "New"
    function endGame(isWin = false) {
        // Disable all digit buttons
        digitButtons.forEach(button => {
            button.disabled = true;
            button.classList.add("disabled"); // Add disabled class for visual effect
        });

        // Keep the "New" button enabled
        newButton.disabled = false;
    }

    // Initialize a new game
    function newGame() {
        game.newGame();
        updateKeyDisplay();
        updateGuessDisplay();
        tbodyStat.innerHTML = ""; // Clear the stats table

        // Enable all digit buttons for the new game
        digitButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove("disabled"); // Remove the "disabled" class
        });
    }

    // Event listeners for digit buttons
    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            const digit = Number(button.textContent);

            // Add the digit to the guess and check if the guess is complete
            if (game.addToGuess(digit)) {
                updateGuessDisplay();
                button.disabled = true; // Disable the button after it’s clicked
                button.classList.add("disabled"); // Add the "disabled" class for visual effect

                // Check the guess after it's complete
                checkGuess();
            } else {
                updateGuessDisplay(); // Update the guess display even if not complete
            }
        });
    });

    // Event listener for the "New" button
    newButton.addEventListener("click", newGame);

    // Start the first game
    newGame();
});

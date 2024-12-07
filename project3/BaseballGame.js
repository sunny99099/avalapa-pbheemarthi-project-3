class BaseballGame {
    constructor(maxDigits = 3) {
        this.maxDigits = maxDigits;
        this.secretKey = [];
        this.currentGuess = [];
    }

    // Generate a random secret key with unique digits
    generateSecretKey() {
        const digits = Array.from({ length: 10 }, (_, i) => i); // [0-9]
        digits.sort(() => Math.random() - 0.5); // Shuffle
        this.secretKey = digits.slice(0, this.maxDigits);
    }

    // Check the user's guess against the secret key
    checkGuess() {
        let strikes = 0;
        let balls = 0;

        this.currentGuess.forEach((digit, index) => {
            if (this.secretKey.includes(digit)) {
                if (this.secretKey.indexOf(digit) === index) {
                    strikes++;
                } else {
                    balls++;
                }
            }
        });

        return { strikes, balls };
    }

    // Reset the game state for a new game
    newGame() {
        this.generateSecretKey();
        this.currentGuess = [];
    }

    // Update the current guess and return true if it's complete
    addToGuess(digit) {
        if (this.currentGuess.length < this.maxDigits && !this.currentGuess.includes(digit)) {
            this.currentGuess.push(digit);
            return this.currentGuess.length === this.maxDigits;
        }
        return false;
    }
}

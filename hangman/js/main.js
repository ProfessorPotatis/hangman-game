window.Hangman = (function(){
    'use strict';

    var hangman = {

        // Get all elements as their id
        "partAsElement": {
            "hill":     document.getElementById('hang_hill'),
            "gallow":   document.getElementById('hang_construction'),
            "body":     document.getElementById('hang_body'),
            "rightarm": document.getElementById('hang_rightarm'),
            "leftarm":  document.getElementById('hang_leftarm'),
            "rightleg": document.getElementById('hang_rightleg'),
            "leftleg":  document.getElementById('hang_leftleg'),
            "rope":     document.getElementById('hang_rope'),
            "head":     document.getElementById('hang_head')
        },


        // Create an array with all valid parts
        "validParts": [
            "hill",
            "gallow",
            "rope",
            "head",
            "body",
            "rightarm",
            "leftarm",
            "rightleg",
            "leftleg"
        ],


        // Create an array with all words
        "words": [
            "conquest",
            "bunny",
            "plant",
            "cucumber",
            "earth",
            "astronaut",
            "bicycle",
            "sweatshirt",
            "pillowcase",
            "gallow"
        ],


        /**
         * Check if part a valid part, writes error message to console if the part is invalid.
         *
         * @param string part Name of the part to check.
         *
         * @returns boolean true if valid part, else false.
         */
        "isValid": function (part) {

            if (this.validParts.indexOf(part) === -1) {
                console.log("The part is not valid: " + part);
                return false;
            }
            console.log("The part is valid: " + part);
            return true;

        },


        /**
         * Hide a part.
         *
         * @param string part Name of the part to hide.
         *
         * @returns void.
         */
        "hide": function (part) {

            if (this.isValid(part)) {
                console.log("Hiding part: " + part);
                this.partAsElement[part].style.display = "none";
            }

        },


        /**
         * Show a part.
         *
         * @param string part Name of the part to show.
         *
         * @returns void.
         */
        "show": function (part) {

            if (this.isValid(part)) {
                console.log("Showing part: " + part);
                this.partAsElement[part].style.display = "inline";
            }

        },


        "wordlist": function () {
            return console.log("Here is the wordlist: " + hangman.words);
        },


        "peek": function() {
            return console.log("Cheater! The secret word is: " + activeWord);
        }

    };

    console.log("You can now use the hangman object as a part of the window-object. Try\n\nwindow.Hangman.hide('gallow')\nwindow.Hangman.show('gallow')\n\nHere are all the parts you can work on.");
    console.log(hangman.validParts);


    var characters = document.getElementsByClassName('char');
    var guessed = document.getElementById('guessed');
    var word = document.getElementById('theWord');
    var hiddenBtn = document.getElementsByClassName('hidden');
    var message = document.getElementById('message');
    var activeWord = "";
    var counter = 0;
    var rightGuess = [];


    for (var i = 0; i < characters.length; i++) {
        characters[i].addEventListener("click", function() {
            guessed.innerHTML += this.value + ', ';
            if (this.disabled === false) {
                this.disabled = true;
            }
            else {
                this.disabled = true;
            }


            if (activeWord.indexOf(this.value) > -1) {
                var x = getAllOccurences(activeWord, this.value);

                for (var i = 0; i < x.length; i++) {
                    var index = x[i];
                    rightGuess[index] = this.value;

                    word.innerHTML = word.innerHTML.replaceAt(index, rightGuess[index]);
                }

                if (word.innerHTML == activeWord) {
                    for (var o = 0; o < characters.length; o++) {
                        characters[o].disabled = true;
                    }
                    hiddenBtn[0].style.visibility = 'visible';
                    message.innerHTML = "You won the game!";
                }
            }
            else {
                if (counter < 8) {
                    hangman.show(hangman.validParts[counter]);
                    counter += 1;
                }
                else {
                    hangman.show(hangman.validParts[counter]);
                    for (var y = 0; y < characters.length; y++) {
                        characters[y].disabled = true;
                    }
                    hiddenBtn[0].style.visibility = 'visible';
                    message.innerHTML = "Game over!";
                }
            }
        });
    }


    function randomiseWord() {
        var randNr = Math.floor(Math.random()*(11 - 1));
        for (var i = 0; i < hangman.words.length; i++) {
            activeWord = hangman.words[randNr];
        }
        var str = activeWord;
        for (var t = 0; t < activeWord.length; t++) {
            word.innerHTML += str.replace(activeWord, "-");
        }
        return activeWord;
    }
    randomiseWord();


    function hideHangman() {
        for (var i = 0; i < hangman.validParts.length; i++) {
            hangman.hide(hangman.validParts[i]);
        }
    }
    hideHangman();


    function getAllOccurences(arr, value) {
        var occurences = [], i = -1;

        while ((i = arr.indexOf(value, i+1)) != -1) {
            occurences.push(i);
        }
        return occurences;
    }


    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    };


    return hangman;

    //console.log('Sofia Kristiansens Sandbox is ready!');
})();

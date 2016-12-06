/* */

/**
 * Base class
 */
class WordUtils {
    /**
     * Default constructor
     * 
     * @param input String from text area
     */
    constructor(input){
        this.text = input;
        this.exclusion = [
            ",", "\\.", "\\?", ";",
            " \\(", "\\) ",
            " a ", " de ", " e ",
            " el ", " me ", " la ", " le ", "los",
            " o ", " que ", " se ", " u ", " y "
        ];
    }

    /**
     * Clean input text, sorting by number of appearences.
     */
    cleanText(){
        // First, all to lower case
        this.text = this.text.toLowerCase();

        // Second replace digits
        this.text = this.text.replace(/(\d*\s)/g, " ");

        // Third, apply filter list
        for(const value of this.exclusion){
            this.text = this.text.replace(new RegExp(value, 'g'), " ");
        }

        // Fourth, split
        return this.text.split(/\s+/);;
    }

    /**
     * Sort resulting array
     */
    group(){
        let cleanedText = this.cleanText();
        let map = new Map();

        // For each word, set its value in the map, if the map already have that key
        // Delete and re-add the key with the new count value
        for(const word of cleanedText){
            if(map.has(word)){
                let count = map.get(word);

                count++;                
                map.set(word, count);
            }else{
                map.set(word, 1);
            }
        }

        return map;
    }

    /**
     * Sort the map, sending the elements to a new array, then calling array.sort, then reversing.
     */
    sort(){
        var map = this.group();
        var sortedArray = [];

        map.forEach(function(value, key){
            sortedArray.push({"word": key, "count": value});
        });

        return sortedArray.sort(this.compare);
    }

    /**
     * Compare word:count objects.
     * 
     * @param a object to compare
     * @param b object to compare
     */
    compare(a, b){
        return b.count - a.count;
    }

    get result(){
        // Clean, then return
        return this.sort();                        
    }
}

class UIManager {
    /**
     * Default constructor          
     */
    constructor(){
        this.input;
    }

    /**
     * 
     */
    get processInput(){
        this.input = document.getElementById("text").value;
        let utils = new WordUtils(this.input);

        let result = "";

        for(const element of utils.result){
            let output = `<p>Palabra: ${element.word.replace(/\b\w/g, l => l.toUpperCase())}: ${element.count}`;

            result += output;
        }

        document.write(result);
    }
}

var ui = new UIManager();
var el = document.getElementById("search-btn");

el.addEventListener("click", ui.processInput, false);
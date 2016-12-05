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
            " el ", " me ", " le ", " o ",
            " que ", " se ", " u ", " y "
        ];
    }

    /**
     * Clean input text, sorting by number of appearences.
     */
    cleanText(){
        // First replace digits
        this.text = this.text.replace(/(\d*\s)/g, " ");

        // Second, apply filter list
        for(const value of this.exclusion){
            this.text = this.text.replace(new RegExp(value, 'g'), " ");
        }

        // Third, split
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
     * Sort the map
     */
    sort(){
        var iterator = this.group().entries();
    }

    get result(){
        // Clean, then return
        return this.group();                        
    }
}

// Testing
var input = document.getElementById("text").value
var utils = new WordUtils(input);

console.log(utils.result);
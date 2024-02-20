// index.js
import {Alice, Bob, Eve} from './communicators.js';

const welcome = `
 _     _  _______  ___      _______  _______  __   __  _______    _______  _______ 
| | _ | ||       ||   |    |   ____||       ||  |_|  ||       |  |       ||       |
| || || ||    ___||   |    |  |     |   _   ||       ||    ___|  |_     _||   _   |
|       ||   |___ |   |    |  |     |  | |  ||       ||   |___     |   |  |  | |  |
|       ||    ___||   |___ |  |     |  |_|  ||       ||    ___|    |   |  |  |_|  |
|   _   ||   |___ |       ||  |____ |       || ||_|| ||   |___     |   |  |       |
|__| |__||_______||_______||_______||_______||_|   |_||_______|    |___|  |_______|
 _______  _______  _______  __    _         _______  _______  _     _  __    _     
|       ||       ||       ||  |  | |       |       ||       || | _ | ||  |  | |    
|    ___||   _   ||   _   ||   |_| | ____  |_     _||   _   || || || ||   |_| |    
|   | __ |  | |  ||  | |  ||       ||____|   |   |  |  | |  ||       ||       |    
|   ||  ||  |_|  ||  |_|  ||  _    |         |   |  |  |_|  ||       ||  _    |    
|   |_| ||       ||       || | |   |         |   |  |       ||   _   || | |   |    
|_______||_______||_______||_|  |__|         |___|  |_______||__| |__||_|  |__|    
`

console.log(welcome);

let bob = new Bob();
let alice = new Alice();
let eve = new Eve();

function fullTest(K, N) {
    const puzzles = alice.createPuzzles(K, N);
    console.time("Alice's generation took");
    console.log(`Alice created the following Puzzles: \n${puzzles}`);
    console.timeEnd("Alice's generation took");
    console.log();

    console.time("Bob's choice took");
    const chosenPuzzle = bob.choosePuzzle(puzzles);
    console.log(`Bob chose the following puzzle: ${chosenPuzzle}`);
    console.timeEnd("Bob's choice took");
    console.log();

    console.time("Alice's key search took");
    const alice_encKey = alice.findKey(chosenPuzzle[0]);
    console.log(`Alice found that for serial number: ${chosenPuzzle[0]} the encryption key is: ${alice_encKey}`);
    console.timeEnd("Alice's key search took");
    console.log();
    
    console.time("Eve's key search took");
    const eve_encKey = eve.findKey(puzzles, chosenPuzzle[0]);
    console.log(`Eve found that for serial number: ${chosenPuzzle[0]} the encryption key is: ${eve_encKey}`)
    console.timeEnd("Eve's key search took");
}

fullTest(16, 16);
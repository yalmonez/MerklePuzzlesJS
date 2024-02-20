// communicators.js
import {xorBits, xorPuzzle, solvePuzzle} from './utils.js';

export class Alice {
    constructor() {
        this.puzzles = [];
        this.puzzleHashTable = new Map();
    }

    shufflePuzzle(puzzle) {
        for (let i = puzzle.length - 1; i > 0; i--) {
            for (let j = puzzle[i].length - 1; j > 0; j--) {
                const rowIndex = Math.floor(Math.random() * (i + 1));
                const colIndex = Math.floor(Math.random() * (j + 1));
                [puzzle[i][j], puzzle[rowIndex][colIndex]] = [puzzle[rowIndex][colIndex], puzzle[i][j]];
            }
        }
        return puzzle;
    }

    getPuzzles() {
        // return deep copy of puzzles hashmap
        return new Map(this.puzzleHashTable);
    }

    findKey(puzzle) {
        const key = xorPuzzle(puzzle);
        if (this.puzzleHashTable.has(key)) {
            return this.puzzleHashTable.get(key);
        } else {
            // console.error("Puzzle not found in puzzleHashTable");
        }
    }

    createPuzzles(numOfPuzzles, arrayLength) {
        let serialNumber;
        let currArray;
        let puzzles = [];
        let rangeOfNumbers = numOfPuzzles ** 4;
    
        for (let i = 0; i < numOfPuzzles; i++) {
            let currPuzzle;
            let prevNum = 0;
            currPuzzle = [];

            for (let j = 0; j < arrayLength; j++) {
                currArray = [];

                for (let g = 0; g < arrayLength; g++) {
                    let upperLimit = (rangeOfNumbers + 1) / arrayLength * (j + 1) - prevNum;
                    let lowerLimit = prevNum;

                    currArray[g] = Math.floor(Math.random() * (upperLimit) + lowerLimit);
                    prevNum = currArray[g];
                }
                
                if (j === 0) {
                    serialNumber = xorPuzzle([currArray]);
                    if (this.puzzleHashTable.has(serialNumber)) {
                        // console.error("Key already exists, regenerating puzzle");
                        currArray = [];
                        j = 0;
                        i -= 1;
                    }
                }
                currPuzzle.push(currArray);             
            }
            let encryptionKey = currPuzzle.slice(1).map(row => xorPuzzle([row])).join('');
            //console.log(encryptionKey);
            

            if (currPuzzle[0].length !== 0) {
                this.puzzleHashTable.set(serialNumber,encryptionKey);
                puzzles.push(currPuzzle);
            }
        }

        return puzzles;
    }
}

export class Bob {

    choosePuzzle(puzzles) {
        const puzzleNum = Math.floor(Math.random() * puzzles.length);
        console.log(`\nBob chose the following puzzle: ${puzzles[puzzleNum]}`);
        return solvePuzzle(puzzles[puzzleNum]);
    }
}


export class Eve {

    findKey(puzzles, serialNumber) {
        let counter = 0;
        for (let puzzle of puzzles) {
            counter++;
            const solvedPuzzle = solvePuzzle(puzzle);
            if (solvedPuzzle[0] == serialNumber) {
                // console.log("WINNER");
                // console.log(`Puzzles tried: ${counter}`);
                return solvedPuzzle[1];
            }
        }
        return "Not Found"
    }
}

let alice = new Alice();
let bob = new Bob();
let eve = new Eve();

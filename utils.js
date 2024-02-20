// utils.js

export function xorBits(char) {
    let output = "";
    const binary = char.toString(2).padStart(4, "0");
    let series = parseInt(binary[0], 2);
    
    for (let k = 1; k < binary.length; k++) {
        series ^= parseInt(binary[k], 2);
    }
    output += series;
    return output;
}

export function xorPuzzle(puzzle) {
    var result = "";
    for (let row of puzzle) {
        let output = "";
    
        for (const char of row) {
            output += xorBits(char);
        }
    
        result += output;
    }
    
    return result;
}

export function solvePuzzle(puzzle) {
    let flattenedPuzzle = puzzle.flat(1).toSorted((a, b) => a - b);
    let serialNumber = flattenedPuzzle.slice(0, puzzle.length);
    let encryptionKey = flattenedPuzzle.slice(puzzle.length, flattenedPuzzle.length);

    serialNumber = xorPuzzle([serialNumber]);
    encryptionKey = xorPuzzle([encryptionKey]);

    return [serialNumber, encryptionKey];
}
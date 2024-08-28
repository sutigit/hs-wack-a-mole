export function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randomMoleExcl(exclude: number[]): number {
    // Choose random number from array excluding numbers that have already been chosen
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const availableOptions = options.filter((option) => !exclude.includes(option));
    return availableOptions[Math.floor(Math.random() * availableOptions.length)];
}

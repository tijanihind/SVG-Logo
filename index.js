import inquirer from 'inquirer';
import fs from 'fs';

async function getUserInput() {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters:',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (color keyword or hexadecimal number):',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (color keyword or hexadecimal number):',
        },
    ]);

    return response;
}

async function generateSVG({ text, textColor, shape, shapeColor }) {
    // const svgModule = (await import('svg'));
    // const SVG = svgModule.default;
    // const draw = new SVG(300, 200);
    let svgShape = '';

    if (shape === 'circle') {
        svgShape = '<circle cx="150" cy="100" r="80" fill="' + shapeColor + '" />';
    } else if (shape === 'triangle') {
        svgShape = '<polygon points="150,20 50,180 250,180" fill="' + shapeColor + '" />';
    } else if (shape === 'square') {
        svgShape = '<rect x="50" y="50" width="200" height="100" fill="' + shapeColor + '" />';
    }

    const textSVG = '<text x="110" y="120" fill="' + textColor + '" font-size="50" font-family="Arial">' + text + '</text>';
    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${svgShape}
            ${textSVG}
        </svg>
    `;

    fs.writeFileSync('logo.svg', svgContent);
}

async function main() {
    const userInput = await getUserInput();
    generateSVG(userInput);
}

main();

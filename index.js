const fs = require('fs');
const recipes = require('./recipes');

let readme = `# Recipes

> A collection of awesome recipes

## Table of Contents
`;

let categories = Object.keys(recipes);
let categoriesUpperCase = categories.map((categoryName) => {
	return categoryName.split(' ').map((word) => {
		return word[0].toUpperCase() + word.slice(1);
	}).join(' ');
});

categories.forEach((categoryName, index) => {
	readme += `- [${categoriesUpperCase[index]}](#${categoryName.split(' ').join('-')})\n`;
});

readme += '\n';

for(let i = 0; i < categories.length; i++) {
	let category = recipes[categories[i]];
	readme += `## ${categoriesUpperCase[i]}\n\n`
	category.forEach((recipe) => {
		readme += [
			`#### ${recipe.name}\n`,
			`> ${recipe.description}\n`,
			`![${recipe.name}](images/${generateImageUrl(recipe.name)})`,
			'##### Ingredients\n',
			`> Serves ${recipe.serves}\n`,
			generateIngredientsTable(recipe.ingredients),
			'\n##### Instructions\n',
			generateInstructionsString(recipe.instructions)
		].join('\n');
	});
}

fs.writeFile('./README.md', readme, (err) => {
  if (err) {
  	throw err;
  };

  console.log('Updated recipes!');
});

// Generates the image URL for the name of a recipe
function generateImageUrl(name) {
	return `${name.toLowerCase().split(' ').join('_')}.jpg`;
}

// Generates the markdown table for a recipe's ingredients
function generateIngredientsTable(ingredients) {
	const headers = '| Ingredient | Quantity |\n|:-:|:-:|\n';
	return headers + ingredients.map((ingredient) => {
		return `| ${ingredient.name} | ${ingredient.quantity} |`;
	}).join('\n');
}

// Generates a markdown string containing all of the instructions for a recipe
function generateInstructionsString(instructions) {
	return instructions.map((instruction, index) => {
		return `${index + 1}. ${instruction}`;
	}).join('\n');
}
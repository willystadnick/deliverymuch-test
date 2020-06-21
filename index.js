const express = require('express');
const dotenv = require('dotenv').config();
const http = require('http');
var cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

function getRecipes(ingredients) {
	return new Promise((resolve, reject) => {
		let i = ingredients.join(',');
		let url = process.env.RECIPES_URL + '/api/?i=' + i;
		http.get(url, res => {
			let body = '';
			res.on('data', data => {
				body += data;
			});
			res.on('end', () => {
				let recipes = [];
				let promises = [];
				body = JSON.parse(body);
				body.results.forEach(result => {
					let recipe = {
						title: result.title.trim(),
						ingredients: result.ingredients.split(', ').sort(),
						link: result.href,
					};
					promises.push(
						getGif(recipe.title).then(data => {
							recipe.gif = data;
							recipes.push(recipe);
						}, error => {
							reject(error);
						})
					);
				});
				Promise.all(promises).then(() => {
					resolve(recipes);
				});
			});
		}).on('error', err => {
			reject(err);
		}).end();
	});
};

function getGif(title) {
	return new Promise((resolve, reject) => {
		let url = process.env.GIPHY_URL + '/v1/gifs/search?api_key='
			+ process.env.GIPHY_KEY + '&limit=1&q=' + title;
		http.get(url, res => {
			let body = '';
			res.on('data', data => {
				body += data;
			});
			res.on('end', () => {
				let url = process.env.GIPHY_FALLBACK;
				body = JSON.parse(body);
				if (body.data.length > 0) {
					url = body.data.shift().embed_url;
				}
				resolve(url);
			});
		}).on('error', err => {
			reject(err);
		}).end();
	});
};

app.get('/recipes', (req, res, next) => {
	let ingredients = req.query.i.split(',').slice(0, 3).sort();
	getRecipes(ingredients).then(data => {
		res.json({
			keywords: ingredients,
			recipes: data,
		});
	}, error => {
		res.json(error);
	});
});

app.listen(port, () => {
	console.log('Running on http://localhost:' + port);
	console.log('Try http://localhost:' + port + '/recipes?i=onion,tomato ;)');
});

const express 		= require('express');
const router 		= express.Router();
const request 		= require('request');
const cheerio 		= require('cheerio');
const mongoose 	= require('mongoose');
const articles 	= require('../models/Article.js');
const axios 		= require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	axios.get('https://www.theonion.com/').then(function(response){
		if(response.status == 200){
  			const $ = cheerio.load(response.data);
  			const results = [];

  			$("article.status-published").each((i, element) => {
  				const result			= {};
				
  				result.title			= $(element).find(".js_entry-title").text();
  				result.url 				= $(element).find(".js_entry-link").attr("href");
  				result.publishtime 	= $(element).find(".js_publish_time").text();
  				result.image 			= $(element).find("source").attr("data-srcset");
  				result.excerpt 		= $(element).find(".excerpt").text();

				articles.create(result)
					.catch(function(error){
						//console.log("database error: " + error);
					});
				
  			});
		}else{
			console.log("failed to retrieve data");
		}
	})
	.then(function(test){
		articles
			.find()
			.limit(25)
			.then(function (results){
				res.render('index', { title: 'Express', "results": results});		
			})
			.catch(function(error){
				console.log("error: " + error)
			});
	});
});

router.put("/commentsubmit", (req, res, next) =>{
	articles
	.findOneAndUpdate(
	    { _id: req.body.id }, 
	    { $push: { comments: req.body.comment } }, 
	    { new: true
	    }
	)
	.then(function(dbArticle) {
		res.json(dbArticle);
	   })
	   .catch(function(err) {
	   res.json(err);
	});


});

router.delete("/commentdelete", (req, res, next) =>{
	console.log(req.body);

	articles
	.findOneAndUpdate(
	    { _id: req.body.id }, 
	    { $pull: { comments: req.body.comment } }
	)
	.then(function(dbArticle) {
		res.json(dbArticle);
	   })
	   .catch(function(err) {
	   res.json(err);
	});


});

module.exports = router;
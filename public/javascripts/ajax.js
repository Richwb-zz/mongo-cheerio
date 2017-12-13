$(document).ready(function(){

	$(".submit").on("click", (event) => {
		event.preventDefault();
		
		const newsId = $(this)[0].activeElement.dataset.newsid;

		const commentpost = {
			"id"		: newsId,
			"comment": $("#" + newsId + "-comment").val(),
		};

		$.ajax({
			type: "put",
			url: "/commentsubmit",
			contentType: "application/json",
			data: JSON.stringify(commentpost) 		 
		});
	});

	$(".delete").on("click", (event) => {
		event.preventDefault();
		
		const newsId = $(this)[0].activeElement.dataset.newsid;

		const commentdelete = {
			"id"		: newsId.substring(0,newsId.length-1),
			"comment": $("#" + newsId).text()
		};
		console.log(commentdelete);

		$.ajax({
			type: "delete",
			url: "/commentdelete",
			contentType: "application/json",
			data: JSON.stringify(commentdelete) 		 
		});
	});

});
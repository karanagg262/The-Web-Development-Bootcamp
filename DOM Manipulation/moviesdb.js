movies = [
	{
		title: "In Bruges",
		rating: "5 stars",
		hasWatched:"You have watched "
	},
	{
		title: "Frozen",
		rating: "4.5 stars",
		hasWatched:"You have not seen "
	},
	{
		title: "Max Fury road",
		rating: "5 stars",
		hasWatched:"You have seen "
	},
	{
		title: "Les Miserables",
		rating: "3.5 stars",
		hasWatched:"You have not seen "
	}
];
movies.forEach(function(movies)
{
	console.log(movies.hasWatched+"\""+movies.title+"\"hcjbnxbxn"+"-"+movies.rating);
});
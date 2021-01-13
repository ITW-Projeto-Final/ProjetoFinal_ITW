const settings = {
  async: true,
  crossDomain: true,
  url:
    "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-by-title&title=matrix",
  method: "GET",
  headers: {
    "x-rapidapi-key": "324a755ab9mshd6a11bb9c7f791cp1a1300jsn8fa69842044a",
    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

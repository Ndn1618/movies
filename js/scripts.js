// Normalizing movies
var normalizedMovies = movies.map(function (movie) {
  return {
    title: movie.Title.toString(),
    fulltitle: `${movie.Title.toString()} (${movie.movie_year})`,
    movieYear: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imageLink: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    movieRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailerLink: `https://youtube.com/watch?v=${movie.ytid}`
  }
});

// Choosing elements
var elMoviesForm = $_('.movies__form');
var elMoviesSearchBySelect = $_('.movies__searchby-select', elMoviesForm);
var elMoviesNameInput = $_('.movies__name-input', elMoviesForm);
var elMoviesList = $_('.movies__list');
var elMovieTemplate = $_('#movie-template').content;

// Create movie elements function
var createMovieElement = function (movie) {
  var movieElement = elMovieTemplate.cloneNode(true);

  $_('.movie__img', movieElement).src = movie.imageLink;
  $_('.movie__fulltitle', movieElement).textContent = movie.fulltitle;
  $_('.movie__duration', movieElement).textContent = movie.runtime;
  $_('.movie__categories', movieElement).textContent = movie.categories.join(', ');

  return movieElement;
};

// Rendering movie elements function
var renderMovieElements = function (movies) {
  elMoviesList.innerHTML = '';

  var elMoviesWrapperFragment = document.createDocumentFragment();

  movies.forEach(function (movie) {
    elMoviesWrapperFragment.appendChild(createMovieElement(movie));
  });

  elMoviesList.appendChild(elMoviesWrapperFragment);
};

// Show all movie elements
renderMovieElements(normalizedMovies);

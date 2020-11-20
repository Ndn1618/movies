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
var elSortMoviesBySelect = $_('.movie-sort-by-select');
var elMoviesList = $_('.movies__list');
var elMovieTemplate = $_('#movie-template').content;

// Array of searched movies
var searchResults = [];
var searchResultsByCategory = [];

// Create movie elements function
var createMovieElement = function (movie) {
  var movieElement = elMovieTemplate.cloneNode(true);

  $_('.movie__img', movieElement).src = movie.imageLink;
  $_('.movie__fulltitle', movieElement).textContent = movie.fulltitle;
  $_('.movie__duration', movieElement).textContent = movie.runtime;
  $_('.movie__categories', movieElement).textContent = movie.categories.join(', ');
  $_('.movie__language', movieElement).textContent = movie.language;
  $_('.movie__rate', movieElement).textContent = movie.movieRating;
  $_('.movie__summary', movieElement).textContent = movie.summary;
  $_('.movie__trailer-link', movieElement).href = movie.trailerLink;

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

elMoviesForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  searchResults = [];

  // Take value of select and search input
  var elMoviesSearchBySelectValue = elMoviesSearchBySelect.value;
  var movieNameInputValue = elMoviesNameInput.value.trim();

  var searchQuery = new RegExp(movieNameInputValue, 'gi');

  normalizedMovies.forEach(function (movie) {
    if (movie.categories.includes(elMoviesSearchBySelectValue) && movie.title.match(searchQuery)) {
      searchResults.push(movie);
    }
  });

  if (searchResults.length === 0) {
    elMoviesList.innerHTML = '';
    alert(`Can't find any movies`);
  } else {
    renderMovieElements(searchResults);
  }
});

// Sort found movies alphabetical, by imdb_rating, release_date and runtime
elSortMoviesBySelect.addEventListener('input', function () {
  if (elSortMoviesBySelect.value === 'alphabetical') {
    searchResults.sort(function (a, b) {
      var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
  } else if (elSortMoviesBySelect.value === 'rating') {
    searchResults.sort(function (a, b) {
      return b.movieRating - a.movieRating;
    });
  } else if (elSortMoviesBySelect.value === 'release_date') {
    searchResults.sort(function (a, b) {
      return b.movieYear - a.movieYear;
    });
  } else {
    searchResults.sort(function (a, b) {
      return b.runtime - a.runtime;
    });
  }
  renderMovieElements(searchResults);
});

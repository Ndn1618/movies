// Normalizing movies
var normalizedMovies = movies.map(function (movie) {
  return {
    title: movie.Title.toString(),
    movieYear: movie.movie_year,
    categories: movie.Categories,
    summary: movie.summary,
    imageLink: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    movieRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailerLink: `https://youtube.com/watch?v=${movie.ytid}`
  }
});

// Choosing elements

import { Movie } from '../models/movies.js';
import { User } from '../models/users.js';

export const getWatchedMovies = async email => {
  const user = await User.findOne({ email }).populate('watchedMovies.movieId');

  if (!user) {
    throw new Error('User not found');
  }

  return user.watchedMovies.map(movie => {
    return {
      name: movie.movieId.name,
      year: movie.movieId.year,
      imageLink: movie.movieId.imageLink,
      whereToWatch: movie.movieId.whereToWatch,
      watchedDate: movie.watchedDate,
    };
  });
};

export const add = async (email, movieData) => {
  try {
    let movie = await Movie.findOne({
      name: movieData.name,
      year: movieData.year,
    });

    if (!movie) {
      movie = new Movie(movieData);
      await movie.save();
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const existingMovie = user.watchedMovies.find(
      m => m.movieId.toString() === movie._id.toString()
    );
    if (existingMovie) {
      return null; // Return null indicating movie already exists
    }

    user.watchedMovies.push({
      movieId: movie._id,
      watchedDate: movieData.watchedDate,
    });
    await user.save();
    return movie;
  } catch (error) {
    throw new Error(
      'An unexpected error occurred while adding the movie to the user'
    );
  }
};

export const remove = async (email, name, year) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const userMovies = await User.findOne({ email }).populate(
      'watchedMovies.movieId'
    );

    // Find the index of the movie to remove

    const indexToRemove = userMovies.watchedMovies.findIndex(movie => {
      return movie.movieId.name === name && movie.movieId.year === year;
    });

    if (indexToRemove === -1) {
      // Movie not found in watched movies array
      return null;
    }

    // Remove the movie from watched movies array
    user.watchedMovies.splice(indexToRemove, 1);
    await user.save();

    return user; // Return the removed movie details
  } catch (error) {
    throw error;
  }
};

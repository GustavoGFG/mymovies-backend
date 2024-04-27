import * as moviesService from '../services/movies.js';

export const getAll = async (req, res) => {
  console.log('Entrou');
  try {
    const watchedMovies = await moviesService.getWatchedMovies(req.user.email);
    if (watchedMovies) {
      return res.status(200).json({ success: true, movies: watchedMovies });
    } else {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to fetch movies' });
    }
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to fetch movies' });
  }
};

export const add = async (req, res) => {
  const { name, year, imageLink, whereToWatch, watchedDate } = req.body;
  try {
    const addedMovie = await moviesService.add(req.user.email, {
      name,
      year,
      imageLink,
      whereToWatch,
      watchedDate,
    });
    if (addedMovie) {
      res.status(201).json({ success: true, movies: addedMovie });
    } else {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to fetch movies' });
    }
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to fetch movies' });
  }
};

export const remove = async (req, res) => {
  const { name, year } = req.params;
  try {
    const removedMovie = await moviesService.remove(req.user.email, name, year);
    if (removedMovie) {
      res.status(200).json({ success: true });
    } else {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to remove movie' });
    }
  } catch (error) {
    console.error('Error remove movie: ', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to remove movie' });
  }
};

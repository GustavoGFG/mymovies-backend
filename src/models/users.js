import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchedMovies: {
    type: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie',
          required: true,
        },
        watchedDate: {
          type: Date,
          default: null,
        },
      },
    ],
    default: [],
  },
});

export const User = mongoose.model('User', userSchema);

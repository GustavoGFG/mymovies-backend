import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  whereToWatch: {
    type: String,
    required: true,
  },
});

export const Movie = mongoose.model('Movie', movieSchema);

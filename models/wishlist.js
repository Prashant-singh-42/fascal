const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please enter a title for the wishlist']
  },
  movies: [{
    Title: String,
    Year: String,
    imdbID: String,
    Type: String,
    Poster: String
  }],
  public: {
    type: Boolean,
    default: false
  }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;

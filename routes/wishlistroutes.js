const express = require('express');
const { getUserWishlists, getPublicWishlists ,deleteWishlist,createWishlist, editWishlistTitle, addMoviesToWishlist, removeMoviesFromWishlist, updateWishlistVisibility } = require('../controllers/wishlistcontroller');
const router = express.Router();

router.post('/wishlists', createWishlist);
router.post('/wishlists/:id', editWishlistTitle);
router.delete('/wishlists/:id', deleteWishlist);

router.post('/wishlists/:id/movies', addMoviesToWishlist);
router.post('/wishlists/:id/delmovies', removeMoviesFromWishlist);
router.post('/wishlists/:id/visibility', updateWishlistVisibility);

router.get('/publicWishlists', getPublicWishlists);
router.get('/userWishlists/:id', getUserWishlists);

module.exports = router;

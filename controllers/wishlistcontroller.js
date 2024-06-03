const Wishlist = require("../models/wishlist");

const createWishlist = async (req, res) => {
  try {
    const { title } = req.body;
    const wishlist = new Wishlist({
      userId: req.session.userId,
      title,
    });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editWishlistTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const wishlist = await Wishlist.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addMoviesToWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { movies } = req.body;
    const wishlist = await Wishlist.findByIdAndUpdate(
      id,
      { $push: { movies: { $each: movies } } },
      { new: true, runValidators: true }
    );
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeMoviesFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { movies } = req.body;
    const wishlist = await Wishlist.findByIdAndUpdate(
      id,
      { $pull: { movies: { $in: movies } } },
      { new: true, runValidators: true }
    );
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWishlistVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { public } = req.body;
    const wishlist = await Wishlist.findByIdAndUpdate(
      id,
      { public },
      { new: true }
    );
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPublicWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ public: true });
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.session.userId });
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWishlist,
  deleteWishlist,
  editWishlistTitle,
  addMoviesToWishlist,
  removeMoviesFromWishlist,
  updateWishlistVisibility,
  getPublicWishlists,
  getUserWishlists,
};

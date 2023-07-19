const User = require("../models/User");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (!movieAlreadyLiked) {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
        return res.json({
          msg: "Movie added to liked movies",
          user: updatedUser,
        });
      } else {
        return res.json({ msg: "Movie already liked" });
      }
    } else {
      const newUser = await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movie added to liked movies", user: newUser });
    }
  } catch (err) {
    return res.json({ msg: "Error updating" });
  }
};

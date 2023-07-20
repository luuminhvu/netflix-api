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

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        // Kiểm tra nếu không tìm thấy phim, phải so sánh với -1 thay vì !movieIndex
        return res.status(400).send({ msg: "Movie not found." }); // Sử dụng return để thoát hàm và không thực hiện các dòng code tiếp theo
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    return res.json({ msg: "Error removing movie from the liked list" });
  }
};

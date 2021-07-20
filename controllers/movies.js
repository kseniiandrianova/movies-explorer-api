const movies = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getMovies = (req, res, next) => {
  movies.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner = req.user._id,
  } = req.body;
  movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректный данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movies.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        return movie.remove().then(() => {
          res.send({ message: 'Фильм удален' });
        });
      }
      throw new ForbiddenError('Нельзя удалять чужой фильм');
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Фильм с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

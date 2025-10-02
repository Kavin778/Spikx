import prisma from "../config/dbconfig.js";

export async function createMoviesService(movieData) {
  const { title, type, tmdbId, jellyfinItemId,poster,backdrops,logos } = movieData;
  const newMovie = await prisma.movies.create({
    data: {
      title,
      type,
      tmdbId,
      jellyfinItemId,
      poster,
      logos,
      backdrops,
    },
  });

  return newMovie;
}

export async function getMovieByIdService(movieId) {
  const movie = await prisma.movies.findUnique({
    where: {
      id: movieId,
    },
  });
  return movie;
}

export async function getMovieByTmdbIdService(Id) {
  const movie = await prisma.movies.findUnique({
    where: {
      tmdbId: Id,
    },
  });

  return movie;
}

export async function getAllMoviesService() {
  const movies = await prisma.movies.findMany();

  return movies;
}

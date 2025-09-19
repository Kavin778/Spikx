import axios from "axios";

const TmdbApiKey = process.env.TMDB_API_KEY;
const TmdbBaseUrl = process.env.TMDB_BASE_URL;

export async function getTrendingMoviesService() {
  const url = `${TmdbBaseUrl}/trending/movie/day`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      language: "en-US",
    },
  });

  return response.data.results;
}

export async function getTopRatedMoviesService() {
  const url = `${TmdbBaseUrl}/movie/top_rated`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
}

export async function getMovieImagesService(movieId, mediaType) {
  const url = `${TmdbBaseUrl}/${mediaType}/${movieId}/images`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      include_image_language: "en,null,ta,hi",
      language: "en-US",
    },
  });
  const logos = response.data.logos?.slice(0,Math.min(response.data.logos.length,5)) || [];
  const backdrops = response.data.backdrops?.slice(0,Math.min(response.data.backdrops.length,5)) || [];
  const posters = response.data.posters?.slice(0,Math.min(response.data.posters.length,5)) || [];
  const images = {
    logos,
    backdrops,
    posters,
  };
  return images;
}

export async function getMovieGenresService(mediaType) {
  const url = `${TmdbBaseUrl}/genre/${mediaType}/list`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      language: "en-US",
    },
  });
  return response.data.genres;
}

export async function getMovieCastCrewService(movieId, mediaType) {
  const url = `${TmdbBaseUrl}/${mediaType}/${movieId}/credits`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      language: "en-US",
    },
  });

  const jobs = [
    "Director",
    "Screenplay",
    "Producer",
    "Executive Producer",
    "Original Music Composer",
    "Story",
    "writer",
    "Art",
    "Cinematography",
    "Casting",
  ];

  const cast = response.data.cast?.slice(0,Math.min(response.data.cast.length,10)) || [];
  const filtercrew = response.data.crew
    .filter((member) => jobs.includes(member.job))
    .sort((a, b) => b.popularity - a.popularity);

  const uniqueCrew = filtercrew.filter(
    (member, index, array) =>
      array.findIndex((m) => m.id === member.id) === index
  );
  const crew = uniqueCrew?.slice(0,Math.min(uniqueCrew.length,10)) || [];
  const credits = {
    cast,
    crew,
  };

  return credits;
}

export async function getMovieTmdbService(movieId) {
  const url = `${TmdbBaseUrl}/movie/${movieId}`;
  const response = await axios.get(url, {
    params: {
      api_key: TmdbApiKey,
      language: "en-US",
    },
  });

  return response.data;
}

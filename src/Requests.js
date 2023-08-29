const key = process.env.REACT_APP_TMDB_API_KEY

const requests = {
    requestPopular: `${process.env.REACT_APP_TMDB_API_URL}/movie/popular?api_key=${key}`,
    requestTopRated: `${process.env.REACT_APP_TMDB_API_URL}/movie/top_rated?api_key=${key}`,
    requestTrending: `${process.env.REACT_APP_TMDB_API_URL}/movie/popular?api_key=${key}`,
    requestHorror: `${process.env.REACT_APP_TMDB_API_URL}/discover/movie?api_key=${key}&with_genres=27`,
    requestUpcoming: `${process.env.REACT_APP_TMDB_API_URL}/movie/upcoming?api_key=${key}`
}

export default requests
const initialState = {
  movies: [],
  favoriteMovies: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: action.payload,
      };

    case "ADD_TO_FAV":
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.payload],
      };

    case "DEL_FROM_FAV":
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(
          (item) => item !== action.payload
        ),
      };

    default:
      return state;
  }
};

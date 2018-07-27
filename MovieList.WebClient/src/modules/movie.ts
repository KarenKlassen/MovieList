import { AnyAction } from 'redux';
import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';
import { IMovie, IMovieState, initialState, IMovieAction, IMovieListAction } from '../models/Movie';

const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

export const ADD_MOVIE_REQUEST = "movie/ADD_MOVIE_REQUEST";
export const ADD_MOVIE_RESPONSE = "movie/ADD_MOVIE_RESPONSE";
export const ADD_MOVIE_ERROR = 'movie/ADD_MOVIE_ERROR';

export const GET_MOVIE_REQUEST = "movie/GET_MOVIE_REQUEST";
export const GET_MOVIE_RESPONSE = "movie/GET_MOVIE_RESPONSE";
export const GET_MOVIE_ERROR = 'movie/GET_ADDMOVIE_ERROR';

export const SET_SELECTED_MOVIE = 'movie/SET_SELECTED_MOVIE';

type IMovieActions = IMovieAction & IMovieListAction;

export function addMovie(movie: IMovie): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/movie/addMovie`,
            method: 'POST',
            types: [ADD_MOVIE_REQUEST, ADD_MOVIE_RESPONSE, ADD_MOVIE_ERROR],
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'movie': movie
            })
        }
    };
}

export function getMovies(): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/movie/getMovies`,
            method: 'GET',
            types: [GET_MOVIE_REQUEST, GET_MOVIE_RESPONSE, GET_MOVIE_ERROR],
            headers: { 'Content-Type': 'application/json' }
        }
    };
}

export function setSelectedMovie(movie: IMovie): AnyAction {
    //keeps track of the selected movie in the store, but not the database
    return {
        type: SET_SELECTED_MOVIE,
        payload: { movie: movie }
    };
}

export function movieReducer(state: IMovieState = initialState, action: IMovieActions) {
    switch (action.type) {
        //add
        case ADD_MOVIE_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case ADD_MOVIE_RESPONSE: {
            let list = state.movieList.slice();
            list.unshift(action.payload.movie);     //adds to the list of movies

            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                movie: action.payload,
                movieList: list
            });
        }

        case ADD_MOVIE_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }

        //get
        case GET_MOVIE_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case GET_MOVIE_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                movieList: action.payload.movieList
            });
        }

        case GET_MOVIE_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }

        //set selected movie
        case SET_SELECTED_MOVIE: {
            return Object.assign({}, state, {
                selectedMovie: action.payload.movie
            });
        }

        default:
            return state;
    }
}
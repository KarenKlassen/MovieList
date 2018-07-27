import { AnyAction } from 'redux';

export interface IMovie {
    MovieID: number;
    Title: string;
    Year: number;
}

export interface IMovieState {
    readonly isFetching: boolean;
    readonly hasError: boolean;
    readonly message: string | null;
    readonly movie: IMovie | null;
    readonly movieList: Array<IMovie>;
}

export const initialState: IMovieState = {
    isFetching: false,
    hasError: false,
    message: null,
    movie: null,
    movieList: []
};

export interface IMovieAction extends AnyAction {
    error?: boolean;
    payload: {
        movie: IMovie;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

export interface IMovieListAction extends AnyAction {
    error?: boolean;
    payload: {
        movieList: Array<IMovie>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}
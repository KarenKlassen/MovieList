import { connect } from 'react-redux';
import Movie from '../components/Movie';
import { IMovie, IMovieAction } from '../../../models/Movie';
import { getMovies, setSelectedMovie } from '../../../modules/movie';

export namespace MovieProps {
    export interface IStateProps {
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        movieList: Array<IMovie>;
    }

    export interface IDispatchProps {
        getMovies: () => Promise<IMovieAction>;
        setSelectedMovie: (movie: IMovie) => Promise<IMovie>;
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        isDialogOpen: boolean;
    }
}

function mapStateToProps(state: any) {
    return {
        isFetching: state.movie.isFetching,
        hasError: state.movie.hasError,
        message: state.movie.message,
        movieList: state.movie.movieList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getMovies: (): Promise<IMovieAction> => dispatch(getMovies()),
        setSelectedMovie: (movie: IMovie): Promise<IMovie> => dispatch(setSelectedMovie(movie))
    };
}

export default connect<MovieProps.IStateProps, MovieProps.IDispatchProps, MovieProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Movie);
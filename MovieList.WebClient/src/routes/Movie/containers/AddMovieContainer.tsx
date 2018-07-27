import { connect } from 'react-redux';
import AddMovie from '../components/AddMovie';
import { addMovie } from '../../../modules/movie';
import { IMovie, IMovieAction } from '../../../models/Movie';

export namespace AddMovieProps {
    export interface IStateProps {
        movie: IMovie | null;
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        movieList: Array<IMovie>;
    }

    export interface IDispatchProps {
        addMovie: (movie: IMovie) => Promise<IMovieAction>;
    }

    export interface IOwnProps {
        closeDialog: any;
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        submitDialogOpen: boolean;
    }
}

function mapStateToProps(state: any) {
    return {
        movie: state.movie.movie,
        isFetching: state.movie.isFetching,
        hasError: state.movie.hasError,
        message: state.movie.message,
        movieList: state.movie.movieList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addMovie: (movie: IMovie): Promise<IMovieAction> => dispatch(addMovie(movie))
    };
}

export default connect<AddMovieProps.IStateProps, AddMovieProps.IDispatchProps, AddMovieProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(AddMovie);
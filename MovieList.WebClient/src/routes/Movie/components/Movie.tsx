import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog } from '@blueprintjs/core';
import { MovieProps } from '../containers/MovieContainer';
import { IMovie } from '../../../models/Movie';
import AddMovie from '../containers/AddMovieContainer';

const initialState: MovieProps.IState = {
    isDialogOpen: false
};

class Movie extends React.Component<MovieProps.IProps, MovieProps.IState> {
    constructor(props: MovieProps.IProps) {
        super(props);
        this.state = initialState;

        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.handleMovieClick = this.handleMovieClick.bind(this);
        this.toggleAddMovieDialog = this.toggleAddMovieDialog.bind(this);
    }

    componentDidMount() {
        this.props.getMovies();
    }

    handleAddMovie() {
        this.setState({ isDialogOpen: true });
    }

    handleMovieClick(e: any, movie: IMovie): any {
        this.props.setSelectedMovie(movie);
    }

    toggleAddMovieDialog() {
        this.setState({ isDialogOpen: !this.state.isDialogOpen });
        this.props.getMovies();
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.handleAddMovie}>Add a Movie</Button>
                    <div>
                        <h2>Movie List</h2>
                    </div>
                    <ul className='pt-list-container'>
                        {this.props.movieList.map((movie: IMovie) =>
                            <li key={movie.Title}>
                                <Link className='pt-movie' to={`/${movie.MovieID}`} onClick={(e) => this.handleMovieClick(e, movie)}>{movie.Title + " (" + movie.Year + ")"}</Link>
                            </li>
                        )}
                     </ul>
                </div>

                <Dialog
                    isOpen={this.state.isDialogOpen}
                    title="Add a Movie"
                    onClose={this.toggleAddMovieDialog}>
                    <div className="pt-dialog">
                        <AddMovie closeDialog={this.toggleAddMovieDialog} />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Movie;
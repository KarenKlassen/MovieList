import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { AddMovieProps } from '../containers/AddMovieContainer';
import { IMovie } from '../../../models/Movie';

const initialState: AddMovieProps.IState = {
    submitDialogOpen: false
};

class AddMovie extends React.Component<AddMovieProps.IProps, AddMovieProps.IState> {
    constructor(props: AddMovieProps.IProps) {
        super(props);
        this.state = initialState;

        this.dialogShowToggle = this.dialogShowToggle.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    dialogShowToggle() {
        this.setState({ submitDialogOpen: !this.state.submitDialogOpen });
    }

    handleCancel() {
        this.props.closeDialog();
    }

    handleFormSubmit() {
        const titleValue: string = (document.getElementById("MovieTitle")! as HTMLInputElement).value;
        const yearValue: string = (document.getElementById("MovieYear")! as HTMLInputElement).value;

        let movie: IMovie = {
            MovieID: -1,
            Title: titleValue,
            Year: parseInt(yearValue)
        };

        this.props.addMovie(movie).then((result) => {
            if (result.error) {
                console.log("Error while adding movie : " +
                    !!result.payload && !!result.payload.response ? result.payload.response.message : 'Unknown error');
            }
            else {
                console.log("Added successfully");
            }
        });

        this.props.closeDialog();
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label className='pt-comment'>Title</label>
                <input className='pt-input' id={"MovieTitle"} />
                <br />
                <label className='pt-comment'>Year</label>
                <input className='pt-input' id={"MovieYear"} />
                <div>
                    <Button className='pt-dialog-button' onClick={this.handleFormSubmit}>Submit</Button>
                    <Button className='pt-dialog-button' onClick={this.handleCancel}>Cancel</Button>
                </div>
            </form>
        );
    }
}

export default AddMovie;
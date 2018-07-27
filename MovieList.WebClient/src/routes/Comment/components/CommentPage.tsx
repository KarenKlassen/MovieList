import * as React from 'react';
import { PersonListProps } from '../containers/CommentPageContainer';
import { IPerson } from '../../../models/Person';
import { IComment } from '../../../models/Comment';

const initialState: PersonListProps.IState = {
};

class PersonList extends React.Component<PersonListProps.IProps, PersonListProps.IState> {
    constructor(props: PersonListProps.IProps) {
        super(props);
        this.state = initialState;

        this.handleComment = this.handleComment.bind(this);
    }

    componentDidMount() {
        this.props.getPeople();
        this.props.getComments(this.props.selectedMovie.MovieID);
    }

    handleComment(e: any, person: IPerson) {
        const value = (document.getElementById(JSON.stringify(person.PersonID))! as HTMLInputElement).value;

        if (value !== '') {

            const newComment: IComment = {
                CommentID: -1,
                MovieID: this.props.selectedMovie.MovieID,
                PersonID: person.PersonID,
                Comment: value
            };

            this.props.addComment(newComment);
            this.props.getComments(this.props.selectedMovie.MovieID);
        }
    }

    render() {
        let peopleWithComments = [];
        let peopleWithoutComments = [];

        for (let i = 0; i < this.props.personList.length; i++) {
            for (let j = 0; j < this.props.commentList.length; j++) {
                if (this.props.personList[i].PersonID == this.props.commentList[j].PersonID) {
                    peopleWithComments[peopleWithComments.length] = {
                        person: this.props.personList[i],
                        comment: this.props.commentList[j]
                    };
                    break;
                }
            }
        }

        for (let k = 0; k < this.props.personList.length; k++) {
            let hasComment: boolean = false;
            for (let h = 0; h < peopleWithComments.length; h++) {
                if (this.props.personList[k].PersonID == peopleWithComments[h].person.PersonID) {
                    hasComment = true;
                }
            }
            if (!hasComment) {
                peopleWithoutComments[peopleWithoutComments.length] = this.props.personList[k];
            }
        }

        return (
            <div>
                <h2>{this.props.selectedMovie.Title}</h2>
                <ul className='pt-list-container'>
                    {peopleWithComments.map((list: any) =>
                        <li key={list.person.PersonID}>
                            <a className='pt-name'>{list.person.Name} </a>
                            <a className='pt-comment'>{list.comment.Comment}</a>
                        </li>
                    )}
                    {peopleWithoutComments.map((person: IPerson) =>
                        <li key={person.PersonID} >
                            <a className='pt-name'>{person.Name} </a>
                            {/* The key for the input is just because React wanted a key and I couldn't think of anything else haha */}
                            <input className='pt-comment' key={Math.round(Math.random() * 10)} id={JSON.stringify(person.PersonID)} onBlur={(e) => this.handleComment(e, person)} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default PersonList;
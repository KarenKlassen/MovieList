import { connect } from 'react-redux';
import PersonList from '../components/CommentPage';
import { getPeople } from '../../../modules/person';
import { getComments, addComment } from '../../../modules/comment';
import { IMovie } from '../../../models/Movie';
import { IPerson, IPersonListAction } from '../../../models/Person';
import { IComment, ICommentAction } from '../../../models/Comment';

export namespace PersonListProps {
    export interface IStateProps {
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        personList: Array<IPerson>;
        commentList: Array<IComment>;
    }

    export interface IDispatchProps {
        getPeople: () => Promise<IPersonListAction>;
        getComments: (movieID: number) => Promise<ICommentAction>;
        addComment: (comment: IComment) => Promise<IComment>;
    }

    export interface IOwnProps {
        selectedMovie: IMovie
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
    }
}

function mapStateToProps(state: any) {
    return {
        isFetching: state.person.isFetching,
        hasError: state.person.hasError,
        message: state.person.message,
        personList: state.person.personList,
        commentList: state.comment.commentList,
        selectedMovie: state.movie.selectedMovie
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getPeople: (): Promise<IPersonListAction> => dispatch(getPeople()),
        getComments: (movieID: number): Promise<ICommentAction> => dispatch(getComments(movieID)),
        addComment: (comment: IComment): Promise<IComment> => dispatch(addComment(comment))
    };
}

export default connect<PersonListProps.IStateProps, PersonListProps.IDispatchProps, PersonListProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(PersonList);
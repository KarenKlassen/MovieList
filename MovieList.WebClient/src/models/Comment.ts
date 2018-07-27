import { AnyAction } from 'redux';

export interface IComment {
    CommentID: number;
    MovieID: number;
    PersonID: number;
    Comment: string;
}

export interface ICommentState {
    readonly isFetching: boolean;
    readonly hasError: boolean;
    readonly message: string | null;
    readonly comment: IComment | null;
    readonly commentList: Array<IComment>;
}

export const initialState: ICommentState = {
    isFetching: false,
    hasError: false,
    message: null,
    comment: null,
    commentList: []
};

export interface ICommentAction extends AnyAction {
    error?: boolean;
    payload: {
        comment: IComment;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

export interface ICommentListAction extends AnyAction {
    error?: boolean;
    payload: {
        commentList: Array<IComment>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}
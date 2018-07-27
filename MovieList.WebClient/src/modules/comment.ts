import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';
import { IComment, ICommentState, initialState, ICommentAction, ICommentListAction } from '../models/Comment';

const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

export const ADD_COMMENT_REQUEST = 'comment/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_RESPONSE = 'comment/ADD_COMMENT_RESPONSE';
export const ADD_COMMENT_ERROR = 'comment/ADD_COMMENT_ERROR';

export const GET_COMMENT_REQUEST = 'comment/GET_COMMENT_REQUEST';
export const GET_COMMENT_RESPONSE = 'comment/GET_COMMENT_RESPONSE';
export const GET_COMMENT_ERROR = 'comment/GET_COMMENT_ERROR';

type ICommentActions = ICommentAction & ICommentListAction;

export function addComment(comment: IComment): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/comment/addComment`,
            method: 'POST',
            types: [ADD_COMMENT_REQUEST, ADD_COMMENT_RESPONSE, ADD_COMMENT_ERROR],
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'comment': comment
            })
        }
    };
}

export function getComments(movieID: number): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/comment/getComments/${movieID}`,
            method: 'GET',
            types: [GET_COMMENT_REQUEST, GET_COMMENT_RESPONSE, GET_COMMENT_ERROR],
            headers: { 'Content-Type': 'application/json' }
        }
    };
}

export function commentReducer(state: ICommentState = initialState, action: ICommentActions) {
    switch (action.type) {
        //add
        case ADD_COMMENT_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case ADD_COMMENT_RESPONSE: {
            let list = state.commentList.slice();
            list.unshift(action.payload.comment);

            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                commenet: action.payload,
                commentList: list
            });
        }

        case ADD_COMMENT_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }

        //get
        case GET_COMMENT_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case GET_COMMENT_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                commentList: action.payload.commentList
            });
        }

        case GET_COMMENT_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }

        default:
            return state;
    }
}
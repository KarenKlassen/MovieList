import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';
import { IPersonState, initialState, IPersonAction, IPersonListAction } from '../models/Person';

const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

export const GET_PERSON_REQUEST = 'person/GET_PERSON_REQUEST';
export const GET_PERSON_RESPONSE = 'person/GET_PERSON_RESPONSE';
export const GET_PERSON_ERROR = 'person/GET_PERSON_ERROR';

export const GET_SELECTED_MOVIE = 'person/GET_SELECTED_MOVIE';

type IPersonActions = IPersonAction & IPersonListAction;

export function getPeople(): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/person/getPeople`,
            method: 'GET',
            types: [GET_PERSON_REQUEST, GET_PERSON_RESPONSE, GET_PERSON_ERROR],
            headers: { 'Content-Type': 'application/json' }
        }
    };
}

export function personReducer(state: IPersonState = initialState, action: IPersonActions) {
    switch (action.type) {
        //get
        case GET_PERSON_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case GET_PERSON_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                personList: action.payload.personList
            });
        }

        case GET_PERSON_ERROR: {
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
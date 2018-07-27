import { AnyAction } from 'redux';

export interface IPerson {
    PersonID: number;
    Name: string;
}

export interface IPersonState {
    isFetching: boolean;
    hasError: boolean;
    message: string | null;
    person: IPerson | null;
    personList: Array<IPerson>;
}

export const initialState: IPersonState = {
    isFetching: false,
    hasError: false,
    message: null,
    person: null,
    personList: []
};

export interface IPersonAction extends AnyAction {
    error?: boolean;
    payload: {
        person: IPerson;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

export interface IPersonListAction extends AnyAction {
    error?: boolean;
    payload: {
        personList: Array<IPerson>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}
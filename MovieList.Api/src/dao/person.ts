import { personDB } from '../models/index';
import { IPersonAttributes } from '../models/personModels/person';

export function getPeople(): Promise<Array<IPersonAttributes>> {
    return personDB.Person.findAll();
}
//we don't need to add people right now
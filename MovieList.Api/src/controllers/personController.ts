import { Request, Response, NextFunction } from 'express';
import { PersonDao } from '../dao/index';
import { IPersonAttributes } from '../models/personModels/person';

export class PersonController {
    getPeople(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        return PersonDao.getPeople().then((personList: Array<IPersonAttributes>) => res.status(200).send({
            personList: personList
        })).catch((error: Error) => next(error));
    }
}

const instance: PersonController = new PersonController();
export default instance;
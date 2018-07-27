import { Router } from 'express';
import PersonController from '../controllers/personController';

export class Person {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private init(): void {
        this.router.get('/getPeople', PersonController.getPeople);
    }
}

const person: Person = new Person();
const router: Router = person.router;
export default router;
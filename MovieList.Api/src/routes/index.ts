import { NextFunction, Request, Response, Router } from 'express';

export class IndexRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public initRoute(req: Request, res: Response, next: NextFunction): void {
        res.json({
            message: 'Hello from Movie Web API'
        });
    }

    private init(): void {
        this.router.get('/', this.initRoute);
    }
}

const indexRoute: IndexRoute = new IndexRoute();
const router: Router = indexRoute.router;
export default router;
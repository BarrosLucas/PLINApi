import {Request, Response} from 'express'

export type MyContext = {
    req: Request,
    res: Response,
    // redis: Redis,
    // userLoader: ReturnType<typeof createUserLoader>;
    // updootLoader: ReturnType<typeof createUpdootLoader>;
}
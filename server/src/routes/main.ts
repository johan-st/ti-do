import { Router } from 'express'
import { Request, Response } from 'express'
const route = Router()


const handler = (req: Request, res: Response) => {
  console.log('main handler')

}
route.post('/login', handler)
export { route }
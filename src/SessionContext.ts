import { Request, Response } from 'express'
export interface SessionContext {
  req: Request
  res: Response
}

import { Request, Response } from "express";

export interface Controller {
  exec(req: Request, res: Response): Promise<void>;
}
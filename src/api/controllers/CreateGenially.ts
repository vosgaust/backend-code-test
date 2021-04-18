import { Response, Request } from "express";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import { Controller } from "./Controller";

export class CreateGeniallyController implements Controller {

  constructor(private createGeniallyService: CreateGeniallyService) {}

  public exec = async (req: Request, res: Response) => {
    try {
      const createGeniallyRequest = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
      };
      await this.createGeniallyService.execute(createGeniallyRequest);
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      console.error(error);
      res.status(500).send({ status: error });
    }
  }
}
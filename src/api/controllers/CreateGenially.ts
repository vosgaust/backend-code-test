import { Response, Request } from "express";
import InvalidRequestError from "../../contexts/core/genially/domain/InvalidRequest";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import { Controller } from "./Controller";

export default class CreateGeniallyController implements Controller {
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
      let statusCode = 500;
      let message = "";
      if(error instanceof InvalidRequestError) {
        statusCode = 400;
        message = `invalid request for argument ${error.name}: ${error.message}`;
      }
      res.status(statusCode).send({ status: "error", message: message });
    }
  }
}
import { Response, Request } from "express";
import InvalidRequestError from "../../contexts/core/genially/domain/InvalidRequest";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import { Controller } from "./Controller";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";

export class UpdateGeniallyController implements Controller {

  constructor(private renameGeniallyService: RenameGeniallyService) {}

  public exec = async (req: Request, res: Response) => {
    try {
      const updateGeniallyRequest = {
        id: req.body.id,
        name: req.body.name
      };
      await this.renameGeniallyService.execute(updateGeniallyRequest);
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      let statusCode = 500;
      let message = "";
      if(error instanceof InvalidRequestError) {
        statusCode = 400;
        message = `invalid request for argument ${error.name}: ${error.message}`;
      } else if(error instanceof GeniallyNotExist) {
        statusCode = 404;
        message = error.toString();
      }
      res.status(statusCode).send({ status: "error", message: message });
    }
  }
}
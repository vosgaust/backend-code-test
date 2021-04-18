import { Response, Request } from "express";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import { Controller } from "./Controller";
import GeniallyAlreadyDeleted from "../../contexts/core/genially/domain/GeniallyAlreadyDeleted";

export class DeleteGeniallyController implements Controller {

  constructor(private deleteGeniallyService: DeleteGeniallyService) {}

  public exec = async (req: Request, res: Response) => {
    try {
      const deleteGeniallyRequest = {
        id: req.body.id
      };
      await this.deleteGeniallyService.execute(deleteGeniallyRequest);
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      let statusCode = 500;
      let message = "";
      if(error instanceof GeniallyAlreadyDeleted) {
        statusCode = 400;
        message = error.toString();
      } else if(error instanceof GeniallyNotExist) {
        statusCode = 404;
        message = error.toString();
      }
      res.status(statusCode).send({ status: "error", message: message });
    }
  }
}
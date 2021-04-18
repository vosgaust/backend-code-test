import { Response, Request } from "express";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import { Controller } from "./Controller";

export class UpdateGeniallyController implements Controller {

  constructor(private renameGeniallyService: RenameGeniallyService) {}

  async exec(req: Request, res: Response) {
    try {
      await this.renameGeniallyService.execute();
      // TODO: create response type
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      res.status(500).send({ status: error });
    }
  }
}
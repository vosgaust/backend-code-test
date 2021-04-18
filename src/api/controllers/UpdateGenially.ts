import { Response, Request } from "express";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import { Controller } from "./Controller";

export class UpdateGeniallyController implements Controller {

  constructor(private renameGeniallyService: RenameGeniallyService) {}

  async exec(req: Request, res: Response) {
    try {
      const updateGeniallyRequest = {
        id: req.body.id,
        name: req.body.name
      };
      await this.renameGeniallyService.execute(updateGeniallyRequest);
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      console.error(error);
      res.status(500).json({ status: error });
    }
  }
}
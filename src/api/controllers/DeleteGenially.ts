import { Response, Request } from "express";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import { Controller } from "./Controller";

export class DeleteGeniallyController implements Controller {

  constructor(private deleteGeniallyService: DeleteGeniallyService) {}

  async exec(req: Request, res: Response) {
    try {
      const deleteGeniallyRequest = {
        id: req.body.id
      };
      await this.deleteGeniallyService.execute(deleteGeniallyRequest);
      res.status(200).send({ status: "ok" }); 
    } catch(error) {
      console.error(error);
      res.status(500).send({ status: error });
    }
  }
}
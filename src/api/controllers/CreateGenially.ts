import { Response, Request } from "express";
import InvalidRequestError from "../../contexts/core/genially/domain/InvalidRequest";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import { Controller } from "./Controller";
import { EventBus } from "../../contexts/shared/domain/EventBus";
import Event from "../../contexts/shared/domain/Event";

export default class CreateGeniallyController implements Controller {
  private readonly EVENT_NAME = "GENIALLY_CREATED"
  constructor(private createGeniallyService: CreateGeniallyService, private eventBus: EventBus) {}

  public exec = async (req: Request, res: Response) => {
    try {
      const createGeniallyRequest = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
      };
      await this.createGeniallyService.execute(createGeniallyRequest);
      await this.eventBus.publish(new Event(this.EVENT_NAME, new Date()));
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
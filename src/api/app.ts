import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";
import CreateGeniallyService from "../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../contexts/core/genially/application/RenameGeniallyService";
import InMemoryGeniallyRepository from "../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import { CreateGeniallyController } from "./controllers/createGenially";
import { DeleteGeniallyController } from "./controllers/DeleteGenially";
import { UpdateGeniallyController } from "./controllers/UpdateGenially";
import MongoGeniallyRepository from "../contexts/core/genially/infrastructure/mongodb/MongoGeniallyRepository";
import GeniallyRepository from "../contexts/core/genially/domain/GeniallyRepository";

// Create Express server
const app = express();

let repository: GeniallyRepository;
const inMemoryRepository = new InMemoryGeniallyRepository();
const mongoRepository = new MongoGeniallyRepository("mongodb://genially:genially@localhost:27017", "genially", "backend_test");

if(process.env.NODE_ENV === "dev") {
  repository = inMemoryRepository;
} else {
  repository = mongoRepository;
  try {
    mongoRepository.run();
  } finally {
    mongoRepository.close();
  }
}

const createGeniallyService = new CreateGeniallyService(repository);
const createGeniallyController = new CreateGeniallyController(createGeniallyService);

const deleteGeniallyService = new DeleteGeniallyService(repository);
const deleteGeniallyController = new DeleteGeniallyController(deleteGeniallyService);

const renameGeniallyService = new RenameGeniallyService(repository);
const updateGeniallyController = new UpdateGeniallyController(renameGeniallyService);

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);

app.post("/genially", createGeniallyController.exec);
app.delete("/genially", deleteGeniallyController.exec);
app.patch("/genially", updateGeniallyController.exec);

export default app;

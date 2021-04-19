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
import CreateGeniallyController from "./controllers/CreateGenially";
import { DeleteGeniallyController } from "./controllers/DeleteGenially";
import { UpdateGeniallyController } from "./controllers/UpdateGenially";
import MongoGeniallyRepository from "../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import GeniallyRepository from "../contexts/core/genially/domain/GeniallyRepository";
import InMemorySyncEventBus from "../contexts/shared/infrastructure/InMemorySyncEventBus";
import NewGeniallyEventHandler from "../contexts/core/geniallyCounter/infrastructure/NewGeniallyEventHandler";
import IncreaseGeniallyCounterService from "../contexts/core/geniallyCounter/application/IncreaseGeniallyCounterService";
import MongoGeniallyCounterRepository from "../contexts/core/geniallyCounter/infrastructure/MongoGeniallyCounterRepository";

// Create Express server
const app = express();

let repository: GeniallyRepository;
const inMemoryRepository = new InMemoryGeniallyRepository();

const mongoHost = process.env.MONGO_HOST ? process.env.MONGO_HOST : "mongodb://test:test@localhost:27017";
const mongoRepository = new MongoGeniallyRepository(mongoHost, "genially", "backend_test");

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

const geniallyCounterRepository = new MongoGeniallyCounterRepository(mongoHost, "genially_counter", "backend_test");
try {
  geniallyCounterRepository.run();
} finally {
  geniallyCounterRepository.close();
}

const increaseGeniallyCounterService = new IncreaseGeniallyCounterService(geniallyCounterRepository);
const increaseGeniallyCounterHandler = new NewGeniallyEventHandler(increaseGeniallyCounterService);

const eventBus = new InMemorySyncEventBus();
eventBus.addEventHandler("GENIALLY_CREATED", increaseGeniallyCounterHandler);

const createGeniallyService = new CreateGeniallyService(repository, eventBus);
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

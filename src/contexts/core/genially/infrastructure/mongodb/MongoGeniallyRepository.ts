import Genially from "../../domain/Genially";
import GeniallyRepository from "../../domain/GeniallyRepository";
import { MongoClient, Collection } from "mongodb";
import GeniallyNotExist from "../../domain/GeniallyNotExist";

type GeniallyModel = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
}

export default class MongoGeniallyRepository implements GeniallyRepository {
  private client: MongoClient
  private collectionName: string
  private databaseName: string
  private collection: Collection

  constructor(uri: string, collectionName: string, databaseName: string) {
    this.client = new MongoClient(uri);
    this.collectionName = collectionName;
    this.databaseName = databaseName;
  }

  async run(): Promise<void> {
    await this.client.connect();
    await this.client.db("admin").command({ ping: 1 });
    const database = this.client.db(this.databaseName);
    this.collection = database.collection(this.collectionName);
  }

  close(): Promise<void> {
    return this.client.close();
  }
  
  async save(genially: Genially): Promise<void> {
    const newDocument: GeniallyModel = {
      id: genially.id,
      name: genially.name,
      description: genially.description,
      createdAt: genially.createdAt,
      modifiedAt: genially.modifiedAt,
      deletedAt: genially.deletedAt
    };
    await this.collection.insertOne(newDocument);
    return Promise.resolve();
  }

  async find(id: string): Promise<Genially> {
      const foundGenially = await this.collection.findOne({ id: id });
      if(!foundGenially) {
        throw new GeniallyNotExist(id);
      }
      const genially = new Genially(
        foundGenially.id,
        foundGenially.name,
        foundGenially.description,
        foundGenially.createdAt,
        foundGenially.modifiedAt,
        foundGenially.deletedAt
      );
      return Promise.resolve(genially);
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ id: id });
    return Promise.resolve();
  }
}

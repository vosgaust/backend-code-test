import GeniallyCounter from "../domain/GeniallyCounter";
import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";
import { MongoClient, Collection } from "mongodb";

export default class MongoGeniallyCounterRepository implements GeniallyCounterRepository {
  private readonly COUNTER_NAME = "genially-counter"
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
  
  async get(): Promise<GeniallyCounter> {
    const foundCounter = await this.collection.findOne({ name: this.COUNTER_NAME});
    let counter: GeniallyCounter;
    if(!foundCounter) {
      counter = new GeniallyCounter();
    } else {
      counter = new GeniallyCounter(foundCounter.count);
    }
    return Promise.resolve(counter);
  }

  async update(counter: GeniallyCounter): Promise<void> {
    if (counter.count === 1) {
      await this.collection.insertOne({ name: this.COUNTER_NAME, count: counter.count });
    } else {
      await this.collection.updateOne({ name: this.COUNTER_NAME }, { $set: { count: counter.count } });
    }
  }
}
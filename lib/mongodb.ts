import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let _client: MongoClient;
let mongoClient: Promise<MongoClient>;

if (process.env.MONGODB_URI == null) {
  throw new Error('Please add your Mongo URI to .env.local')
}
const uri = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    _client = new MongoClient(uri)
    globalThis._mongoClientPromise = _client.connect()
  }
  mongoClient = globalThis._mongoClientPromise
} else {
  _client = new MongoClient(uri)
  mongoClient = _client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClient;

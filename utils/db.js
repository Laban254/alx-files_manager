import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect();
    this.db = this.client.db(this.database);
  }

  isAlive() {
    return !!this.client && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) return 0;

    const usersCollection = this.db.collection('users');
    const numberOfUsers = await usersCollection.countDocuments();
    return numberOfUsers;
  }

  async nbFiles() {
    if (!this.isAlive()) return 0;

    const filesCollection = this.db.collection('files');
    const numberOfFiles = await filesCollection.countDocuments();
    return numberOfFiles;
  }
}

const dbClient = new DBClient();

export default dbClient;


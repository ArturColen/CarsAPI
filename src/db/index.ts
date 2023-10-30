import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const getMongoConnection = async (): Promise<MongoClient> => {
    const client = new MongoClient(uri);
    const connection = await client.connect();
    return connection;
};

export default getMongoConnection;
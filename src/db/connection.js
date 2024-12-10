const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');

// Replace with your MongoDB URI
const uri = process.env.MONGO_URI;

async function testDBConnection() {
    const client = new MongoClient(uri);
    let flag = false
    try {
        // Connect to MongoDB
        await client.connect();
        flag = true
        console.log('Connected successfully to MongoDB');

        const adminDb = client.db().admin();
        const databases = await adminDb.listDatabases();

        const dbNameToCheck = process.env.DB_NAME
        const dbExists = databases.databases.some(db => db.name === dbNameToCheck);
        
        if (dbExists) {
            console.log(`Database "${dbNameToCheck}" already exists.`);
        } else {
            console.log(`Database "${dbNameToCheck}" does not exist. Creating...`);

            const db = client.db(dbNameToCheck);
            await db.createCollection("temp"); // This creates the database and collection with the name temp
            console.log(`Database "${dbNameToCheck}" created with collection "${collectionToCreate}".`);
        }

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
    } finally {
        await client.close();
        return flag
    }
}

async function getDBConnection() {

    await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME});

    return mongoose.connection.db;
}

module.exports = {testDBConnection,getDBConnection}

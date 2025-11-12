import mongoose from 'mongoose';
import dotenv from 'dotenv';

// When running this script from the server folder (node scripts/fixIndexes.js)
// './.env' will load the server/.env file.
dotenv.config({ path: './.env' });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO || 'mongodb://localhost:27017/test';

async function run() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection.db;
        const collectionName = 'users';

        const indexes = await db.collection(collectionName).indexes();
        console.log('Existing indexes:', indexes);

        // Drop any existing email index that is non-sparse
        for (const idx of indexes) {
            if (idx.key && idx.key.email) {
                console.log('Dropping index:', idx.name);
                await db.collection(collectionName).dropIndex(idx.name);
            }
        }

        // Create sparse unique index
        console.log('Creating sparse unique index on email');
        await db.collection(collectionName).createIndex({ email: 1 }, { unique: true, sparse: true });

        console.log('Index fix completed');
        process.exit(0);
    } catch (err) {
        console.error('Error fixing indexes:', err);
        process.exit(1);
    }
}

run();

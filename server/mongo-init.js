/* eslint-disable */
const dbName = process.env.MONGO_DATABASE || "silentium";

// Switch to the application database
db = db.getSiblingDB(dbName);

// Create collections
db.createCollection('articles');
db.createCollection('settings');
db.createCollection('categories');
db.createCollection('sections');

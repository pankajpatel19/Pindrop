import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins:[
    jwt()
  ],
  socialProviders:{
    google:{
       clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  experimental: { joins: true },
});

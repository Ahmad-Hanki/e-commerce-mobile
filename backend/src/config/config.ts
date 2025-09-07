import dotenv from "dotenv";
import { ServiceAccount } from "firebase-admin";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  firebase: ServiceAccount;
}

// Helper function to format private key correctly
const formatPrivateKey = (key: string | undefined): string => {
  if (!key) return "";
  return key.replace(/\\n/g, "\n");
};

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
  },
};

export default config;

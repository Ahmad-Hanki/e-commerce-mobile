import * as admin from "firebase-admin";
import config from "../config/config";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
  });
}

export default admin;

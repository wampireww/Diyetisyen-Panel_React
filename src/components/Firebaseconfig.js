import React from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  //config //
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage=getStorage(app);
export const db=getDatabase(app);


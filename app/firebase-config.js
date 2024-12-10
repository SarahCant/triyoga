import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  startAt,
  endAt,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYrVDfV2oI4nyh9eRWx_eaIPvgoeNpuag",
  authDomain: "triyoga-bbaf1.firebaseapp.com",
  databaseURL: "https://triyoga-bbaf1-default-rtdb.firebaseio.com",
  projectId: "triyoga-bbaf1",
  storageBucket: "triyoga-bbaf1.firebasestorage.app",
  messagingSenderId: "596940906434",
  appId: "1:596940906434:web:d976596c8f763d1cfe005b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const database = getDatabase(app);
export { database };
export const fetchClassesForWeek = async (startDate, endDate) => {
  const classesRef = ref(database, "teams");
  const classesQuery = query(classesRef, orderByChild("startDate"));

  try {
    const snapshot = await get(classesQuery);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const currentWeekClasses = Object.values(data).filter((item) => {
        //convert to date objects to compare with later
        const itemStartDate = new Date(item.startDate);
        const itemEndDate = new Date(item.endDate);
        const weekStartDate = new Date(startDate);
        const weekEndDate = new Date(endDate);

        //check if class overlaps with current week
        return (
          itemEndDate >= weekStartDate && // class ends after or during the start of the week
          itemStartDate <= weekEndDate // class starts before or during the end of the week
        );
      });

      return currentWeekClasses;
    }
    return [];
  } catch (error) {
    console.error("Error fetching classes: ", error);
    return [];
  }
};

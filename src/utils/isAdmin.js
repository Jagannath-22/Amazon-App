// src/utils/isAdmin.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

const checkAdminStatus = async (email) => {
  try {
    const docRef = doc(db, "admins", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.isAdmin === true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export default checkAdminStatus;

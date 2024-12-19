// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD-5lGKxELYofNPIve8J-XcN6ERmVOk1S8",
	authDomain: "sampletasks-171cb.firebaseapp.com",
	projectId: "sampletasks-171cb",
	storageBucket: "sampletasks-171cb.firebasestorage.app",
	messagingSenderId: "711072723012",
	appId: "1:711072723012:web:733b608e0ed055b3764c11",
	databaseURL:
		"https://sampletasks-171cb-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

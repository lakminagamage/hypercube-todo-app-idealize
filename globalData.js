import { collection, getDocs } from "firebase/firestore";

class globalData {

    static finalTasks = [];

    static async getTasks(db, user_email) {
        var tasks = [];
        const querySnapshot = await getDocs(collection(db, user_email));

        querySnapshot.forEach((doc) => {
            tasks.push(doc.data());
        });
        return tasks;
    }
}

export default globalData;
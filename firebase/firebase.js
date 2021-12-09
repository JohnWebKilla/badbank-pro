import fire from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDAPKqb--cHpKCk1o9mD7lFa5HM5smcixE",
  authDomain: "badbankpro.firebaseapp.com",
  databaseURL: "https://badbankpro-default-rtdb.firebaseio.com",
  projectId: "badbankpro",
  storageBucket: "badbankpro.appspot.com",
  messagingSenderId: "599286597158",
  appId: "1:599286597158:web:7a53c64dc2fb74edb408e7",
};

class Firebase {
  constructor() {
    if (!fire.apps.length) {
      fire.initializeApp(config);
    }
    this.auth = fire.auth();
    this.db = fire.firestore();
  }

  async login({ email, password }) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }

  async register({ name, email, password }) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.sendEmailVerification();
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  isLoggedIN() {
    if (this.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  async deleteAccount() {
    if (this.auth.currentUser) {
      await this.auth.currentUser.delete();
      return true;
    } else {
      return false;
    }
  }

  getProfile() {
    if (this.auth.currentUser) {
      return {
        name: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email,
        verified: this.auth.currentUser.emailVerified,
      };
    } else {
      return {
        name: null,
        email: null,
      };
    }
  }
  getBalancePromise(profile) {
    if (profile) {
      const docRef = this.db.collection("users").doc(profile.email);
      const balancePromise = docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          } else {
            console.log("No such document!");
          }
          return data;
        })
        .catch((error) => {
          console.log(
            "Error getting document:",
            error,
            "\nCreating New Document"
          );
          this.db.collection("users").doc(profile.email).set({
            balance: 0,
            userName: profile.name,
          });
          console.log("CREATED!");
        });

      return balancePromise;
    } else {
      return null;
    }
  }

  depositAmount(profile, amount) {
    const docRef = this.db.collection("users").doc(profile.email);
    docRef.update({
      balance: fire.firestore.FieldValue.increment(amount),
    });
  }

  withdrawAmount(profile, amount) {
    const docRef = this.db.collection("users").doc(profile.email);
    docRef.update({
      balance: amount,
    });
  }
  async sendVerification() {
    try {
      if (this.auth.currentUser) {
        await this.auth.currentUser.sendEmailVerification();
        return true;
      } else {
        throw "";
      }
    } catch (error) {
      return false;
    }
  }

  //   async getProfile() {
  //     console.log(this.auth.currentUser);

  // if (this.auth.currentUser) {

  //   return {
  //     name: this.auth.currentUser.displayName,
  //     email: this.auth.currentUser.email,
  //     verified: this.auth.currentUser.emailVerified,
  //   };
  // } else {
  //   return {
  //     name: null,
  //     email: null,
  //   };
  // }
  //   }
}

export default new Firebase();

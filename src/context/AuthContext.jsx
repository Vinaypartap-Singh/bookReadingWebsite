import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import react, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        const userDocRef = doc(db, "users", `${user.uid}`);
        setDoc(userDocRef, {
          username: username,
          email: email,
          password: password,
          booksPublished: [],
          booksSaved: [],
          bookChecked: [],
        });

        alert("Account Created");
        navigate("/login");

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInUser = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Sign in Success");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const logOutUser = async () => {
    return signOut(auth)
      .then(() => {
        navigate("/login");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        navigate("/");
        setCurrentUser(currUser);
      }

      if (!currUser) return;
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInUser,
    createUser,
    logOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

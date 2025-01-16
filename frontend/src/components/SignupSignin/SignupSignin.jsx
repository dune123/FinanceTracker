import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db,provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let userRef = useRef();

  const handleSubmit = () => {
    setLoading(true);
    //Authentication the user, or basically create a new account using email and password
    if (
      fullname != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User created!");
            setLoading(false);
            setFullname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
            // Create A doc with user id as the following id
            createDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and comfirm password don't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  function handleLogin() {
    //login with email and password
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    //make sure that the dov with teh uid doesn't exist
    //create a doc
    if (!user) {
      return;
    }

    userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : fullname,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Doc already exists");
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user)
        setLoading(false);
        navigate("/dashboard");
        toast.success("User authenticated successfully!")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
    
  }
  return (
    <>
      {!loginForm ? (
        <div className="w-[35vw] h-[75vh] shadow-lg rounded-lg flex flex-col items-center p-30 gap-4">
          <p className="text-xl">
            Sign Up On <span className="text-[#2970FF]">Financely.</span>
          </p>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className=" border-b-[1px] border-black p-1"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              className=" border-b-[1px] border-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Pasword</label>
            <input
              type="password"
              placeholder="Full Name"
              className=" border-b-[1px] border-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Full Name"
              className=" border-b-[1px] border-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2 items-center">
            <button
              disabled={loading}
              className="w-full border-2 border-[#2970FF] text-[#2970FF] bg-white rounded-lg h-10"
              onClick={handleSubmit}
            >
              {loading ? "loading..." : "Signup with Email and password"}
            </button>
            <p>or</p>
            <button className="w-full border-2 border-none text-white bg-[#2970FF] rounded-lg h-10" onClick={googleAuth}>
              {loading ? "loading..." : "SignUp with Google"}
            </button>
          </div>
          <p>
            Already have an account?
            <span
              className=" text-[#2970FF] cursor-pointer"
              onClick={() => setLoginForm(true)}
            >
              Click here
            </span>
          </p>
        </div>
      ) : (
        <div className="w-[35vw] h-[55vh] shadow-lg rounded-lg flex flex-col items-center p-30 gap-4">
          <p className="text-xl">
            Log In On <span className="text-[#2970FF]">Financely.</span>
          </p>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              className=" border-b-[1px] border-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2">
            <label>Pasword</label>
            <input
              type="password"
              placeholder="Full Name"
              className=" border-b-[1px] border-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-[30vw] flex flex-col gap-2 items-center">
            <button
              disabled={loading}
              className="w-full border-2 border-[#2970FF] text-[#2970FF] bg-white rounded-lg h-10"
              onClick={handleLogin}
            >
              {loading ? "loading..." : "Log in with Email and password"}
            </button>
            <p>or</p>
            <button className="w-full border-2 border-none text-white bg-[#2970FF] rounded-lg h-10" onClick={googleAuth}>
              {loading ? "loading..." : "Log in with Google"}
            </button>
          </div>
          <p>
            Don't have an account?
            <span
              className=" text-[#2970FF] cursor-pointer"
              onClick={() => setLoginForm(false)}
            >
              Click here
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default SignupSignin;

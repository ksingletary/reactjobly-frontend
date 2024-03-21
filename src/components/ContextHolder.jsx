import {useState, useEffect } from "react";
import AppRoutes from "../AppRoutes";
import NavBar from "./NavBar";
import UserContext from "../context/UserContext";
import JoblyApi from "../../api";
import { jwtDecode } from "jwt-decode";
import { ThemeProvider } from "@emotion/react";
import theme from "../context/theme";
import { BrowserRouter } from "react-router-dom";

const ContextHolder = () => {
  const LOCAL_STORAGE_KEY = "token";

  // Create and store current user state.
  // By default, will retrieve user from local storage. If user is null, then return an empty object.  Otherwise, parse the object and return it as currentUser.
  const [currentUser, setCurrentUser] = useState("");

  const [token, setToken] = useState(() => {
    try {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (value == null) return null;
      //   console.log("retrieved from localStorage:", value);
      return JSON.parse(value);
    } catch (error) {
      console.log("error retrieving token:", error);
    }
  });


  // Any time token is updated, store in localstorage and update currentUser
  useEffect(() => {
    const updateToken = async () => {
      try {
        // set the token to local storage as string
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
        
        if (!token) {
          return;
        }
        JoblyApi.token = token; // updates token for API
        let decodedToken = jwtDecode(token);
        // If there is a token, use the username to set currentUser
        setCurrentUser(await JoblyApi.getProfile(decodedToken.username));
        // console.log(currentUser)
        // console.log('decoded',decoded)
      } catch (error) {
        console.log("error in updateToken", error);
      }
    };
    updateToken();
  }, [token]);

  // REGISTRATION form function to handle form submits
  async function signupFormSubmit(formData) {
    let res = await JoblyApi.registerUser({ ...formData });
    setToken(res); // sets the token with resposne from server
    // console.log('formSubmit called')
    currentUser.token = token;
    console.log("register res", res);
  }

  // LOGIN form function. Let user log in.
  async function loginFormSubmit(formData) {
    try {
      let res = await JoblyApi.loginUser({ ...formData });

      setToken(res);
      JoblyApi.token = res;
    } catch (error) {
      console.log("login error:", error);
    }
  }

 
  const context = {
    signupFormSubmit,
    currentUser,
    setCurrentUser,
    loginFormSubmit,
    token,
    setToken,
    LOCAL_STORAGE_KEY,
  };

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={context}>
        <BrowserRouter>
          <NavBar />
          {/* Routes for the app */}
          <AppRoutes />
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default ContextHolder;
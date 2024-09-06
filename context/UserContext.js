import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [watched, setWatched] = useState([]);
  const [toWatched, setToWatched] = useState([]);

  useEffect(() => {
    const localData = async () => {
      const watchedData = await AsyncStorage.getItem("watched");
      const toWatch = await AsyncStorage.getItem("toWatched");
      const storedUserName = await AsyncStorage.getItem("userName");
      !!watchedData && setWatched(JSON.parse(watched));
      !!toWatch && setToWatched(JSON.parse(toWatch));
      !!storedUserName && setUserName(JSON.parse(storedUserName));
    };
    localData();
  }, []);

  const updateUsername = async (newUserName) => {
    setUserName(newUserName);
    AsyncStorage.setItem("userName", newUserName);
  };
  return <UserContext.Provider value={{userName,updateUsername, watched,setWatched,toWatched,setToWatched }}>{children}</UserContext.Provider>
};

export const useUser = ()=>useContext(UserContext)
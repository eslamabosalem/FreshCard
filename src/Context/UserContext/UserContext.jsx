import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const successToast = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [userLogin, setUserLogin] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userAddresses, setUserAddresses] = useState([]);

  async function getUserAddresses() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        { headers }
      );
      setUserAddresses(data?.data);
    } catch (error) {
      return error;
    }
  }

  async function addAddress(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        values,
        { headers }
      );
      if (data.status == "success") {
        setUserAddresses(data.data);
        toast.success(data?.message, successToast);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async function deleteAddress(addressId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
        { headers }
      );
      if (data.status == "success") {
        setUserAddresses(data?.data);
        toast.success(data?.message, successToast);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async function updateData(values) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        values,
        { headers }
      );
      if (data.message == "success") {
        setUserName(data.user.name);
        setUserEmail(data.user.email);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        toast.success("data updated successfully", successToast);
      }

      return data;
    } catch (error) {
      return error;
    }
  }

  async function updatePassword(values) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        values,
        { headers }
      );
      if (data.message == "success") {
        toast.success("password changed successfully", successToast);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  //dark mode
  const [isDarkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "true");
      setDarkMode(true);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "false");
      setDarkMode(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserLogin(localStorage.getItem("userToken"));
      setUserName(localStorage.getItem("userName"));
      setUserEmail(localStorage.getItem("userEmail"));
      getUserAddresses();
    } else {
      setUserLogin(null);
      setUserName(null);
      setUserEmail(null);
    }
  }, [userLogin]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") {
      document.documentElement.classList.remove("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        setUserLogin,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userAddresses,
        setUserAddresses,
        getUserAddresses,
        addAddress,
        deleteAddress,
        updateData,
        updatePassword,
        toggleDarkMode,
        isDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";
import Apiservice from "./../services/ApiService";

export const DataContext = createContext();

const Provider = ({ children }) => {
  const [account, setAccount] = useState([]);
  const [semester, setSemester] = useState([]);
  const [cls, setCls] = useState([]);
  const [course, setCourse] = useState([]);
  const [accountCourse, setAccountCourse] = useState([]);
  const [accountSemester, setAccountSemester] = useState([]);
  const [status, setStatus] = useState([]);
  const [selected, setSelected] = useState("");

  const fetchAccount = async () => {
    try {
      const response = await Apiservice.getListAccount();
      setAccount(response);
    } catch (error) {
      console.error("Error fetching Account:", error);
    }
  };

  const fetchSemester = async () => {
    try {
      const response = await Apiservice.getListSemester();
      setSemester(response);
    } catch (error) {
      console.error("Error fetching Semester:", error);
    }
  };

  const fetchClass = async () => {
    try {
      const response = await Apiservice.getListClass();
      setCls(response);
    } catch (error) {
      console.error("Error fetching Class:", error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await Apiservice.getListCourse();
      setCourse(response);
    } catch (error) {
      console.error("Error fetching Course:", error);
    }
  };

  const fetchAccountCourse = async () => {
    try {
      const response = await Apiservice.getListAccountCourse();
      setAccountCourse(response);
    } catch (error) {
      console.error("Error fetching Account Course:", error);
    }
  };

  const fetchAccountSemester = async () => {
    try {
      const response = await Apiservice.getListAccountSemester();
      setAccountSemester(response);
    } catch (error) {
      console.error("Error fetching Account Semester:", error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await Apiservice.getListStatus();
      setStatus(response);
    } catch (error) {
      console.error("Error fetching Status", error);
    }
  };

  useEffect(() => {
    fetchAccount();
    fetchSemester();
    fetchClass();
    fetchCourse();
    fetchAccountCourse();
    fetchAccountSemester();
    fetchStatus();
  }, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        semester,
        setSemester,
        cls,
        setCls,
        course,
        setCourse,
        accountCourse,
        setAccountCourse,
        accountSemester,
        setAccountSemester,
        status,
        setStatus,
        selected,
        setSelected
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Provider;

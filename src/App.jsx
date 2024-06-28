import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/users/HomePage";
import "./assets/css/style.css";
import { PATHROUTERS } from "./utils/pathRouter";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: PATHROUTERS.USERS.LOGIN,
      component: ""
    },
    {
      path: PATHROUTERS.USERS.HOMEPAGES,
      component: <HomePage />
    },
    {
      path: PATHROUTERS.USERS.HOMECOURSES,
      component: ""
    },
    {
      path: PATHROUTERS.USERS.LOGIN,
      component: ""
    }
  ];

  return (
    <Routes>
      {userRouters.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
      ))}
    </Routes>
  );
};

function App() {
  return renderUserRouter();
}

export default App;

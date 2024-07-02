import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/students/HomePage";
import "./assets/css/style.css";
import { PATHROUTERS } from "./utils/pathRouter";
import Assignment from "./components/students/Assignment";
import UpcomingSlot from './components/students/UpcomingSlot';

const renderUserRouter = () => {
  const userRouters = [
    {
      path: PATHROUTERS.USERS.SHOWPAGE,
      component: ""
    },
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
    },
    {
      path: PATHROUTERS.USERS.ASSIGNMENT,
      component: <Assignment />
    },
    {
      path: PATHROUTERS.USERS.UPCOMINGSLOT,
      component: <UpcomingSlot />
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

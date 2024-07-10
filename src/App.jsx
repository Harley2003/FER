import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/students/HomePage";
import ShowPage from "./components/users/ShowPage"
import Login from "./components/users/Login/Login"
import "./assets/css/style.css";
import { PATHROUTERS } from "./utils/pathRouter";
import Assignment from "./components/students/Assignment";
import UpcomingSlot from './components/students/UpcomingSlot';
import CourseDetails from "./components/students/CourseDetails";
import DetailQuestion from './components/students/DetailQuestion';

const renderUserRouter = () => {
  const userRouters = [
    {
      path: PATHROUTERS.USERS.SHOWPAGE,
      component: <ShowPage/>,
    },
    {
      path: PATHROUTERS.USERS.LOGIN,
      component: <Login/>,
    },
    {
      path: PATHROUTERS.USERS.HOMEPAGES,
      component: <HomePage />,
    },
    {
      path: PATHROUTERS.USERS.HOMECOURSES,
      component: <CourseDetails />,
    },
    {
      path: PATHROUTERS.USERS.ASSIGNMENT,
      component: <Assignment />,
    },
    {
      path: PATHROUTERS.USERS.UPCOMINGSLOT,
      component: <UpcomingSlot />,
    },
    {
      path: PATHROUTERS.USERS.VIEWDETAILQUESTIONS,
      component: <DetailQuestion />
    }
  ];

  return (
    <Routes>
      {userRouters.map((item, key) => (
        <Route key={key} path={item.path} element={item.component}>
          {item.children &&
            item.children.map((child, childKey) => (
              <Route
                key={childKey}
                path={child.path}
                element={child.component}
              />
            ))}
        </Route>
      ))}
    </Routes>
  );
};

function App() {
  return renderUserRouter();
}

export default App;

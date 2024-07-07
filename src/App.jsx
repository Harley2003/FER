import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import ShowPage from "./components/users/ShowPage";
import "./assets/css/style.css";
import { PATHROUTERS } from "./utils/pathRouter";
import Login from "./components/users/Login/Login";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: PATHROUTERS.USERS.SHOWPAGE,
      component: <ShowPage/>
    },
    {
      path: PATHROUTERS.USERS.LOGIN,
      component: <Login/>
    },
    {
      path: PATHROUTERS.USERS.HOMEPAGES,
      component: ""
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

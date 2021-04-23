// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import AddTutorial from "./components/AddTutorial";
// import Tutorial from "./components/Tutorial";
// import TutorialsList from "./components/TutorialsList";

// function App() {
//   return (
//     <Router>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <a href="/tutorials" className="navbar-brand">
//           LEE
//         </a>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/tutorials"} className="nav-link">
//               Portfolios
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to={"/add"} className="nav-link">
//               Add
//             </Link>
//           </li>
//         </div>
//       </nav>

//       <div className="container mt-3">
//         <Switch>
//           <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
//           <Route exact path="/add" component={AddTutorial} />
//           <Route path="/tutorials/:id" component={Tutorial} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import TutorialsList from "./components/TutorialsList";
import About from "./components/About";
import Main from "./components/Main";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-white bg-white">
          <Link to={"/"} className="navbar-brand">
            LEE
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                {/* <Link to={"/tutorials"} className="nav-link"> */}
                About
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  project
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                </Link>
                </li>
              </div>
            )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Main} />
            {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/tutorials" component={TutorialsList} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
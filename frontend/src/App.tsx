import "./styles/App.css";

import { MenuItem, TopNavigationProps } from "./components/TopNavigation";
import TopNavigation from "./components/TopNavigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RestaurantsPage from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import WriteReviewPage from "./pages/WriteReview";
import { useState } from "react";


function App() {
  let [userName, setUserName] = useState(undefined);
  let [userToken, setUserToken] = useState(-1);

  const menuProps: TopNavigationProps = {
    items: [
      {
        label: "Home",
        key: "/",
        element: <HomePage />,
      },
			{
				label: "Restaurants",
				key: "/restaurants",
				element: <RestaurantsPage />
			},
      {
        label: "About",
        key: "/about",
        element: <AboutPage />,
      },
      {
        label: userName === undefined ? "Login" : `Welcome ${userName}!`,
        key: "/login",
        element: <LoginPage setUserName={setUserName} setUserToken={setUserToken}/>,
      },
    ],
  };

  return (
    <Router>
      <div className="App">
        <TopNavigation {...menuProps} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Routing for navigation menu */}
          {menuProps.items.map((value: MenuItem, index: number) => (
            <Route key={index} path={value.key} element={value.element} />
          ))}
          {/* Routing for restaurant details page(s) */}
          <Route path="/restaurants/:name" element={<RestaurantDetails />} />
          {/* Routing for review pages */}
          <Route path="/restaurants/:name/review" element={<WriteReviewPage userToken={userToken}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

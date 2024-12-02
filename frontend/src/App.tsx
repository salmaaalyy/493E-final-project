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


function App() {
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
        label: "Login",
        key: "/login",
        element: <LoginPage />,
      },
    ],
  };

  const routes = (
    <Routes>
      {menuProps.items.map((value: MenuItem, index: number): any => {
        return (
          <Route key={index} path={value?.key} element={value?.element}></Route>
        );
      })}
    </Routes>
  );

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
          <Route path="/restaurants/:name/review" element={<WriteReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

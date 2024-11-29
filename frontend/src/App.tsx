import "./styles/App.css";

import { MenuItem, TopNavigationProps } from "./components/TopNavigation";
import TopNavigation from "./components/TopNavigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RestaurantsPage from "./pages/Restaurants";

function App() {
  const menuProps: TopNavigationProps = {
    items: [
      // {
      //   label: "Home",
      //   key: "/",
      //   element: <HomePage />,
      // },
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
    <div className="App">
      <Router>
        <TopNavigation {...menuProps} />
        {routes}
      </Router>
    </div>
  );
}

export default App;

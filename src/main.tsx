import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import {
  AuthContextProvider,
  DarkModeThemeProvider,
  ShoppingCartContextProvider,
} from "./contexts";

// A wrapper component to use the routes
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <AuthContextProvider>
    <DarkModeThemeProvider>
      <ShoppingCartContextProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ShoppingCartContextProvider>
    </DarkModeThemeProvider>
  </AuthContextProvider>
);

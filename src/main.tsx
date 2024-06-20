import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import {
  AuthContextProvider,
  DarkModeThemeProvider,
  ShoppingCartContextProvider,
} from "./contexts";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <>
    <AuthContextProvider>
      <DarkModeThemeProvider>
        <ShoppingCartContextProvider>
          <Router>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </ShoppingCartContextProvider>
      </DarkModeThemeProvider>
    </AuthContextProvider>
  </>
);

import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  HashRouter as Router,
} from "react-router-dom";
import { routes } from "./routes";
import {
  AuthContextProvider,
  DarkModeThemeProvider,
  ShoppingCartContextProvider,
} from "./contexts";

const router = createBrowserRouter(routes);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <>
    <AuthContextProvider>
      <DarkModeThemeProvider>
        <ShoppingCartContextProvider>
          <Router>
            <RouterProvider router={router} />
          </Router>
        </ShoppingCartContextProvider>
      </DarkModeThemeProvider>
    </AuthContextProvider>
  </>
);

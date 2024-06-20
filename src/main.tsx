import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
          <RouterProvider router={router} />
        </ShoppingCartContextProvider>
      </DarkModeThemeProvider>
    </AuthContextProvider>
  </>
);

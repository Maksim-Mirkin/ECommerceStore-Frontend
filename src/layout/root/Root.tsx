import { Outlet, ScrollRestoration } from "react-router-dom";

import { ShoppingCart } from "../../components/Cart";
import Header from "../../components/Header";
import { Navbar } from "../../components";
import Footer from "../../components/Footer";

/**
 * Root Layout
 * Serves as the primary layout component that wraps around all other components in the application.
 * It structures the main user interface elements including the header, navigation bar, content area, footer, and shopping cart.
 *
 * Features:
 * - Uses the `Header`, `Navbar`, and `Footer` components to provide consistent site navigation and information display across all pages.
 * - Incorporates `ScrollRestoration` from React Router to manage scroll positions between navigation transitions.
 * - The `Outlet` component is used to render child routes dynamically, allowing for a flexible and nested routing structure.
 * - Ensures that the main content and shopping cart are seamlessly integrated into the overall layout.
 */
const Root = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <Navbar />
      <main className="flex-1 bg-slate-100 dark:bg-slate-700">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
      <ShoppingCart />
    </div>
  );
};

export default Root;

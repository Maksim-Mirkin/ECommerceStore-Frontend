import { Outlet, ScrollRestoration } from "react-router-dom";

import { ShoppingCart } from "../../components/Cart";
import Header from "../../components/Header";
import { Navbar } from "../../components";
import Footer from "../../components/Footer";

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

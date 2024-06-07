import { RouteObject } from "react-router-dom";
import Root from "../layout/root/Root";
import ErrorPage from "./error/ErrorPage";
import Product from "./Product";
import Products from "./Products";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Register from "./Register";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";
import ContactUs from "./ContactUs";

import Account from "./Account";
import Category from "./Category";
import ProductIdError from "./error/ProductIdError";
import NotFoundError from "./error/NotFoundError";
import {
  AddProduct,
  AllOrders,
  UserData,
  UserOrders,
} from "../components/Account";
import Cart from "./Cart";
import OrderSubmit from "./OrderSubmit";
import Orders from "./Orders";
import { ProtectedRoute } from "../components";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "laptop",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: "cellular",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: "tv",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: "headphone",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
          {
            path: "search",
            element: (
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
        errorElement: <ProductIdError />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms",
        element: <TermsOfUse />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "user",
            element: (
              <ProtectedRoute>
                <UserData />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            ),
          },
          {
            path: "all-orders",
            element: (
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-product",
            element: (
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <OrderSubmit />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundError />,
      },
    ],
  },
];

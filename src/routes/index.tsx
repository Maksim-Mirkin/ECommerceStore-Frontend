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

/**
 * Defines the route configuration for the entire application.
 * Includes both public and protected routes, error handling routes, and routes with nested children.
 */
export const routes: RouteObject[] = [
  {
    path: "/", // Root route
    element: <Root />,
    errorElement: <ErrorPage />, // Default error page for any unresolved issues within this route
    children: [
      {
        index: true, // Default page at the root level
        element: <Home />,
      },
      {
        path: "category", // Parent route for product categories
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
        children: [
          // Nested routes under each category, protected, showing categorized products
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
        path: "products/:id", // Dynamic route for individual products
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
        errorElement: <ProductIdError />, // Specific error page for product ID issues
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
      { path: "terms", element: <TermsOfUse /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "contact-us", element: <ContactUs /> },
      {
        path: "account", // Protected route for user account details
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
        path: "orders/:id", // Route for viewing specific orders
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // Fallback route for any unhandled paths
        element: <NotFoundError />,
      },
    ],
  },
];

/**
 * This routing configuration supports a structured and secure navigation framework, ensuring that access to certain
 * parts of the application is restricted to authenticated users and providing a clear path for handling various
 * types of content and interactions within the application. Each route is carefully configured to handle specific
 * elements and potential errors.
 */

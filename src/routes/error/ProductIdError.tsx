import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { baseURL } from "../../utils/config";

/**
 * ProductError Route
 * Displays an error page specifically for product-related issues, using React Router's error handling capabilities.
 *
 * Features:
 * - Retrieves error details using `useRouteError` and formats messages based on the error type (e.g., standard errors, string messages, or HTTP response errors).
 * - Provides a visual indication of an error state with a thematic "sad robot" image.
 * - Offers user-friendly navigation options to go back to the previous page or return to the home page, aiding in recovery from the error.
 * - Ensures users understand the nature of the error with a clear display of the error message.
 */
const ProductError = () => {
  const error = useRouteError();
  const nav = useNavigate();

  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (isRouteErrorResponse(error)) {
    errorMessage = `${error.data} ${error.status} ${error.statusText}`;
  }
  return (
    <div className="flex flex-col justify-evenly items-center bg-slate-100 dark:bg-slate-600 h-screen ">
      <h1 className="text-red-500">Oops!</h1>
      <img src={`${baseURL}/assets/sad-robot.png`} alt="Sad robot" />
      <h2 className="text-red-500 mx-8">{errorMessage}</h2>
      <div className="flex justify-between w-64">
        <button
          onClick={() => nav(-1)}
          className="action-button"
          aria-label="Go back to the previous page"
        >
          Go Back
        </button>
        <button
          onClick={() => nav("/")}
          className="action-button"
          aria-label="Go to the home page"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ProductError;

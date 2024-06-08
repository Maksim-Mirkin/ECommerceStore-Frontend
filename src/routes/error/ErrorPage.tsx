import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

/**
 * ErrorPage Route
 * Displays an error page when navigation errors occur. This route uses the error boundary provided by React Router to handle errors gracefully.
 *
 * Features:
 * - Retrieves and displays error messages based on the type of error encountered, whether it's a standard error, a string, or a structured HTTP error response.
 * - Provides options to navigate back to the previous page or to the homepage for user convenience.
 * - Uses a visual representation (sad robot image) to enhance the user interface during error display.
 */
const ErrorPage = () => {
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
      <img src="../assets/sad-robot.png" alt="Sad robot" />
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

export default ErrorPage;

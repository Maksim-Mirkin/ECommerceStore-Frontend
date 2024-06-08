import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

/**
 * NotFoundError Route
 * Displays a custom 404 error page when a user navigates to a non-existent route.
 * It leverages React Router's error handling capabilities to manage and display error details.
 *
 * Features:
 * - Presents a friendly error message with a "404 - Not Found" status to inform users that the requested page is unavailable.
 * - Optionally displays additional error details if available, enhancing user understanding of the error context.
 * - Provides navigation buttons allowing users to return to the previous page or the homepage, aiding in error recovery.
 * - Incorporates a visual element (sad robot image) to soften the impact of the error message.
 */
const NotFoundError = () => {
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
      <h2 className="text-red-500 mx-8">404 - Not Found</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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

export default NotFoundError;

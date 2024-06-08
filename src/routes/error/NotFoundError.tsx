import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

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

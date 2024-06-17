import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";
import { Dialogs } from "../ui/dialogs";
import { Auth } from "../services/auth-service";
import { LoginRequest } from "../@types/types";
import { InputField } from "../components";
import { baseURL } from "../utils/config";

/**
 * Login Route
 * Provides an interface for user authentication, handling login credentials submission
 * and directing authenticated users to the homepage. This route uses form validation
 * and integrates with the AuthContext for managing authentication state.
 *
 * Features:
 * - Redirects already logged-in users to the home page.
 * - Provides input fields for username and password with validation rules.
 * - Displays error messages and success notifications using dialog boxes.
 * - Includes a link for users to navigate to the registration page or to request password reset.
 */
const Login = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();
  const hoverLinkCss =
    "underline hover:text-primary-regular dark:hover:text-primary-light transition-colors duration-300 ease-in-out";
  useEffect(() => {
    if (isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn, nav]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: "onBlur",
  });

  const handleForgotPassword = () => {
    Dialogs.warning("Please contact the administrator to reset your password.");
  };

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const res = await Auth.login(data);
      await Dialogs.success("Logged in successfully!");
      login(res.jwt);
      nav("/");
    } catch (e: unknown) {
      if (
        e != null &&
        typeof e == "object" &&
        "message" in e &&
        typeof e["message"] == "string"
      ) {
        Dialogs.error(e.message);
      } else {
        Dialogs.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Sign in</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-5 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-xl p-5 text-xl"
      >
        <InputField
          register={register}
          errors={errors}
          name="username"
          placeholder="Username"
          aria-label="Username"
          required
          type="text"
        />
        <InputField
          register={register}
          errors={errors}
          name="password"
          type="password"
          required
          pattern={{
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&_]).{8,32}$/,
            message:
              "Your password must be 8-32 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
          }}
          placeholder="Password"
          aria-label="Password"
        />
        <button
          className="action-button w-fit"
          type="submit"
          aria-label="Sign in"
        >
          Sign in
        </button>
      </form>
      <div className="flex flex-row items-center justify-center mt-2">
        <button className="justify-self-center" onClick={handleForgotPassword}>
          <p className={`text-xl ${hoverLinkCss}`}>Forgot Password?</p>
        </button>
      </div>
      <p className="text-center block my-8 text-xl">
        Don't have an account?{" "}
        <Link to={`${baseURL}register`} className={hoverLinkCss}>
          Register
        </Link>
      </p>
    </>
  );
};

export default Login;

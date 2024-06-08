import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Dialogs } from "../ui/dialogs";
import { Auth } from "../services";
import { AuthContext } from "../contexts";
import { Avatar, InputField } from "../components";
import { RegisterRequest } from "../@types/types";

/**
 * Register Route
 * Handles user registration with form validation and navigation based on authentication status.
 *
 * Features:
 * - Redirects authenticated users to the home page.
 * - Provides form inputs for username, email, password, and password confirmation.
 * - Validates user input and handles registration and login upon form submission.
 * - Displays success or error messages via dialog boxes.
 * - Navigates to the home page upon successful registration and login.
 */
const Register = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    if (data.password !== data.confirmPassword) {
      Dialogs.error("Password and confirm password do not match");
      return;
    }
    try {
      await Auth.register(data);
      const res = await Auth.login({
        username: data.username,
        password: data.password,
      });

      login(res.jwt);
      Dialogs.success("Registration successful! Enjoy your stay!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Dialogs.error(error.message);
      } else {
        Dialogs.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Sign up</h1>
      <Avatar image={image} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center gap-5 mx-4 md:w-1/2 md:mx-auto shadow-2xl rounded-xl p-5 text-xl"
      >
        <InputField
          register={register}
          errors={errors}
          name="username"
          type="text"
          required
        />
        <InputField
          register={register}
          errors={errors}
          placeholder="Image URL"
          name="image"
          type="text"
          onChange={(e) => {
            setImage(e.target.value);
          }}
          required
        />
        <InputField
          pattern={{
            message: "Email must be valid",
            value: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/,
          }}
          register={register}
          errors={errors}
          name="email"
          type="text"
          required
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
        />
        <InputField
          register={register}
          errors={errors}
          name="confirmPassword"
          type="password"
          required
        />
        <button
          className="action-button w-fit"
          type="submit"
          aria-label="Register"
        >
          Register
        </button>
      </form>
      <p className="text-center block my-8 text-xl">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline hover:text-primary-regular dark:hover:text-primary-light transition-colors duration-300 ease-in-out"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;

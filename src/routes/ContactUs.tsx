import { Link } from "react-router-dom";
import {
  GithubIcon,
  GithubWhiteIcon,
  InstagramIcon,
  LinkedInIcon,
  XTwitterIcon,
  XTwitterWhiteIcon,
} from "../ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialogs } from "../ui/dialogs";
import { InputField, AutoExpandingTextarea } from "../components";
import { preventSymbols } from "../utils/inputUtils";

type ContactUsProps = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

/**
 * ContactUs Route
 * Provides a user interface for visitors to send messages directly to the site's team.
 * Includes form validation and submission handling with a success message upon submission.
 *
 * The route features:
 * - A form for name, phone, email, and a message, with real-time validation.
 * - Links to social media profiles including LinkedIn, GitHub, Instagram, and Twitter with appropriate icons.
 * - Visual feedback on form submission success via dialog boxes.
 */
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsProps>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ContactUsProps> = () => {
    reset();
    Dialogs.success(
      "Your message has been sent successfully! We will get back to you soon."
    );
  };

  return (
    <div className="flex flex-col items-center text-center mx-4 px-4">
      <h1 className="my-4">Get In Touch</h1>
      <p className="mb-4">
        We love to hear from you. Our friendly team is always here to contact
        with you.
      </p>
      <p className="mb-4">
        Should you wish to reach out to us directly, please feel free to use the
        following email address: maksim.mirkin@gmail.com.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-evenly sm:w-full my-8">
        <Link
          to="https://www.linkedin.com/in/maksim-mirkin/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <img src={LinkedInIcon} alt="LinkedIn icon" className="h-24" />
        </Link>
        <Link
          to="https://github.com/Maksim-Mirkin"
          target="_blank"
          aria-label="GitHub"
        >
          <img
            src={GithubIcon}
            alt="GitHub icon"
            className="h-24 dark:hidden"
          />
          <img
            src={GithubWhiteIcon}
            alt="GitHub icon"
            className="h-24 hidden dark:block"
          />
        </Link>
        <Link
          to="https://www.instagram.com/"
          target="_blank"
          aria-label="Instagram"
        >
          <img src={InstagramIcon} alt="Instagram icon" className="h-24" />
        </Link>
        <Link to="https://twitter.com/" target="_blank" aria-label="Twitter">
          <img
            src={XTwitterIcon}
            alt="Twitter icon"
            className="h-24 dark:hidden"
          />
          <img
            src={XTwitterWhiteIcon}
            alt="Twitter icon"
            className="h-24 hidden dark:block"
          />
        </Link>
      </div>
      <div className="border border-black dark:border-white w-4/5 mb-4 rounded-xl shadow-xl p-4">
        <h1 className="text-2xl md:text-3xl md:my-4">Send Message</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col items-center w-full"
        >
          <div className="md:flex md:justify-between w-full mb-4">
            <InputField
              register={register}
              errors={errors}
              name="name"
              placeholder="Name"
              type="text"
            />
            <InputField
              register={register}
              errors={errors}
              name="phone"
              placeholder="Phone"
              type="text"
              pattern={/^05\d{8}$/gm}
              onKeyDown={preventSymbols}
            />
          </div>
          <InputField
            register={register}
            errors={errors}
            name="email"
            placeholder="Email"
            type="text"
          />
          <AutoExpandingTextarea
            register={register}
            errors={errors}
            name="message"
            placeholder="Your Message"
          />
          <button type="submit" className="action-button my-4">
            <span className="drop-shadow-text">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

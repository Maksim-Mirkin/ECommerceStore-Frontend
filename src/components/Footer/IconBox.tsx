import {
  GithubWhiteIcon,
  InstagramIcon,
  LinkedInIcon,
  XTwitterWhiteIcon,
} from "../../ui/icons";

const IconBox = () => {
  return (
    <div className="flex order-2 sm:order-1 justify-evenly sm:grid sm:grid-cols-2 sm:gap-4 my-8">
      <a
        href="https://www.linkedin.com/in/maksim-mirkin/"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={LinkedInIcon} alt="LinkedIn icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://github.com/Maksim-Mirkin"
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GithubWhiteIcon} alt="GitHub icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://www.instagram.com/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={InstagramIcon} alt="Instagram icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://twitter.com/"
        aria-label="Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={XTwitterWhiteIcon}
          alt="Twitter icon"
          className="h-12 sm:h-9"
        />
      </a>
    </div>
  );
};

export default IconBox;

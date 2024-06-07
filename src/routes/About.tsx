import { AccentText } from "../components";

const About = () => {
  return (
    <section className="flex flex-col items-center mx-4">
      <img
        src="./assets/AboutUsLandscape.webp"
        alt="A futuristic scene displaying interconnected electronic devices like smartphones,
        tablets, laptops, monitors, and speakers, highlighted by vibrant, glowing lines and technology icons."
        className="mt-4 md:max-h-96 md:min-w-full"
      />
      <h1 className="pb-4 my-6 text-center">
        E-commerce - Your Gateway to the Digital Life
      </h1>

      <article className="mb-4 flex flex-col justify-evenly sm:w-4/5 lg:w-3/5">
        <p className="mb-4">
          At{" "}
          <span className="text-primary-regular dark:text-primary-light">
            E-commerce
          </span>
          , we're not just about gadgets; we're about{" "}
          <AccentText>experiences.</AccentText> From the moment you power on a
          device, the adventure begins. Established in the heart of the digital
          age, our mission is to bring you closer to the technology that powers
          your life.
        </p>
        <p className="mb-4">
          We specialize in a curated collection of electronics, ranging from the
          latest smartphones and laptops to immersive TVs and premium
          headphones. Our products connect you to the world and enhance every
          encounter with the digital universe.
        </p>
        <p>
          We're committed to providing you with the{" "}
          <AccentText>highest quality </AccentText>
          devices, backed by knowledgeable support that understands{" "}
          <AccentText>your needs.</AccentText> Whether you're a tech enthusiast
          or seeking the perfect entertainment setup, our team is here to help
          you make informed decisions.
        </p>
        <p className="mb-4">
          Experience the blend of technology and human ingenuity.
        </p>
        <h2 className="text-center">
          Welcome to E-commerce , where your digital journey awaits.
        </h2>
      </article>
    </section>
  );
};

export default About;

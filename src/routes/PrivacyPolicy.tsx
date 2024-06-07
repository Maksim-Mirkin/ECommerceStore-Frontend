import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <section className="flex flex-col p-6 shadow-lg rounded-lg">
      <header className="border-b border-slate-600 dark:border-slate-100 pb-4 mb-6">
        <h1>Privacy Policy</h1>
      </header>
      <article>
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">1. Introduction</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, protect, and disclose information and data when you use
            E-commerce website and services.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">2. Information We Collect</h2>
          <p>
            We collect information in two ways: information you provide directly to
            us, and information we collect automatically through our services. This
            may include personal details such as your name, email address, and
            transaction details.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">3. Use of Information</h2>
          <p>
            The information we collect is used to provide, maintain, and improve our
            services, to communicate with you, and to enhance your experience.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">4. Sharing of Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information. This does not include trusted third
            parties who assist us in operating our website, conducting our business,
            or servicing you, so long as those parties agree to keep this
            information confidential.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">5. Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of
            your personal information when you enter, submit, or access your
            personal information.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">6. Changes to this Privacy Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of any
            changes by posting the new Privacy Policy on this page.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-4 mb-2">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us&nbsp;
            <Link to="/contact-us" className="underline hover:dark:text-accent-light hover:text-accent-regular" aria-label="Contact us via the contact page">here</Link>.
          </p>
        </section>
      </article>
    </section>
  );
};

export default PrivacyPolicy;

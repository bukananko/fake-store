import { FiGithub, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="text-white flex items-center justify-between px-5 md:px-10 border-t border-t-gray-600 py-5 mt-auto">
      <h1 className="text-xs md:text-base text-gray-500">
        &copy; 2023 Fake Store, Inc. All rights reserved.
      </h1>

      <div className="flex gap-3 items-center text-gray-500">
        <a
          href="https://github.com/nkrqh/fake-store"
          target="_blank"
          className="hover:text-white">
          <FiGithub size={24} />
        </a>

        <a
          href="mailto:ankoo890@gmail.com"
          target="_blank"
          className="hover:text-white">
          <FiMail size={24} />
        </a>

        <h1 className="hidden md:block">| Made with 🧠🤯💻</h1>
      </div>
    </footer>
  );
};

export default Footer;

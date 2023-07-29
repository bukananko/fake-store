import Footer from "../components/layouts/Footer";

const aboutList = {
  features: [
    "Login and register",
    "Add to cart",
    "Search",
    "Filter by category",
    "Checkout only selected items",
    "Add or subtract quantity of items to be purchased",
    "Calculates the total price of only the selected items",
    "CRUD operations",
  ],
  acknowledgements: [
    { name: "Vite", href: "https://vitejs.dev" },
    {
      name: "React Icons",
      href: "https://react-icons.github.io/react-icons",
    },
    {
      name: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    {
      name: "Daisy UI",
      href: "https://daisyui.com",
    },
    {
      name: "Zod",
      href: "https://zod.dev",
    },
    {
      name: "Axios",
      href: "https://axios-http.com/docs/intro",
    },
    {
      name: "React Router DOM",
      href: "https://reactrouter.com/",
    },
    {
      name: "React Hook Form",
      href: "https://react-hook-form.com/",
    },
  ],
};

const AboutPage = () => {
  document.title = "About";
  return (
    <>
      <section className="text-white px-5 md:px-40 py-10 md:py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          About
        </h1>
        <br />
        <p>
          E-commerce app which is made with React.js, TypeScript, and Tailwind
          CSS. No <i className="font-bold">backend</i> included, everything is
          done on the front end (because I haven't learned about backend at
          all😵‍💫). All features work using{" "}
          <i className="font-bold">local storage</i>.
        </p>
        <br />
        <p>
          I made this to learn React.js and TypeScript. And ya i think i
          understand a lil bit.😅
        </p>
        <br />
        <div className="lg:flex gap-20">
          <ul className="list-disc list-inside">
            <h3 className="font-bold">Features:</h3>
            {aboutList.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <br />
          <ul className="list-disc list-inside">
            <h3 className="font-bold">Acknowledgements:</h3>
            {aboutList.acknowledgements.map((acknowledgement) => (
              <li key={acknowledgement.name}>
                <a
                  className="hover:text-blue-500 hover:underline"
                  href={acknowledgement.href}
                  target="_blank">
                  {acknowledgement.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;

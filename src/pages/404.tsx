import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

interface ErrorProps {
  statusText?: string;
  message?: string;
}

const Error = () => {
  document.title = "Oops!";
  const err = useRouteError();
  const error: ErrorProps = err as Error;

  return (
    <section className="h-screen text-white flex flex-col items-center justify-center leading-10">
      <h1 className="text-4xl font-extrabold">Oops!</h1>
      <h2>Sorry, an unexpected error has occured</h2>
      <p>{error.statusText || error.message}</p>
      <br />
      <Link to="/" className="text-blue-500 underline">
        Back to Home Page?
      </Link>
    </section>
  );
};

export default Error;

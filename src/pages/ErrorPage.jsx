import { Link, useRouteError } from "react-router-dom";
import { Button } from "../../lib/turtle-ui/components";

export const ErrorPage = () => {
  const error = useRouteError();
  const is404 = error?.status === 404;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-center gap-6 bg-gray-50 px-4">
      <h1 className="text-8xl font-bold text-gray-800">
        {is404 ? "404" : "Oops!"}
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl">
        {is404
          ? "The page you're looking for doesn't exist."
          : error?.message || error?.statusText || "Something went wrong in the application."}
      </p>
      {error?.stack && !is404 && (
        <pre className="text-left text-xs bg-gray-200 text-gray-800 p-4 rounded-md overflow-auto max-w-4xl w-full">
          {error.stack}
        </pre>
      )}
      <Link to="/">
        <Button variant="primary">Go back home</Button>
      </Link>
    </div>
  );
};

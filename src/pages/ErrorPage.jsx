import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="space-y-8">
      <h1 className="text-center text-6xl font-extrabold mt-20 text-sky-950">Oops! Error found</h1>
      <p className="text-center font-semibold text-sky-900">{error.statusText || error.message}</p>
    </div>
  );
}

export default ErrorPage;

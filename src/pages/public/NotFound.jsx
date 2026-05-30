import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-neutral-500 mt-3">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="mt-8">
        <Button>
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
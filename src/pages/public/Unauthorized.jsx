import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Unauthorized = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-7xl font-bold">
        403
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Unauthorized Access
      </h2>

      <p className="text-neutral-500 mt-3">
        You do not have permission to access this page.
      </p>

      <Link to="/" className="mt-8">
        <Button>
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
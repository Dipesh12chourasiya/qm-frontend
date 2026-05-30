import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <span className="border border-neutral-300 px-4 py-2 rounded-full text-sm">
            AI Proctored Assessment Platform
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight">
            Conduct Secure
            <br />
            Online Assessments
          </h1>

          <p className="mt-6 text-lg text-neutral-600 max-w-3xl mx-auto">
            Create tests, evaluate candidates,
            prevent cheating, and analyze results
            from a single platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg">
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="secondary"
                size="lg"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Question Bank",
              desc: "Manage thousands of questions."
            },
            {
              title: "AI Proctoring",
              desc: "Detect tab switches and violations."
            },
            {
              title: "Analytics",
              desc: "Evaluate candidate performance."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-neutral-200 rounded-3xl p-8"
            >
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-neutral-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
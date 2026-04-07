import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold text-slate-900">AI-Powered Freelancer Marketplace</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        GigSphere helps clients post projects, freelancers apply quickly, and AI matching finds the best talent
        using skill-based scoring.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/register" className="rounded-md bg-indigo-600 px-4 py-2 text-white">
          Get Started
        </Link>
        <Link to="/browse-gigs" className="rounded-md border border-slate-300 px-4 py-2">
          Browse Gigs
        </Link>
      </div>
    </section>
  );
};

export default Home;

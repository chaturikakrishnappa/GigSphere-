import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Matches = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (user?.role !== "client") return;
    const fetchGigs = async () => {
      const { data } = await api.get("/gigs/my-gigs");
      setGigs(data);
      if (data.length) setSelectedGig(data[0]._id);
    };
    fetchGigs();
  }, [user]);

  const runMatching = async () => {
    if (!selectedGig) return;
    const { data } = await api.get(`/ai-match/${selectedGig}`);
    setMatches(data.matches);
  };

  if (user?.role !== "client") {
    return <p className="rounded-md bg-yellow-100 p-3 text-yellow-800">AI matching is available only for clients.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">AI Matches</h2>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <select value={selectedGig} onChange={(e) => setSelectedGig(e.target.value)} className="rounded-md border p-2">
            {gigs.map((gig) => (
              <option key={gig._id} value={gig._id}>
                {gig.title}
              </option>
            ))}
          </select>
          <button onClick={runMatching} className="rounded-md bg-indigo-600 px-4 py-2 text-white">
            Run AI Match
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {matches.map((item) => (
          <article key={item.freelancer._id} className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="font-semibold">{item.freelancer.name}</h3>
            <p className="text-sm text-slate-500">{item.freelancer.email}</p>
            <p className="mt-1 text-sm">Skills: {item.freelancer.skills?.join(", ")}</p>
            <p className="mt-2 text-lg font-bold text-indigo-600">Match: {item.matchScore}%</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Matches;

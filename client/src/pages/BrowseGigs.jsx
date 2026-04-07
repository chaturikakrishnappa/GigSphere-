import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const BrowseGigs = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchGigs = async () => {
      const { data } = await api.get("/gigs");
      setGigs(data);
    };
    fetchGigs();
  }, []);

  const apply = async (gigId) => {
    try {
      await api.post(`/applications/${gigId}`, {
        coverLetter: "I am interested in this gig and can deliver quality work."
      });
      setFeedback("Applied successfully.");
    } catch (err) {
      setFeedback(err?.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Browse Gigs</h2>
      {feedback && <p className="rounded-md bg-slate-100 p-2 text-sm">{feedback}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {gigs.map((gig) => (
          <article key={gig._id} className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold">{gig.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{gig.description}</p>
            <p className="mt-2 text-sm">Budget: ${gig.budget}</p>
            <p className="text-xs text-slate-500">Skills: {gig.requiredSkills.join(", ")}</p>
            {user?.role === "freelancer" && (
              <button onClick={() => apply(gig._id)} className="mt-3 rounded-md bg-indigo-600 px-3 py-1.5 text-white">
                Apply
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default BrowseGigs;

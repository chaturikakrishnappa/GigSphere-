import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const PostGig = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", budget: "", requiredSkills: "" });
  const [message, setMessage] = useState("");

  if (user?.role !== "client") {
    return <p className="rounded-md bg-yellow-100 p-3 text-yellow-800">Only clients can post gigs.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/gigs", {
        ...form,
        budget: Number(form.budget),
        requiredSkills: form.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
      });
      setMessage("Gig posted successfully.");
      setForm({ title: "", description: "", budget: "", requiredSkills: "" });
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to post gig");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Post a New Gig</h2>
      {message && <p className="rounded-md bg-slate-100 p-2 text-sm">{message}</p>}
      <input className="w-full rounded-md border p-2" placeholder="Gig title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <textarea className="w-full rounded-md border p-2" placeholder="Gig description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <input className="w-full rounded-md border p-2" type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} required />
      <input className="w-full rounded-md border p-2" placeholder="Required skills (comma separated)" value={form.requiredSkills} onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} required />
      <button className="rounded-md bg-indigo-600 px-4 py-2 text-white">Post Gig</button>
    </form>
  );
};

export default PostGig;

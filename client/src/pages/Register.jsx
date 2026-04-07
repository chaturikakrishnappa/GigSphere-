import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
    skills: "",
    bio: ""
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean)
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Create account</h2>
      {error && <p className="rounded-md bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full rounded-md border p-2" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full rounded-md border p-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full rounded-md border p-2" />
      <select name="role" onChange={handleChange} value={form.role} className="w-full rounded-md border p-2">
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
      </select>
      {form.role === "freelancer" && (
        <>
          <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full rounded-md border p-2" />
          <textarea name="bio" placeholder="Short bio" onChange={handleChange} className="w-full rounded-md border p-2" />
        </>
      )}
      <button className="w-full rounded-md bg-indigo-600 p-2 text-white">Register</button>
    </form>
  );
};

export default Register;

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [myGigs, setMyGigs] = useState([]);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === "client") {
        const { data } = await api.get("/gigs/my-gigs");
        setMyGigs(data);
      }
      if (user?.role === "freelancer") {
        const { data } = await api.get("/applications/my");
        setApplied(data);
      }
    };
    fetchData();
  }, [user]);

  return (
    <section className="space-y-5">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        <p className="text-slate-600">Role: {user?.role}</p>
      </div>

      {user?.role === "client" ? (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Your Posted Gigs</h3>
          <ul className="space-y-3">
            {myGigs.map((gig) => (
              <li key={gig._id} className="rounded-md border p-3">
                <p className="font-medium">{gig.title}</p>
                <p className="text-sm text-slate-500">Budget: ${gig.budget}</p>
              </li>
            ))}
            {myGigs.length === 0 && <p className="text-sm text-slate-500">No gigs posted yet.</p>}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Your Applications</h3>
          <ul className="space-y-3">
            {applied.map((item) => (
              <li key={item._id} className="rounded-md border p-3">
                <p className="font-medium">{item.gig?.title}</p>
                <p className="text-sm text-slate-500">Status: {item.status}</p>
              </li>
            ))}
            {applied.length === 0 && <p className="text-sm text-slate-500">No applications yet.</p>}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

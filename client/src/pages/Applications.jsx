import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [clientGigs, setClientGigs] = useState([]);
  const [applicantsMap, setApplicantsMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === "freelancer") {
        const { data } = await api.get("/applications/my");
        setApplications(data);
      } else if (user?.role === "client") {
        const { data } = await api.get("/gigs/my-gigs");
        setClientGigs(data);
      }
    };
    fetchData();
  }, [user]);

  const loadApplicants = async (gigId) => {
    const { data } = await api.get(`/gigs/${gigId}/applicants`);
    setApplicantsMap((prev) => ({ ...prev, [gigId]: data }));
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Applications</h2>
      {user?.role === "freelancer" ? (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app._id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">{app.gig?.title}</p>
              <p className="text-sm text-slate-500">Status: {app.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {clientGigs.map((gig) => (
            <div key={gig._id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium">{gig.title}</p>
                <button onClick={() => loadApplicants(gig._id)} className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">
                  View Applicants
                </button>
              </div>
              <ul className="mt-3 space-y-2">
                {(applicantsMap[gig._id] || []).map((item) => (
                  <li key={item._id} className="rounded-md border p-2 text-sm">
                    {item.freelancer?.name} - {item.freelancer?.skills?.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Applications;

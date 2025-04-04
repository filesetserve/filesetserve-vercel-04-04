
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      router.push("/login");
      return;
    }
    setRole(storedRole);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-700 text-white p-4 space-y-6 shadow-md">
        <div className="text-xl font-bold">FileSetServe</div>
        <nav className="space-y-2">
          <p className="text-sm uppercase text-gray-300">Navigation</p>
          <button className="block w-full text-left hover:underline">Dashboard</button>
          <button className="block w-full text-left hover:underline">Settings</button>
          <button className="block w-full text-left hover:underline" onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
        {role === "superuser" && <SuperUserTools />}
        {role === "lics" && <LicsTools />}
        {role === "client" && <ClientTools />}
      </main>
    </div>
  );
}

function SuperUserTools() {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">SuperUser Tools</h2>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>Invite/manage LICS</li>
        <li>View/edit/delete users</li>
        <li>Monitor active forms & cases</li>
      </ul>
    </section>
  );
}

function LicsTools() {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">LICS Tools</h2>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>View & manage assigned clients</li>
        <li>Upload/view case documents</li>
        <li>Create new cases or summaries</li>
      </ul>
    </section>
  );
}

function ClientTools() {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Client Tools</h2>
      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>Check form status</li>
        <li>Upload identification/documents</li>
        <li>Review case summaries</li>
      </ul>
    </section>
  );
}

import { useEffect, useState } from "react";
import { API_BASE } from "../api";

export default function UsersAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setErr("");
    try {
      const resp = await fetch(`${API_BASE}/api/user/all`);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || JSON.stringify(data));
      setUsers(data.users || []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load users: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-3">All Registered Users</h2>
      {loading ? <p>Loading...</p> : null}
      {err ? <p style={{ color: "red" }}>{err}</p> : null}
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="px-2">ID</th>
            <th className="px-2">Name</th>
            <th className="px-2">Email</th>
            <th className="px-2">Face ID</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !loading && (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-2">{u.id}</td>
              <td className="px-2">{u.name}</td>
              <td className="px-2">{u.email}</td>
              <td className="px-2">{u.face_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

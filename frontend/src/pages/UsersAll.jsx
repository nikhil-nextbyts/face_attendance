import { useEffect, useState } from "react";
import { API_BASE } from "../api";
import EditUser from "../components/base/EditUser";

export default function UsersAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");


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

  const handleDelete = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirm) return;

    try {
      const resp = await fetch(`${API_BASE}/api/user/delete/${userId}`, {
        method: "DELETE",
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message);

      alert("User deleted successfully");

      // Refresh list
      fetchUsers();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };


  const editUser = (u) => {
    setSelectedUser(u);
    setStatusMsg("");
  }

  return (
    <div className="p-6 flex flex-col gap-6 items-center bg-zinc-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-zinc-800">
        All Registered Users
      </h1>

      {loading && <p className="text-zinc-500">Loading...</p>}
      {err && <p className="text-red-600">{err}</p>}

      <div className="w-full max-w-5xl">
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            {/* Head */}
            <thead className="bg-zinc-100 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 text- text-sm font-semibold text-zinc-700">
                  Index
                </th>
                <th className="px-4 py-3 text- text-sm font-semibold text-zinc-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                  Face ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                  ID(PK)
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-zinc-700">
                  Action
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-zinc-700">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-zinc-500"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((u, idx) => (
                <tr
                  key={u.id}
                  className={`border-b border-zinc-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-zinc-50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-center text-zinc-700">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-zinc-600">
                    {u.face_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-zinc-700">{u.id}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => editUser(u)}
                      className="px-3 py-1.5 rounded-md
                             text-sm font-medium
                             text-blue-600 hover:text-blue-700
                             hover:bg-blue-50 transition"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 text-sm rounded-md
                      bg-red-600 hover:bg-red-700
                      text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {statusMsg && (
          <p className="mt-4 text-green-600 font-medium text-sm">{statusMsg}</p>
        )}

        {selectedUser && (
          <EditUser
            user={selectedUser}
            onsuccess={async () => {
              setStatusMsg("User updated successfully.");
              setSelectedUser(null);
              fetchUsers();
            }}
            onCancel={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
}

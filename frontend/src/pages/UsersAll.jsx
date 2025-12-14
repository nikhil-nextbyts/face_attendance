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

  const editUser = (u) => {
    setSelectedUser(u);
    setStatusMsg("");
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-3">All Registered Users</h2>
      {loading ? <p>Loading...</p> : null}
      {err ? <p style={{ color: "red" }}>{err}</p> : null}

      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="">ID</th>
                <th className="">Name</th>
                <th className="">Email</th>
                <th className="">Face ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="">No users found</td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="">{u.id}</td>
                  <td className="">{u.name}</td>
                  <td className="">{u.email}</td>
                  <td className="">{u.face_id}</td>
                  <td>
                    <button onClick={() => editUser(u)
                    }>
                      edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {statusMsg && (
            <p className="mb-2 text-green-600 font-medium">{statusMsg}</p>
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
    </div>
  );
}

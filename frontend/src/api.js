export const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function postForm(url, formData) {
  const res = await fetch(API_BASE + url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || JSON.stringify(data));
  return data;
}

export async function fetchUserCount() {
  const res = await fetch(`${API_BASE}/api/user/count`);

  if (!res.ok) {
    throw new Error("Failed to fetch user count");
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "API error");
  }

  return json.data.totalUsers;
}

export async function fetchAttendanceStats() {
  const res = await fetch(`${API_BASE}/api/user/attendance/stats`);
  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch attendance stats");
  }

  return json.data;
}
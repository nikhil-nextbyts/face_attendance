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

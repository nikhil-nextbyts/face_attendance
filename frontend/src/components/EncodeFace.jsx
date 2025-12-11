// EncodeFace.jsx (replace file)
import { useState } from "react";
import { API_BASE } from "../api";

export default function EncodeFace() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !email)
      return setMsg("Provide name, email and image.");

    try {
      setMsg("Uploading image...");
      const form = new FormData();
      form.append("image", file);
      form.append("name", name);
      form.append("email", email);

      const encodeResp = await fetch(`${API_BASE}/api/face/encode`, {
        method: "POST",
        body: form,
      });

      const encodeData = await encodeResp.json();
      if (!encodeResp.ok)
        throw new Error(encodeData?.message || JSON.stringify(encodeData));

      // Backend should return user registration info (or face_id)
      console.log("encodeData", encodeData);
      setMsg("User encoded and registered ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error: " + (err.message || err));
    }
  };

  return (
    <div className="container flex flex-col items-center mt-32 mx-auto">
      <h2 className="text-3xl text-blue-600 mb-6">Register / Encode Face</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 min-w-48 mx-auto h-vh-48 flex flex-col p-4 rounded-lg"
      >
        <input
          className="bg-gray-600 m-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-gray-600 m-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-600 m-2"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload & Register</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}



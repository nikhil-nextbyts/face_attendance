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

      // Step 1: encode (Node route forwards to FastAPI)
      const encodeResp = await fetch(`${API_BASE}/api/face/encode`, {
        method: "POST",
        body: form,
      });
      const encodeData = await encodeResp.json();
      if (!encodeResp.ok)
        throw new Error(encodeData?.message || JSON.stringify(encodeData));

      // You can use filename or saved path as face_id
      // If the backend returns encoding_path or filename, use that.
      console.log(encodeData);
      const faceId = encodeData?.result?.encoding_path || file.name;

      // Step 2: register user in DB
      const registerResp = await fetch(`${API_BASE}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          face_id: faceId,
          image_path: encodeData?.result?.encoding_path || file.name,
        }),
      });
      const regData = await registerResp.json();
      if (!registerResp.ok)
        throw new Error(regData?.message || JSON.stringify(regData));

      setMsg("User encoded and registered ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error: " + (err.message || err));
    }
  };

  return (
    <div>
      <h2
        className="text-3xl text-blue-600 mb-6"
      >Register / Encode Face</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 h-48 container flex flex-col"
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

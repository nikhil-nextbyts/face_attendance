// EncodeFace.jsx (replace file)
import { useState } from "react";
import { API_BASE } from "../../api";

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
      setMsg("User encoded and registered ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error: " + (err.message || err));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full p-4 ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Register / Encode Face
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Profile Image
              </label>
              <div className="mt-2 flex justify-cente border-2 border-gray-400 border-dashed p-5 rounded-lg ">
                <input
                  className="w-full text-gray-700 p-1 "
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  id="image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mt-4 w-full">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                >
                  Upload & Register
                </button>
              </div>
            </div>
          </form>
          <p>{msg}</p>
        </div>
      </div>

    </>
  );
}



import React, { useState } from "react";
import { API_BASE } from "../../api";


export default function EditUser({ user, onsuccess, onCancel }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State for success button text
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMsg("");

    if (!name || !email) {
      setLoading(false);
      return setErrorMsg("Name and Email are required.");
    };

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      if (file) form.append("image", file);

      const editResp = await fetch(
        `${API_BASE}/api/user/edit/${user.face_id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      const editData = await editResp.json();
      if (!editResp.ok)
        throw new Error(editData?.message || JSON.stringify(editData));

      setIsSuccess(true);
      setLoading(false);

      setTimeout(() => {
        onsuccess();
      }, 1000);

    } catch (err) {
      console.error(err);
      setErrorMsg("Update failed: " + (err.message || err));
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-5 border"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
        {errorMsg && (
          <p className="text-red-500 text-center mb-2">{errorMsg}</p>
        )}

        {/* Name Input */}
        <div className="form-control w-full max-w-xs mb-3 flex items-start flex-col">
          <label className="label mb-1">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type name here"
            className="input input-bordered w-full max-w-xs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="form-control w-full max-w-xs mb-3 flex items-start flex-col">
          <label className="label mb-1">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Type email here"
            className="input input-bordered w-full max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* File Input (for Face ID) */}
        <div className="form-control w-full max-w-xs mb-6 flex items-start flex-col">
          <label className="label mb-1">
            <span className="label-text">Upload Face ID</span>
          </label>
          <input
            type="file"
            className=" "
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <div className="card-actions justify-center">
          <button
            type="submit"
            disabled={loading || isSuccess}
            className="btn btn-primary w-full text-gray-300"
          >
            {loading ? "Updating..." : isSuccess ? "Updated!" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};


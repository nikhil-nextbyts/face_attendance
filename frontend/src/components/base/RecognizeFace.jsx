import { useRef, useState, useEffect } from "react";
import { API_BASE } from "../../api";


export default function RecognizeFace() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    let vdoRef = videoRef.current;

    async function startCam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (e) {
        console.error(e);
        setStatus("Camera not available. You can upload an image instead.");
      }
    }
    startCam();
    return () => {
      if (vdoRef && vdoRef.srcObject) {
        vdoRef.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const captureAndSend = async () => {
    try {
      setStatus("Capturing...");
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg"));

      const form = new FormData();
      form.append("image", blob, "capture.jpg");

      setStatus("Sending to server...");
      const resp = await fetch(`${API_BASE}/api/face/recognize`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || JSON.stringify(data));
      setResult(data?.result || data);
      setStatus("Received result");

      // If match, optionally call mark attendance on server
      if (data?.result?.match || data?.match) {
        const matchedName = data?.result?.match || data?.match;
        // You need to map name -> user_id on your app or have backend return user_id
        // Here we'll just log and set status
        setStatus(
          `Matched: ${matchedName}. Call /api/user/mark to store attendance.`
        );
        // Example attendance marking request (requires user_id)
        // await fetch(`${API_BASE}/api/user/mark`, {method: "POST", headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id: 1, status: 'Present'})});
      } else {
        setStatus(
          `No match (distance: ${data?.result?.distance ?? data?.distance})`
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.message || err));
    }
  };

  return (
    <div>
      <h2>Recognize Face (Camera)</h2>
      <video ref={videoRef} style={{ width: 320, height: 240 }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <button onClick={captureAndSend}>Capture & Recognize</button>
      </div>
      <p>{status}</p>
      <pre>{result && JSON.stringify(result, null, 2)}</pre>

      <hr />
      <h3>Or upload an image</h3>
      <FileUpload />
    </div>
  );
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg("Choose image");
    try {
      const form = new FormData();
      form.append("image", file);
      setMsg("Sending...");
      const resp = await fetch(`${API_BASE}/api/face/recognize`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || JSON.stringify(data));
      const arr = [data.message, data.name, data.face_id];
      setMsg("Result: " + arr);
      console.log("my data :", data.message, data.user.name, data.face_id);
    } catch (err) {
      console.error(err);
      setMsg("Error: " + (err.message || err));
    }
  }
  return (
    <form onSubmit={submit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn" type="submit">Upload & Recognize</button>
      <p>{msg}</p>
    </form>
  );
}

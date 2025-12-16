import { useRef, useState, useEffect } from "react";
import { API_BASE } from "../../api";


export default function RecognizeFace() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [status, setStatus] = useState("");
    const [result, setResult] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);


    useEffect(() => {
      let vdoRef = videoRef.current;

      async function startCam() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraReady(true);
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
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // 🛑 REQUIRED GUARDS
        if (!video) {
          setStatus("Video not ready");
          return;
        }

        if (!canvas) {
          setStatus("Canvas not initialized");
          return;
        }
        
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          setStatus("Camera is still loading, please wait...");
          return;
        }
        setStatus("Capturing...");
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setStatus("Failed to get canvas context");
          return;
        }
        
        ctx.drawImage(video, 0, 0);
        const blob = await new Promise((res) =>
          canvas.toBlob(res, "image/jpeg")
        );
        if (!blob) {
          setStatus("Failed to capture image");
          return;
        }

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
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-zinc-800 ">
            Face Recognition
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Use camera or upload an image to mark attendance
          </p>
        </div>

        {/* Camera Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-xl overflow-hidden border border-zinc-300 shadow-sm">
            <video
              ref={videoRef}
              className=" object-cover bg-zinc-900"
              style={{ width: 400, height: 300 }}
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <button
            disabled={!cameraReady}
            onClick={captureAndSend}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
    ${
      cameraReady
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-gray-400 cursor-not-allowed"
    }
    text-white text-sm font-medium`}
          >
            Capture & Recognize
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className="mt-4 text-center text-sm text-zinc-600 ">
            {status}
          </div>
        )}

        {/* Result */}
        {result && (
          <pre
            className="mt-4 max-h-48 overflow-auto rounded-lg
                      text-xs text-zinc-700 
                      p-4 border border-zinc-200 "
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mt-6 mb-3">
          <div className="flex-1 h-px bg-zinc-300 " />
          <span className="text-xs uppercase text-zinc-500">OR</span>
          <div className="flex-1 h-px bg-zinc-300 " />
        </div>

        {/* Upload Section */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-zinc-800  mb-2">
            Upload Image
          </h3>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

function FileUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg({ message: "Please select a file to upload" });
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
      // const arr = [data?.message, data?.user?.name, data?.face_id];
      setMsg(data);
    } catch (err) {
      console.error(err);
      setMsg("Error: " + (err.message || err));
    }
  }
  return (
    <form onSubmit={submit}>
      <div className="flex items-center gap-4">
        <div className="mt-2 flex justify-center border border-zinc-300 border-dashed p-5 rounded-lg bg-zinc-50">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-700 p-1"
          />
        </div>
        <button
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                   bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                   text-white text-sm font-medium
                   transition-all shadow-md"
          type="submit"
        >
          Upload & Recognize
        </button>
      </div>
      <div className="text-sm text-gray-900 font-semibold p-2 mt-4">
        < RecognitionResult data={ msg} />
      </div>
    </form>
  );
}


function RecognitionResult({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 max-w-md mx-auto rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-800 mb-3">
        Recognition Result
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Status</span>
          <span
            className={`font-medium ${
              data?.message?.includes("Successfully")
                ? "text-green-600"
                : "text-amber-600"
            }`}
          >
            {data?.message || "—"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Name</span>
          <span className="font-medium text-zinc-800">
            {data?.user?.name || "Unknown"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Face ID</span>
          <span className="font-mono text-xs text-zinc-700 break-all text-right max-w-[60%]">
            {data?.face_id || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

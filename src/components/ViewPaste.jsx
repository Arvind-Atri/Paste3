import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  console.log("Paste ID:", id);

  const pastes = useSelector((state) => state.paste.pastes);
  console.log("Pastes from store:", pastes);

  // Find the paste with the matching ID, if it exists
  const paste = pastes?.find((paste) => paste._id === id);

  // Conditional rendering to handle undefined paste
  if (!paste) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste.title || ""}
          disabled
          className="w-full text-black border border-input rounded-md p-2"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div className="p-4">
            <p>{paste.content}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Content copied to clipboard!");
            }}
            className="flex items-center gap-2 mt-2 p-2 bg-gray-200 rounded-md"
          >
            <Copy /> Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

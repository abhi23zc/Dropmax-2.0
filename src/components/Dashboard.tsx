import { useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import dropmax from "./dropmax.png";
import { LogOut, Upload, FolderPlus, Search } from "lucide-react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import CreateFolder from "./CreateFolder";
import { useFiles } from "../hooks/useFiles";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Dashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { files, folders, currentFolder, navigateToFolder } = useFiles();

  const handleLogout = () => signOut(auth);

  // const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1

              className="cursor-pointer text-2xl font-bold text-gray-900 flex items-center gap-3"
              onClick={() => navigateToFolder(null)}
            >
              <img src={dropmax} alt="logo" className="h-16 w-auto" />
              DropMax
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload size={20} />
                Upload
              </button>
              <button
                onClick={() => setShowFolderModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FolderPlus size={20} />
                New Folder
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FileList
          files={files}
          folders={folders}
          searchTerm={searchTerm}
          currentFolder={currentFolder}
          onFolderClick={navigateToFolder}
        />
      </main>

      {showUploadModal && (
        <FileUpload
          onClose={() => setShowUploadModal(false)}
          currentFolder={currentFolder}
        />
      )}

      {showFolderModal && (
        <CreateFolder
          onClose={() => setShowFolderModal(false)}
          currentFolder={currentFolder}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import dropmax from "./dropmax.png";
import { LogOut, Upload, FolderPlus, Search, AlignJustify } from "lucide-react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import CreateFolder from "./CreateFolder";
import { useFiles } from "../hooks/useFiles";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Dashboard() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNavbarActions, setShowNavbarActions] = useState(false); 
  const { files, folders, currentFolder, navigateToFolder } = useFiles();

  const handleLogout = () => signOut(auth);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center gap-8">
          <img src={dropmax} alt="logo" className="h-16 w-auto" />
          <h1 className="text-2xl font-bold text-gray-900" onClick={() => navigateToFolder(null)}>DropMax</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          <div className="relative flex gap-2">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
             <button
            onClick={() => setShowNavbarActions(!showNavbarActions)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <AlignJustify size={20} />
            {/* {showNavbarActions ? 'Hide Actions' : 'Show Actions'} */}
          </button>
          </div>
         
          {showNavbarActions && (
            <>
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
            </>
          )}
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

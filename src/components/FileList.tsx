import React from 'react';
import { motion } from 'framer-motion';
import { File, Folder, Download, Trash2 } from 'lucide-react';
import { formatFileSize, formatDate } from '../utils/format';

interface FileListProps {
  files: any[];
  folders: any[];
  searchTerm: string;
  currentFolder: string | null;
  onFolderClick: (folderId: string) => void;
}

export default function FileList({ files, folders, searchTerm, currentFolder, onFolderClick }: FileListProps) {
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Modified</div>
        <div className="col-span-2">Actions</div>
      </div>

      <div className="divide-y">
        {filteredFolders.map(folder => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 cursor-pointer"
            onClick={() => onFolderClick(folder.id)}
          >
            <div className="col-span-6 flex items-center gap-3">
              <Folder className="text-blue-500" size={24} />
              <span className="font-medium">{folder.name}</span>
            </div>
            <div className="col-span-2">-</div>
            <div className="col-span-2">{formatDate(folder.createdAt)}</div>
            {/* <div className="col-span-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle delete folder
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div> */}
          </motion.div>
        ))}

        {filteredFiles.map(file => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50"
          >
            <div className="col-span-6 flex items-center gap-3">
              <File className="text-gray-500" size={24} />
              <span>{file.name}</span>
            </div>
            <div className="col-span-2">{formatFileSize(file.size)}</div>
            <div className="col-span-2">{formatDate(file.createdAt)}</div>
            <div className="col-span-2 flex gap-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Download size={20} />
              </a>
              {/* <button
                onClick={() => {
                  // Handle delete file
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button> */}
            </div>
          </motion.div>
        ))}

        {filteredFiles.length === 0 && filteredFolders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No files or folders found
          </div>
        )}
      </div>
    </div>
  );
}
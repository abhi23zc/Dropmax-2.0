import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';

interface FileUploadProps {
  onClose: () => void;
  currentFolder: string | null;
}

export default function FileUpload({ onClose, currentFolder }: FileUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { uploadFile, uploading, progress } = useFileUpload();

  const handleUpload = async () => {
    if (!files) return;
    setError(null);
    
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i], currentFolder);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Files</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFiles(e.dataTransfer.files);
            setError(null);
          }}
        >
          <input
            type="file"
            multiple
            onChange={(e) => {
              setFiles(e.target.files);
              setError(null);
            }}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="text-gray-400" size={32} />
            <span className="text-gray-600">
              Drag and drop files here or click to browse
            </span>
          </label>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {files && !error && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Selected Files:</h4>
            <ul className="text-sm text-gray-600">
              {Array.from(files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1 text-center">
              Uploading... {progress}%
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!files || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
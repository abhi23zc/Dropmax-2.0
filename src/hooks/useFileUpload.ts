import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { uploadToPinata } from '../lib/pinata';

interface UploadProgress {
  status: 'idle' | 'uploading' | 'error' | 'success';
  progress: number;
  error?: string;
}

export function useFileUpload() {
  const [uploadState, setUploadState] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
  });

  const uploadFile = async (file: File, folderId: string | null) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be logged in to upload files');
    }

    try {
      setUploadState({ status: 'uploading', progress: 0 });


      setUploadState({ status: 'uploading', progress: 30 });
      const ipfsUrl = await uploadToPinata(file);


      setUploadState({ status: 'uploading', progress: 70 });
      await addDoc(collection(db, 'files'), {
        name: file.name,
        size: file.size,
        type: file.type,
        url: ipfsUrl,
        userId: user.uid,
        folderId,
        createdAt: new Date().toISOString(),
      });

      setUploadState({ status: 'success', progress: 100 });
    } catch (error: any) {
      setUploadState({
        status: 'error',
        progress: 0,
        error: error.message || 'Failed to upload file',
      });
      throw error;
    }
  };

  return {
    uploadFile,
    uploading: uploadState.status === 'uploading',
    progress: uploadState.progress,
    error: uploadState.error,
  };
}
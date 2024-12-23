import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export function useFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const filesQuery = query(
      collection(db, 'files'),
      where('userId', '==', user.uid),
      where('folderId', '==', currentFolder)
    );

    const foldersQuery = query(
      collection(db, 'folders'),
      where('userId', '==', user.uid),
      where('parentId', '==', currentFolder)
    );

    const unsubFiles = onSnapshot(filesQuery, (snapshot) => {
      setFiles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubFolders = onSnapshot(foldersQuery, (snapshot) => {
      setFolders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubFiles();
      unsubFolders();
    };
  }, [currentFolder]);

  const navigateToFolder = (folderId: string | null) => {
    setCurrentFolder(folderId);
  };

  return { files, folders, currentFolder, navigateToFolder };
}
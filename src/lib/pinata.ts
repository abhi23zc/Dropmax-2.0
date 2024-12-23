import axios from 'axios';

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;

export const uploadToPinata = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_API_SECRET,
      },
    });

    if (res.data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    }
    throw new Error('Failed to get IPFS hash from Pinata');
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Pinata API credentials. Please check your API key and secret.');
    }
    throw new Error('Failed to upload to Pinata: ' + (error.message || 'Unknown error'));
  }
}
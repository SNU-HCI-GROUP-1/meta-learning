import { sendReq } from '../../sendReq';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await sendReq('POST', '/upload', formData);
}

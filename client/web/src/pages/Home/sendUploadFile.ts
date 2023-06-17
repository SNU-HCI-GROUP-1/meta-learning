import { sendReq } from '../../sendReq';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await sendReq('POST', '/upload', {
    uploadFile: formData,
  });

  const data = await response.json();
  return data;
}

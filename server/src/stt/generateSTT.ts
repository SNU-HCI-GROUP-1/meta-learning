import fs from 'fs';

import speech from '@google-cloud/speech';

const client = new speech.SpeechClient(
  {
    key: process.env.GCP_CLIENT_KEY,
    projectId: process.env.GCP_PROJECT_ID,
  },
);

export const generateStt = async (fileLocation?: string) => {
  const fileName = fileLocation || '/test.mp3';

  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  const [response] = await client.recognize({
    audio: {
      content: audioBytes,
    },
    config: {
      encoding: 'ENCODING_UNSPECIFIED',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  }).catch((err) => {
    console.log(err);
    throw err;
  });

  if (!response.results) {
    throw new Error('No results returned');
  }

  const transcription = response.results
    .map((result: any) => result.alternatives[0].transcript)
    .join('\n');

  console.log(`Transcription: ${transcription}`);
  return transcription;
};

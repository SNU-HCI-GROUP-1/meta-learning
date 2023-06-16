import fs from 'fs';

import speech from '@google-cloud/speech';

const client = new speech.SpeechClient(
  {
    key: '',
    projectId: '',
  },
);

export const generateStt = async () => {
  const filename = './test.mp3';

  const file = fs.readFileSync(filename);
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

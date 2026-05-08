import { GoogleGenAI } from './node_modules/@google/genai/dist/index.mjs';

const ai = new GoogleGenAI({ apiKey: 'AIzaSyC1ynvh4nF460L27o0SXd9WiIhw4A9GV20' });

async function testModel(modelName) {
  try {
    const r = await ai.models.generateContent({ model: modelName, contents: 'Hello' });
    console.log(`[${modelName}] SUCCESS:`, r.text?.slice(0, 50));
  } catch (e) {
    const msg = e.message || '';
    const code = msg.match(/"code":(\d+)/)?.[1];
    console.log(`[${modelName}] ERROR code:`, code || 'unknown', msg.slice(0, 100));
  }
}

testModel('gemini-1.5-flash');
testModel('gemini-2.0-flash');
testModel('gemini-1.5-pro');
testModel('gemini-2.5-flash');

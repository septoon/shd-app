import Constants from 'expo-constants';

// Получаем значения из extra (EAS или app.json), затем из process.env (dev/Expo Go),
// и в конце ставим безопасные дефолты, чтобы приложение не падало без .env на билде.
const extra = Constants?.expoConfig?.extra ?? Constants?.manifest?.extra ?? {};

export const API_URL =
  extra.API_URL ||
  process.env.API_URL;

export const BOT_TOKEN = extra.BOT_TOKEN || process.env.BOT_TOKEN || '';
export const CHAT_ID = extra.CHAT_ID || process.env.CHAT_ID || '';

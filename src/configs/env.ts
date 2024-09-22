const getEnv = (key: string, defaultValue?: string, warnOnDefault: boolean = false): string => {
  const value = process.env[key] || defaultValue;

  // Check if the value is missing
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  // Check if the value is an empty string
  if (value.trim() === '') {
    throw new Error(`Environment variable ${key} is empty or contains only whitespace`);
  }

  // Log a warning if the default value is used
  if (defaultValue && warnOnDefault && process.env[key] === undefined) {
    console.warn(`Using default value for environment variable: ${key}`);
  }

  return value;
};

const EXPO_PUBLIC_API_URL = getEnv('EXPO_PUBLIC_API_URL');
const EXPO_PUBLIC_WEB_CLIENT_ID = getEnv('EXPO_PUBLIC_WEB_CLIENT_ID');
const EXPO_PUBLIC_ANDROID_CLIENT_ID = getEnv('EXPO_PUBLIC_ANDROID_CLIENT_ID');

const env = {
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_WEB_CLIENT_ID,
  EXPO_PUBLIC_ANDROID_CLIENT_ID,
};

export default env;

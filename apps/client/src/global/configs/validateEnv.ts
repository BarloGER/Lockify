export const validateEnv = (): void => {
  const requiredEnv: Array<string> = ["VITE_API_BASE_URL"];

  requiredEnv.forEach((key: string) => {
    if (!import.meta.env[key]) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  });
  console.log("ENV validation successful");
};

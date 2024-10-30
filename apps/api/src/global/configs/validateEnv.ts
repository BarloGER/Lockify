export const validateEnv = (): void => {
  const requiredEnv: Array<string> = [
    "NODE_ENV",
    "SESSION_SECRETS",
    "DATABASE_URI",
    "SALT_ROUNDS",
  ];

  requiredEnv.forEach((key: string) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  });
  console.log("ENV validation successful");
};

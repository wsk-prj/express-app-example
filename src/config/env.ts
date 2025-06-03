export const env = {
  PORT: Number(process.env.PORT) || 4000,
  ROUTER_PREFIX: process.env.ROUTER_PREFIX || '/api',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
};

export const env = {
  PORT: 4000,
  ROUTER_PREFIX: "/api",
  SESSION_SECRET: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  SESSION_COOKIE_NAME: "connect.sid",
  SESSION_COOKIE_OPTIONS: {
    path: "/",
    httpOnly: true,
    secure: false,
  },
};

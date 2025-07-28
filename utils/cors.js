require("dotenv").config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",") || [];

const corsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS access blocked: Origin not allowed"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import errorMiddleware from "./middleware/error.middleware.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// const mongoUri = process.env.MONGO_URI;
// mongoose.connect(mongoUri)
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.log("MongoDB Error:", err));

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// app.use("/api", authRoutes);
// app.use("/api/tasks", taskRoutes);

// app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.json({ message: "Todo backend is running." });
// });

// export default app;


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://todoapp-alpha-topaz.vercel.app",
//     ],
//     credentials: true,
//   })
// );
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

const connectToMongo = async () => {
  if (!mongoUri) {
    console.error("MongoDB connection string is missing. Set MONGO_URI in backend/.env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

connectToMongo();

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Todo backend is running." });
});

export default app;

import express from "express";
import * as url from "url";
import cors from "cors";
import path from "node:path";
import helmet from "helmet";
import { connectToDB } from "./models/dynamicAdapter/dbAdapter.js";
import chalk from "chalk";
import debug from "debug";
import mainApiRouter from "./routes/mainApiRouter.js";
import compression from "compression";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import envAdapter from "./helpers/envAdapter.js";
import { initialUsers } from "./initialData/initialDataService.js";
import session from "express-session";
import "./auth/passportAuth.js";
import loggerAdapter from "./terminalLoggers/loggerAdapter.js";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";
import authMiddleware from "./middlewares/authMiddleware.js";

envAdapter();

const log = debug("app:Connections");
const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT;

app.use(cors());
app.use(compression());
app.use(loggerAdapter());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("userConnected", (userId) => {
    io.emit("userStatus", { userId, socketId: socket.id, status: "online" });
  });

  socket.on("disconnect", () => {
    io.emit("userStatus", { socketId: socket.id, status: "offline" });
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});

app.post("/upload", upload.single("image"), (req, res) => {
  const filename = req.file.filename;
  const fileUrl = `http://localhost:${PORT}/uploads/${filename}`;

  res.status(200).json(fileUrl);
});

app.get("/upload/", (req, res) => {
  return res.status(200).json("hi");
});
const staticFilesDirectory = path.join(__dirname, "uploads");

app.use("/api", mainApiRouter);
app.use("/auth", mainApiRouter);
app.use("/uploads", express.static(staticFilesDirectory));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

(async () => {
  await connectToDB;
  await initialUsers();
  console.log(
    chalk.yellow.bold(
      `Server in ${process.env.NODE_ENV} - Running | Port ${PORT}`
    )
  );
  await server.listen(PORT, () =>
    log(
      chalk.yellow.bold(
        `Server in ${process.env.NODE_ENV} - Running | Port ${PORT}`
      )
    )
  );
})();

app.use(errorMiddleware);

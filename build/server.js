"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const course_route_1 = __importDefault(require("./routes/course_route"));
const global_route_1 = __importDefault(require("./routes/global_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const router = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
router.use((0, cors_1.default)());
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    logging_1.default.info("Mongo connected successfully.");
    StartServer();
})
    .catch((error) => logging_1.default.error(error));
const StartServer = () => {
    router.use((req, res, next) => {
        /** Log the req */
        logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            /** Log the res */
            logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    router.use("/", global_route_1.default);
    router.use("/user", user_route_1.default);
    router.use("/course", course_route_1.default);
    router.use("/auth", auth_route_1.default);
    /** Healthcheck */
    router.get("/ping", (req, res, next) => res.status(200).json({ hello: "world" }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error("Not found");
        logging_1.default.error(error);
        res.status(404).json({
            message: error.message,
        });
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port || 3000, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};

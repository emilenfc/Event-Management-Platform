import express from "express";

import authentication from "./authentication";
import users from "./users";
import events from "./events";
import booking from "./booking";
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    events(router);
    booking(router);
    return router;
}
import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import express from "express";

/* Create test server that displays the layout */

const app = express();
const port = process.env.PORT || 8080;

// Configure static file directories
app.use("/styles", express.static("styles"));
app.use("/image", express.static("image"));

// Make it possible to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Map all URLs to the SB layout manager
app.get('*', (req, res) => {
    displayRequestedPage(req, res, application, req.url);
});

app.post('*', (req, res) => {
    displayRequestedPage(req, res, application, req.url);
});

// Configure listening port
app.listen(port, () => {
    console.log("Application listening on port " + port);
});

# RNBO Web Export

Files in this folder were generated from a RNBO patch, using the RNBO Web Export target.

## Serving the Files

The _index.html_ is a simple webpage that loads all of the generated JavaScript files necessary to run the exported RNBO patch. However, in order for audio to load correctly in this page, it must be accessed from a web server. In other words, you cannot open the _index.html_ file as a file URL by double-clicking on it. To serve the page from a static server, simply upload all files in this folder to the server. Then, access the page like you would any other static HTML page.

## Running the Local Server

In case you don't have a static server ready to go, you can use the _app.js_ Node script to run a simple static server. You will need to have Node.js installed to run this script. From the terminal, you can check if Node is installed by running

```bash
node --version
```

If Node is installed, this will print the installed version number. Next, from the export directory, run

```bash
node app.js
```

This will print something like:

```bash
Server running at http://localhost:3000
```

Navigate to that URL using any web browser that supports Audio Worklets, and you should see the exported patcher loaded and running.

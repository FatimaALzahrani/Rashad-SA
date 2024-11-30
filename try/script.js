import { Scene } from "@soulmachines/smwebsdk";

// Select the video element
const videoEl = document.getElementById("sm-video");

// Create a Scene object
const scene = new Scene({
  videoElement: videoEl,
  apiKey:
    "eyJzb3VsSWQiOiJkZG5hLXJhc2hhZDNhYzYtLXJhc2hhZCIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2Y4MDI4ZDFkLTZkZDYtNGUzOS04YWQwLTNmYWYwZGRiODE0YiJ9", // Replace with your API key or remove for custom token server
  requestedMediaDevices: { microphone: true },
  requiredMediaDevices: {}, // Make media optional to avoid blocking users
  sendMetadata: {
    pageUrl: true, // Send page metadata for NLP engine
  },
});

// Display connection status
const statusDiv = document.getElementById("status");

// Handle connection success
scene
  .connect()
  .then((sessionId) => {
    console.log("Connected successfully. Session ID:", sessionId);
    statusDiv.textContent = "Connection successful!";
    return scene.startVideo(); // Start displaying the video
  })
  .then((videoState) => {
    console.log("Video started with state:", videoState);
    statusDiv.textContent += " Video is playing!";
  })
  .catch((error) => {
    console.error("Connection failed:", error);
    statusDiv.textContent = `Error: ${error.name}`;
  });

// Handle connection failure
scene.on("error", (error) => {
  console.error("Error:", error);
});

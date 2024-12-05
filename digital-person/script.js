import { Scene } from "@soulmachines/smwebsdk";

async function initializeDigitalPerson() {
  const videoEl = document.getElementById("sm-video");
  const scene = new Scene({
    videoElement: videoEl,
    sendMetadata: { pageUrl: true },
    requestedMediaDevices: { microphone: true },
    requiredMediaDevices: {},
  });

  try {
    scene.apiKey =
      "eyJzb3VsSWQiOiJkZG5hLXJhc2hhZDNhYzYtLXJhc2hhZCIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2Y4MDI4ZDFkLTZkZDYtNGUzOS04YWQwLTNmYWYwZGRiODE0YiJ9";
    const sessionId = await scene.connect();
    console.log("Connected successfully. Session ID:", sessionId);
    const videoState = await scene.startVideo();
    console.log("Video started with state:", videoState);
  } catch (error) {
    console.error("Connection failed:", error);
    alert("An error occurred. Check the console for details.");
  }
}

window.addEventListener("load", initializeDigitalPerson);

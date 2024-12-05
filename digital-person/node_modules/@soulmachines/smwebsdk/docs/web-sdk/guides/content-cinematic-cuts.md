---
sidebar_position: 2
description: Enable autonomous server-controlled camera cuts
--- 
# Content/Cinematic Cuts

The experience of interacting with a Digital Person can be enhanced by the use of Content and Cinematic Cuts, which introduces a range of autonomous server-controlled camera cuts which respond to relevant objects appearing on screen.

This feature requires a UI which consumes the Content Awareness API and tags relevant on-screen elements, from which appropriate camera parameters can be inferred.

## Enabling Content and Cinematic Cuts

Content and Cinematic Cuts can be enabled on a per-project basis from Digital DNA Studio. These features require a UI which consumes the [Content Awareness API](content-awareness.md), available from smwebsdk version 14 or higher.

You can check that the current deployment has Content and Cinematic Cuts activated using the following scene method:

```js
scene.hasServerControlledCameras(): bool
```

When Content and Cinematic Cuts is active, requests to manipulate the camera via `persona.animateToNamedCameraWithOrbitPan` will return an error.
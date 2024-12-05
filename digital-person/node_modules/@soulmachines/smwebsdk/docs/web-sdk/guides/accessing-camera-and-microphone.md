---
sidebar_position: 4
description: Request access to user's Camera and Microphone
---

# Accessing the User's Camera and Microphone

A conversation with a Digital Person is much like a video call with a real person, where the user can choose to turn their camera or microphone on and off based on their level of comfort with sharing access to those devices.

The user must explicitly allow access to the camera and microphone by approving a browser security popup. This popup can only be triggered a set number of times, so it is important that access to these devices is requested when the user is most likely to approve that access.

Access to the user's camera and microphone may be requested automatically when the `connect()` function is called, or at a later time after the connection with the Digital Person has been established.

Once access to the user's camera and microphone has been granted, that permission will persist until the user resets their security preferences or explicitly revokes access to those devices.

## Requesting Camera and Microphone on Connect

When connecting a new session, the connection configuration determines what combination of user media devices should be requested.

For example, you may choose to ask for the user's microphone during connect, but still allow them to enter if they decline access:

```js
const scene = new Scene({
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true },
    requiredMediaDevices: {},
  });
```

This configuration will block the connect function from continuing until the user has either approved or denied access to the requested device.

You may also connect without requesting any devices at all from the user:

```js
const scene = new Scene({
    videoElement: videoEl,
    requestedMediaDevices: {},
    requiredMediaDevices: {},
  });
```

This configuration will allow the connection to be established without the user approving access to any media devices, and you will need to offer a way for them to opt-in to turning those devices on at a later time.

On some browsers and platforms the availability of a user's media devices can affect the autoplay functionality of a video element. See [Using Autoplay](video-autoplay) for more information.

## Requiring the User's Camera or Microphone

If you wish to restrict access to your digital person so that the user _must_ allow access to one or more media devices before connecting, then this can be configured using the `requiredMediaDevices` configuration property.

For example, you can require that a user _must_ provide access to their microphone to connect:

```js
const scene = new Scene({
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true },
    requiredMediaDevices: { microphone: true },
  });
```

Note that if a media device is **required** and the user denies access, the `connect()` function will fail with an error. This error can be caught and an error message can be displayed to the user:

```js
const scene = new Scene({
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true },
    requiredMediaDevices: { microphone: true },
  })
  .then(() => console.log('connected!'))
  .catch(() => {
      console.log('user declined device access');
      // show a message to the user explaining
      // that they must approve media device access
  });
```

If the user has rejected access too many times, or they explicitly revoked access to media devices via their browser settings, then the connect method will immediately fail without showing a permissions popup to the user. In this case the user must be guided to reset their browser permissions in order to try connecting again.

## Getting the state of camera and microphone

The state of the camera and microphone can be retrieved at any time using the `isMicrophoneActive()` and `isCameraActive()` functions.

```js
const micActive = scene.isMicrophoneActive();
const camActive = scene.isCameraActive();
```

Checking the state of the camera and microphone may be useful when displaying buttons in the UI to allow the user to toggle those devices on or off.

## Toggle the User's Camera or Microphone

You may wish to provide a way for the user to turn their media devices on or off during a session. This can be achieved by calling the `setMediaDeviceActive()` function with the desired media device configuration changes.

If the user has not yet provided access to the requested media device, they will be prompted to approve access the first time they attempt to turn on that device.

For example, you may have a button which can turn the user's camera or microphone on:

```js
function turnOnUserCamera() {
    scene.setMediaDeviceActive({
        camera: true,
    });
}
```

You can also toggle a user's device by using the `isMicrophoneActive()` or `isMicrophoneActive()` function to access the current state of that device:

```js
function toggleUserMicrophone() {
    const active = scene.isMicrophoneActive();
    scene.setMediaDeviceActive({
        microphone: !active,
    });
}
```

And both the camera and microphone may be updated at the same time:

```js
function toggleUserMedia(active: boolean) {
    scene.setMediaDeviceActive({
        camera: active,
        microphone: active,
    });
}
```

If the request fails for some reason, the `setMediaDeviceActive` function will return an error:

```js
function toggleUserMicrophone(active: boolean) {
    scene.setMediaDeviceActive({ microphone: active })
      .then(() => console.log('microphone active: ' + active))
      .catch((error) => console.log('microphone update failed: ', error));
}
```

## Muting and Unmuting the Persona video

The SDK does not expose any functionality to mute and unmute the Persona. Instead, you can create functions (examples below) to directly mute the HTML video element, and to detect if it is muted.

In these two examples we refer to `video`, which is the video element you pass into the Scene connect method.

First create a `setPersonaMuted` function which takes a boolean value. When you pass through `true` the video's audio will be silenced, when `false` the video will play audio.

```
function setPersonaMuted(muted) {
    video.muted = muted;
}
```

The second function will allow you to get the current muted status. It will return `true` when the video is muted and `false` when the video is not muted.

```
function isPersonaMuted() {
    return remoteVideo.muted;
}
```

## Handling media device errors

Possible `noUserMedia` error messages:
   * the user microphone and/or camera is not available
   * the user microphone/camera were not permitted by the user
   * the user microphone/camera failed to be usable

## Known Issues

### Cross browsers concerns

On Safari 15.1 and 15.2 we have noticed that the scene will close when a user disables their camera. We recommend upgrading the Safari version to 15.3.

### The persona will start speaking after 30 seconds when muted

When the Digital Person is connected with the video element muted, the Digital Person will remain silent for up to 30s but will then speak the welcome message. The user will not be able to hear this as the video element is muted.

Here is a workaround to avoid this issue:

- Turn off `MY DIGITAL PERSON SHOULD GREET ME AT START` option in Digital DNA Studio.
- UI Developer needs to trigger the Digital Person to speak once UI is ready by calling `conversationSend()` function below.

```ts
function triggerWelcomeIntent() {
    persona.conversationSend('', {}, { kind: "init" });
}

// after Digital Person video element has been un-muted
triggerWelcomeIntent();
```

The default `WELCOME_MESSAGE` intent configured in your conversation corpus will be the welcome message DP says when `triggerWelcomeIntent` is called.
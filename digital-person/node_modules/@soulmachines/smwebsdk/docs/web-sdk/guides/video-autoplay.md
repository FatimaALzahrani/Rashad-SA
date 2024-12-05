---
description: Connect to Digital Person automatically
---
# Auto-playing a Digital Person

Many websites want their Digital Person to connect automatically, without any input from the user. Each device and web browser has different restrictions on the auto-playing of video, especially video with audio. It is important to handle autoplaying correctly as you'll get a black or blank video if it's unable to play due to restrictions.

The `.play()` function is an asynchronous task and a promise. It's good to assume that will fail and for you to write you code to handle this case.

```js
videoElement.play()
  .then(() => {
    // Video playback started
  })
  .catch((error) => {
    // Video playback failed
    console.log('Playback failed due to ', error)
  })
```

Google has a [good article](https://developer.chrome.com/blog/play-request-was-interrupted/) on auto playing audio that is worth a read for more information.

## Using a connect button

If your digital perosn does not connect automatically on page load, you'll need a connect button. Make sure the function that you are calling is not async. If that action is not instant then the browser may not associate the users click with playing the video.

## Using a single video element

We've provided a function that you can call to start the video. It will call `play()` on the video element and mute the video for you if audio is not allowed.


```js
scene
  .startVideo()
  .then((videoState) => console.log('started video with state:', videoState))
  .catch((error) => console.log('could not start video:', error));
```

If `startVideo()` was not able to start the video at all, it will throw an error. This is almost always due to media restrictions defined by the browser or the user's own settings.

If `startVideo()` was successful in starting the video, it will return information about the `videoState`. The `videoState` object will allow you to identify if the video is playing with audio, or is playing muted.

The `videoState` is a simple object with `audio` and `video` properties, which are boolean values:

```js
videoState = {
  video: true,
  audio: false,
};
```

When the video is playing but muted, or if it was unable to start at all, you must seek user input in order to unmute and/or play the video. It cannot be achieved programmatically without user input. In this example a user is taking the action of clicking a button to unmute the video

```html
<button onclick="unmuteDigitalPerson()">Unmute</button>
```

```js
function unmuteDigitalPerson() {
  const videoEl = document.getElementById('sm-video');
  videoEl.muted = false;
}
```

## Using a proxy video

Depending on how your app is built you make want to have a proxy video. In this case you'll create a scene with a video that is in memory. When you are ready to display the video to the user you'll pass the proxy video src to the render video.


```html
<button id="connectButton" autoplay>Connect</button>

<video id="video" autoplay></video>
```

```js
const scene = new Scene();
const connectButton = document.getElementById('connectButton');
const renderedVideo = document.getElementById('video');
const proxyVideo = document.createElement('video');


const playVideo = () => {
  // Make sure we are testing with audio unmuted
  renderedVideo.muted = false;

  // Attach video stream to our rendered video
  renderedVideo.srcObject = videoStream;

  videoRef.currentrenderedVideo
      .play()
      .then(() => {
        // Can play with audio
        renderedVideo.muted = false;
      })
      .catch(() => {
        // Can't play with audio, so mute it
        renderedVideo.muted = true;
      })
}

// It is important NOT to make this function asynchronous with the async keyword. You'll lose the "user gesture token" required to allow your video to play later.
const connectToScene = () => {
  // Tell browser we're loading a video
  renderedVideo.load();

  // Connect to video source from `scene` and fire `playVideo` once we're connected
  scene.connect().then(() => playVideo());
}

connectButton.addEventListener('click', connectToScene)
```




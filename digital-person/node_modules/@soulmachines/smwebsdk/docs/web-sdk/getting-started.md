# Getting Started

This guide will walk you through installing the WebSDK using npm, connecting a session, and displaying the Digital Person on a webpage.

## Prerequisites

Before beginning development with WebSDK, you will need to have created and deployed a Digital Person using Digital DNA Studio. You will also need access to a JWT Token Server that has been configured to issue access tokens for your Digital Person.

- **Deploy a Digital Person**<br/>
  See [Creating a Digital Person](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1314455553/Creating+a+Digital+Person) in the Soul Machines Knowledge Base for information on creating a Digital Person to use with your Custom UI.

- **Generate a Web API Key**<br/>
  See [Connecting Using API Keys](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1320058919/Connecting+Using+API+Keys) for information creating a web API key to connect to the Digital Person.

## Installation

Install the WebSDK from npm:

```sh
npm install @soulmachines/smwebsdk
```

View a list of available version numbers under the [Versions tab on npm](https://www.npmjs.com/package/@soulmachines/smwebsdk).

## Adding a Video element

The WebSDK requires access to an `HTMLVideoElement` where you would like the Digital Person to be displayed. You may create the `HTMLVideoElement` either using HTML, or in-memory using JavaScript if you prefer.

In this example, we will create the video element using HTML. We will give it an `id` so that it can be accessed from JavaScript, and define a `width` and `height` :

```html
<video id="sm-video" width="100%" height="100%"></video>
```

The video element can then be accessed by ID in JavaScript:

```js
const videoEl = document.getElementById('sm-video');
```

## Creating a Scene object

A WebSDK `Scene` represents the visual "scene" in which the Digital Person is presented. The JavaScript `Scene` object is linked to the HTMLVideoElement visible on the page.

The `Scene` object manages the WebRTC connection with the session server. When creating a Scene object you must provide it with the `videoEl` where it will display the Digital Person, along with any other options you would like to configure.

```js
const scene = new Scene({
  videoElement: videoEl,
});
```

At this stage you may also choose to configure the camera and microphone requirements. The default values are:

- **request** both camera and microphone
- **require** the microphone

See [Accessing the User's Camera and Microphone](guides/accessing-camera-and-microphone) for more information on media device requirements.

It it recommended practice to ask for a user's microphone, but not _require_ it to start a session:

```js
const scene = new Scene({
  videoElement: videoEl,
  requestedMediaDevices: { microphone: true },
  requiredMediaDevices: {},
});
```

With these device requirements the user will be asked for access to their microphone, but if they decline access the session will still connect as the microphone is not _required_.

### Sending page metadata to NLP engine
You can choose to send page metadata to your NLP engine. This allows you to do drive different conversations based on the page. Please note the `PAGE_METADATA` intent and the `pageUrl` will not be sent at initial connection, if you need `Welcome` intent at initial connection, please turn on `MY DIGITAL PERSON SHOULD GREET ME AT START` in DDNA Studio.

#### Usage
When creating a Scene you can enable this feature by setting `sendMetadata.pageUrl` to `true`. By default this feature is turned off.

```js
const scene = new Scene({
    sendMetadata: {
      pageUrl: true,
    },
  })
```

You will need to setup a conversation fallback in your NLP system, otherwise the digital person will try to respond to the page data being sent. For how to handle this meta data in NLP, check out [Custom DP Response on Page Load](https://soulmachines.atlassian.net/wiki/spaces/SMKBSAND/pages/2215378945/Session+Persistance#Custom-DP-Response-on-Page-Load).

#### When data is sent
Data is sent when the user is already in a successful connection and has navigated to another page on your website. For a static HTML site, this is when you have session persistence enabled and the page refreshes on navigate. For a single page app, it will send data whenever the url path changes.


## Connecting the Scene

You can connect to a scene in two different ways. When a session is successfully established, the `connect()` promise will resolve to a unique session ID for the current session.

### Via an API key

This is the easiest way to connect.

When constructing your scene, pass in your API key as an option. Your API key can be found on the [API Keys](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1320386561/Managing+API+Keys) page in Digital DNA Studio.

```js
const scene = new Scene({
  apiKey: 'Your API key',
});

await scene.connect();
```

### Via a custom token server

When using a custom token server, you'll need to pass through auth credentials into the `connect()` method.

```js
await scene.connect({
  tokenServer: {
    uri: 'your uri',
    token: 'your jwt access token',
  },
});
```

#### Fetching a JWT Token

A request to a token server will usually respond with a JSON object containing a `url` and a `jwt`. Both of these values are required for the `Scene.connect()` function.
Use your custom token server to issue a new JWT token for each connection:

```js
const tokenServer = 'http://localhost:5000/auth/authorize';

const sessionConfig = fetch(tokenServer)
  .then((res) => res.json())
  .catch((e) => {
    console.log('couldnt get token: ', e);
  });
```

## Handling a successful connection

When a connection is successful, the `connect()` function will resolve with a `sessionId` unique to the current session.

This is an appropriate time to start the video, using the `scene.startVideo()` function. The `scene` already has a reference to your video element, so you do not need to pass the element to this function.

At this stage, running the code should connect your Digital Person and display them on the page.

```js
scene.connect()
  .then((sessionId) => onConnectionSuccess(sessionId));
  .catch((error) => console.log('connection failed: ', error));

function onConnectionSuccess(sessionId) {
  console.log('success! session id: ', sessionId);

  // start the video playing
  scene.startVideo()
    .then((videoState) => console.log('started video with state: ', videoState))
    .catch((error) => console.log('could not start video: ', error));
}

```

Web browsers have a number of restrictions around the "auto-playing" of video, especially video with sound. The `startVideo()` function will provide you feedback about the state of the video after you try to play it.

The `videoState` will tell you if the video started playing, and if the video element has been automatically muted. The `videoState` result looks like this:

```js
videoState = {
  video: true,
  audio: true,
};
```

If browser restrictions mean that the video cannot play at all, then the `startVideo()` function will fail with an error.

## Handling a failed connection

In the event of a failed connection, you will need to display some feedback to the user and perhaps prompt them to provide access to their camera or mic, or to retry the connection.

Some of the common reasons for a failed connection are:

- **noUserMedia**: The user has not provided access to the required media devices. Try changing those devices to "requested" but not "required" so that they do not block the user from connecting.

- **noScene**: The JWT may be incorrectly formatted, or created using an incorrect key pair. In this case the server cannot start a new scene for your website to connect to.

- **serverConnectionFailed**: The WebRTC connection could not be negotiated. This may be due to network settings, especially i na corporate environment. Try connecting from another device.

Connection errors may be handled like so:

```js
scene.connect()
  .then((sessionId) => onConnectionSuccess(sessionId));
  .catch((error) => onConnectionError(error));

function onConnectionError(error) {
  console.log('connection failed:', error)

  switch(error.name) {
    case 'noUserMedia':
      console.log('user declined device access');
      break;
    case 'noScene':
    case 'serverConnectionFailed':
      console.log('server connection failed');
      break;
    default:
      console.log('unhandled error: ', error);
  }
}
```

## Interactive Example

Enter the url for your own token server into the example below to try out a connection. When successful, the example will ask for access to your camera and microphone and then will display a Digital Person.

<iframe width="100%" height="500" src="https://stackblitz.com/edit/web-platform-9chn6x?embed=1&file=index.js&hideExplorer=1&hideNavigation=1&view=editor"></iframe>

:::info
Note: To use your own token server, it will need to be configured to allow cross-origin requests from the StackBlitz preview URL.
:::


## Debugging

If you are unsure which version of the WebSDK or platformSdk you are using, you can log it.

```
import { Scene } from '@soulmachines/smwebsdk'

const scene = new Scene();
console.log(scene.version);
```

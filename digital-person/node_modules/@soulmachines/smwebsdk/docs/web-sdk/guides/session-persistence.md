---
description: Allow session persistence to continue a Digital Person session on a different page
---
# Session Persistence

From version `14.4.0` the SDK supports session persistence across pages by using web API key with `ENABLE CROSS PAGE PERSISTENCE` set to true.

See [Connecting Using API Keys](https://soulmachines.atlassian.net/wiki/spaces/SMKBSAND/pages/2091089991/Connecting+Using+API+Keys) for information creating a web API key to connect to the Digital Person.

When the scene is successfully connected with an API key that supports session persistence, the SDK will save the data listed below to session storage in the browser.
- sm-session-id
- sm-api-key
- sm-server
 
When the user disconnects on purpose or the session times out from the server, the SDK cleans up the above session storage data in the browser. Next time it will start a brand new session.

You can check that the API key of the particular Digital Person has session persistence supported using the scene method `scene.supportsSessionPersistence(): bool` after connecting to session. If the API key has `ALLOW CROSS PAGE PERSISTENCE` set to `true` but this method returns `false`, it means the HumanOS version of the DDNA project does not support this feature. Use a different digital person running on the [latest HumanOS](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1319469057/Feature+Matrix) version.

You can also check if the current session is a resumed session or a brand new session by using the scene method `scene.isResumedSession():bool`.

```js
    await scene.connect();

    console.log(
      `>> Is Session Persistence Supported: ${scene.supportsSessionPersistence()}\n>> Is Current Session Resumed Session: ${scene.isResumedSession()}`,
    );
```

## Usage
When the user navigates from one web page to another, the SDK is loaded from scratch. All pages share the same UI code and API key to connect and disconnect from the DP server. When connecting with an API key, the SDK will check and verify the session storage to determine whether it should start a new session or connect to an existing session to resume the experience. If [auto connect is enabled](https://docs.soulmachines.com/web-sdk/guides/video-autoplay/), when page loads, the session persistence will work out-of-the-box as long as the API key used has `ENABLE CROSS PAGE PERSISTENCE` set to `true` in DDNA Studio.

If the UI requires user action to connect in the initial session, we recommend checking if session persistence data has been saved in the session storage at the beginning of the resume session. If so, connect directly instead of waiting for user action. This is purely for the user's convenience.

```js
if (sessionStorage.getItem('sm-session-id')) {
  // create a scene using same api key and connect to it directly
}
```

To make sure the user has consistent experience across different pages. You can also choose to save the camera and microphone states in session storage as well and manage them during the session. We suggest to clean up the session storage in three situations below.

```js
// Before user calls disconnect
   cleanupSessionStorage();
   scene.disconnect();

// Error happened when connecting 
   try{
      await scene.connect(connectOptions);
    } catch (error) {
      cleanupSessionStorage();
    }

// Disconnect from server
  scene.onDisconnectedEvent.addListener(() => {
    cleanupSessionStorage();
  });
```

## Limitations
- This feature is supported only with Digital People running on [Human OS version 2.4](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1319469057/Feature+Matrix)
- Cross page session persistence is not supported in combination with orchestration
- Cross page session persistence is only allowed within one tab, does not support multiple tabs
- It is necessary for the page to load within 10 seconds otherwise a session timeout error will appear


## Known Issues
- Widget video remains black on iPadOS/iOS Safari 15.5 upon entry. This is resolved by clicking any button within the widget UI
- MacOS Monterey 12.4 Safari 15.5 - Digital Person in the web widget is muted when navigating to a different page in the same tab (using session persistence). This is Safari autoplay policy limitation, when navigating to next page, the video can only be played muted, user needs to unmute it from button.
- In Safari, user is prompted for media permission after navigation if media was enabled prior to navigation. Advanced users may change this behaviour using Safari → Settings for [Site Name] → Microphone (and/or camera) → Allow
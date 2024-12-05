---
slug: /
---

# WebSDK Overview

The SoulMachines WebSDK can be used to create your own web app to display a Digital Person. The WebSDK is compatible with both JavaScript and TypeScript, and can be used with the framework of your choice.

The WebSDK does the work of creating a WebRTC connection with a Digital Person hosted on SoulMachines servers. It does not provide any user interface elements, HTML or CSS. To use the WebSDK you will need to be confident writing web applications using JavaScript.

See the [Getting Started](getting-started.md) guide for installation instructions.

##  Additional Information

Soul Machines provides a JavaScript Web SDK (smwebsdk.js) that enables you to build a custom Web Front-end User Interface for interacting with a Digital Person. In addition, your Soul Machines technical contact will provide a React template for you. If your Front-end User Interface utilizes another JavaScript framework besides React (such as Vue.js or jQuery), the SDK is compatible with frameworks that support the Web Component Standard, and also plain old vanilla JavaScript.
You can also build your own based on your organization’s front-end web framework of choice.

The Soul Machines JavaScript Web SDK supports customization of how the Digital Person interacts with the Front-end environment (for example, it can update an immutable state store with current values of the User’s Emotional state and chat transcripts). Furthermore, the Web SDK also supports responding to the UI input (e.g. button clicks).

In addition to spoken conversational content, the Web SDK also provides “cards,” which are multi-modal UI components displayed to the left or right of the Digital Person. Content types supported are HTML (such as buttons or text boxes), images (URLs), option lists and video (URLs).

The Web SDK also includes functions which can be invoked to publish events, such as play, pause, and speak commands. This function can be invoked via User Interaction, for example, by an onclick() event of a button or other HTML element. Further, the Web SDK also supports registering an event listener function that is invoked with state updates with data, such as end user EQ data, conversation transcripts, and RTC connection video/audio quality data.

:::info
The Web SDK `startSpeaking` function is blocked in Production environments for security reasons.
:::

Examples of such UI input/output elements are a mute button, user face detection (box showing the user’s face, similar to webchat), and real-time emotional state tracking visualizations (specifically the user’s positivity, negativity, confusion, and facial presence indices).

Once customization is complete, simply incorporate the SDK into your project as a single minified file or as part of your package.json file. Details of this are covered in the smwebsdk.js documentation.

---
description: Make the Digital Person aware of content on the screen
---
# Content Awareness

The experience of having a conversation with a digital person can be greatly enhanced by making the digital person aware of content on the screen, allowing them to gesture to that content when appropriate in the conversation.

Adding Content Awareness markup to your UI will provide a more engaging experience for end users by allowing the digital person to be aware of and react to elements on the screen.

## Enabling Content Awareness

Content Awareness can be enabled on a per-project basis from Digital DNA Studio. Enabling the feature in Digital DNA Studio will automatically enable content awareness features in any web UI using smwebsdk version 14 or higher.

With Content Awareness enabled, markup may be used within the HTML to identify which elements should have their metadata shared with the digital person. You can check that the current deployment has content awareness activated using the following scene method:

```js
scene.hasContentAwareness(): bool
```

## Adding Content Awareness Attributes

The Content Awareness API requires certain HTML elements to be identified so that their metadata can be automatically gathered by the smwebsdk library. HTML elements should be marked up using `data-*` attributes.

## Configuration

By default we debounce measure calls to avoid unnecessary calls. The debounce duration defaults to `300ms`, which means that content on the screen must remain stable and unchanged for 300ms in order for the content to be measured and sent to the server. If you find you need to tweak this you can pass in a duration to the Scene when constructing it.

## HTML Usage

### Video Element

The Video Frame element must be identified for Content Awareness to work.

Add the `data-sm-video` attribute to the HTMLVideoElement being used to display your digital person.

If more than one element has the `data-sm-video` attribute, only the first element will be identified and used for Content Awareness.

The sdk will issue a console warning and not track the element if it has been marked but has a bounding box of (0,0,0,0).

```
<video data-sm-video></video>
```

### Content Elements

Marking up HTML elements with the `data-sm-content` attribute will cause the digital person to glance at this content when it appears on the page.

For elements that represent content cards displayed using the `showcards(cardId)` command from the conversational corpus, the `data-sm-content` value should match the card ID used in the corpus.

```js
<img data-sm-content="cardId" src="..." alt="..."></img>
```

Alternatively the id can be blank and can be set later.

This can be useful if:

- You do not know the id at the time
- The content is not ready to be shown
- The content is not visible

By default remeasure is only called when a value/id for data-sm-content is provided.

The sdk will issue a console warning and not track the element if it has been marked but has a bounding box of (0,0,0,0).

## Angular Usage

### Video Component

The Video Frame element must be identified for Content Awareness to work.

Add the `data-sm-video` attribute to the HTMLVideoElement being used to display your digital person.

If more than one element has the `data-sm-video` attribute, only the first element will be identified and used for Content Awareness.

#### Host Binding

The attribute can be attached dynamically in Angular using `@Hostbinding()`

```js
@HostBinding('attr.data-sm-video') public videoId = '';
```

### Content Components

Marking up HTML elements with the `data-sm-content` attribute will cause the digital person to glance at this content when it appears on the page.

For elements that represent content cards displayed using the `@showcards(cardId)` command from the conversational corpus, the `data-sm-content` value should match the card ID used in the corpus.

#### Host Binding

The attribute can be added to an Angular `Component` using `@Hostbinding()`

```js
@HostBinding('attr.data-sm-content') public contentId = 'cardId';
```

or you could set it in the HTML file using

```
<img [attr.data-sm-content]="cardId" src="..." alt="..."></img>
```

This is particularly useful for adding content awareness to elements which are not written explicitly in HTML but instead exist as a wrapper element.

It is also possible to provide an id after initialisation.

```js
@HostBinding('attr.data-sm-content') public contentId = '';
...
...
this.contentId = 'myCardId';
```

Alternatively the id can be blank and can be set later.

This can be useful if:

- You do not know the id at the time
- The content is not ready to be shown
- The content is not visible

By default remeasure is only called when a value/id for data-sm-content is provided.

## Triggers for automatic content measurement

Elements will be remeasured when:

- the web browser is resized
- the device is rotated
- an element with the `data-sm-video` attribute is added/removed from the DOM
- an element with the `data-sm-content` attribute is added/removed from the DOM
- an existing element has the `data-sm-video` attribute added/removed from it
- an existing element has the `data-sm-content` attribute added/removed from it
- an element's `data-sm-content` attribute has its value changed

## Measuring content manually

For any instances where the automatic content measurement does not meet the requirements of the UI, the measurement functionality can be called manually to measure all tagged content elements and send a content awareness update to the server.

```js
scene.sendContent()
```

Note that this function has no rate limiting and may result in excessive websocket traffic if called too often.

If your project uses Cinematic Cuts, then calling `sendContent` will trigger a change of camera framing. Calling this function directly too often may result in changes to the camera framing happening more often than is desired.

## Disconnect

All observers and event listeners will be removed automatically when the scene disconnects.

```js
scene.disconnect()
```

### Measuring on scroll events

When measuring on scroll events, make sure to [throttle the scroll event handler][scroll-throttling] so that the collecting and sending of metadata does not happen more than about once a second.

```js
let ticking = false;

document.addEventListener('scroll', function(e) {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      scene.sendContent();
      ticking = false;
    });

    ticking = true;
  }
});
```

[scroll-throttling]: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling

### Measuring on move/drag

When measuring the position of elements as they move due to animation or dragging, make sure to throttle the event handler so that the collecting and sending of metadata does not happen more than about once a second.

If appropriate, the measurement of content elements could alternatively be deferred to on completion of the drag or animation.

```js
draggableElement.addEventListener('dragend', function(e) {
  scene.sendContent();
});
```

## Content Awareness Metadata

The Content Awareness API captures metadata about elements that have been identified by the developer. This includes each element's x,y position and its width and height. For content elements, the ID provided is also sent.

## Debugging

Use the developer tools to inspect the raw websocket message being sent to the server. Filter for messages with the name `updateContentawareness`.

## Triggering Content Awareness Behaviour

Within your conversation corpus, content aware gaze and gestural behaviour will be automatically triggered when `@showcards` dialog functions are used. This behaviour may also be triggered manually using the following dialog functions:

- `@attendObject([object_id: str], [start_time(optional): float], [duration(optional): float])`
  - Makes the DP gaze at the object denoted by `object_id` where `object_id` matches the value of a HTML element with a `data-sm-content=[object_id]` attribute
  - The start time parameter (default 0s) controls when the behaviour starts, and is relative to the position of the dialog function in the DP's spoken response
  - The duration parameter (default 1s) controls the duration of the behaviour, and is relative to the start time
- `@gestureObject([object_id: str], [start_time(optional): float], [duration(optional): float])`
  - Makes the DP gesture at the object denoted by `object_id` where `object_id` matches the value of a HTML element with a `data-sm-content=[object_id]` attribute
  - The DP will only perform the gesture if the screen aspect ratio is wide enough and the content does not overlap the DP (bounding box approximately shoulder-to-shoulder)

These dialog functions are generally useful to get the DP to refer to persistent on-screen content which is not driven by your conversation.

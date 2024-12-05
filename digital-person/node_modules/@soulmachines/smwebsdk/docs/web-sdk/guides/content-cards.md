---
sidebar_position: 2
description: Display content cards using Content Cards API
--- 

# Displaying Content Cards

Following the release of the [Content Cards API](https://docs.soulmachines.com/web-sdk/api/smwebsdk.scene.conversation) we no longer require that custom UIs implement the storage and retrieval of custom payload data based on speech markers received from the Soul Machines platform. This is now automated through the Content Cards API. This makes determining when to display content cards considerably easier.

When content card relevant [speech markers](https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/1320058881/Optimising+your+Conversation) such as `@showcards(cardId)`, `@hidecards(cardId)` or `@hidecards()` are received from the conversation by the Soul Machines platform, the referenced content card (in this case `cardId`) is stored by the Content Cards API as an active card. A custom UI can determine when to display or hide a card using the onCardChanged event.

Refer to [Building Content Cards](building-content-cards.md) for more information on speech marker usage.

## Triggering Content Cards

Placing a listener on the `onCardChanged` event will trigger whenever a speech marker is received. This event returns the custom payload data of all currently active cards.

### Usage

The custom UI can listen to the onCardChanged event by utilising the scene object:

```js
scene.conversation.onCardChanged.addListener((activeCards) => {
  // active cards will be an array of the cards or an empty array when cards are cleared
});
```

### Example

The following dialog response will send a showcards speech marker event to the custom UI referencing the `image` card:

```js
This is an image of a cute kitten @showcards(cuteKitten)
```

When this `showcards` speech marker is received by the Soul Machines platform the onCardChanged event is triggered returning the following payload to the custom UI.

```js
[
  {
    id: 'cuteKitten',
    type: 'image',
    data: {
      url: 'https://placekitten.com/500/500',
      alt: 'A cute kitten',
    },
  },
];
```

A custom UI can then display the content card using the payload data returned by the event.

## Hiding Content Cards

When the hiding of content cards is driven directly by the custom UI the stored active cards can be reset using the `clearActiveCards()` method. This emits a call to onCardChanged returning the empty set of active cards and their data.

```js
scene.conversation.clearActiveCards();
```

### Automatically Hiding Content Cards

By default, this is switched off but you can enable automatically hiding content cards with each conversation turn. To do this set `autoClearCards` to `true`.

```js
scene.conversation.autoClearCards = true;
```

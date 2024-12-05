---
description: Persona class configuration
---

# Persona Configurations

This section describes the different settings that you can configure for the Persona Class. 

## Constructor

new Persona(scene: Scene, personaId: PersonaId): Persona

### Parameters

- scene: SceneThe scene the persona resides in.

- personaId: PersonaIdThe ID of the persona as received in a state callback.

Returns: `Persona​`

## Accessors

### onConversationResultEvent

get `onConversationResultEvent(): SmEvent`

Returns: `SmEvent​`

### onSpeechMarkerEvent

get `onSpeechMarkerEvent(): SmEvent`

Returns: `SmEvent​`

## Methods

### Animate To a Named Camera With Orbit Pan
```
animateToNamedCameraWithOrbitPan(cameraName: string, time: number, orbitDegX: number, orbitDegY: number, panDeg: number, tiltDeg: number): Promise<VariablesModel>
```
Cut or animate to a named camera position, with support for camera adjustment.

#### Parameters

`cameraName: string`
Named camera position. The currently supported option is "CloseUp".

`time: number`
Time in seconds for the animation to run. 0 indicates a cut.

`orbitDegX: number`
Degrees of horizontal rotation around implicit orbit point of camera position (typically the middle of the Persona's head)

`orbitDegY: number`
Degrees of vertical rotation around implicit orbit point of camera position (typically the middle of the Persona's head)

`panDeg: number`
Degrees of camera pan. Orbital adjustment is applied before pan adjustment.

`tiltDeg: number`
Degrees of camera tilt. Orbital adjustment is applied before tilt adjustment.

Returns: `Promise<VariablesModel>`

### Conversation Get Variables
```
conversationGetVariables(): Promise<any>
```
Get variables will return the current conversation variable values in the promise completion. Completion/promise receives an object with member 'variables'.


### Conversation Send
```
conversationSend(text: string, variables: VariablesModel, optionalArgs: object): Promise<any>
```
Send a chat message to conversation.

#### Parameters

`text: string`
Text to send to conversation.

`variables: VariablesModel`
Variables to send to the conversation provider.

`optionalArgs: object`
Optional arguments object (none currently supported).

### Conversation Set Variables
```
stopSpeaking(): Promise<any>
```
Stop speaking.
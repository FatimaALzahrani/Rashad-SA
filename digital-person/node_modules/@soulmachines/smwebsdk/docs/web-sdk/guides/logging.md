---
description: Debug using logger
---
# Logging

Logging will give you more insights into what is occurring within the SDK. All logs within SDK has prefixed with `smsdk`.

The major loggings we have currently are session logging and content awareness feature logging, By default both logging are enabled and the minimum log level are `log`, which means only `log`, `warn` and `error` will be shown in console. Most of the debug information is using `console.debug()`, which requires minimal log level to be `debug` to show in console.


## Configuring

You can configure the logger via the Scene constructor. The available log levels are in order of verbosity: `'debug', 'log', 'warn', 'error'`. You can specify a minimum log level for each class - for example, if you specify a `minLogLevel` of `warn`, then only `warn` and `error` messages will be logged. 

The config parameter is optional and you don't need to supply the full values. The full logging config object looks like:

```js
{
  session: {
    minLogLevel: LogLevel,
    enabled: boolean
  },
  contentAwareness: {
    minLogLevel: LogLevel,
    enabled: boolean
  }
},
```
`LogLevel` is a type you can import from SDK.

An example of how to use it, which will enable `session` logging for 'debug' messages, and disable `contentAwareness` logging:

```js
const scene = new smwebsdk.Scene(
  video,
  false,
  UserMedia.MicrophoneAndCamera,
  UserMedia.MicrophoneAndCamera,
  300,
  {
    session: {
      enabled: true,
      minLogLevel: 'debug',
    },
    contentAwareness: {
      enabled: false
    }
  },
);

```

## Changing the logging setting during a session

There are some public APIs you can use to change the logging during a session.

```js
  // get session logging config
  scene.isLoggingEnabled();
  scene.getMinLogLevel();

  // set session logging config
  scene.setLogging(boolean);
  scene.setMinLogLevel(LogLevel);

  // get content awareness logging config
  scene.contentAwareness.isLoggingEnabled();
  scene.contentAwareness.getMinLogLevel();

  // set content awareness logging config
  scene.contentAwareness.setLogging(boolean);
  scene.contentAwareness.setMinLogLevel(LogLevel);
```
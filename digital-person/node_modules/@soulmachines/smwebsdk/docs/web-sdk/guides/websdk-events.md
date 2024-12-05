---
description: Web SDK Events
--- 

# Web SDK Events
An instance of SmEvent or an instance of a subclass of SmEvent can have a set of 0 to n event listeners registered to itself. These event listeners are invoked with relevant arguments when an event of interest occurs.

Example Usage of Constructor:

`var event = new SmEvent();`

## Add Event Listener

`addListener(callback: Function): void`

This method allows the addition of a new event listener to an instance of an SmEvent, or an instance of a Subclass of SmEvent. The only argument is a ​function​, which is the event listener. This function is invoked when the event occurs, along with any relevant information within the argument of the function.​ ​`addListener()` returns ​`void​`.

`call(...args: any[]): void`

If there is a need to trigger the SmEvent manually, this can be done by invoking the ​`call()`​ instance method. This calls every event listener registered to the SmEvent, and passes in any arguments to each event listener.  

Example:

```js
var​ event = ​new​ SmEvent();

var​ listener1 = ​function​(args) { console​.log(​"Listener 1 
      was invoked with "​ + args); return​ ​void​;
};  
var​ listener2 = ​function​(args) { console​.log(​"Listener 2
      was invoked with "​ + args); return​ ​void​;
};

// register both event listeners
event.addListener(listener1); event.addListener(listener2);

// Call the event only once event.call("some
 information"​    )​;

/*
This will produce the following console log output:
============================
Listener 1 was invoked with some information
Listener 2 was invoked with some information
============================
*Note the order of the console log output may not be consistent.
*/
```

## Remove Event Listener
`removeListener(callback: Function): void`

This function enables you to remove a previously registered event listener. Note that it is a safe no-op to pass an event listener that was never previously registered. The only parameter is the pointer to the instance of the event listener that was previously registered.

This example is a continuation of the Example of `​addListener​`, this removes ​`listener2​`:

```js
// Continuation of Example from addListener(). All vars defined in that example.

event.removeListener(listener2);

event.call("some more information"​  )​ ;

/*
This will produce the following console log output:
============================
Listener 1 was invoked with some more information
============================
*/
```
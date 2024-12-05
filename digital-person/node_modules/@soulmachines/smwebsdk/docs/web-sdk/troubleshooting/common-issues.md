---
sidebar_position: 1
description: Request access to user's Camera and Microphone
---

# Common Issues

## I'm trying to turn on the microphone/camera but nothing is happening. What is going on?

If you are trying to enable to microphone or camera and it is not turning on then one thing to do is to open the [Developer Console](https://balsamiq.com/support/faqs/browserconsole/#:~:text=To%20do%20that%2C%20go%20into,shortcut%20Option%20%2B%20%E2%8C%98%20%2B%20C%20.) and look to see if clicking the button generates the following error in the console:

```text
noUserMedia: Permission denied
```

If that message is present, then likely the issue is due to the site `permissions-policy`(see image below). This needs to be adjusted by your site administrator in order to have access.

![No Camera Access Wordpress Site Permission](/img/wordpress_site_permission_bad.png)

**This currently affects Chrome.** Other browsers may also be affected depending on whether or not they enforce the `permissions-policy`.

See [this wordpress troubleshooting guide](./enable-camera-and-microphone-wp.md) for more information on resolving the issue for Wordpress.
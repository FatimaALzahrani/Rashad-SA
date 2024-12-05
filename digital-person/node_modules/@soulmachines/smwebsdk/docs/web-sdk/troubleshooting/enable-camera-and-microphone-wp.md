# Enabling Camera and Microphone on a Web Page

## Symptom

Camera and Microphone prompts don’t appear at all, can’t enable camera or microphone

## Cause

There are header rules in place which disable the camera and microphone.  This can be seen by opening a page of the site, and viewing Google Developer tools (press F12 while in google chrome)


![Google Developer Tools](/img/wp_cammic_devtools.png)

This will open a pane on the right side of the web browser.  Choose Application on the top navigation, then Top on the side navigation.  You will see the Permissions Policy at the bottom of the viewing pane.

![Web Page Permissions Policy](/img/wp_cammic_permissions-policy.png)

If the features are disabled, you will see it at the bottom, like this:

![Disabled Features](/img/wp_cammic_disabled-features.png)

## Remedy

To Fix it, you need to add Header Rules for the website.  For each web server, the process is different.

You should be able to add a header rule to expressly allow the camera and microphone from a specific server on the site, but that will require additional testing.

For most wordpress based sites, normally this change would be done on the .htaccess file.  

Here is an article which covers the background, and how to access the .htaccess file: https://www.wpdownloadmanager.com/http-security-headers-on-wordpress/ 

In the case of SoulMachines, the sites are hosted on WPEngine on an NGINX server.  They have a control on the administration panel to enable header rules for the camera and microphone.   

Click [web rules] on the left pane, then [Header Rules] above the rules, then on the Permissions Policy, click the 3 dots […] to the right, and select [Edit Rule]

![Wordpress Edit Rule](/img/wp_cammic_editrule.png)

Add under value – camera=(self), microphone(self)       Then [Edit Rule].  

![Wordpress Add Rule](/img/wp_cammic_add-rule.png)

**Note**: if you replace “self” with the server hosting the digital person, it may automatically enable the camera and microphone without any user authorization, although there have been additional security measures put in place to protect the user, so it may or may not function.
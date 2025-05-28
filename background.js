browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.found) {
    browser.notifications.create({
      "type": "basic",
      "iconUrl": "icon.png",
      "title": "Possible fakecaptcha or clickfix Detected!",
      "message": "Please contact with your cybersecurity team immediately.\n\n" +
      "Commands found: " + message.commands + "\n" +
      "Warning: " + message.warning
    }).then(() => {
      console.log("Notification sent successfully.");
    });
  }
});
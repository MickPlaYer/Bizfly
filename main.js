console.log('Bizfly');
// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction',
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'formInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var info = $('#main-content').serializeArray()
    var link = $('script[src*="/s/files/"]').prop('src')
    // Directly respond to the sender (popup),
    // through the specified callback */
    response({ info, link })
  } else if ((msg.from === 'popup') && (msg.subject === 'switch')) {
    if (!!location.search) {
      location.search = ''
    } else {
      location.search = 'v=2'
    }
    response('ok')
  }
});

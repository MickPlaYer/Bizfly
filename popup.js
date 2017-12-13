function setFormInfo(info) {
  if (!info || info.length == 0) { return }
  var p = $('#form-info')
  var t = $('<table><tbody></tbody></table>')
  var tb = t.find('tbody')
  var h = {}
  info.forEach(function(i) {
    h[i.name] = i.value
  })
  Object.keys(h).forEach(function(k) {
    tb.append($('<tr><td>' + k + '</td><td>' + h[k]  + '</td></tr>'))
  })
  p.html(t)
}

function setFindId(assetLink) {
  if (!assetLink) { return }
  var t = $('#find-id')
  var r = assetLink.match(/\/(\d+)\/theme\/(\d+)/)
  var shopId = r[1]
  var themeId = r[2]
  $('#find-id').html('<h2>Shop Id: ' + shopId + '</h2><h2>Theme Id: ' + themeId + '</h2>')
}

// ...query for the active tab...
chrome.tabs.query({
  active: true,
  currentWindow: true,
}, function (tabs) {
  // ...and send a request for the DOM info...
  chrome.tabs.sendMessage(
    tabs[0].id,
    { from: 'popup', subject: 'formInfo' },
    function(data) {
      setFormInfo(data.info)
      setFindId(data.link)
    },
  );
});

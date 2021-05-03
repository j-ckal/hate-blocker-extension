function GetUrl() {
  // fetches the current URL and displays it in the popup
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url
    console.log(url)
    document.getElementById('url').innerHTML = url
  })
}

function GetInstances() {
  // gets number of instances from local storage and displays, as well as updating indicator icon. 
  // runs every second while popup is open.
  let indicator = document.getElementById('power_indicator')

  chrome.storage.local.get(['instances'], function(result) {
    document.getElementById('instances').innerHTML = result.instances;
    chrome.storage.local.get('enabled', data => {
      enabled = !!data.enabled
      indicator.src = enabled ? 'resources/poweron.png' : 'resources/poweroff.png'
    })
  })
  setTimeout(GetInstances, 1000)
}

function ActiveToggle() {
  // takes input from button and stores it in local storage, as well as changing the indicator.
  let enabled = true
  let btn = document.getElementById('toggle_button');
  let indicator = document.getElementById('power_indicator')

  chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled
    btn.textContent = enabled ? 'Disable' : 'Enable'
    indicator.src = enabled ? 'resources/poweron.png' : 'resources/poweroff.png'

  })

  btn.onclick = () => {
      enabled = !enabled
      btn.textContent = enabled ? 'Disable' : 'Enable'
      chrome.tabs.reload()
      chrome.storage.local.set({enabled:enabled})
      chrome.storage.local.set({instances:0})
  }
}

ActiveToggle()
GetUrl()
GetInstances()
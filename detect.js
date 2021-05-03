function checkSite(){
    let elements = {}
    let newelements = {}
    let instances = 0

    /* loop to iterate through all the paragraph elements on the webpage.
    for each element, check if it contains the word... if it does, add to
    elements object with False attribute. */
    let items = document.body.getElementsByTagName('p');

    [...items].forEach(element => {
        let data = {data: element.innerText}
        elements[element.innerText] = false
    })

    /* ES6 fetch API used to post elements to local server with appropriate formatting. */
    fetch('http://127.0.0.1:5000/', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({'data': elements})
    })

    /* using the asynchronous .then method of fetch API to process the response data. */
    .then(function(response) {
        return response.json()
    })
    .then(response => {
        newelements = response['data'];

        /* iterates through element object, and hiding elements that were returned as True. */
        [...items].forEach(element => {
            if (newelements[element.innerText]) {
                instances = instances + 1
                element.innerHTML = '<details><summary>Post blocked by HateBlocker</summary>' + element.innerHTML + '</details>'
            }
        })

        /* logs instances of word, saving counter to local storage to be shown in pop-up. */
        console.log('Instances of the word: ' + instances)
        chrome.storage.local.set({instances:instances})
    });
    
    /* old client side detection method
       [...items].forEach(element => {
        if (element.innerText.toLowerCase().includes(word)) {
            elements.push(element)
            element.innerHTML = '<details><summary>Post blocked by HateBlocker</summary>' + element.innerHTML + '</details>'
            // legacy method of hiding word, survey respondants disliked this method.
            // element.innerHTML = element.innerHTML.replace(new RegExp(word, 'gi'), (match) => `<mark>BLOCKED BY HATEBLOCKER</mark>`)
        }
    }) */
}
chrome.storage.local.get('enabled', data => {
    
    /* if pop-up enabled button pressed, run function. */
    if (data.enabled) {
        chrome.storage.local.set({instances:0})
        checkSite()
    }
})
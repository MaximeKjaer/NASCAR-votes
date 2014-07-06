if (typeof(localStorage['votes']) == 'undefined') {
    localStorage['votes'] = 0;
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (details.url.indexOf('action_type=vote') != -1) {
        if (details.url.indexOf('doubleVote=true') != -1) {
            localStorage['votes'] = Number(localStorage['votes']) + 2;
        }
        else {
            localStorage['votes'] = Number(localStorage['votes']) + 1;
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: localStorage['votes']}, function(response) {
                //console.log(response.farewell);
                //Was causing some trouble.
            });
        });
    }
}, {urls: ['*://connectapi.telescope.tv/*']}, []);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'getLocalStorage')
        sendResponse({data: localStorage[request.key]});
    else if (request.method == 'openPage')
        chrome.tabs.create({url: request.key});
});
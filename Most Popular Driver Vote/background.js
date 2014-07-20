// 3 modes.

// 1. Wait for vote, and notify to vote.
// 2. Wait to notify.


// Initial state: 1
// When vote comes in, go to 2.


function setBadge () {
    chrome.browserAction.setBadgeText({text: 'Vote!'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#FF0000'});
    
    options = {
        type: 'basic',
        title: 'Vote for Josh Wise',
        message: '24 hours have passed - you can vote for Josh Wise again!\n',
        iconUrl: 'josh.png',
        buttons: [{title: 'Vote Now!', iconUrl: 'vote24.png'}, {title: 'Later', iconUrl: 'dismiss24.png'}]
    };
    id = 'vote_notification';
    chrome.notifications.create(id, options, function () {});
    chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
        if (buttonIndex == 0) {
            chrome.tabs.create({url: 'http://sprint.votenow.tv/desktop/index.html?app=web'});
        }
    })


}

function removeBadge () {
    chrome.browserAction.setBadgeText({text: localStorage['mpd_votes']});
    setTimeout(function() {
            chrome.browserAction.setBadgeText({text: ''});
    }, 5000);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'getLocalStorage')
        sendResponse({data: localStorage[request.key]});
    else if (request.method == 'openPage')
        chrome.tabs.create({url: request.key});
});


function display_votes () {
    chrome.runtime.sendMessage({method: 'voted', key: localStorage['mpd_votes']});
}


//FIRST TIME INITIALISATION
if (typeof(localStorage['mpd_votes']) == 'undefined') {
    localStorage['mpd_votes'] = 0;
}

if (typeof(localStorage['normal_vote']) == 'undefined') {
    localStorage['normal_vote'] = 0;
}

if (typeof(localStorage['fb_vote']) == 'undefined') {
    localStorage['fb_vote'] = 0;
}

if (typeof(localStorage['twitter_vote']) == 'undefined') {
    localStorage['twitter_vote'] = 0;
}

//VOTE COUNTER
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (details.url.indexOf('action_type=vote') != -1 || details.url.indexOf('action_type=fbshare') != -1 || details.url.indexOf('action_type=twittershare') != -1) {
        localStorage['mpd_votes'] = Number(localStorage['mpd_votes']) + 1;
        localStorage['mpd_votetime'] = new Date().getTime();
        removeBadge();
        timer();
        
        if (details.url.indexOf('action_type=vote') != -1) {
            type = 'normal_vote';
        }
        else if (details.url.indexOf('action_type=fbshare') != -1) {
            type = 'fb_vote';
        }
        else if (details.url.indexOf('action_type=twittershare') != -1) {
            type = 'twitter_vote';
        }
        localStorage[type] = Number(localStorage[type]) + 1;
    }
}, {urls: ['*://connectapi.telescope.tv/vote*']}, []);

function timer() {
    console.log('TIMER() function initiated.');
    now = new Date().getTime();
    one_day = 1000*60*60*24; //24h in ms
    last = Number(localStorage['mpd_votetime']);

    if (typeof(localStorage['mpd_votetime']) == 'undefined') {
        console.log('1: You have never voted before.');
        setBadge();
    }
    else if (last + one_day <= now) {
        console.log('2: A full day has passed.');
        setBadge();
    }
    else {
        console.log('3: Let\'s wait a bit before next vote');
        setTimeout(function() {
            setBadge(); 
        }, (last+one_day) - now);
    }
}

timer();
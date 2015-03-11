initialize('SFV2015_votes', 0);
initialize('SFV2015_fb', 0);
initialize('SFV2015_twitter', 0);

// Intercepts votes and counts them
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    vote = details.url.indexOf('action_type=vote') != -1;
    fb =  details.url.indexOf('action_type=fb') != -1;
    twitter = details.url.indexOf('action_type=twitter') != -1;
    doubleVote = details.url.indexOf('doubleVote=true') != -1 || fb || twitter;
    
    if (details.url.indexOf('country=CH') != -1) {
        alert('Voting is not supported from your current IP address. You might consider using the "Hola Unblocker" extension');        
        return;
    }
    
    if (doubleVote) {
            localStorage['SFV2015_votes'] = Number(localStorage['SFV2015_votes']) + 2;
    }
    else if (vote) {
        localStorage['SFV2015_votes'] = Number(localStorage['SFV2015_votes']) + 1;
    }

    // Separate counters
    if (twitter) {
        localStorage['SFV2015_twitter'] = Number(localStorage['SFV2015_twitter']) + 2;
    }
    else if (fb) {
        localStorage['SFV2015_fb'] = Number(localStorage['SFV2015_fb']) + 2;
    }
    
    
    if (doubleVote || vote || fb || twitter) {
        localStorage['SFV2015_votetime'] = new Date().getTime();
        voteCountNotification();
        timer();        
    }
}, {urls: ['*://e1.votenow.tv/vote.php*']}, []);

// Can get a message from another part of the extension, and run their request from the background page (which often has more permissions).
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == 'getLocalStorage')
        sendResponse({data: localStorage[request.key]});
    else if (request.method == 'openPage')
        chrome.tabs.create({url: request.key});
});

//Show the new vote count in the badge
function voteCountNotification() {
    chrome.browserAction.setBadgeText({text: localStorage['SFV2015_votes']});
    setTimeout(function() {
            chrome.browserAction.setBadgeText({text: ''});
    }, 10000);
}


// when it's time to vote again, do all of these.
function notify() {
    chrome.browserAction.setBadgeText({text: 'Vote!'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#FF0000'});
    options = {
        type: 'basic',
        title: 'Vote for Josh Wise',
        message: '24 hours have passed - you can vote for Josh Wise again!\n',
        iconUrl: 'images/josh.png',
        buttons: [{title: 'Vote Now!', iconUrl: 'images/vote24.png'}, {title: 'Later', iconUrl: 'images/dismiss24.png'}]
    };
    id = 'vote_notification';
    chrome.notifications.create(id, options, function () {});
    chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
        if (buttonIndex == 0) {
            chrome.tabs.create({url: 'http://sprintfanvote.nascar.com/'});
        }
    });
}

//creates a new localStorage variable if it doesn't exist
//to avoid NaN when we do Number(localStorage['something']);
function initialize(key, value) {
    if(typeof(localStorage[key]) == 'undefined') {
        localStorage[key] = value;
    }
}

function timer() {
    console.log('TIMER() function initiated.');
    now = new Date().getTime();
    one_day = 1000*60*60*24; //24h in ms
    last = Number(localStorage['SFV2015_votetime']);

    if (typeof(localStorage['SFV2015_votetime']) == 'undefined') {
        console.log('1: You have never voted before.');
        notify();
    }
    else if (last + one_day <= now) {
        console.log('2: A full day has passed.');
        notify();
    }
    else {
        console.log('3: Let\'s wait a bit before next vote');
        setTimeout(function() {
            notify(); 
        }, (last+one_day) - now);
    }
}

timer();
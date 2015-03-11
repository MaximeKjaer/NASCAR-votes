function createNotification(title, body, icon) {
	options = {
        type: 'image',
        title: title,
        message: body + '\n',
        iconUrl: icon,
        imageUrl: 'img/joshwins.png',
        buttons: [{title: 'Read More!', iconUrl: 'img/accept24.png'}, {title: 'I\'m good, no thanks', iconUrl: 'img/dismiss24.png'}]
    };
    id = 'vote_notification';
    chrome.notifications.create(id, options, function () {});

    // Clicking it takes you to the post.
    chrome.notifications.onClicked.addListener(function (notificationId) {
    	chrome.tabs.create({url: 'http://www.reddit.com/r/dogecoin/comments/2moea5/big_changes_to_the_chrome_voting_extension_read/'}); //  MAKE SURE TO PUT THE ACTUAL LINK HERE!!!!
    });
     chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
        if (buttonIndex == 0) {
            chrome.tabs.create({url: 'http://www.reddit.com/r/dogecoin/comments/2moea5/big_changes_to_the_chrome_voting_extension_read/'});//  MAKE SURE TO PUT THE ACTUAL LINK HERE!!!!
        }
    })
}


if (typeof(localStorage['v3']) == 'undefined') {
    localStorage['v3'] = true;
	title = 'The vote is over!';
	votes = localStorage['mpd_votes'];
	message = 'This extension will be "hibernating" until the next event - read more about it by clicking below!';
	createNotification(title, message, 'img/icon80.png');
}
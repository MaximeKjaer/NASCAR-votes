a = document.getElementById('link');
a.addEventListener('click', function() {
	chrome.tabs.create({url: 'http://www.reddit.com/r/dogecoin/comments/2moea5/big_changes_to_the_chrome_voting_extension_read/'});
});
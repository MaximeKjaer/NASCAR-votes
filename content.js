function show (votes) {
    if (Number(votes) >= 10000) rank = 'F*cking Astraunot'
    else if (Number(votes) >= 5000) rank = 'Rocketeer';
    else if (Number(votes) >= 2500) rank = 'Racer';
    else if (Number(votes) >= 1000) rank = 'Driver';
    else if (Number(votes) >= 500 ) rank = 'Sprinter';
    else if (Number(votes) >= 250) rank = 'Runner';
    else if (Number(votes) >= 98) rank = 'Walker';
    else if (Number(votes) >= 10) rank = 'Crawler';
    else if (Number(votes) < 10) rank = '';
    if (Number(votes) == 1) child.innerHTML = rank + '<br/>' + votes + ' vote';
    else child.innerHTML = rank + '<br/>' + votes + ' votes';
}


child = document.createElement('div');
child.setAttribute('id', 'voteCount');
child.setAttribute('title', 'Your rank. Go to /r/DogecoinVotingForce!');


chrome.runtime.sendMessage({method: 'getLocalStorage', key: 'votes'}, function(response) {
    if (typeof(response.data) == 'undefined') {
        child.innerText = "Vote for Wise!";
    }
    else {
        show(response.data);
    }
});




chrome.runtime.sendMessage({method: "getLocalStorage", key: "css"}, function(response) {
    if (typeof(response.data) == 'undefined') css = 'position: fixed; bottom: 100px; right: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
    else css = response.data;
    document.getElementById('voteCount').setAttribute('style', css);
    
});

parent = document.body;
parent.appendChild(child);

document.getElementById('voteCount').addEventListener('click', function () {
    chrome.runtime.sendMessage({method: "openPage", key: "http://www.reddit.com/r/DogecoinVotingForce/comments/25d7dm/enlist_here_and_now/"});
})


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        show(request.greeting);
        localStorage['votes'] = request.greeting;
});
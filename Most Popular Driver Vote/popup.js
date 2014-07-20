document.getElementById('button').addEventListener('click', function () {
    chrome.runtime.sendMessage({method: 'openPage', key: 'http://sprint.votenow.tv/desktop/index.html?app=web'});
});


if (typeof(localStorage['mpd_votes']) != 'undefined') {
    p = 'votes';
    if (localStorage['mpd_votes'] == 1) p = 'vote';
    document.getElementById('votes').innerText = localStorage['mpd_votes'];
    document.getElementById('p').innerText = p;
}

if (typeof(localStorage['normal_vote']) != 'undefined') {
    document.getElementById('normal').innerText = localStorage['normal_vote'];
}

if (typeof(localStorage['twitter_vote']) != 'undefined') {
    document.getElementById('twitter').innerText = localStorage['twitter_vote'];
}

if (typeof(localStorage['fb_vote']) != 'undefined') {
    document.getElementById('fb').innerText = localStorage['fb_vote'];
}
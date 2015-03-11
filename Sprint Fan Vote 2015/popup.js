document.getElementById('button').addEventListener('click', function () {
    chrome.runtime.sendMessage({method: 'openPage', key: 'http://sprint.votenow.tv/desktop/index.html?app=web'});
});


if (typeof(localStorage['SFV2015_votes']) != 'undefined') {
    p = 'votes';
    if (localStorage['SFV2015_votes'] == 1) {
        p = 'vote';
    }
    document.getElementById('votes').innerText = localStorage['SFV2015_votes'];
    document.getElementById('p').innerText = p;
    document.getElementById('normal').innerText = Number(localStorage['SFV2015_votes']) - Number(localStorage['SFV2015_fb']) - Number(localStorage['SFV2015_twitter']);
}

if (typeof(localStorage['SFV2015_twitter']) != 'undefined') {
    document.getElementById('twitter').innerText = localStorage['SFV2015_twitter'];
}

if (typeof(localStorage['SFV2015_fb']) != 'undefined') {
    document.getElementById('fb').innerText = localStorage['SFV2015_fb'];
}
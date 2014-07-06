
if (typeof(localStorage['css']) != 'undefined') {
    document.getElementById('custom_css').value = localStorage['css'];
    document.getElementById(localStorage['options_position']).setAttribute('checked', true);
}
else {
    document.getElementById('custom_css').value = 'position: fixed; bottom: 100px; right: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
    document.getElementById('bottom_right').setAttribute('checked', true);
    localStorage['css'] = 'position: fixed; bottom: 100px; right: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
}
document.getElementById('custom_css').addEventListener('click', function () {
    document.getElementById('custom').setAttribute('checked', 'true');
    localStorage['options_position'] = 'custom';
});
    
document.getElementById('custom_css').addEventListener('keyup', function () {
    localStorage['css'] = document.getElementById('custom_css').value;
    localStorage['options_position'] = 'custom';
});

document.getElementById('reset').addEventListener('click', function () {
    confirmation = confirm('Do you really want to reset your vote count? There\' no going back!');
    if (confirmation == true) {
        localStorage['votes'] = 0;
    }
});
    
pos = document.getElementsByName('position');
for (i=0; i<pos.length; i++) {
    pos[i].addEventListener('click', function () {
        if (this.id == 'top_left') {
            localStorage['css'] = 'position: fixed; top: 100px; left: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
        }
        else if (this.id == 'top_right') {
            localStorage['css'] = 'position: fixed; top: 100px; right: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
        }
        else if (this.id == 'bottom_left') {
            localStorage['css'] = 'position: fixed; bottom: 100px; left: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
        }
        else if (this.id == 'bottom_right') {
            localStorage['css'] = 'position: fixed; bottom: 100px; right: 10px; z-index: 10000; color: white; font-size: 70px; text-align: center; cursor: pointer; font-family: "Comic Sans MS";';
        }
        else if (this.id == 'custom') {
            localStorage['css'] = document.getElementById('custom_css').value;
        }

        localStorage['options_position'] = this.id;
    }, false);
}

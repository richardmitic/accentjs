function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function gen_random_shade(min, max) {
  var value = Math.floor((Math.random() * (max-min)) + min);
  var grayscale = (value << 16) | (value << 8) | value;
  var color = '#' + "0"+grayscale.toString(16).slice(-6);
  return color
}

function random_shade(element, min, max) {
  var shade = gen_random_shade(min, max);
  element.style.color = shade;
}

function random_opacity(element, min, max) {
  var op = (Math.random() * (max-min)) + min
  element.style.opacity = op;
}
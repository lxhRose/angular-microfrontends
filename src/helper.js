export function loadScript(src, callback) {
  var script = document.createElement('script'),
    body = document.getElementsByTagName('body')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = src;
  if (script.addEventListener) {
    script.addEventListener('load', function () {
      callback();
    }, false);
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement;
      if (target.readyState == 'loaded') {
        callback();
      }
    });
  }
  body.appendChild(script);
}

export function loadScriptAll(srcArr, callback) {
  let completeNum = 0, _len = srcArr.length;

  for (let i = 0; i < _len; i++) {
    loadScript(srcArr[i], function () {
      completeNum++;
    });
  }
  let timer = setInterval(function () {
    if (completeNum === _len) {
      callback();
      clearInterval(timer);
    }
  }, 25);
}

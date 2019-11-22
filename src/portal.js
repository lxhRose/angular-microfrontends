import * as singleSpa from 'single-spa';
import { loadScriptAll } from './helper';

const IS_DEV = true;
// const IS_DEV = false;

const APPS = ['app1', 'app2', 'navbar'];
const AppsArr = [
  {
    name: APPS[0],
    url: IS_DEV ? "http://localhost:4201/main.js" : APPS[0] + "/main.js",
    path: '/' + APPS[0]
  }, {
    name: APPS[1],
    url: IS_DEV ? "http://localhost:4202/main.js" : APPS[1] + "/main.js",
    path: '/' + APPS[1]
  }, {
    name: APPS[2],
    url: IS_DEV ? "http://localhost:4300/main.js" : APPS[2] + "/main.js",
    path: '/' + APPS[2]
  },
];

singleSpaInit();

export default function singleSpaInit() {
  loadScriptAll([
    'http://e-static.oss-cn-shanghai.aliyuncs.com/js/systemjs/system.0.20.19.js',
    'https://unpkg.com/core-js-bundle@3.1.4/minified.js',
    "https://unpkg.com/zone.js",
  ], function () {
    AppsArr.map((item) => {
      singleSpa.registerApplication(
        item.name,
        function () {
          return SystemJS.import(item.url);
        },
        function (location) {
          return item.path === '/navbar' ? true : location.pathname.startsWith(item.path);
        }
      )
    });
    singleSpa.start();
  });
}

import {
  Keyboard
} from "./chunk-E7NOT4MX.js";

// node_modules/@ionic/core/components/keyboard.js
var KEYBOARD_DID_OPEN = "ionKeyboardDidShow";
var KEYBOARD_DID_CLOSE = "ionKeyboardDidHide";
var KEYBOARD_THRESHOLD = 150;
var previousVisualViewport = {};
var currentVisualViewport = {};
var keyboardOpen = false;
var resetKeyboardAssist = () => {
  previousVisualViewport = {};
  currentVisualViewport = {};
  keyboardOpen = false;
};
var startKeyboardAssist = (win) => {
  const nativeEngine = Keyboard.getEngine();
  if (nativeEngine) {
    startNativeListeners(win);
  } else {
    if (!win.visualViewport) {
      return;
    }
    currentVisualViewport = copyVisualViewport(win.visualViewport);
    win.visualViewport.onresize = () => {
      trackViewportChanges(win);
      if (keyboardDidOpen() || keyboardDidResize(win)) {
        setKeyboardOpen(win);
      } else if (keyboardDidClose(win)) {
        setKeyboardClose(win);
      }
    };
  }
};
var startNativeListeners = (win) => {
  win.addEventListener("keyboardDidShow", (ev) => setKeyboardOpen(win, ev));
  win.addEventListener("keyboardDidHide", () => setKeyboardClose(win));
};
var setKeyboardOpen = (win, ev) => {
  fireKeyboardOpenEvent(win, ev);
  keyboardOpen = true;
};
var setKeyboardClose = (win) => {
  fireKeyboardCloseEvent(win);
  keyboardOpen = false;
};
var keyboardDidOpen = () => {
  const scaledHeightDifference = (previousVisualViewport.height - currentVisualViewport.height) * currentVisualViewport.scale;
  return !keyboardOpen && previousVisualViewport.width === currentVisualViewport.width && scaledHeightDifference > KEYBOARD_THRESHOLD;
};
var keyboardDidResize = (win) => {
  return keyboardOpen && !keyboardDidClose(win);
};
var keyboardDidClose = (win) => {
  return keyboardOpen && currentVisualViewport.height === win.innerHeight;
};
var fireKeyboardOpenEvent = (win, nativeEv) => {
  const keyboardHeight = nativeEv ? nativeEv.keyboardHeight : win.innerHeight - currentVisualViewport.height;
  const ev = new CustomEvent(KEYBOARD_DID_OPEN, {
    detail: { keyboardHeight }
  });
  win.dispatchEvent(ev);
};
var fireKeyboardCloseEvent = (win) => {
  const ev = new CustomEvent(KEYBOARD_DID_CLOSE);
  win.dispatchEvent(ev);
};
var trackViewportChanges = (win) => {
  previousVisualViewport = Object.assign({}, currentVisualViewport);
  currentVisualViewport = copyVisualViewport(win.visualViewport);
};
var copyVisualViewport = (visualViewport) => {
  return {
    width: Math.round(visualViewport.width),
    height: Math.round(visualViewport.height),
    offsetTop: visualViewport.offsetTop,
    offsetLeft: visualViewport.offsetLeft,
    pageTop: visualViewport.pageTop,
    pageLeft: visualViewport.pageLeft,
    scale: visualViewport.scale
  };
};

export {
  KEYBOARD_DID_OPEN,
  KEYBOARD_DID_CLOSE,
  resetKeyboardAssist,
  startKeyboardAssist,
  setKeyboardOpen,
  setKeyboardClose,
  keyboardDidOpen,
  keyboardDidResize,
  keyboardDidClose,
  trackViewportChanges,
  copyVisualViewport
};
/*! Bundled license information:

@ionic/core/components/keyboard.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-KPJ6KOK3.js.map

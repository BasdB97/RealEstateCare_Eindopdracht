import {
  win
} from "./chunk-KMGIKM5C.js";

// node_modules/@ionic/core/components/capacitor.js
var getCapacitor = () => {
  if (win !== void 0) {
    return win.Capacitor;
  }
  return void 0;
};

// node_modules/@ionic/core/components/keyboard2.js
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
var KeyboardResize;
(function(KeyboardResize2) {
  KeyboardResize2["Body"] = "body";
  KeyboardResize2["Ionic"] = "ionic";
  KeyboardResize2["Native"] = "native";
  KeyboardResize2["None"] = "none";
})(KeyboardResize || (KeyboardResize = {}));
var Keyboard = {
  getEngine() {
    const capacitor = getCapacitor();
    if (capacitor === null || capacitor === void 0 ? void 0 : capacitor.isPluginAvailable("Keyboard")) {
      return capacitor.Plugins.Keyboard;
    }
    return void 0;
  },
  getResizeMode() {
    const engine = this.getEngine();
    if (!(engine === null || engine === void 0 ? void 0 : engine.getResizeMode)) {
      return Promise.resolve(void 0);
    }
    return engine.getResizeMode().catch((e) => {
      if (e.code === ExceptionCode.Unimplemented) {
        return void 0;
      }
      throw e;
    });
  }
};

export {
  getCapacitor,
  KeyboardResize,
  Keyboard
};
/*! Bundled license information:

@ionic/core/components/capacitor.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)

@ionic/core/components/keyboard2.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-E7NOT4MX.js.map

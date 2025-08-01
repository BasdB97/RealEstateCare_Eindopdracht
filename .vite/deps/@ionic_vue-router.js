import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  parseQuery
} from "./chunk-5HGOH2IE.js";
import {
  shallowRef
} from "./chunk-J73OEK26.js";
import "./chunk-AMBSP7Z4.js";

// node_modules/@ionic/vue-router/dist/index.js
var createLocationHistory = () => {
  const locationHistory = [];
  const tabsHistory = {};
  const add = (routeInfo) => {
    switch (routeInfo.routerAction) {
      case "pop":
        pop(routeInfo);
        break;
      default:
        addRoute(routeInfo);
        break;
    }
    if (routeInfo.routerDirection === "root") {
      clearHistory();
      addRoute(routeInfo);
    }
  };
  const update = (routeInfo) => {
    const locationIndex = locationHistory.findIndex((x) => x.id === routeInfo.id);
    if (locationIndex > -1) {
      locationHistory.splice(locationIndex, 1, routeInfo);
    }
    const tabArray = tabsHistory[routeInfo.tab || ""];
    if (tabArray) {
      const tabIndex = tabArray.findIndex((x) => x.id === routeInfo.id);
      if (tabIndex > -1) {
        tabArray.splice(tabIndex, 1, routeInfo);
      } else {
        tabArray.push(routeInfo);
      }
    } else if (routeInfo.tab) {
      tabsHistory[routeInfo.tab] = [routeInfo];
    }
  };
  const pop = (routeInfo) => {
    const tabHistory = getTabsHistory(routeInfo.tab);
    let ri;
    if (tabHistory) {
      ri = tabHistory[tabHistory.length - 1];
      while (ri && ri.id !== routeInfo.id) {
        tabHistory.pop();
        ri = tabHistory[tabHistory.length - 1];
      }
      tabHistory.pop();
      tabHistory.push(routeInfo);
    }
    ri = locationHistory[locationHistory.length - 1];
    while (ri && ri.id !== routeInfo.id) {
      locationHistory.pop();
      ri = locationHistory[locationHistory.length - 1];
    }
    locationHistory.pop();
    locationHistory.push(routeInfo);
  };
  const addRoute = (routeInfo) => {
    const tabHistory = getTabsHistory(routeInfo.tab);
    if (tabHistory) {
      if (tabHistory[tabHistory.length - 1] && tabHistory[tabHistory.length - 1].id === routeInfo.id) {
        tabHistory.pop();
      }
      tabHistory.push(routeInfo);
    }
    locationHistory.push(routeInfo);
  };
  const clearHistory = (routeInfo) => {
    if (routeInfo) {
      const { position, tab } = routeInfo;
      const existingRouteIndex = locationHistory.findIndex((r) => r.position === position);
      if (existingRouteIndex === -1)
        return;
      locationHistory.splice(existingRouteIndex);
      const clearTabHistory = (tab2) => {
        const existingTabRouteIndex = tabsHistory[tab2].findIndex((r) => r.position === position);
        if (existingTabRouteIndex === -1)
          return;
        tabsHistory[tab2].splice(existingTabRouteIndex);
      };
      const tabHistory = tabsHistory[tab];
      if (tab && tabHistory) {
        clearTabHistory(tab);
      } else {
        for (const tab2 in tabsHistory) {
          clearTabHistory(tab2);
        }
      }
    } else {
      for (const tab in tabsHistory) {
        tabsHistory[tab] = [];
      }
      locationHistory.length = 0;
    }
  };
  const getTabsHistory = (tab) => {
    let history;
    if (tab) {
      history = tabsHistory[tab];
      if (!history) {
        history = tabsHistory[tab] = [];
      }
    }
    return history;
  };
  const size = () => locationHistory.length;
  const current = (initialHistory, currentHistory) => {
    const index = currentHistory - initialHistory;
    return locationHistory[index] || last();
  };
  const last = () => locationHistory[locationHistory.length - 1];
  const canGoBack = (deep = 1, initialHistory, currentHistory) => {
    return currentHistory - deep >= initialHistory;
  };
  const getFirstRouteInfoForTab = (tab) => {
    const tabHistory = getTabsHistory(tab);
    if (tabHistory) {
      return tabHistory[0];
    }
    return void 0;
  };
  const getCurrentRouteInfoForTab = (tab) => {
    const tabHistory = getTabsHistory(tab);
    if (tabHistory) {
      return tabHistory[tabHistory.length - 1];
    }
    return void 0;
  };
  const findLastLocation = (routeInfo, delta = -1) => {
    const routeInfos = getTabsHistory(routeInfo.tab);
    if (routeInfos) {
      if (delta < -1) {
        return routeInfos[routeInfos.length - 1 + delta];
      } else {
        for (let i = routeInfos.length - 2; i >= 0; i--) {
          const ri = routeInfos[i];
          if (ri) {
            if (ri.pathname === routeInfo.pushedByRoute) {
              return ri;
            }
          }
        }
      }
    }
    for (let i = locationHistory.length - 2; i >= 0; i--) {
      const ri = locationHistory[i];
      if (ri) {
        if (ri.pathname === routeInfo.pushedByRoute) {
          return locationHistory[i + 1 + delta];
        }
      }
    }
    return void 0;
  };
  return {
    current,
    size,
    last,
    add,
    canGoBack,
    update,
    getFirstRouteInfoForTab,
    getCurrentRouteInfoForTab,
    findLastLocation,
    clearHistory
  };
};
var ids = { main: 0 };
var generateId = (type = "main") => {
  var _a;
  const id = ((_a = ids[type]) !== null && _a !== void 0 ? _a : 0) + 1;
  ids[type] = id;
  return id.toString();
};
var createIonRouter = (opts, router) => {
  let currentNavigationInfo = {
    direction: void 0,
    action: void 0,
    delta: void 0
  };
  router.afterEach((to, _, failure) => {
    if (failure)
      return;
    const { direction, action, delta } = currentNavigationInfo;
    currentHistoryPosition = opts.history.state.position;
    const replaceAction = opts.history.state.replaced ? "replace" : void 0;
    handleHistoryChange(to, action || replaceAction, direction, delta);
    currentNavigationInfo = {
      direction: void 0,
      action: void 0,
      delta: void 0
    };
  });
  const locationHistory = createLocationHistory();
  let initialHistoryPosition = opts.history.state.position;
  let currentHistoryPosition = opts.history.state.position;
  let currentRouteInfo;
  let incomingRouteParams;
  const historyChangeListeners = [];
  if (typeof document !== "undefined") {
    document.addEventListener("ionBackButton", (ev) => {
      ev.detail.register(0, (processNextHandler) => {
        opts.history.go(-1);
        processNextHandler();
      });
    });
  }
  opts.history.listen((_, _x, info) => {
    currentNavigationInfo = {
      delta: info.delta,
      /**
       * Both the browser forward and backward actions
       * are considered "pop" actions, but when going forward
       * we want to make sure the forward animation is used.
       */
      action: info.type === "pop" && info.delta >= 1 ? "push" : info.type,
      direction: info.direction === "" ? "forward" : info.direction
    };
  });
  const handleNavigateBack = (defaultHref, routerAnimation) => {
    const routeInfo = locationHistory.current(initialHistoryPosition, currentHistoryPosition);
    if (routeInfo && routeInfo.pushedByRoute) {
      const prevInfo = locationHistory.findLastLocation(routeInfo);
      if (prevInfo) {
        incomingRouteParams = Object.assign(Object.assign({}, prevInfo), { routerAction: "pop", routerDirection: "back", routerAnimation: routerAnimation || routeInfo.routerAnimation });
        if (routeInfo.lastPathname === routeInfo.pushedByRoute || /**
         * We need to exclude tab switches/tab
         * context changes here because tabbed
         * navigation is not linear, but router.back()
         * will go back in a linear fashion.
         */
        prevInfo.pathname === routeInfo.pushedByRoute && /**
         * Tab info can be undefined or '' (empty string)
         * both are false-y values, so we can just use !.
         */
        !routeInfo.tab && !prevInfo.tab) {
          router.back();
        } else {
          router.go(prevInfo.position - routeInfo.position);
        }
      } else {
        handleNavigate(defaultHref, "pop", "back", routerAnimation);
      }
    } else {
      handleNavigate(defaultHref, "pop", "back", routerAnimation);
    }
  };
  const handleNavigate = (path, routerAction, routerDirection, routerAnimation, tab) => {
    setIncomingRouteParams(routerAction, routerDirection, routerAnimation, tab);
    if (routerAction === "push") {
      router.push(path);
    } else {
      router.replace(path);
    }
  };
  const handleHistoryChange = (location, action, direction, delta) => {
    let leavingLocationInfo;
    if (incomingRouteParams) {
      if (incomingRouteParams.routerAction === "replace") {
        leavingLocationInfo = locationHistory.current(initialHistoryPosition, currentHistoryPosition);
      } else if (incomingRouteParams.routerAction === "pop") {
        leavingLocationInfo = locationHistory.current(initialHistoryPosition, currentHistoryPosition + 1);
        if (action === "replace") {
          locationHistory.clearHistory();
        }
      } else {
        const position = incomingRouteParams.routerDirection === "root" ? currentHistoryPosition : currentHistoryPosition - 1;
        leavingLocationInfo = locationHistory.current(initialHistoryPosition, position);
      }
    } else {
      leavingLocationInfo = currentRouteInfo;
    }
    if (!leavingLocationInfo) {
      leavingLocationInfo = {
        pathname: "",
        search: ""
      };
    }
    const leavingUrl = leavingLocationInfo.pathname + leavingLocationInfo.search;
    if (leavingUrl !== location.fullPath) {
      if (!incomingRouteParams) {
        if (action === "replace") {
          incomingRouteParams = {
            routerAction: "replace",
            routerDirection: "none"
          };
        } else if (action === "pop") {
          const routeInfo2 = locationHistory.current(initialHistoryPosition, currentHistoryPosition - delta);
          if (routeInfo2 && routeInfo2.pushedByRoute) {
            const prevRouteInfo = locationHistory.findLastLocation(routeInfo2, delta);
            incomingRouteParams = Object.assign(Object.assign({}, prevRouteInfo), { routerAction: "pop", routerDirection: "back" });
          } else {
            incomingRouteParams = {
              routerAction: "pop",
              routerDirection: "none"
            };
          }
        }
        if (!incomingRouteParams) {
          incomingRouteParams = {
            routerAction: "push",
            routerDirection: direction || "forward"
          };
        }
      }
      let routeInfo;
      if (incomingRouteParams === null || incomingRouteParams === void 0 ? void 0 : incomingRouteParams.id) {
        routeInfo = Object.assign(Object.assign({}, incomingRouteParams), { lastPathname: leavingLocationInfo.pathname });
      } else {
        const isPushed = incomingRouteParams.routerAction === "push" && incomingRouteParams.routerDirection === "forward";
        routeInfo = Object.assign(Object.assign({ id: generateId("routeInfo") }, incomingRouteParams), { lastPathname: leavingLocationInfo.pathname, pathname: location.path, search: location.fullPath && location.fullPath.split("?")[1] || "", params: location.params && location.params, prevRouteLastPathname: leavingLocationInfo.lastPathname });
        if (isPushed) {
          routeInfo.pushedByRoute = leavingLocationInfo.pathname !== "" ? leavingLocationInfo.pathname : void 0;
        } else if (routeInfo.routerAction === "pop") {
          const route = locationHistory.findLastLocation(routeInfo);
          routeInfo.pushedByRoute = route === null || route === void 0 ? void 0 : route.pushedByRoute;
        } else if (routeInfo.routerAction === "push" && routeInfo.tab !== leavingLocationInfo.tab) {
          const lastRoute = locationHistory.getCurrentRouteInfoForTab(routeInfo.tab);
          routeInfo.pushedByRoute = lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.pushedByRoute;
        } else if (routeInfo.routerAction === "replace") {
          const currentRouteInfo2 = locationHistory.current(initialHistoryPosition, currentHistoryPosition);
          const currentPushedBy = currentRouteInfo2 === null || currentRouteInfo2 === void 0 ? void 0 : currentRouteInfo2.pushedByRoute;
          const pushedByRoute = currentPushedBy !== void 0 && currentPushedBy !== routeInfo.pathname ? currentPushedBy : routeInfo.pushedByRoute;
          routeInfo.lastPathname = (currentRouteInfo2 === null || currentRouteInfo2 === void 0 ? void 0 : currentRouteInfo2.pathname) || routeInfo.lastPathname;
          routeInfo.pushedByRoute = pushedByRoute;
          routeInfo.routerDirection = (currentRouteInfo2 === null || currentRouteInfo2 === void 0 ? void 0 : currentRouteInfo2.routerDirection) || routeInfo.routerDirection;
          routeInfo.routerAnimation = (currentRouteInfo2 === null || currentRouteInfo2 === void 0 ? void 0 : currentRouteInfo2.routerAnimation) || routeInfo.routerAnimation;
          routeInfo.prevRouteLastPathname = currentRouteInfo2 === null || currentRouteInfo2 === void 0 ? void 0 : currentRouteInfo2.lastPathname;
        }
      }
      routeInfo.position = currentHistoryPosition;
      routeInfo.delta = delta;
      const historySize = locationHistory.size();
      const historyDiff = currentHistoryPosition - initialHistoryPosition;
      const isReplacing = historySize === historyDiff && historySize > 0 && action === "replace";
      if (historySize > historyDiff || isReplacing) {
        if ((routeInfo.routerAction === "push" || routeInfo.routerAction === "replace") && delta === void 0) {
          locationHistory.clearHistory(routeInfo);
          locationHistory.add(routeInfo);
        }
      } else {
        locationHistory.add(routeInfo);
      }
      if (locationHistory.size() === 1) {
        initialHistoryPosition = routeInfo.position;
      }
      currentRouteInfo = routeInfo;
    }
    incomingRouteParams = void 0;
    historyChangeListeners.forEach((cb) => cb(currentRouteInfo));
  };
  const getCurrentRouteInfo = () => currentRouteInfo;
  const canGoBack = (deep = 1) => locationHistory.canGoBack(deep, initialHistoryPosition, currentHistoryPosition);
  const navigate = (navigationOptions) => {
    const { routerAnimation, routerDirection, routerLink } = navigationOptions;
    setIncomingRouteParams("push", routerDirection, routerAnimation);
    router.push(routerLink);
  };
  const resetTab = (tab) => {
    const routeInfo = locationHistory.getFirstRouteInfoForTab(tab);
    if (routeInfo) {
      router.go(routeInfo.position - currentHistoryPosition);
    }
  };
  const changeTab = (tab, path) => {
    if (!path)
      return;
    const routeInfo = locationHistory.getCurrentRouteInfoForTab(tab);
    const [pathname] = path.split("?");
    if (routeInfo) {
      incomingRouteParams = Object.assign(Object.assign({}, incomingRouteParams), { routerAction: "push", routerDirection: "none", tab });
      if (routeInfo.pathname === pathname) {
        router.push({
          path: routeInfo.pathname,
          query: parseQuery(routeInfo.search)
        });
      } else {
        router.push({ path: pathname, query: parseQuery(routeInfo.search) });
      }
    } else {
      handleNavigate(pathname, "push", "none", void 0, tab);
    }
  };
  const handleSetCurrentTab = (tab) => {
    const ri = Object.assign({}, locationHistory.current(initialHistoryPosition, currentHistoryPosition));
    if (ri.tab !== tab) {
      ri.tab = tab;
      locationHistory.update(ri);
    }
    const pushedByRoute = locationHistory.findLastLocation(ri);
    if (ri.pushedByRoute !== ri.lastPathname && (pushedByRoute === null || pushedByRoute === void 0 ? void 0 : pushedByRoute.tab) !== tab) {
      ri.pushedByRoute = void 0;
      locationHistory.update(ri);
    }
  };
  const registerHistoryChangeListener = (cb) => {
    historyChangeListeners.push(cb);
  };
  const setIncomingRouteParams = (routerAction = "push", routerDirection = "forward", routerAnimation, tab) => {
    incomingRouteParams = {
      routerAction,
      routerDirection,
      routerAnimation,
      tab
    };
  };
  const goBack = (routerAnimation) => {
    setIncomingRouteParams("pop", "back", routerAnimation);
    router.back();
  };
  const goForward = (routerAnimation) => {
    setIncomingRouteParams("push", "forward", routerAnimation);
    router.forward();
  };
  const getLeavingRouteInfo = () => {
    return locationHistory.current(initialHistoryPosition, currentHistoryPosition);
  };
  return {
    handleNavigate,
    getLeavingRouteInfo,
    handleNavigateBack,
    handleSetCurrentTab,
    getCurrentRouteInfo,
    canGoBack,
    navigate,
    resetTab,
    changeTab,
    registerHistoryChangeListener,
    goBack,
    goForward
  };
};
var createViewStacks = (router) => {
  const viewStacks = {};
  const size = () => Object.keys(viewStacks).length;
  const clear = (outletId) => {
    delete viewStacks[outletId];
  };
  const getViewStack = (outletId) => {
    return viewStacks[outletId];
  };
  const registerIonPage = (viewItem, ionPage) => {
    viewItem.ionPageElement = ionPage;
    viewItem.ionRoute = true;
    viewItem.matchedRoute.instances = {
      default: viewItem.vueComponentRef.value
    };
  };
  const findViewItemByRouteInfo = (routeInfo, outletId) => {
    return findViewItemByPath(routeInfo.pathname, outletId, false);
  };
  const findLeavingViewItemByRouteInfo = (routeInfo, outletId, mustBeIonRoute = true) => {
    return findViewItemByPath(routeInfo.lastPathname, outletId, mustBeIonRoute);
  };
  const findViewItemByPathname = (pathname, outletId) => {
    return findViewItemByPath(pathname, outletId, false);
  };
  const findViewItemInStack = (path, stack) => {
    return stack.find((viewItem) => {
      if (viewItem.pathname === path) {
        return viewItem;
      }
      return void 0;
    });
  };
  const findViewItemByPath = (path, outletId, mustBeIonRoute = false) => {
    const matchView = (viewItem) => {
      if (mustBeIonRoute && !viewItem.ionRoute || path === "") {
        return false;
      }
      const resolvedPath = router.resolve(path);
      const findMatchedRoute = resolvedPath.matched.find((matchedRoute) => matchedRoute === viewItem.matchedRoute);
      if (findMatchedRoute) {
        const hasParameter = findMatchedRoute.path.includes(":");
        if (hasParameter && path !== viewItem.pathname) {
          return false;
        }
        return viewItem;
      }
      return void 0;
    };
    if (outletId) {
      const stack = viewStacks[outletId];
      if (!stack)
        return void 0;
      const match = router ? stack.find(matchView) : findViewItemInStack(path, stack);
      if (match)
        return match;
    } else {
      for (const outletId2 in viewStacks) {
        const stack = viewStacks[outletId2];
        const viewItem = findViewItemInStack(path, stack);
        if (viewItem) {
          return viewItem;
        }
      }
    }
    return void 0;
  };
  const createViewItem = (outletId, vueComponent, matchedRoute, routeInfo, ionPage) => {
    return {
      id: generateId("viewItem"),
      pathname: routeInfo.pathname,
      outletId,
      matchedRoute,
      ionPageElement: ionPage,
      vueComponent,
      vueComponentRef: shallowRef(),
      ionRoute: false,
      mount: false,
      exact: routeInfo.pathname === matchedRoute.path,
      params: routeInfo.params,
      vueComponentData: {}
    };
  };
  const add = (viewItem) => {
    const { outletId } = viewItem;
    if (!viewStacks[outletId]) {
      viewStacks[outletId] = [viewItem];
    } else {
      viewStacks[outletId].push(viewItem);
    }
  };
  const remove = (viewItem, outletId) => {
    if (!outletId) {
      throw Error("outletId required");
    }
    const viewStack = viewStacks[outletId];
    if (viewStack) {
      viewStacks[outletId] = viewStack.filter((item) => item.id !== viewItem.id);
    }
  };
  const getChildrenToRender = (outletId) => {
    const viewStack = viewStacks[outletId];
    if (viewStack) {
      const components = viewStacks[outletId].filter((v) => v.mount);
      return components;
    }
    return [];
  };
  const unmountLeavingViews = (outletId, viewItem, delta = 1) => {
    const viewStack = viewStacks[outletId];
    if (!viewStack)
      return;
    const startIndex = viewStack.findIndex((v) => v === viewItem);
    for (let i = startIndex + 1; i < startIndex - delta; i++) {
      const viewItem2 = viewStack[i];
      viewItem2.mount = false;
      viewItem2.ionPageElement = void 0;
      viewItem2.ionRoute = false;
      viewItem2.matchedRoute.instances = {};
    }
  };
  const mountIntermediaryViews = (outletId, viewItem, delta = 1) => {
    const viewStack = viewStacks[outletId];
    if (!viewStack)
      return;
    const startIndex = viewStack.findIndex((v) => v === viewItem);
    for (let i = startIndex + 1; i < startIndex + delta; i++) {
      viewStack[i].mount = true;
    }
  };
  return {
    unmountLeavingViews,
    mountIntermediaryViews,
    clear,
    findViewItemByRouteInfo,
    findLeavingViewItemByRouteInfo,
    findViewItemByPathname,
    createViewItem,
    getChildrenToRender,
    add,
    remove,
    registerIonPage,
    getViewStack,
    size
  };
};
var createRouter2 = (opts) => {
  const routerOptions = Object.assign({}, opts);
  delete routerOptions.tabsPrefix;
  const router = createRouter(routerOptions);
  const ionRouter = createIonRouter(opts, router);
  const viewStacks = createViewStacks(router);
  const oldInstall = router.install.bind(router);
  router.install = (app) => {
    app.provide("navManager", ionRouter);
    app.provide("viewStacks", viewStacks);
    oldInstall(app);
  };
  const oldIsReady = router.isReady.bind(router);
  router.isReady = () => oldIsReady();
  return router;
};
var createWebHistory2 = (base) => createWebHistory(base);
var createWebHashHistory2 = (base) => createWebHashHistory(base);
var createMemoryHistory2 = (base) => createMemoryHistory(base);
export {
  createMemoryHistory2 as createMemoryHistory,
  createRouter2 as createRouter,
  createWebHashHistory2 as createWebHashHistory,
  createWebHistory2 as createWebHistory
};
//# sourceMappingURL=@ionic_vue-router.js.map

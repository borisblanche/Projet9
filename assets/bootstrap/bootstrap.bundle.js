// /*!
//   * Bootstrap v5.1.3 (https://getbootstrap.com/)
//   * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
//   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//   */
// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//   typeof define === 'function' && define.amd ? define(factory) :
//   (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
// })(this, (function () { 'use strict';

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/index.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const MAX_UID = 1000000;
//   const MILLISECONDS_MULTIPLIER = 1000;
//   const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

//   const toType = obj => {
//     if (obj === null || obj === undefined) {
//       return `${obj}`;
//     }

//     return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
//   };
//   /**
//    * --------------------------------------------------------------------------
//    * Public Util Api
//    * --------------------------------------------------------------------------
//    */


//   const getUID = prefix => {
//     do {
//       prefix += Math.floor(Math.random() * MAX_UID);
//     } while (document.getElementById(prefix));

//     return prefix;
//   };

//   const getSelector = element => {
//     let selector = element.getAttribute('data-bs-target');

//     if (!selector || selector === '#') {
//       let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
//       // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
//       // `document.querySelector` will rightfully complain it is invalid.
//       // See https://github.com/twbs/bootstrap/issues/32273

//       if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
//         return null;
//       } // Just in case some CMS puts out a full URL with the anchor appended


//       if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
//         hrefAttr = `#${hrefAttr.split('#')[1]}`;
//       }

//       selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
//     }

//     return selector;
//   };

//   const getSelectorFromElement = element => {
//     const selector = getSelector(element);

//     if (selector) {
//       return document.querySelector(selector) ? selector : null;
//     }

//     return null;
//   };

//   const getElementFromSelector = element => {
//     const selector = getSelector(element);
//     return selector ? document.querySelector(selector) : null;
//   };

//   const getTransitionDurationFromElement = element => {
//     if (!element) {
//       return 0;
//     } // Get transition-duration of the element


//     let {
//       transitionDuration,
//       transitionDelay
//     } = window.getComputedStyle(element);
//     const floatTransitionDuration = Number.parseFloat(transitionDuration);
//     const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

//     if (!floatTransitionDuration && !floatTransitionDelay) {
//       return 0;
//     } // If multiple durations are defined, take the first


//     transitionDuration = transitionDuration.split(',')[0];
//     transitionDelay = transitionDelay.split(',')[0];
//     return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
//   };

//   const triggerTransitionEnd = element => {
//     element.dispatchEvent(new Event(TRANSITION_END));
//   };

//   const isElement$1 = obj => {
//     if (!obj || typeof obj !== 'object') {
//       return false;
//     }

//     if (typeof obj.jquery !== 'undefined') {
//       obj = obj[0];
//     }

//     return typeof obj.nodeType !== 'undefined';
//   };

//   const getElement = obj => {
//     if (isElement$1(obj)) {
//       // it's a jQuery object or a node element
//       return obj.jquery ? obj[0] : obj;
//     }

//     if (typeof obj === 'string' && obj.length > 0) {
//       return document.querySelector(obj);
//     }

//     return null;
//   };

//   const typeCheckConfig = (componentName, config, configTypes) => {
//     Object.keys(configTypes).forEach(property => {
//       const expectedTypes = configTypes[property];
//       const value = config[property];
//       const valueType = value && isElement$1(value) ? 'element' : toType(value);

//       if (!new RegExp(expectedTypes).test(valueType)) {
//         throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
//       }
//     });
//   };

//   const isVisible = element => {
//     if (!isElement$1(element) || element.getClientRects().length === 0) {
//       return false;
//     }

//     return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
//   };

//   const isDisabled = element => {
//     if (!element || element.nodeType !== Node.ELEMENT_NODE) {
//       return true;
//     }

//     if (element.classList.contains('disabled')) {
//       return true;
//     }

//     if (typeof element.disabled !== 'undefined') {
//       return element.disabled;
//     }

//     return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
//   };

//   const findShadowRoot = element => {
//     if (!document.documentElement.attachShadow) {
//       return null;
//     } // Can find the shadow root otherwise it'll return the document


//     if (typeof element.getRootNode === 'function') {
//       const root = element.getRootNode();
//       return root instanceof ShadowRoot ? root : null;
//     }

//     if (element instanceof ShadowRoot) {
//       return element;
//     } // when we don't find a shadow root


//     if (!element.parentNode) {
//       return null;
//     }

//     return findShadowRoot(element.parentNode);
//   };

//   const noop = () => {};
//   /**
//    * Trick to restart an element's animation
//    *
//    * @param {HTMLElement} element
//    * @return void
//    *
//    * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
//    */


//   const reflow = element => {
//     // eslint-disable-next-line no-unused-expressions
//     element.offsetHeight;
//   };

//   const getjQuery = () => {
//     const {
//       jQuery
//     } = window;

//     if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
//       return jQuery;
//     }

//     return null;
//   };

//   const DOMContentLoadedCallbacks = [];

//   const onDOMContentLoaded = callback => {
//     if (document.readyState === 'loading') {
//       // add listener on the first call when the document is in loading state
//       if (!DOMContentLoadedCallbacks.length) {
//         document.addEventListener('DOMContentLoaded', () => {
//           DOMContentLoadedCallbacks.forEach(callback => callback());
//         });
//       }

//       DOMContentLoadedCallbacks.push(callback);
//     } else {
//       callback();
//     }
//   };

//   const isRTL = () => document.documentElement.dir === 'rtl';

//   const defineJQueryPlugin = plugin => {
//     onDOMContentLoaded(() => {
//       const $ = getjQuery();
//       /* istanbul ignore if */

//       if ($) {
//         const name = plugin.NAME;
//         const JQUERY_NO_CONFLICT = $.fn[name];
//         $.fn[name] = plugin.jQueryInterface;
//         $.fn[name].Constructor = plugin;

//         $.fn[name].noConflict = () => {
//           $.fn[name] = JQUERY_NO_CONFLICT;
//           return plugin.jQueryInterface;
//         };
//       }
//     });
//   };

//   const execute = callback => {
//     if (typeof callback === 'function') {
//       callback();
//     }
//   };

//   const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
//     if (!waitForTransition) {
//       execute(callback);
//       return;
//     }

//     const durationPadding = 5;
//     const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
//     let called = false;

//     const handler = ({
//       target
//     }) => {
//       if (target !== transitionElement) {
//         return;
//       }

//       called = true;
//       transitionElement.removeEventListener(TRANSITION_END, handler);
//       execute(callback);
//     };

//     transitionElement.addEventListener(TRANSITION_END, handler);
//     setTimeout(() => {
//       if (!called) {
//         triggerTransitionEnd(transitionElement);
//       }
//     }, emulatedDuration);
//   };
//   /**
//    * Return the previous/next element of a list.
//    *
//    * @param {array} list    The list of elements
//    * @param activeElement   The active element
//    * @param shouldGetNext   Choose to get next or previous element
//    * @param isCycleAllowed
//    * @return {Element|elem} The proper element
//    */


//   const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
//     let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

//     if (index === -1) {
//       return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
//     }

//     const listLength = list.length;
//     index += shouldGetNext ? 1 : -1;

//     if (isCycleAllowed) {
//       index = (index + listLength) % listLength;
//     }

//     return list[Math.max(0, Math.min(index, listLength - 1))];
//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): dom/event-handler.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
//   const stripNameRegex = /\..*/;
//   const stripUidRegex = /::\d+$/;
//   const eventRegistry = {}; // Events storage

//   let uidEvent = 1;
//   const customEvents = {
//     mouseenter: 'mouseover',
//     mouseleave: 'mouseout'
//   };
//   const customEventsRegex = /^(mouseenter|mouseleave)/i;
//   const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
//   /**
//    * ------------------------------------------------------------------------
//    * Private methods
//    * ------------------------------------------------------------------------
//    */

//   function getUidEvent(element, uid) {
//     return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
//   }

//   function getEvent(element) {
//     const uid = getUidEvent(element);
//     element.uidEvent = uid;
//     eventRegistry[uid] = eventRegistry[uid] || {};
//     return eventRegistry[uid];
//   }

//   function bootstrapHandler(element, fn) {
//     return function handler(event) {
//       event.delegateTarget = element;

//       if (handler.oneOff) {
//         EventHandler.off(element, event.type, fn);
//       }

//       return fn.apply(element, [event]);
//     };
//   }

//   function bootstrapDelegationHandler(element, selector, fn) {
//     return function handler(event) {
//       const domElements = element.querySelectorAll(selector);

//       for (let {
//         target
//       } = event; target && target !== this; target = target.parentNode) {
//         for (let i = domElements.length; i--;) {
//           if (domElements[i] === target) {
//             event.delegateTarget = target;

//             if (handler.oneOff) {
//               EventHandler.off(element, event.type, selector, fn);
//             }

//             return fn.apply(target, [event]);
//           }
//         }
//       } // To please ESLint


//       return null;
//     };
//   }

//   function findHandler(events, handler, delegationSelector = null) {
//     const uidEventList = Object.keys(events);

//     for (let i = 0, len = uidEventList.length; i < len; i++) {
//       const event = events[uidEventList[i]];

//       if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
//         return event;
//       }
//     }

//     return null;
//   }

//   function normalizeParams(originalTypeEvent, handler, delegationFn) {
//     const delegation = typeof handler === 'string';
//     const originalHandler = delegation ? delegationFn : handler;
//     let typeEvent = getTypeEvent(originalTypeEvent);
//     const isNative = nativeEvents.has(typeEvent);

//     if (!isNative) {
//       typeEvent = originalTypeEvent;
//     }

//     return [delegation, originalHandler, typeEvent];
//   }

//   function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
//     if (typeof originalTypeEvent !== 'string' || !element) {
//       return;
//     }

//     if (!handler) {
//       handler = delegationFn;
//       delegationFn = null;
//     } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
//     // this prevents the handler from being dispatched the same way as mouseover or mouseout does


//     if (customEventsRegex.test(originalTypeEvent)) {
//       const wrapFn = fn => {
//         return function (event) {
//           if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
//             return fn.call(this, event);
//           }
//         };
//       };

//       if (delegationFn) {
//         delegationFn = wrapFn(delegationFn);
//       } else {
//         handler = wrapFn(handler);
//       }
//     }

//     const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
//     const events = getEvent(element);
//     const handlers = events[typeEvent] || (events[typeEvent] = {});
//     const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

//     if (previousFn) {
//       previousFn.oneOff = previousFn.oneOff && oneOff;
//       return;
//     }

//     const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
//     const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
//     fn.delegationSelector = delegation ? handler : null;
//     fn.originalHandler = originalHandler;
//     fn.oneOff = oneOff;
//     fn.uidEvent = uid;
//     handlers[uid] = fn;
//     element.addEventListener(typeEvent, fn, delegation);
//   }

//   function removeHandler(element, events, typeEvent, handler, delegationSelector) {
//     const fn = findHandler(events[typeEvent], handler, delegationSelector);

//     if (!fn) {
//       return;
//     }

//     element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
//     delete events[typeEvent][fn.uidEvent];
//   }

//   function removeNamespacedHandlers(element, events, typeEvent, namespace) {
//     const storeElementEvent = events[typeEvent] || {};
//     Object.keys(storeElementEvent).forEach(handlerKey => {
//       if (handlerKey.includes(namespace)) {
//         const event = storeElementEvent[handlerKey];
//         removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
//       }
//     });
//   }

//   function getTypeEvent(event) {
//     // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
//     event = event.replace(stripNameRegex, '');
//     return customEvents[event] || event;
//   }

//   const EventHandler = {
//     on(element, event, handler, delegationFn) {
//       addHandler(element, event, handler, delegationFn, false);
//     },

//     one(element, event, handler, delegationFn) {
//       addHandler(element, event, handler, delegationFn, true);
//     },

//     off(element, originalTypeEvent, handler, delegationFn) {
//       if (typeof originalTypeEvent !== 'string' || !element) {
//         return;
//       }

//       const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
//       const inNamespace = typeEvent !== originalTypeEvent;
//       const events = getEvent(element);
//       const isNamespace = originalTypeEvent.startsWith('.');

//       if (typeof originalHandler !== 'undefined') {
//         // Simplest case: handler is passed, remove that listener ONLY.
//         if (!events || !events[typeEvent]) {
//           return;
//         }

//         removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
//         return;
//       }

//       if (isNamespace) {
//         Object.keys(events).forEach(elementEvent => {
//           removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
//         });
//       }

//       const storeElementEvent = events[typeEvent] || {};
//       Object.keys(storeElementEvent).forEach(keyHandlers => {
//         const handlerKey = keyHandlers.replace(stripUidRegex, '');

//         if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
//           const event = storeElementEvent[keyHandlers];
//           removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
//         }
//       });
//     },

//     trigger(element, event, args) {
//       if (typeof event !== 'string' || !element) {
//         return null;
//       }

//       const $ = getjQuery();
//       const typeEvent = getTypeEvent(event);
//       const inNamespace = event !== typeEvent;
//       const isNative = nativeEvents.has(typeEvent);
//       let jQueryEvent;
//       let bubbles = true;
//       let nativeDispatch = true;
//       let defaultPrevented = false;
//       let evt = null;

//       if (inNamespace && $) {
//         jQueryEvent = $.Event(event, args);
//         $(element).trigger(jQueryEvent);
//         bubbles = !jQueryEvent.isPropagationStopped();
//         nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
//         defaultPrevented = jQueryEvent.isDefaultPrevented();
//       }

//       if (isNative) {
//         evt = document.createEvent('HTMLEvents');
//         evt.initEvent(typeEvent, bubbles, true);
//       } else {
//         evt = new CustomEvent(event, {
//           bubbles,
//           cancelable: true
//         });
//       } // merge custom information in our event


//       if (typeof args !== 'undefined') {
//         Object.keys(args).forEach(key => {
//           Object.defineProperty(evt, key, {
//             get() {
//               return args[key];
//             }

//           });
//         });
//       }

//       if (defaultPrevented) {
//         evt.preventDefault();
//       }

//       if (nativeDispatch) {
//         element.dispatchEvent(evt);
//       }

//       if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
//         jQueryEvent.preventDefault();
//       }

//       return evt;
//     }

//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): dom/data.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */

//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */
//   const elementMap = new Map();
//   const Data = {
//     set(element, key, instance) {
//       if (!elementMap.has(element)) {
//         elementMap.set(element, new Map());
//       }

//       const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
//       // can be removed later when multiple key/instances are fine to be used

//       if (!instanceMap.has(key) && instanceMap.size !== 0) {
//         // eslint-disable-next-line no-console
//         console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
//         return;
//       }

//       instanceMap.set(key, instance);
//     },

//     get(element, key) {
//       if (elementMap.has(element)) {
//         return elementMap.get(element).get(key) || null;
//       }

//       return null;
//     },

//     remove(element, key) {
//       if (!elementMap.has(element)) {
//         return;
//       }

//       const instanceMap = elementMap.get(element);
//       instanceMap.delete(key); // free up element references if there are no instances left for an element

//       if (instanceMap.size === 0) {
//         elementMap.delete(element);
//       }
//     }

//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): base-component.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const VERSION = '5.1.3';

//   class BaseComponent {
//     constructor(element) {
//       element = getElement(element);

//       if (!element) {
//         return;
//       }

//       this._element = element;
//       Data.set(this._element, this.constructor.DATA_KEY, this);
//     }

//     dispose() {
//       Data.remove(this._element, this.constructor.DATA_KEY);
//       EventHandler.off(this._element, this.constructor.EVENT_KEY);
//       Object.getOwnPropertyNames(this).forEach(propertyName => {
//         this[propertyName] = null;
//       });
//     }

//     _queueCallback(callback, element, isAnimated = true) {
//       executeAfterTransition(callback, element, isAnimated);
//     }
//     /** Static */


//     static getInstance(element) {
//       return Data.get(getElement(element), this.DATA_KEY);
//     }

//     static getOrCreateInstance(element, config = {}) {
//       return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
//     }

//     static get VERSION() {
//       return VERSION;
//     }

//     static get NAME() {
//       throw new Error('You have to implement the static method "NAME", for each component!');
//     }

//     static get DATA_KEY() {
//       return `bs.${this.NAME}`;
//     }

//     static get EVENT_KEY() {
//       return `.${this.DATA_KEY}`;
//     }

//   }

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/component-functions.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */

//   const enableDismissTrigger = (component, method = 'hide') => {
//     const clickEvent = `click.dismiss${component.EVENT_KEY}`;
//     const name = component.NAME;
//     EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
//       if (['A', 'AREA'].includes(this.tagName)) {
//         event.preventDefault();
//       }

//       if (isDisabled(this)) {
//         return;
//       }

//       const target = getElementFromSelector(this) || this.closest(`.${name}`);
//       const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

//       instance[method]();
//     });
//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): alert.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$d = 'alert';
//   const DATA_KEY$c = 'bs.alert';
//   const EVENT_KEY$c = `.${DATA_KEY$c}`;
//   const EVENT_CLOSE = `close${EVENT_KEY$c}`;
//   const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
//   const CLASS_NAME_FADE$5 = 'fade';
//   const CLASS_NAME_SHOW$8 = 'show';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Alert extends BaseComponent {
//     // Getters
//     static get NAME() {
//       return NAME$d;
//     } // Public


//     close() {
//       const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

//       if (closeEvent.defaultPrevented) {
//         return;
//       }

//       this._element.classList.remove(CLASS_NAME_SHOW$8);

//       const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

//       this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
//     } // Private


//     _destroyElement() {
//       this._element.remove();

//       EventHandler.trigger(this._element, EVENT_CLOSED);
//       this.dispose();
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Alert.getOrCreateInstance(this);

//         if (typeof config !== 'string') {
//           return;
//         }

//         if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
//           throw new TypeError(`No method named "${config}"`);
//         }

//         data[config](this);
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   enableDismissTrigger(Alert, 'close');
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Alert to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Alert);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): button.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$c = 'button';
//   const DATA_KEY$b = 'bs.button';
//   const EVENT_KEY$b = `.${DATA_KEY$b}`;
//   const DATA_API_KEY$7 = '.data-api';
//   const CLASS_NAME_ACTIVE$3 = 'active';
//   const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
//   const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Button extends BaseComponent {
//     // Getters
//     static get NAME() {
//       return NAME$c;
//     } // Public


//     toggle() {
//       // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
//       this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Button.getOrCreateInstance(this);

//         if (config === 'toggle') {
//           data[config]();
//         }
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
//     event.preventDefault();
//     const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
//     const data = Button.getOrCreateInstance(button);
//     data.toggle();
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Button to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Button);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): dom/manipulator.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   function normalizeData(val) {
//     if (val === 'true') {
//       return true;
//     }

//     if (val === 'false') {
//       return false;
//     }

//     if (val === Number(val).toString()) {
//       return Number(val);
//     }

//     if (val === '' || val === 'null') {
//       return null;
//     }

//     return val;
//   }

//   function normalizeDataKey(key) {
//     return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
//   }

//   const Manipulator = {
//     setDataAttribute(element, key, value) {
//       element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
//     },

//     removeDataAttribute(element, key) {
//       element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
//     },

//     getDataAttributes(element) {
//       if (!element) {
//         return {};
//       }

//       const attributes = {};
//       Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
//         let pureKey = key.replace(/^bs/, '');
//         pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
//         attributes[pureKey] = normalizeData(element.dataset[key]);
//       });
//       return attributes;
//     },

//     getDataAttribute(element, key) {
//       return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
//     },

//     offset(element) {
//       const rect = element.getBoundingClientRect();
//       return {
//         top: rect.top + window.pageYOffset,
//         left: rect.left + window.pageXOffset
//       };
//     },

//     position(element) {
//       return {
//         top: element.offsetTop,
//         left: element.offsetLeft
//       };
//     }

//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): dom/selector-engine.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const NODE_TEXT = 3;
//   const SelectorEngine = {
//     find(selector, element = document.documentElement) {
//       return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
//     },

//     findOne(selector, element = document.documentElement) {
//       return Element.prototype.querySelector.call(element, selector);
//     },

//     children(element, selector) {
//       return [].concat(...element.children).filter(child => child.matches(selector));
//     },

//     parents(element, selector) {
//       const parents = [];
//       let ancestor = element.parentNode;

//       while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
//         if (ancestor.matches(selector)) {
//           parents.push(ancestor);
//         }

//         ancestor = ancestor.parentNode;
//       }

//       return parents;
//     },

//     prev(element, selector) {
//       let previous = element.previousElementSibling;

//       while (previous) {
//         if (previous.matches(selector)) {
//           return [previous];
//         }

//         previous = previous.previousElementSibling;
//       }

//       return [];
//     },

//     next(element, selector) {
//       let next = element.nextElementSibling;

//       while (next) {
//         if (next.matches(selector)) {
//           return [next];
//         }

//         next = next.nextElementSibling;
//       }

//       return [];
//     },

//     focusableChildren(element) {
//       const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
//       return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
//     }

//   };

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): carousel.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$b = 'carousel';
//   const DATA_KEY$a = 'bs.carousel';
//   const EVENT_KEY$a = `.${DATA_KEY$a}`;
//   const DATA_API_KEY$6 = '.data-api';
//   const ARROW_LEFT_KEY = 'ArrowLeft';
//   const ARROW_RIGHT_KEY = 'ArrowRight';
//   const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

//   const SWIPE_THRESHOLD = 40;
//   const Default$a = {
//     interval: 5000,
//     keyboard: true,
//     slide: false,
//     pause: 'hover',
//     wrap: true,
//     touch: true
//   };
//   const DefaultType$a = {
//     interval: '(number|boolean)',
//     keyboard: 'boolean',
//     slide: '(boolean|string)',
//     pause: '(string|boolean)',
//     wrap: 'boolean',
//     touch: 'boolean'
//   };
//   const ORDER_NEXT = 'next';
//   const ORDER_PREV = 'prev';
//   const DIRECTION_LEFT = 'left';
//   const DIRECTION_RIGHT = 'right';
//   const KEY_TO_DIRECTION = {
//     [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
//     [ARROW_RIGHT_KEY]: DIRECTION_LEFT
//   };
//   const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
//   const EVENT_SLID = `slid${EVENT_KEY$a}`;
//   const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
//   const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
//   const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
//   const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
//   const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
//   const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
//   const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
//   const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
//   const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
//   const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
//   const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
//   const CLASS_NAME_CAROUSEL = 'carousel';
//   const CLASS_NAME_ACTIVE$2 = 'active';
//   const CLASS_NAME_SLIDE = 'slide';
//   const CLASS_NAME_END = 'carousel-item-end';
//   const CLASS_NAME_START = 'carousel-item-start';
//   const CLASS_NAME_NEXT = 'carousel-item-next';
//   const CLASS_NAME_PREV = 'carousel-item-prev';
//   const CLASS_NAME_POINTER_EVENT = 'pointer-event';
//   const SELECTOR_ACTIVE$1 = '.active';
//   const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
//   const SELECTOR_ITEM = '.carousel-item';
//   const SELECTOR_ITEM_IMG = '.carousel-item img';
//   const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
//   const SELECTOR_INDICATORS = '.carousel-indicators';
//   const SELECTOR_INDICATOR = '[data-bs-target]';
//   const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
//   const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
//   const POINTER_TYPE_TOUCH = 'touch';
//   const POINTER_TYPE_PEN = 'pen';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Carousel extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._items = null;
//       this._interval = null;
//       this._activeElement = null;
//       this._isPaused = false;
//       this._isSliding = false;
//       this.touchTimeout = null;
//       this.touchStartX = 0;
//       this.touchDeltaX = 0;
//       this._config = this._getConfig(config);
//       this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
//       this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
//       this._pointerEvent = Boolean(window.PointerEvent);

//       this._addEventListeners();
//     } // Getters


//     static get Default() {
//       return Default$a;
//     }

//     static get NAME() {
//       return NAME$b;
//     } // Public


//     next() {
//       this._slide(ORDER_NEXT);
//     }

//     nextWhenVisible() {
//       // Don't call next when the page isn't visible
//       // or the carousel or its parent isn't visible
//       if (!document.hidden && isVisible(this._element)) {
//         this.next();
//       }
//     }

//     prev() {
//       this._slide(ORDER_PREV);
//     }

//     pause(event) {
//       if (!event) {
//         this._isPaused = true;
//       }

//       if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
//         triggerTransitionEnd(this._element);
//         this.cycle(true);
//       }

//       clearInterval(this._interval);
//       this._interval = null;
//     }

//     cycle(event) {
//       if (!event) {
//         this._isPaused = false;
//       }

//       if (this._interval) {
//         clearInterval(this._interval);
//         this._interval = null;
//       }

//       if (this._config && this._config.interval && !this._isPaused) {
//         this._updateInterval();

//         this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
//       }
//     }

//     to(index) {
//       this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

//       const activeIndex = this._getItemIndex(this._activeElement);

//       if (index > this._items.length - 1 || index < 0) {
//         return;
//       }

//       if (this._isSliding) {
//         EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
//         return;
//       }

//       if (activeIndex === index) {
//         this.pause();
//         this.cycle();
//         return;
//       }

//       const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

//       this._slide(order, this._items[index]);
//     } // Private


//     _getConfig(config) {
//       config = { ...Default$a,
//         ...Manipulator.getDataAttributes(this._element),
//         ...(typeof config === 'object' ? config : {})
//       };
//       typeCheckConfig(NAME$b, config, DefaultType$a);
//       return config;
//     }

//     _handleSwipe() {
//       const absDeltax = Math.abs(this.touchDeltaX);

//       if (absDeltax <= SWIPE_THRESHOLD) {
//         return;
//       }

//       const direction = absDeltax / this.touchDeltaX;
//       this.touchDeltaX = 0;

//       if (!direction) {
//         return;
//       }

//       this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
//     }

//     _addEventListeners() {
//       if (this._config.keyboard) {
//         EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
//       }

//       if (this._config.pause === 'hover') {
//         EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
//         EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
//       }

//       if (this._config.touch && this._touchSupported) {
//         this._addTouchEventListeners();
//       }
//     }

//     _addTouchEventListeners() {
//       const hasPointerPenTouch = event => {
//         return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
//       };

//       const start = event => {
//         if (hasPointerPenTouch(event)) {
//           this.touchStartX = event.clientX;
//         } else if (!this._pointerEvent) {
//           this.touchStartX = event.touches[0].clientX;
//         }
//       };

//       const move = event => {
//         // ensure swiping with one touch and not pinching
//         this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
//       };

//       const end = event => {
//         if (hasPointerPenTouch(event)) {
//           this.touchDeltaX = event.clientX - this.touchStartX;
//         }

//         this._handleSwipe();

//         if (this._config.pause === 'hover') {
//           // If it's a touch-enabled device, mouseenter/leave are fired as
//           // part of the mouse compatibility events on first tap - the carousel
//           // would stop cycling until user tapped out of it;
//           // here, we listen for touchend, explicitly pause the carousel
//           // (as if it's the second time we tap on it, mouseenter compat event
//           // is NOT fired) and after a timeout (to allow for mouse compatibility
//           // events to fire) we explicitly restart cycling
//           this.pause();

//           if (this.touchTimeout) {
//             clearTimeout(this.touchTimeout);
//           }

//           this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
//         }
//       };

//       SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
//         EventHandler.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
//       });

//       if (this._pointerEvent) {
//         EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
//         EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

//         this._element.classList.add(CLASS_NAME_POINTER_EVENT);
//       } else {
//         EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
//         EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
//         EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
//       }
//     }

//     _keydown(event) {
//       if (/input|textarea/i.test(event.target.tagName)) {
//         return;
//       }

//       const direction = KEY_TO_DIRECTION[event.key];

//       if (direction) {
//         event.preventDefault();

//         this._slide(direction);
//       }
//     }

//     _getItemIndex(element) {
//       this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
//       return this._items.indexOf(element);
//     }

//     _getItemByOrder(order, activeElement) {
//       const isNext = order === ORDER_NEXT;
//       return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
//     }

//     _triggerSlideEvent(relatedTarget, eventDirectionName) {
//       const targetIndex = this._getItemIndex(relatedTarget);

//       const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

//       return EventHandler.trigger(this._element, EVENT_SLIDE, {
//         relatedTarget,
//         direction: eventDirectionName,
//         from: fromIndex,
//         to: targetIndex
//       });
//     }

//     _setActiveIndicatorElement(element) {
//       if (this._indicatorsElement) {
//         const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
//         activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
//         activeIndicator.removeAttribute('aria-current');
//         const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

//         for (let i = 0; i < indicators.length; i++) {
//           if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
//             indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
//             indicators[i].setAttribute('aria-current', 'true');
//             break;
//           }
//         }
//       }
//     }

//     _updateInterval() {
//       const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

//       if (!element) {
//         return;
//       }

//       const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

//       if (elementInterval) {
//         this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
//         this._config.interval = elementInterval;
//       } else {
//         this._config.interval = this._config.defaultInterval || this._config.interval;
//       }
//     }

//     _slide(directionOrOrder, element) {
//       const order = this._directionToOrder(directionOrOrder);

//       const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

//       const activeElementIndex = this._getItemIndex(activeElement);

//       const nextElement = element || this._getItemByOrder(order, activeElement);

//       const nextElementIndex = this._getItemIndex(nextElement);

//       const isCycling = Boolean(this._interval);
//       const isNext = order === ORDER_NEXT;
//       const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
//       const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

//       const eventDirectionName = this._orderToDirection(order);

//       if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
//         this._isSliding = false;
//         return;
//       }

//       if (this._isSliding) {
//         return;
//       }

//       const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

//       if (slideEvent.defaultPrevented) {
//         return;
//       }

//       if (!activeElement || !nextElement) {
//         // Some weirdness is happening, so we bail
//         return;
//       }

//       this._isSliding = true;

//       if (isCycling) {
//         this.pause();
//       }

//       this._setActiveIndicatorElement(nextElement);

//       this._activeElement = nextElement;

//       const triggerSlidEvent = () => {
//         EventHandler.trigger(this._element, EVENT_SLID, {
//           relatedTarget: nextElement,
//           direction: eventDirectionName,
//           from: activeElementIndex,
//           to: nextElementIndex
//         });
//       };

//       if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
//         nextElement.classList.add(orderClassName);
//         reflow(nextElement);
//         activeElement.classList.add(directionalClassName);
//         nextElement.classList.add(directionalClassName);

//         const completeCallBack = () => {
//           nextElement.classList.remove(directionalClassName, orderClassName);
//           nextElement.classList.add(CLASS_NAME_ACTIVE$2);
//           activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
//           this._isSliding = false;
//           setTimeout(triggerSlidEvent, 0);
//         };

//         this._queueCallback(completeCallBack, activeElement, true);
//       } else {
//         activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
//         nextElement.classList.add(CLASS_NAME_ACTIVE$2);
//         this._isSliding = false;
//         triggerSlidEvent();
//       }

//       if (isCycling) {
//         this.cycle();
//       }
//     }

//     _directionToOrder(direction) {
//       if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
//         return direction;
//       }

//       if (isRTL()) {
//         return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
//       }

//       return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
//     }

//     _orderToDirection(order) {
//       if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
//         return order;
//       }

//       if (isRTL()) {
//         return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
//       }

//       return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
//     } // Static


//     static carouselInterface(element, config) {
//       const data = Carousel.getOrCreateInstance(element, config);
//       let {
//         _config
//       } = data;

//       if (typeof config === 'object') {
//         _config = { ..._config,
//           ...config
//         };
//       }

//       const action = typeof config === 'string' ? config : _config.slide;

//       if (typeof config === 'number') {
//         data.to(config);
//       } else if (typeof action === 'string') {
//         if (typeof data[action] === 'undefined') {
//           throw new TypeError(`No method named "${action}"`);
//         }

//         data[action]();
//       } else if (_config.interval && _config.ride) {
//         data.pause();
//         data.cycle();
//       }
//     }

//     static jQueryInterface(config) {
//       return this.each(function () {
//         Carousel.carouselInterface(this, config);
//       });
//     }

//     static dataApiClickHandler(event) {
//       const target = getElementFromSelector(this);

//       if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
//         return;
//       }

//       const config = { ...Manipulator.getDataAttributes(target),
//         ...Manipulator.getDataAttributes(this)
//       };
//       const slideIndex = this.getAttribute('data-bs-slide-to');

//       if (slideIndex) {
//         config.interval = false;
//       }

//       Carousel.carouselInterface(target, config);

//       if (slideIndex) {
//         Carousel.getInstance(target).to(slideIndex);
//       }

//       event.preventDefault();
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
//   EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
//     const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

//     for (let i = 0, len = carousels.length; i < len; i++) {
//       Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
//     }
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Carousel to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Carousel);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): collapse.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$a = 'collapse';
//   const DATA_KEY$9 = 'bs.collapse';
//   const EVENT_KEY$9 = `.${DATA_KEY$9}`;
//   const DATA_API_KEY$5 = '.data-api';
//   const Default$9 = {
//     toggle: true,
//     parent: null
//   };
//   const DefaultType$9 = {
//     toggle: 'boolean',
//     parent: '(null|element)'
//   };
//   const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
//   const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
//   const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
//   const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
//   const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
//   const CLASS_NAME_SHOW$7 = 'show';
//   const CLASS_NAME_COLLAPSE = 'collapse';
//   const CLASS_NAME_COLLAPSING = 'collapsing';
//   const CLASS_NAME_COLLAPSED = 'collapsed';
//   const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
//   const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
//   const WIDTH = 'width';
//   const HEIGHT = 'height';
//   const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
//   const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Collapse extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._isTransitioning = false;
//       this._config = this._getConfig(config);
//       this._triggerArray = [];
//       const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

//       for (let i = 0, len = toggleList.length; i < len; i++) {
//         const elem = toggleList[i];
//         const selector = getSelectorFromElement(elem);
//         const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

//         if (selector !== null && filterElement.length) {
//           this._selector = selector;

//           this._triggerArray.push(elem);
//         }
//       }

//       this._initializeChildren();

//       if (!this._config.parent) {
//         this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
//       }

//       if (this._config.toggle) {
//         this.toggle();
//       }
//     } // Getters


//     static get Default() {
//       return Default$9;
//     }

//     static get NAME() {
//       return NAME$a;
//     } // Public


//     toggle() {
//       if (this._isShown()) {
//         this.hide();
//       } else {
//         this.show();
//       }
//     }

//     show() {
//       if (this._isTransitioning || this._isShown()) {
//         return;
//       }

//       let actives = [];
//       let activesData;

//       if (this._config.parent) {
//         const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
//         actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
//       }

//       const container = SelectorEngine.findOne(this._selector);

//       if (actives.length) {
//         const tempActiveData = actives.find(elem => container !== elem);
//         activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

//         if (activesData && activesData._isTransitioning) {
//           return;
//         }
//       }

//       const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

//       if (startEvent.defaultPrevented) {
//         return;
//       }

//       actives.forEach(elemActive => {
//         if (container !== elemActive) {
//           Collapse.getOrCreateInstance(elemActive, {
//             toggle: false
//           }).hide();
//         }

//         if (!activesData) {
//           Data.set(elemActive, DATA_KEY$9, null);
//         }
//       });

//       const dimension = this._getDimension();

//       this._element.classList.remove(CLASS_NAME_COLLAPSE);

//       this._element.classList.add(CLASS_NAME_COLLAPSING);

//       this._element.style[dimension] = 0;

//       this._addAriaAndCollapsedClass(this._triggerArray, true);

//       this._isTransitioning = true;

//       const complete = () => {
//         this._isTransitioning = false;

//         this._element.classList.remove(CLASS_NAME_COLLAPSING);

//         this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

//         this._element.style[dimension] = '';
//         EventHandler.trigger(this._element, EVENT_SHOWN$5);
//       };

//       const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
//       const scrollSize = `scroll${capitalizedDimension}`;

//       this._queueCallback(complete, this._element, true);

//       this._element.style[dimension] = `${this._element[scrollSize]}px`;
//     }

//     hide() {
//       if (this._isTransitioning || !this._isShown()) {
//         return;
//       }

//       const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

//       if (startEvent.defaultPrevented) {
//         return;
//       }

//       const dimension = this._getDimension();

//       this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
//       reflow(this._element);

//       this._element.classList.add(CLASS_NAME_COLLAPSING);

//       this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

//       const triggerArrayLength = this._triggerArray.length;

//       for (let i = 0; i < triggerArrayLength; i++) {
//         const trigger = this._triggerArray[i];
//         const elem = getElementFromSelector(trigger);

//         if (elem && !this._isShown(elem)) {
//           this._addAriaAndCollapsedClass([trigger], false);
//         }
//       }

//       this._isTransitioning = true;

//       const complete = () => {
//         this._isTransitioning = false;

//         this._element.classList.remove(CLASS_NAME_COLLAPSING);

//         this._element.classList.add(CLASS_NAME_COLLAPSE);

//         EventHandler.trigger(this._element, EVENT_HIDDEN$5);
//       };

//       this._element.style[dimension] = '';

//       this._queueCallback(complete, this._element, true);
//     }

//     _isShown(element = this._element) {
//       return element.classList.contains(CLASS_NAME_SHOW$7);
//     } // Private


//     _getConfig(config) {
//       config = { ...Default$9,
//         ...Manipulator.getDataAttributes(this._element),
//         ...config
//       };
//       config.toggle = Boolean(config.toggle); // Coerce string values

//       config.parent = getElement(config.parent);
//       typeCheckConfig(NAME$a, config, DefaultType$9);
//       return config;
//     }

//     _getDimension() {
//       return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
//     }

//     _initializeChildren() {
//       if (!this._config.parent) {
//         return;
//       }

//       const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
//       SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
//         const selected = getElementFromSelector(element);

//         if (selected) {
//           this._addAriaAndCollapsedClass([element], this._isShown(selected));
//         }
//       });
//     }

//     _addAriaAndCollapsedClass(triggerArray, isOpen) {
//       if (!triggerArray.length) {
//         return;
//       }

//       triggerArray.forEach(elem => {
//         if (isOpen) {
//           elem.classList.remove(CLASS_NAME_COLLAPSED);
//         } else {
//           elem.classList.add(CLASS_NAME_COLLAPSED);
//         }

//         elem.setAttribute('aria-expanded', isOpen);
//       });
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const _config = {};

//         if (typeof config === 'string' && /show|hide/.test(config)) {
//           _config.toggle = false;
//         }

//         const data = Collapse.getOrCreateInstance(this, _config);

//         if (typeof config === 'string') {
//           if (typeof data[config] === 'undefined') {
//             throw new TypeError(`No method named "${config}"`);
//           }

//           data[config]();
//         }
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
//     // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
//     if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
//       event.preventDefault();
//     }

//     const selector = getSelectorFromElement(this);
//     const selectorElements = SelectorEngine.find(selector);
//     selectorElements.forEach(element => {
//       Collapse.getOrCreateInstance(element, {
//         toggle: false
//       }).toggle();
//     });
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Collapse to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Collapse);

//   var top = 'top';
//   var bottom = 'bottom';
//   var right = 'right';
//   var left = 'left';
//   var auto = 'auto';
//   var basePlacements = [top, bottom, right, left];
//   var start = 'start';
//   var end = 'end';
//   var clippingParents = 'clippingParents';
//   var viewport = 'viewport';
//   var popper = 'popper';
//   var reference = 'reference';
//   var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
//     return acc.concat([placement + "-" + start, placement + "-" + end]);
//   }, []);
//   var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
//     return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
//   }, []); // modifiers that need to read the DOM

//   var beforeRead = 'beforeRead';
//   var read = 'read';
//   var afterRead = 'afterRead'; // pure-logic modifiers

//   var beforeMain = 'beforeMain';
//   var main = 'main';
//   var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

//   var beforeWrite = 'beforeWrite';
//   var write = 'write';
//   var afterWrite = 'afterWrite';
//   var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

//   function getNodeName(element) {
//     return element ? (element.nodeName || '').toLowerCase() : null;
//   }

//   function getWindow(node) {
//     if (node == null) {
//       return window;
//     }

//     if (node.toString() !== '[object Window]') {
//       var ownerDocument = node.ownerDocument;
//       return ownerDocument ? ownerDocument.defaultView || window : window;
//     }

//     return node;
//   }

//   function isElement(node) {
//     var OwnElement = getWindow(node).Element;
//     return node instanceof OwnElement || node instanceof Element;
//   }

//   function isHTMLElement(node) {
//     var OwnElement = getWindow(node).HTMLElement;
//     return node instanceof OwnElement || node instanceof HTMLElement;
//   }

//   function isShadowRoot(node) {
//     // IE 11 has no ShadowRoot
//     if (typeof ShadowRoot === 'undefined') {
//       return false;
//     }

//     var OwnElement = getWindow(node).ShadowRoot;
//     return node instanceof OwnElement || node instanceof ShadowRoot;
//   }

//   // and applies them to the HTMLElements such as popper and arrow

//   function applyStyles(_ref) {
//     var state = _ref.state;
//     Object.keys(state.elements).forEach(function (name) {
//       var style = state.styles[name] || {};
//       var attributes = state.attributes[name] || {};
//       var element = state.elements[name]; // arrow is optional + virtual elements

//       if (!isHTMLElement(element) || !getNodeName(element)) {
//         return;
//       } // Flow doesn't support to extend this property, but it's the most
//       // effective way to apply styles to an HTMLElement
//       // $FlowFixMe[cannot-write]


//       Object.assign(element.style, style);
//       Object.keys(attributes).forEach(function (name) {
//         var value = attributes[name];

//         if (value === false) {
//           element.removeAttribute(name);
//         } else {
//           element.setAttribute(name, value === true ? '' : value);
//         }
//       });
//     });
//   }

//   function effect$2(_ref2) {
//     var state = _ref2.state;
//     var initialStyles = {
//       popper: {
//         position: state.options.strategy,
//         left: '0',
//         top: '0',
//         margin: '0'
//       },
//       arrow: {
//         position: 'absolute'
//       },
//       reference: {}
//     };
//     Object.assign(state.elements.popper.style, initialStyles.popper);
//     state.styles = initialStyles;

//     if (state.elements.arrow) {
//       Object.assign(state.elements.arrow.style, initialStyles.arrow);
//     }

//     return function () {
//       Object.keys(state.elements).forEach(function (name) {
//         var element = state.elements[name];
//         var attributes = state.attributes[name] || {};
//         var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

//         var style = styleProperties.reduce(function (style, property) {
//           style[property] = '';
//           return style;
//         }, {}); // arrow is optional + virtual elements

//         if (!isHTMLElement(element) || !getNodeName(element)) {
//           return;
//         }

//         Object.assign(element.style, style);
//         Object.keys(attributes).forEach(function (attribute) {
//           element.removeAttribute(attribute);
//         });
//       });
//     };
//   } // eslint-disable-next-line import/no-unused-modules


//   const applyStyles$1 = {
//     name: 'applyStyles',
//     enabled: true,
//     phase: 'write',
//     fn: applyStyles,
//     effect: effect$2,
//     requires: ['computeStyles']
//   };

//   function getBasePlacement(placement) {
//     return placement.split('-')[0];
//   }

//   // import { isHTMLElement } from './instanceOf';
//   function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
//   includeScale) {

//     var rect = element.getBoundingClientRect();
//     var scaleX = 1;
//     var scaleY = 1; // FIXME:
//     // `offsetWidth` returns an integer while `getBoundingClientRect`
//     // returns a float. This results in `scaleX` or `scaleY` being
//     // non-1 when it should be for elements that aren't a full pixel in
//     // width or height.
//     // if (isHTMLElement(element) && includeScale) {
//     //   const offsetHeight = element.offsetHeight;
//     //   const offsetWidth = element.offsetWidth;
//     //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
//     //   // Fallback to 1 in case both values are `0`
//     //   if (offsetWidth > 0) {
//     //     scaleX = rect.width / offsetWidth || 1;
//     //   }
//     //   if (offsetHeight > 0) {
//     //     scaleY = rect.height / offsetHeight || 1;
//     //   }
//     // }

//     return {
//       width: rect.width / scaleX,
//       height: rect.height / scaleY,
//       top: rect.top / scaleY,
//       right: rect.right / scaleX,
//       bottom: rect.bottom / scaleY,
//       left: rect.left / scaleX,
//       x: rect.left / scaleX,
//       y: rect.top / scaleY
//     };
//   }

//   // means it doesn't take into account transforms.

//   function getLayoutRect(element) {
//     var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
//     // Fixes https://github.com/popperjs/popper-core/issues/1223

//     var width = element.offsetWidth;
//     var height = element.offsetHeight;

//     if (Math.abs(clientRect.width - width) <= 1) {
//       width = clientRect.width;
//     }

//     if (Math.abs(clientRect.height - height) <= 1) {
//       height = clientRect.height;
//     }

//     return {
//       x: element.offsetLeft,
//       y: element.offsetTop,
//       width: width,
//       height: height
//     };
//   }

//   function contains(parent, child) {
//     var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

//     if (parent.contains(child)) {
//       return true;
//     } // then fallback to custom implementation with Shadow DOM support
//     else if (rootNode && isShadowRoot(rootNode)) {
//         var next = child;

//         do {
//           if (next && parent.isSameNode(next)) {
//             return true;
//           } // $FlowFixMe[prop-missing]: need a better way to handle this...


//           next = next.parentNode || next.host;
//         } while (next);
//       } // Give up, the result is false


//     return false;
//   }

//   function getComputedStyle$1(element) {
//     return getWindow(element).getComputedStyle(element);
//   }

//   function isTableElement(element) {
//     return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
//   }

//   function getDocumentElement(element) {
//     // $FlowFixMe[incompatible-return]: assume body is always available
//     return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
//     element.document) || window.document).documentElement;
//   }

//   function getParentNode(element) {
//     if (getNodeName(element) === 'html') {
//       return element;
//     }

//     return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
//       // $FlowFixMe[incompatible-return]
//       // $FlowFixMe[prop-missing]
//       element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
//       element.parentNode || ( // DOM Element detected
//       isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
//       // $FlowFixMe[incompatible-call]: HTMLElement is a Node
//       getDocumentElement(element) // fallback

//     );
//   }

//   function getTrueOffsetParent(element) {
//     if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
//     getComputedStyle$1(element).position === 'fixed') {
//       return null;
//     }

//     return element.offsetParent;
//   } // `.offsetParent` reports `null` for fixed elements, while absolute elements
//   // return the containing block


//   function getContainingBlock(element) {
//     var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
//     var isIE = navigator.userAgent.indexOf('Trident') !== -1;

//     if (isIE && isHTMLElement(element)) {
//       // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
//       var elementCss = getComputedStyle$1(element);

//       if (elementCss.position === 'fixed') {
//         return null;
//       }
//     }

//     var currentNode = getParentNode(element);

//     while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
//       var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
//       // create a containing block.
//       // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

//       if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
//         return currentNode;
//       } else {
//         currentNode = currentNode.parentNode;
//       }
//     }

//     return null;
//   } // Gets the closest ancestor positioned element. Handles some edge cases,
//   // such as table ancestors and cross browser bugs.


//   function getOffsetParent(element) {
//     var window = getWindow(element);
//     var offsetParent = getTrueOffsetParent(element);

//     while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
//       offsetParent = getTrueOffsetParent(offsetParent);
//     }

//     if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
//       return window;
//     }

//     return offsetParent || getContainingBlock(element) || window;
//   }

//   function getMainAxisFromPlacement(placement) {
//     return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
//   }

//   var max = Math.max;
//   var min = Math.min;
//   var round = Math.round;

//   function within(min$1, value, max$1) {
//     return max(min$1, min(value, max$1));
//   }

//   function getFreshSideObject() {
//     return {
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0
//     };
//   }

//   function mergePaddingObject(paddingObject) {
//     return Object.assign({}, getFreshSideObject(), paddingObject);
//   }

//   function expandToHashMap(value, keys) {
//     return keys.reduce(function (hashMap, key) {
//       hashMap[key] = value;
//       return hashMap;
//     }, {});
//   }

//   var toPaddingObject = function toPaddingObject(padding, state) {
//     padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
//       placement: state.placement
//     })) : padding;
//     return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
//   };

//   function arrow(_ref) {
//     var _state$modifiersData$;

//     var state = _ref.state,
//         name = _ref.name,
//         options = _ref.options;
//     var arrowElement = state.elements.arrow;
//     var popperOffsets = state.modifiersData.popperOffsets;
//     var basePlacement = getBasePlacement(state.placement);
//     var axis = getMainAxisFromPlacement(basePlacement);
//     var isVertical = [left, right].indexOf(basePlacement) >= 0;
//     var len = isVertical ? 'height' : 'width';

//     if (!arrowElement || !popperOffsets) {
//       return;
//     }

//     var paddingObject = toPaddingObject(options.padding, state);
//     var arrowRect = getLayoutRect(arrowElement);
//     var minProp = axis === 'y' ? top : left;
//     var maxProp = axis === 'y' ? bottom : right;
//     var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
//     var startDiff = popperOffsets[axis] - state.rects.reference[axis];
//     var arrowOffsetParent = getOffsetParent(arrowElement);
//     var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
//     var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
//     // outside of the popper bounds

//     var min = paddingObject[minProp];
//     var max = clientSize - arrowRect[len] - paddingObject[maxProp];
//     var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
//     var offset = within(min, center, max); // Prevents breaking syntax highlighting...

//     var axisProp = axis;
//     state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
//   }

//   function effect$1(_ref2) {
//     var state = _ref2.state,
//         options = _ref2.options;
//     var _options$element = options.element,
//         arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

//     if (arrowElement == null) {
//       return;
//     } // CSS selector


//     if (typeof arrowElement === 'string') {
//       arrowElement = state.elements.popper.querySelector(arrowElement);

//       if (!arrowElement) {
//         return;
//       }
//     }

//     if (!contains(state.elements.popper, arrowElement)) {

//       return;
//     }

//     state.elements.arrow = arrowElement;
//   } // eslint-disable-next-line import/no-unused-modules


//   const arrow$1 = {
//     name: 'arrow',
//     enabled: true,
//     phase: 'main',
//     fn: arrow,
//     effect: effect$1,
//     requires: ['popperOffsets'],
//     requiresIfExists: ['preventOverflow']
//   };

//   function getVariation(placement) {
//     return placement.split('-')[1];
//   }

//   var unsetSides = {
//     top: 'auto',
//     right: 'auto',
//     bottom: 'auto',
//     left: 'auto'
//   }; // Round the offsets to the nearest suitable subpixel based on the DPR.
//   // Zooming can change the DPR, but it seems to report a value that will
//   // cleanly divide the values into the appropriate subpixels.

//   function roundOffsetsByDPR(_ref) {
//     var x = _ref.x,
//         y = _ref.y;
//     var win = window;
//     var dpr = win.devicePixelRatio || 1;
//     return {
//       x: round(round(x * dpr) / dpr) || 0,
//       y: round(round(y * dpr) / dpr) || 0
//     };
//   }

//   function mapToStyles(_ref2) {
//     var _Object$assign2;

//     var popper = _ref2.popper,
//         popperRect = _ref2.popperRect,
//         placement = _ref2.placement,
//         variation = _ref2.variation,
//         offsets = _ref2.offsets,
//         position = _ref2.position,
//         gpuAcceleration = _ref2.gpuAcceleration,
//         adaptive = _ref2.adaptive,
//         roundOffsets = _ref2.roundOffsets;

//     var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
//         _ref3$x = _ref3.x,
//         x = _ref3$x === void 0 ? 0 : _ref3$x,
//         _ref3$y = _ref3.y,
//         y = _ref3$y === void 0 ? 0 : _ref3$y;

//     var hasX = offsets.hasOwnProperty('x');
//     var hasY = offsets.hasOwnProperty('y');
//     var sideX = left;
//     var sideY = top;
//     var win = window;

//     if (adaptive) {
//       var offsetParent = getOffsetParent(popper);
//       var heightProp = 'clientHeight';
//       var widthProp = 'clientWidth';

//       if (offsetParent === getWindow(popper)) {
//         offsetParent = getDocumentElement(popper);

//         if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
//           heightProp = 'scrollHeight';
//           widthProp = 'scrollWidth';
//         }
//       } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


//       offsetParent = offsetParent;

//       if (placement === top || (placement === left || placement === right) && variation === end) {
//         sideY = bottom; // $FlowFixMe[prop-missing]

//         y -= offsetParent[heightProp] - popperRect.height;
//         y *= gpuAcceleration ? 1 : -1;
//       }

//       if (placement === left || (placement === top || placement === bottom) && variation === end) {
//         sideX = right; // $FlowFixMe[prop-missing]

//         x -= offsetParent[widthProp] - popperRect.width;
//         x *= gpuAcceleration ? 1 : -1;
//       }
//     }

//     var commonStyles = Object.assign({
//       position: position
//     }, adaptive && unsetSides);

//     if (gpuAcceleration) {
//       var _Object$assign;

//       return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
//     }

//     return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
//   }

//   function computeStyles(_ref4) {
//     var state = _ref4.state,
//         options = _ref4.options;
//     var _options$gpuAccelerat = options.gpuAcceleration,
//         gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
//         _options$adaptive = options.adaptive,
//         adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
//         _options$roundOffsets = options.roundOffsets,
//         roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

//     var commonStyles = {
//       placement: getBasePlacement(state.placement),
//       variation: getVariation(state.placement),
//       popper: state.elements.popper,
//       popperRect: state.rects.popper,
//       gpuAcceleration: gpuAcceleration
//     };

//     if (state.modifiersData.popperOffsets != null) {
//       state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
//         offsets: state.modifiersData.popperOffsets,
//         position: state.options.strategy,
//         adaptive: adaptive,
//         roundOffsets: roundOffsets
//       })));
//     }

//     if (state.modifiersData.arrow != null) {
//       state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
//         offsets: state.modifiersData.arrow,
//         position: 'absolute',
//         adaptive: false,
//         roundOffsets: roundOffsets
//       })));
//     }

//     state.attributes.popper = Object.assign({}, state.attributes.popper, {
//       'data-popper-placement': state.placement
//     });
//   } // eslint-disable-next-line import/no-unused-modules


//   const computeStyles$1 = {
//     name: 'computeStyles',
//     enabled: true,
//     phase: 'beforeWrite',
//     fn: computeStyles,
//     data: {}
//   };

//   var passive = {
//     passive: true
//   };

//   function effect(_ref) {
//     var state = _ref.state,
//         instance = _ref.instance,
//         options = _ref.options;
//     var _options$scroll = options.scroll,
//         scroll = _options$scroll === void 0 ? true : _options$scroll,
//         _options$resize = options.resize,
//         resize = _options$resize === void 0 ? true : _options$resize;
//     var window = getWindow(state.elements.popper);
//     var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

//     if (scroll) {
//       scrollParents.forEach(function (scrollParent) {
//         scrollParent.addEventListener('scroll', instance.update, passive);
//       });
//     }

//     if (resize) {
//       window.addEventListener('resize', instance.update, passive);
//     }

//     return function () {
//       if (scroll) {
//         scrollParents.forEach(function (scrollParent) {
//           scrollParent.removeEventListener('scroll', instance.update, passive);
//         });
//       }

//       if (resize) {
//         window.removeEventListener('resize', instance.update, passive);
//       }
//     };
//   } // eslint-disable-next-line import/no-unused-modules


//   const eventListeners = {
//     name: 'eventListeners',
//     enabled: true,
//     phase: 'write',
//     fn: function fn() {},
//     effect: effect,
//     data: {}
//   };

//   var hash$1 = {
//     left: 'right',
//     right: 'left',
//     bottom: 'top',
//     top: 'bottom'
//   };
//   function getOppositePlacement(placement) {
//     return placement.replace(/left|right|bottom|top/g, function (matched) {
//       return hash$1[matched];
//     });
//   }

//   var hash = {
//     start: 'end',
//     end: 'start'
//   };
//   function getOppositeVariationPlacement(placement) {
//     return placement.replace(/start|end/g, function (matched) {
//       return hash[matched];
//     });
//   }

//   function getWindowScroll(node) {
//     var win = getWindow(node);
//     var scrollLeft = win.pageXOffset;
//     var scrollTop = win.pageYOffset;
//     return {
//       scrollLeft: scrollLeft,
//       scrollTop: scrollTop
//     };
//   }

//   function getWindowScrollBarX(element) {
//     // If <html> has a CSS width greater than the viewport, then this will be
//     // incorrect for RTL.
//     // Popper 1 is broken in this case and never had a bug report so let's assume
//     // it's not an issue. I don't think anyone ever specifies width on <html>
//     // anyway.
//     // Browsers where the left scrollbar doesn't cause an issue report `0` for
//     // this (e.g. Edge 2019, IE11, Safari)
//     return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
//   }

//   function getViewportRect(element) {
//     var win = getWindow(element);
//     var html = getDocumentElement(element);
//     var visualViewport = win.visualViewport;
//     var width = html.clientWidth;
//     var height = html.clientHeight;
//     var x = 0;
//     var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
//     // can be obscured underneath it.
//     // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
//     // if it isn't open, so if this isn't available, the popper will be detected
//     // to overflow the bottom of the screen too early.

//     if (visualViewport) {
//       width = visualViewport.width;
//       height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
//       // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
//       // errors due to floating point numbers, so we need to check precision.
//       // Safari returns a number <= 0, usually < -1 when pinch-zoomed
//       // Feature detection fails in mobile emulation mode in Chrome.
//       // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
//       // 0.001
//       // Fallback here: "Not Safari" userAgent

//       if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
//         x = visualViewport.offsetLeft;
//         y = visualViewport.offsetTop;
//       }
//     }

//     return {
//       width: width,
//       height: height,
//       x: x + getWindowScrollBarX(element),
//       y: y
//     };
//   }

//   // of the `<html>` and `<body>` rect bounds if horizontally scrollable

//   function getDocumentRect(element) {
//     var _element$ownerDocumen;

//     var html = getDocumentElement(element);
//     var winScroll = getWindowScroll(element);
//     var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
//     var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
//     var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
//     var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
//     var y = -winScroll.scrollTop;

//     if (getComputedStyle$1(body || html).direction === 'rtl') {
//       x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
//     }

//     return {
//       width: width,
//       height: height,
//       x: x,
//       y: y
//     };
//   }

//   function isScrollParent(element) {
//     // Firefox wants us to check `-x` and `-y` variations as well
//     var _getComputedStyle = getComputedStyle$1(element),
//         overflow = _getComputedStyle.overflow,
//         overflowX = _getComputedStyle.overflowX,
//         overflowY = _getComputedStyle.overflowY;

//     return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
//   }

//   function getScrollParent(node) {
//     if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
//       // $FlowFixMe[incompatible-return]: assume body is always available
//       return node.ownerDocument.body;
//     }

//     if (isHTMLElement(node) && isScrollParent(node)) {
//       return node;
//     }

//     return getScrollParent(getParentNode(node));
//   }

//   /*
//   given a DOM element, return the list of all scroll parents, up the list of ancesors
//   until we get to the top window object. This list is what we attach scroll listeners
//   to, because if any of these parent elements scroll, we'll need to re-calculate the
//   reference element's position.
//   */

//   function listScrollParents(element, list) {
//     var _element$ownerDocumen;

//     if (list === void 0) {
//       list = [];
//     }

//     var scrollParent = getScrollParent(element);
//     var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
//     var win = getWindow(scrollParent);
//     var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
//     var updatedList = list.concat(target);
//     return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
//     updatedList.concat(listScrollParents(getParentNode(target)));
//   }

//   function rectToClientRect(rect) {
//     return Object.assign({}, rect, {
//       left: rect.x,
//       top: rect.y,
//       right: rect.x + rect.width,
//       bottom: rect.y + rect.height
//     });
//   }

//   function getInnerBoundingClientRect(element) {
//     var rect = getBoundingClientRect(element);
//     rect.top = rect.top + element.clientTop;
//     rect.left = rect.left + element.clientLeft;
//     rect.bottom = rect.top + element.clientHeight;
//     rect.right = rect.left + element.clientWidth;
//     rect.width = element.clientWidth;
//     rect.height = element.clientHeight;
//     rect.x = rect.left;
//     rect.y = rect.top;
//     return rect;
//   }

//   function getClientRectFromMixedType(element, clippingParent) {
//     return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
//   } // A "clipping parent" is an overflowable container with the characteristic of
//   // clipping (or hiding) overflowing elements with a position different from
//   // `initial`


//   function getClippingParents(element) {
//     var clippingParents = listScrollParents(getParentNode(element));
//     var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
//     var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

//     if (!isElement(clipperElement)) {
//       return [];
//     } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


//     return clippingParents.filter(function (clippingParent) {
//       return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
//     });
//   } // Gets the maximum area that the element is visible in due to any number of
//   // clipping parents


//   function getClippingRect(element, boundary, rootBoundary) {
//     var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
//     var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
//     var firstClippingParent = clippingParents[0];
//     var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
//       var rect = getClientRectFromMixedType(element, clippingParent);
//       accRect.top = max(rect.top, accRect.top);
//       accRect.right = min(rect.right, accRect.right);
//       accRect.bottom = min(rect.bottom, accRect.bottom);
//       accRect.left = max(rect.left, accRect.left);
//       return accRect;
//     }, getClientRectFromMixedType(element, firstClippingParent));
//     clippingRect.width = clippingRect.right - clippingRect.left;
//     clippingRect.height = clippingRect.bottom - clippingRect.top;
//     clippingRect.x = clippingRect.left;
//     clippingRect.y = clippingRect.top;
//     return clippingRect;
//   }

//   function computeOffsets(_ref) {
//     var reference = _ref.reference,
//         element = _ref.element,
//         placement = _ref.placement;
//     var basePlacement = placement ? getBasePlacement(placement) : null;
//     var variation = placement ? getVariation(placement) : null;
//     var commonX = reference.x + reference.width / 2 - element.width / 2;
//     var commonY = reference.y + reference.height / 2 - element.height / 2;
//     var offsets;

//     switch (basePlacement) {
//       case top:
//         offsets = {
//           x: commonX,
//           y: reference.y - element.height
//         };
//         break;

//       case bottom:
//         offsets = {
//           x: commonX,
//           y: reference.y + reference.height
//         };
//         break;

//       case right:
//         offsets = {
//           x: reference.x + reference.width,
//           y: commonY
//         };
//         break;

//       case left:
//         offsets = {
//           x: reference.x - element.width,
//           y: commonY
//         };
//         break;

//       default:
//         offsets = {
//           x: reference.x,
//           y: reference.y
//         };
//     }

//     var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

//     if (mainAxis != null) {
//       var len = mainAxis === 'y' ? 'height' : 'width';

//       switch (variation) {
//         case start:
//           offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
//           break;

//         case end:
//           offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
//           break;
//       }
//     }

//     return offsets;
//   }

//   function detectOverflow(state, options) {
//     if (options === void 0) {
//       options = {};
//     }

//     var _options = options,
//         _options$placement = _options.placement,
//         placement = _options$placement === void 0 ? state.placement : _options$placement,
//         _options$boundary = _options.boundary,
//         boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
//         _options$rootBoundary = _options.rootBoundary,
//         rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
//         _options$elementConte = _options.elementContext,
//         elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
//         _options$altBoundary = _options.altBoundary,
//         altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
//         _options$padding = _options.padding,
//         padding = _options$padding === void 0 ? 0 : _options$padding;
//     var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
//     var altContext = elementContext === popper ? reference : popper;
//     var popperRect = state.rects.popper;
//     var element = state.elements[altBoundary ? altContext : elementContext];
//     var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
//     var referenceClientRect = getBoundingClientRect(state.elements.reference);
//     var popperOffsets = computeOffsets({
//       reference: referenceClientRect,
//       element: popperRect,
//       strategy: 'absolute',
//       placement: placement
//     });
//     var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
//     var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
//     // 0 or negative = within the clipping rect

//     var overflowOffsets = {
//       top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
//       bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
//       left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
//       right: elementClientRect.right - clippingClientRect.right + paddingObject.right
//     };
//     var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

//     if (elementContext === popper && offsetData) {
//       var offset = offsetData[placement];
//       Object.keys(overflowOffsets).forEach(function (key) {
//         var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
//         var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
//         overflowOffsets[key] += offset[axis] * multiply;
//       });
//     }

//     return overflowOffsets;
//   }

//   function computeAutoPlacement(state, options) {
//     if (options === void 0) {
//       options = {};
//     }

//     var _options = options,
//         placement = _options.placement,
//         boundary = _options.boundary,
//         rootBoundary = _options.rootBoundary,
//         padding = _options.padding,
//         flipVariations = _options.flipVariations,
//         _options$allowedAutoP = _options.allowedAutoPlacements,
//         allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
//     var variation = getVariation(placement);
//     var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
//       return getVariation(placement) === variation;
//     }) : basePlacements;
//     var allowedPlacements = placements$1.filter(function (placement) {
//       return allowedAutoPlacements.indexOf(placement) >= 0;
//     });

//     if (allowedPlacements.length === 0) {
//       allowedPlacements = placements$1;
//     } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


//     var overflows = allowedPlacements.reduce(function (acc, placement) {
//       acc[placement] = detectOverflow(state, {
//         placement: placement,
//         boundary: boundary,
//         rootBoundary: rootBoundary,
//         padding: padding
//       })[getBasePlacement(placement)];
//       return acc;
//     }, {});
//     return Object.keys(overflows).sort(function (a, b) {
//       return overflows[a] - overflows[b];
//     });
//   }

//   function getExpandedFallbackPlacements(placement) {
//     if (getBasePlacement(placement) === auto) {
//       return [];
//     }

//     var oppositePlacement = getOppositePlacement(placement);
//     return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
//   }

//   function flip(_ref) {
//     var state = _ref.state,
//         options = _ref.options,
//         name = _ref.name;

//     if (state.modifiersData[name]._skip) {
//       return;
//     }

//     var _options$mainAxis = options.mainAxis,
//         checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
//         _options$altAxis = options.altAxis,
//         checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
//         specifiedFallbackPlacements = options.fallbackPlacements,
//         padding = options.padding,
//         boundary = options.boundary,
//         rootBoundary = options.rootBoundary,
//         altBoundary = options.altBoundary,
//         _options$flipVariatio = options.flipVariations,
//         flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
//         allowedAutoPlacements = options.allowedAutoPlacements;
//     var preferredPlacement = state.options.placement;
//     var basePlacement = getBasePlacement(preferredPlacement);
//     var isBasePlacement = basePlacement === preferredPlacement;
//     var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
//     var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
//       return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
//         placement: placement,
//         boundary: boundary,
//         rootBoundary: rootBoundary,
//         padding: padding,
//         flipVariations: flipVariations,
//         allowedAutoPlacements: allowedAutoPlacements
//       }) : placement);
//     }, []);
//     var referenceRect = state.rects.reference;
//     var popperRect = state.rects.popper;
//     var checksMap = new Map();
//     var makeFallbackChecks = true;
//     var firstFittingPlacement = placements[0];

//     for (var i = 0; i < placements.length; i++) {
//       var placement = placements[i];

//       var _basePlacement = getBasePlacement(placement);

//       var isStartVariation = getVariation(placement) === start;
//       var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
//       var len = isVertical ? 'width' : 'height';
//       var overflow = detectOverflow(state, {
//         placement: placement,
//         boundary: boundary,
//         rootBoundary: rootBoundary,
//         altBoundary: altBoundary,
//         padding: padding
//       });
//       var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

//       if (referenceRect[len] > popperRect[len]) {
//         mainVariationSide = getOppositePlacement(mainVariationSide);
//       }

//       var altVariationSide = getOppositePlacement(mainVariationSide);
//       var checks = [];

//       if (checkMainAxis) {
//         checks.push(overflow[_basePlacement] <= 0);
//       }

//       if (checkAltAxis) {
//         checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
//       }

//       if (checks.every(function (check) {
//         return check;
//       })) {
//         firstFittingPlacement = placement;
//         makeFallbackChecks = false;
//         break;
//       }

//       checksMap.set(placement, checks);
//     }

//     if (makeFallbackChecks) {
//       // `2` may be desired in some cases – research later
//       var numberOfChecks = flipVariations ? 3 : 1;

//       var _loop = function _loop(_i) {
//         var fittingPlacement = placements.find(function (placement) {
//           var checks = checksMap.get(placement);

//           if (checks) {
//             return checks.slice(0, _i).every(function (check) {
//               return check;
//             });
//           }
//         });

//         if (fittingPlacement) {
//           firstFittingPlacement = fittingPlacement;
//           return "break";
//         }
//       };

//       for (var _i = numberOfChecks; _i > 0; _i--) {
//         var _ret = _loop(_i);

//         if (_ret === "break") break;
//       }
//     }

//     if (state.placement !== firstFittingPlacement) {
//       state.modifiersData[name]._skip = true;
//       state.placement = firstFittingPlacement;
//       state.reset = true;
//     }
//   } // eslint-disable-next-line import/no-unused-modules


//   const flip$1 = {
//     name: 'flip',
//     enabled: true,
//     phase: 'main',
//     fn: flip,
//     requiresIfExists: ['offset'],
//     data: {
//       _skip: false
//     }
//   };

//   function getSideOffsets(overflow, rect, preventedOffsets) {
//     if (preventedOffsets === void 0) {
//       preventedOffsets = {
//         x: 0,
//         y: 0
//       };
//     }

//     return {
//       top: overflow.top - rect.height - preventedOffsets.y,
//       right: overflow.right - rect.width + preventedOffsets.x,
//       bottom: overflow.bottom - rect.height + preventedOffsets.y,
//       left: overflow.left - rect.width - preventedOffsets.x
//     };
//   }

//   function isAnySideFullyClipped(overflow) {
//     return [top, right, bottom, left].some(function (side) {
//       return overflow[side] >= 0;
//     });
//   }

//   function hide(_ref) {
//     var state = _ref.state,
//         name = _ref.name;
//     var referenceRect = state.rects.reference;
//     var popperRect = state.rects.popper;
//     var preventedOffsets = state.modifiersData.preventOverflow;
//     var referenceOverflow = detectOverflow(state, {
//       elementContext: 'reference'
//     });
//     var popperAltOverflow = detectOverflow(state, {
//       altBoundary: true
//     });
//     var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
//     var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
//     var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
//     var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
//     state.modifiersData[name] = {
//       referenceClippingOffsets: referenceClippingOffsets,
//       popperEscapeOffsets: popperEscapeOffsets,
//       isReferenceHidden: isReferenceHidden,
//       hasPopperEscaped: hasPopperEscaped
//     };
//     state.attributes.popper = Object.assign({}, state.attributes.popper, {
//       'data-popper-reference-hidden': isReferenceHidden,
//       'data-popper-escaped': hasPopperEscaped
//     });
//   } // eslint-disable-next-line import/no-unused-modules


//   const hide$1 = {
//     name: 'hide',
//     enabled: true,
//     phase: 'main',
//     requiresIfExists: ['preventOverflow'],
//     fn: hide
//   };

//   function distanceAndSkiddingToXY(placement, rects, offset) {
//     var basePlacement = getBasePlacement(placement);
//     var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

//     var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
//       placement: placement
//     })) : offset,
//         skidding = _ref[0],
//         distance = _ref[1];

//     skidding = skidding || 0;
//     distance = (distance || 0) * invertDistance;
//     return [left, right].indexOf(basePlacement) >= 0 ? {
//       x: distance,
//       y: skidding
//     } : {
//       x: skidding,
//       y: distance
//     };
//   }

//   function offset(_ref2) {
//     var state = _ref2.state,
//         options = _ref2.options,
//         name = _ref2.name;
//     var _options$offset = options.offset,
//         offset = _options$offset === void 0 ? [0, 0] : _options$offset;
//     var data = placements.reduce(function (acc, placement) {
//       acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
//       return acc;
//     }, {});
//     var _data$state$placement = data[state.placement],
//         x = _data$state$placement.x,
//         y = _data$state$placement.y;

//     if (state.modifiersData.popperOffsets != null) {
//       state.modifiersData.popperOffsets.x += x;
//       state.modifiersData.popperOffsets.y += y;
//     }

//     state.modifiersData[name] = data;
//   } // eslint-disable-next-line import/no-unused-modules


//   const offset$1 = {
//     name: 'offset',
//     enabled: true,
//     phase: 'main',
//     requires: ['popperOffsets'],
//     fn: offset
//   };

//   function popperOffsets(_ref) {
//     var state = _ref.state,
//         name = _ref.name;
//     // Offsets are the actual position the popper needs to have to be
//     // properly positioned near its reference element
//     // This is the most basic placement, and will be adjusted by
//     // the modifiers in the next step
//     state.modifiersData[name] = computeOffsets({
//       reference: state.rects.reference,
//       element: state.rects.popper,
//       strategy: 'absolute',
//       placement: state.placement
//     });
//   } // eslint-disable-next-line import/no-unused-modules


//   const popperOffsets$1 = {
//     name: 'popperOffsets',
//     enabled: true,
//     phase: 'read',
//     fn: popperOffsets,
//     data: {}
//   };

//   function getAltAxis(axis) {
//     return axis === 'x' ? 'y' : 'x';
//   }

//   function preventOverflow(_ref) {
//     var state = _ref.state,
//         options = _ref.options,
//         name = _ref.name;
//     var _options$mainAxis = options.mainAxis,
//         checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
//         _options$altAxis = options.altAxis,
//         checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
//         boundary = options.boundary,
//         rootBoundary = options.rootBoundary,
//         altBoundary = options.altBoundary,
//         padding = options.padding,
//         _options$tether = options.tether,
//         tether = _options$tether === void 0 ? true : _options$tether,
//         _options$tetherOffset = options.tetherOffset,
//         tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
//     var overflow = detectOverflow(state, {
//       boundary: boundary,
//       rootBoundary: rootBoundary,
//       padding: padding,
//       altBoundary: altBoundary
//     });
//     var basePlacement = getBasePlacement(state.placement);
//     var variation = getVariation(state.placement);
//     var isBasePlacement = !variation;
//     var mainAxis = getMainAxisFromPlacement(basePlacement);
//     var altAxis = getAltAxis(mainAxis);
//     var popperOffsets = state.modifiersData.popperOffsets;
//     var referenceRect = state.rects.reference;
//     var popperRect = state.rects.popper;
//     var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
//       placement: state.placement
//     })) : tetherOffset;
//     var data = {
//       x: 0,
//       y: 0
//     };

//     if (!popperOffsets) {
//       return;
//     }

//     if (checkMainAxis || checkAltAxis) {
//       var mainSide = mainAxis === 'y' ? top : left;
//       var altSide = mainAxis === 'y' ? bottom : right;
//       var len = mainAxis === 'y' ? 'height' : 'width';
//       var offset = popperOffsets[mainAxis];
//       var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
//       var max$1 = popperOffsets[mainAxis] - overflow[altSide];
//       var additive = tether ? -popperRect[len] / 2 : 0;
//       var minLen = variation === start ? referenceRect[len] : popperRect[len];
//       var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
//       // outside the reference bounds

//       var arrowElement = state.elements.arrow;
//       var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
//         width: 0,
//         height: 0
//       };
//       var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
//       var arrowPaddingMin = arrowPaddingObject[mainSide];
//       var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
//       // to include its full size in the calculation. If the reference is small
//       // and near the edge of a boundary, the popper can overflow even if the
//       // reference is not overflowing as well (e.g. virtual elements with no
//       // width or height)

//       var arrowLen = within(0, referenceRect[len], arrowRect[len]);
//       var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
//       var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
//       var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
//       var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
//       var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
//       var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
//       var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

//       if (checkMainAxis) {
//         var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
//         popperOffsets[mainAxis] = preventedOffset;
//         data[mainAxis] = preventedOffset - offset;
//       }

//       if (checkAltAxis) {
//         var _mainSide = mainAxis === 'x' ? top : left;

//         var _altSide = mainAxis === 'x' ? bottom : right;

//         var _offset = popperOffsets[altAxis];

//         var _min = _offset + overflow[_mainSide];

//         var _max = _offset - overflow[_altSide];

//         var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

//         popperOffsets[altAxis] = _preventedOffset;
//         data[altAxis] = _preventedOffset - _offset;
//       }
//     }

//     state.modifiersData[name] = data;
//   } // eslint-disable-next-line import/no-unused-modules


//   const preventOverflow$1 = {
//     name: 'preventOverflow',
//     enabled: true,
//     phase: 'main',
//     fn: preventOverflow,
//     requiresIfExists: ['offset']
//   };

//   function getHTMLElementScroll(element) {
//     return {
//       scrollLeft: element.scrollLeft,
//       scrollTop: element.scrollTop
//     };
//   }

//   function getNodeScroll(node) {
//     if (node === getWindow(node) || !isHTMLElement(node)) {
//       return getWindowScroll(node);
//     } else {
//       return getHTMLElementScroll(node);
//     }
//   }

//   function isElementScaled(element) {
//     var rect = element.getBoundingClientRect();
//     var scaleX = rect.width / element.offsetWidth || 1;
//     var scaleY = rect.height / element.offsetHeight || 1;
//     return scaleX !== 1 || scaleY !== 1;
//   } // Returns the composite rect of an element relative to its offsetParent.
//   // Composite means it takes into account transforms as well as layout.


//   function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
//     if (isFixed === void 0) {
//       isFixed = false;
//     }

//     var isOffsetParentAnElement = isHTMLElement(offsetParent);
//     isHTMLElement(offsetParent) && isElementScaled(offsetParent);
//     var documentElement = getDocumentElement(offsetParent);
//     var rect = getBoundingClientRect(elementOrVirtualElement);
//     var scroll = {
//       scrollLeft: 0,
//       scrollTop: 0
//     };
//     var offsets = {
//       x: 0,
//       y: 0
//     };

//     if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
//       if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
//       isScrollParent(documentElement)) {
//         scroll = getNodeScroll(offsetParent);
//       }

//       if (isHTMLElement(offsetParent)) {
//         offsets = getBoundingClientRect(offsetParent);
//         offsets.x += offsetParent.clientLeft;
//         offsets.y += offsetParent.clientTop;
//       } else if (documentElement) {
//         offsets.x = getWindowScrollBarX(documentElement);
//       }
//     }

//     return {
//       x: rect.left + scroll.scrollLeft - offsets.x,
//       y: rect.top + scroll.scrollTop - offsets.y,
//       width: rect.width,
//       height: rect.height
//     };
//   }

//   function order(modifiers) {
//     var map = new Map();
//     var visited = new Set();
//     var result = [];
//     modifiers.forEach(function (modifier) {
//       map.set(modifier.name, modifier);
//     }); // On visiting object, check for its dependencies and visit them recursively

//     function sort(modifier) {
//       visited.add(modifier.name);
//       var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
//       requires.forEach(function (dep) {
//         if (!visited.has(dep)) {
//           var depModifier = map.get(dep);

//           if (depModifier) {
//             sort(depModifier);
//           }
//         }
//       });
//       result.push(modifier);
//     }

//     modifiers.forEach(function (modifier) {
//       if (!visited.has(modifier.name)) {
//         // check for visited object
//         sort(modifier);
//       }
//     });
//     return result;
//   }

//   function orderModifiers(modifiers) {
//     // order based on dependencies
//     var orderedModifiers = order(modifiers); // order based on phase

//     return modifierPhases.reduce(function (acc, phase) {
//       return acc.concat(orderedModifiers.filter(function (modifier) {
//         return modifier.phase === phase;
//       }));
//     }, []);
//   }

//   function debounce(fn) {
//     var pending;
//     return function () {
//       if (!pending) {
//         pending = new Promise(function (resolve) {
//           Promise.resolve().then(function () {
//             pending = undefined;
//             resolve(fn());
//           });
//         });
//       }

//       return pending;
//     };
//   }

//   function mergeByName(modifiers) {
//     var merged = modifiers.reduce(function (merged, current) {
//       var existing = merged[current.name];
//       merged[current.name] = existing ? Object.assign({}, existing, current, {
//         options: Object.assign({}, existing.options, current.options),
//         data: Object.assign({}, existing.data, current.data)
//       }) : current;
//       return merged;
//     }, {}); // IE11 does not support Object.values

//     return Object.keys(merged).map(function (key) {
//       return merged[key];
//     });
//   }

//   var DEFAULT_OPTIONS = {
//     placement: 'bottom',
//     modifiers: [],
//     strategy: 'absolute'
//   };

//   function areValidElements() {
//     for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
//       args[_key] = arguments[_key];
//     }

//     return !args.some(function (element) {
//       return !(element && typeof element.getBoundingClientRect === 'function');
//     });
//   }

//   function popperGenerator(generatorOptions) {
//     if (generatorOptions === void 0) {
//       generatorOptions = {};
//     }

//     var _generatorOptions = generatorOptions,
//         _generatorOptions$def = _generatorOptions.defaultModifiers,
//         defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
//         _generatorOptions$def2 = _generatorOptions.defaultOptions,
//         defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
//     return function createPopper(reference, popper, options) {
//       if (options === void 0) {
//         options = defaultOptions;
//       }

//       var state = {
//         placement: 'bottom',
//         orderedModifiers: [],
//         options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
//         modifiersData: {},
//         elements: {
//           reference: reference,
//           popper: popper
//         },
//         attributes: {},
//         styles: {}
//       };
//       var effectCleanupFns = [];
//       var isDestroyed = false;
//       var instance = {
//         state: state,
//         setOptions: function setOptions(setOptionsAction) {
//           var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
//           cleanupModifierEffects();
//           state.options = Object.assign({}, defaultOptions, state.options, options);
//           state.scrollParents = {
//             reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
//             popper: listScrollParents(popper)
//           }; // Orders the modifiers based on their dependencies and `phase`
//           // properties

//           var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

//           state.orderedModifiers = orderedModifiers.filter(function (m) {
//             return m.enabled;
//           }); // Validate the provided modifiers so that the consumer will get warned

//           runModifierEffects();
//           return instance.update();
//         },
//         // Sync update – it will always be executed, even if not necessary. This
//         // is useful for low frequency updates where sync behavior simplifies the
//         // logic.
//         // For high frequency updates (e.g. `resize` and `scroll` events), always
//         // prefer the async Popper#update method
//         forceUpdate: function forceUpdate() {
//           if (isDestroyed) {
//             return;
//           }

//           var _state$elements = state.elements,
//               reference = _state$elements.reference,
//               popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
//           // anymore

//           if (!areValidElements(reference, popper)) {

//             return;
//           } // Store the reference and popper rects to be read by modifiers


//           state.rects = {
//             reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
//             popper: getLayoutRect(popper)
//           }; // Modifiers have the ability to reset the current update cycle. The
//           // most common use case for this is the `flip` modifier changing the
//           // placement, which then needs to re-run all the modifiers, because the
//           // logic was previously ran for the previous placement and is therefore
//           // stale/incorrect

//           state.reset = false;
//           state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
//           // is filled with the initial data specified by the modifier. This means
//           // it doesn't persist and is fresh on each update.
//           // To ensure persistent data, use `${name}#persistent`

//           state.orderedModifiers.forEach(function (modifier) {
//             return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
//           });

//           for (var index = 0; index < state.orderedModifiers.length; index++) {

//             if (state.reset === true) {
//               state.reset = false;
//               index = -1;
//               continue;
//             }

//             var _state$orderedModifie = state.orderedModifiers[index],
//                 fn = _state$orderedModifie.fn,
//                 _state$orderedModifie2 = _state$orderedModifie.options,
//                 _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
//                 name = _state$orderedModifie.name;

//             if (typeof fn === 'function') {
//               state = fn({
//                 state: state,
//                 options: _options,
//                 name: name,
//                 instance: instance
//               }) || state;
//             }
//           }
//         },
//         // Async and optimistically optimized update – it will not be executed if
//         // not necessary (debounced to run at most once-per-tick)
//         update: debounce(function () {
//           return new Promise(function (resolve) {
//             instance.forceUpdate();
//             resolve(state);
//           });
//         }),
//         destroy: function destroy() {
//           cleanupModifierEffects();
//           isDestroyed = true;
//         }
//       };

//       if (!areValidElements(reference, popper)) {

//         return instance;
//       }

//       instance.setOptions(options).then(function (state) {
//         if (!isDestroyed && options.onFirstUpdate) {
//           options.onFirstUpdate(state);
//         }
//       }); // Modifiers have the ability to execute arbitrary code before the first
//       // update cycle runs. They will be executed in the same order as the update
//       // cycle. This is useful when a modifier adds some persistent data that
//       // other modifiers need to use, but the modifier is run after the dependent
//       // one.

//       function runModifierEffects() {
//         state.orderedModifiers.forEach(function (_ref3) {
//           var name = _ref3.name,
//               _ref3$options = _ref3.options,
//               options = _ref3$options === void 0 ? {} : _ref3$options,
//               effect = _ref3.effect;

//           if (typeof effect === 'function') {
//             var cleanupFn = effect({
//               state: state,
//               name: name,
//               instance: instance,
//               options: options
//             });

//             var noopFn = function noopFn() {};

//             effectCleanupFns.push(cleanupFn || noopFn);
//           }
//         });
//       }

//       function cleanupModifierEffects() {
//         effectCleanupFns.forEach(function (fn) {
//           return fn();
//         });
//         effectCleanupFns = [];
//       }

//       return instance;
//     };
//   }
//   var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

//   var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
//   var createPopper$1 = /*#__PURE__*/popperGenerator({
//     defaultModifiers: defaultModifiers$1
//   }); // eslint-disable-next-line import/no-unused-modules

//   var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
//   var createPopper = /*#__PURE__*/popperGenerator({
//     defaultModifiers: defaultModifiers
//   }); // eslint-disable-next-line import/no-unused-modules

//   const Popper = /*#__PURE__*/Object.freeze({
//     __proto__: null,
//     popperGenerator,
//     detectOverflow,
//     createPopperBase: createPopper$2,
//     createPopper,
//     createPopperLite: createPopper$1,
//     top,
//     bottom,
//     right,
//     left,
//     auto,
//     basePlacements,
//     start,
//     end,
//     clippingParents,
//     viewport,
//     popper,
//     reference,
//     variationPlacements,
//     placements,
//     beforeRead,
//     read,
//     afterRead,
//     beforeMain,
//     main,
//     afterMain,
//     beforeWrite,
//     write,
//     afterWrite,
//     modifierPhases,
//     applyStyles: applyStyles$1,
//     arrow: arrow$1,
//     computeStyles: computeStyles$1,
//     eventListeners,
//     flip: flip$1,
//     hide: hide$1,
//     offset: offset$1,
//     popperOffsets: popperOffsets$1,
//     preventOverflow: preventOverflow$1
//   });

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): dropdown.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$9 = 'dropdown';
//   const DATA_KEY$8 = 'bs.dropdown';
//   const EVENT_KEY$8 = `.${DATA_KEY$8}`;
//   const DATA_API_KEY$4 = '.data-api';
//   const ESCAPE_KEY$2 = 'Escape';
//   const SPACE_KEY = 'Space';
//   const TAB_KEY$1 = 'Tab';
//   const ARROW_UP_KEY = 'ArrowUp';
//   const ARROW_DOWN_KEY = 'ArrowDown';
//   const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

//   const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
//   const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
//   const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
//   const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
//   const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
//   const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
//   const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
//   const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
//   const CLASS_NAME_SHOW$6 = 'show';
//   const CLASS_NAME_DROPUP = 'dropup';
//   const CLASS_NAME_DROPEND = 'dropend';
//   const CLASS_NAME_DROPSTART = 'dropstart';
//   const CLASS_NAME_NAVBAR = 'navbar';
//   const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
//   const SELECTOR_MENU = '.dropdown-menu';
//   const SELECTOR_NAVBAR_NAV = '.navbar-nav';
//   const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
//   const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
//   const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
//   const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
//   const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
//   const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
//   const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
//   const Default$8 = {
//     offset: [0, 2],
//     boundary: 'clippingParents',
//     reference: 'toggle',
//     display: 'dynamic',
//     popperConfig: null,
//     autoClose: true
//   };
//   const DefaultType$8 = {
//     offset: '(array|string|function)',
//     boundary: '(string|element)',
//     reference: '(string|element|object)',
//     display: 'string',
//     popperConfig: '(null|object|function)',
//     autoClose: '(boolean|string)'
//   };
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Dropdown extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._popper = null;
//       this._config = this._getConfig(config);
//       this._menu = this._getMenuElement();
//       this._inNavbar = this._detectNavbar();
//     } // Getters


//     static get Default() {
//       return Default$8;
//     }

//     static get DefaultType() {
//       return DefaultType$8;
//     }

//     static get NAME() {
//       return NAME$9;
//     } // Public


//     toggle() {
//       return this._isShown() ? this.hide() : this.show();
//     }

//     show() {
//       if (isDisabled(this._element) || this._isShown(this._menu)) {
//         return;
//       }

//       const relatedTarget = {
//         relatedTarget: this._element
//       };
//       const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

//       if (showEvent.defaultPrevented) {
//         return;
//       }

//       const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

//       if (this._inNavbar) {
//         Manipulator.setDataAttribute(this._menu, 'popper', 'none');
//       } else {
//         this._createPopper(parent);
//       } // If this is a touch-enabled device we add extra
//       // empty mouseover listeners to the body's immediate children;
//       // only needed because of broken event delegation on iOS
//       // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


//       if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
//         [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
//       }

//       this._element.focus();

//       this._element.setAttribute('aria-expanded', true);

//       this._menu.classList.add(CLASS_NAME_SHOW$6);

//       this._element.classList.add(CLASS_NAME_SHOW$6);

//       EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
//     }

//     hide() {
//       if (isDisabled(this._element) || !this._isShown(this._menu)) {
//         return;
//       }

//       const relatedTarget = {
//         relatedTarget: this._element
//       };

//       this._completeHide(relatedTarget);
//     }

//     dispose() {
//       if (this._popper) {
//         this._popper.destroy();
//       }

//       super.dispose();
//     }

//     update() {
//       this._inNavbar = this._detectNavbar();

//       if (this._popper) {
//         this._popper.update();
//       }
//     } // Private


//     _completeHide(relatedTarget) {
//       const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

//       if (hideEvent.defaultPrevented) {
//         return;
//       } // If this is a touch-enabled device we remove the extra
//       // empty mouseover listeners we added for iOS support


//       if ('ontouchstart' in document.documentElement) {
//         [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
//       }

//       if (this._popper) {
//         this._popper.destroy();
//       }

//       this._menu.classList.remove(CLASS_NAME_SHOW$6);

//       this._element.classList.remove(CLASS_NAME_SHOW$6);

//       this._element.setAttribute('aria-expanded', 'false');

//       Manipulator.removeDataAttribute(this._menu, 'popper');
//       EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
//     }

//     _getConfig(config) {
//       config = { ...this.constructor.Default,
//         ...Manipulator.getDataAttributes(this._element),
//         ...config
//       };
//       typeCheckConfig(NAME$9, config, this.constructor.DefaultType);

//       if (typeof config.reference === 'object' && !isElement$1(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
//         // Popper virtual elements require a getBoundingClientRect method
//         throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
//       }

//       return config;
//     }

//     _createPopper(parent) {
//       if (typeof Popper === 'undefined') {
//         throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
//       }

//       let referenceElement = this._element;

//       if (this._config.reference === 'parent') {
//         referenceElement = parent;
//       } else if (isElement$1(this._config.reference)) {
//         referenceElement = getElement(this._config.reference);
//       } else if (typeof this._config.reference === 'object') {
//         referenceElement = this._config.reference;
//       }

//       const popperConfig = this._getPopperConfig();

//       const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
//       this._popper = createPopper(referenceElement, this._menu, popperConfig);

//       if (isDisplayStatic) {
//         Manipulator.setDataAttribute(this._menu, 'popper', 'static');
//       }
//     }

//     _isShown(element = this._element) {
//       return element.classList.contains(CLASS_NAME_SHOW$6);
//     }

//     _getMenuElement() {
//       return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
//     }

//     _getPlacement() {
//       const parentDropdown = this._element.parentNode;

//       if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
//         return PLACEMENT_RIGHT;
//       }

//       if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
//         return PLACEMENT_LEFT;
//       } // We need to trim the value because custom properties can also include spaces


//       const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

//       if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
//         return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
//       }

//       return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
//     }

//     _detectNavbar() {
//       return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
//     }

//     _getOffset() {
//       const {
//         offset
//       } = this._config;

//       if (typeof offset === 'string') {
//         return offset.split(',').map(val => Number.parseInt(val, 10));
//       }

//       if (typeof offset === 'function') {
//         return popperData => offset(popperData, this._element);
//       }

//       return offset;
//     }

//     _getPopperConfig() {
//       const defaultBsPopperConfig = {
//         placement: this._getPlacement(),
//         modifiers: [{
//           name: 'preventOverflow',
//           options: {
//             boundary: this._config.boundary
//           }
//         }, {
//           name: 'offset',
//           options: {
//             offset: this._getOffset()
//           }
//         }]
//       }; // Disable Popper if we have a static display

//       if (this._config.display === 'static') {
//         defaultBsPopperConfig.modifiers = [{
//           name: 'applyStyles',
//           enabled: false
//         }];
//       }

//       return { ...defaultBsPopperConfig,
//         ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
//       };
//     }

//     _selectMenuItem({
//       key,
//       target
//     }) {
//       const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

//       if (!items.length) {
//         return;
//       } // if target isn't included in items (e.g. when expanding the dropdown)
//       // allow cycling to get the last item in case key equals ARROW_UP_KEY


//       getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Dropdown.getOrCreateInstance(this, config);

//         if (typeof config !== 'string') {
//           return;
//         }

//         if (typeof data[config] === 'undefined') {
//           throw new TypeError(`No method named "${config}"`);
//         }

//         data[config]();
//       });
//     }

//     static clearMenus(event) {
//       if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
//         return;
//       }

//       const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

//       for (let i = 0, len = toggles.length; i < len; i++) {
//         const context = Dropdown.getInstance(toggles[i]);

//         if (!context || context._config.autoClose === false) {
//           continue;
//         }

//         if (!context._isShown()) {
//           continue;
//         }

//         const relatedTarget = {
//           relatedTarget: context._element
//         };

//         if (event) {
//           const composedPath = event.composedPath();
//           const isMenuTarget = composedPath.includes(context._menu);

//           if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
//             continue;
//           } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


//           if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
//             continue;
//           }

//           if (event.type === 'click') {
//             relatedTarget.clickEvent = event;
//           }
//         }

//         context._completeHide(relatedTarget);
//       }
//     }

//     static getParentFromElement(element) {
//       return getElementFromSelector(element) || element.parentNode;
//     }

//     static dataApiKeydownHandler(event) {
//       // If not input/textarea:
//       //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
//       // If input/textarea:
//       //  - If space key => not a dropdown command
//       //  - If key is other than escape
//       //    - If key is not up or down => not a dropdown command
//       //    - If trigger inside the menu => not a dropdown command
//       if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
//         return;
//       }

//       const isActive = this.classList.contains(CLASS_NAME_SHOW$6);

//       if (!isActive && event.key === ESCAPE_KEY$2) {
//         return;
//       }

//       event.preventDefault();
//       event.stopPropagation();

//       if (isDisabled(this)) {
//         return;
//       }

//       const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
//       const instance = Dropdown.getOrCreateInstance(getToggleButton);

//       if (event.key === ESCAPE_KEY$2) {
//         instance.hide();
//         return;
//       }

//       if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
//         if (!isActive) {
//           instance.show();
//         }

//         instance._selectMenuItem(event);

//         return;
//       }

//       if (!isActive || event.key === SPACE_KEY) {
//         Dropdown.clearMenus();
//       }
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
//   EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
//   EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
//   EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
//   EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
//     event.preventDefault();
//     Dropdown.getOrCreateInstance(this).toggle();
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Dropdown to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Dropdown);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/scrollBar.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
//   const SELECTOR_STICKY_CONTENT = '.sticky-top';

//   class ScrollBarHelper {
//     constructor() {
//       this._element = document.body;
//     }

//     getWidth() {
//       // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
//       const documentWidth = document.documentElement.clientWidth;
//       return Math.abs(window.innerWidth - documentWidth);
//     }

//     hide() {
//       const width = this.getWidth();

//       this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


//       this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


//       this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

//       this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
//     }

//     _disableOverFlow() {
//       this._saveInitialAttribute(this._element, 'overflow');

//       this._element.style.overflow = 'hidden';
//     }

//     _setElementAttributes(selector, styleProp, callback) {
//       const scrollbarWidth = this.getWidth();

//       const manipulationCallBack = element => {
//         if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
//           return;
//         }

//         this._saveInitialAttribute(element, styleProp);

//         const calculatedValue = window.getComputedStyle(element)[styleProp];
//         element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
//       };

//       this._applyManipulationCallback(selector, manipulationCallBack);
//     }

//     reset() {
//       this._resetElementAttributes(this._element, 'overflow');

//       this._resetElementAttributes(this._element, 'paddingRight');

//       this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

//       this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
//     }

//     _saveInitialAttribute(element, styleProp) {
//       const actualValue = element.style[styleProp];

//       if (actualValue) {
//         Manipulator.setDataAttribute(element, styleProp, actualValue);
//       }
//     }

//     _resetElementAttributes(selector, styleProp) {
//       const manipulationCallBack = element => {
//         const value = Manipulator.getDataAttribute(element, styleProp);

//         if (typeof value === 'undefined') {
//           element.style.removeProperty(styleProp);
//         } else {
//           Manipulator.removeDataAttribute(element, styleProp);
//           element.style[styleProp] = value;
//         }
//       };

//       this._applyManipulationCallback(selector, manipulationCallBack);
//     }

//     _applyManipulationCallback(selector, callBack) {
//       if (isElement$1(selector)) {
//         callBack(selector);
//       } else {
//         SelectorEngine.find(selector, this._element).forEach(callBack);
//       }
//     }

//     isOverflowing() {
//       return this.getWidth() > 0;
//     }

//   }

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/backdrop.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const Default$7 = {
//     className: 'modal-backdrop',
//     isVisible: true,
//     // if false, we use the backdrop helper without adding any element to the dom
//     isAnimated: false,
//     rootElement: 'body',
//     // give the choice to place backdrop under different elements
//     clickCallback: null
//   };
//   const DefaultType$7 = {
//     className: 'string',
//     isVisible: 'boolean',
//     isAnimated: 'boolean',
//     rootElement: '(element|string)',
//     clickCallback: '(function|null)'
//   };
//   const NAME$8 = 'backdrop';
//   const CLASS_NAME_FADE$4 = 'fade';
//   const CLASS_NAME_SHOW$5 = 'show';
//   const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;

//   class Backdrop {
//     constructor(config) {
//       this._config = this._getConfig(config);
//       this._isAppended = false;
//       this._element = null;
//     }

//     show(callback) {
//       if (!this._config.isVisible) {
//         execute(callback);
//         return;
//       }

//       this._append();

//       if (this._config.isAnimated) {
//         reflow(this._getElement());
//       }

//       this._getElement().classList.add(CLASS_NAME_SHOW$5);

//       this._emulateAnimation(() => {
//         execute(callback);
//       });
//     }

//     hide(callback) {
//       if (!this._config.isVisible) {
//         execute(callback);
//         return;
//       }

//       this._getElement().classList.remove(CLASS_NAME_SHOW$5);

//       this._emulateAnimation(() => {
//         this.dispose();
//         execute(callback);
//       });
//     } // Private


//     _getElement() {
//       if (!this._element) {
//         const backdrop = document.createElement('div');
//         backdrop.className = this._config.className;

//         if (this._config.isAnimated) {
//           backdrop.classList.add(CLASS_NAME_FADE$4);
//         }

//         this._element = backdrop;
//       }

//       return this._element;
//     }

//     _getConfig(config) {
//       config = { ...Default$7,
//         ...(typeof config === 'object' ? config : {})
//       }; // use getElement() with the default "body" to get a fresh Element on each instantiation

//       config.rootElement = getElement(config.rootElement);
//       typeCheckConfig(NAME$8, config, DefaultType$7);
//       return config;
//     }

//     _append() {
//       if (this._isAppended) {
//         return;
//       }

//       this._config.rootElement.append(this._getElement());

//       EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
//         execute(this._config.clickCallback);
//       });
//       this._isAppended = true;
//     }

//     dispose() {
//       if (!this._isAppended) {
//         return;
//       }

//       EventHandler.off(this._element, EVENT_MOUSEDOWN);

//       this._element.remove();

//       this._isAppended = false;
//     }

//     _emulateAnimation(callback) {
//       executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
//     }

//   }

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/focustrap.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const Default$6 = {
//     trapElement: null,
//     // The element to trap focus inside of
//     autofocus: true
//   };
//   const DefaultType$6 = {
//     trapElement: 'element',
//     autofocus: 'boolean'
//   };
//   const NAME$7 = 'focustrap';
//   const DATA_KEY$7 = 'bs.focustrap';
//   const EVENT_KEY$7 = `.${DATA_KEY$7}`;
//   const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
//   const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
//   const TAB_KEY = 'Tab';
//   const TAB_NAV_FORWARD = 'forward';
//   const TAB_NAV_BACKWARD = 'backward';

//   class FocusTrap {
//     constructor(config) {
//       this._config = this._getConfig(config);
//       this._isActive = false;
//       this._lastTabNavDirection = null;
//     }

//     activate() {
//       const {
//         trapElement,
//         autofocus
//       } = this._config;

//       if (this._isActive) {
//         return;
//       }

//       if (autofocus) {
//         trapElement.focus();
//       }

//       EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop

//       EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event));
//       EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
//       this._isActive = true;
//     }

//     deactivate() {
//       if (!this._isActive) {
//         return;
//       }

//       this._isActive = false;
//       EventHandler.off(document, EVENT_KEY$7);
//     } // Private


//     _handleFocusin(event) {
//       const {
//         target
//       } = event;
//       const {
//         trapElement
//       } = this._config;

//       if (target === document || target === trapElement || trapElement.contains(target)) {
//         return;
//       }

//       const elements = SelectorEngine.focusableChildren(trapElement);

//       if (elements.length === 0) {
//         trapElement.focus();
//       } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
//         elements[elements.length - 1].focus();
//       } else {
//         elements[0].focus();
//       }
//     }

//     _handleKeydown(event) {
//       if (event.key !== TAB_KEY) {
//         return;
//       }

//       this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
//     }

//     _getConfig(config) {
//       config = { ...Default$6,
//         ...(typeof config === 'object' ? config : {})
//       };
//       typeCheckConfig(NAME$7, config, DefaultType$6);
//       return config;
//     }

//   }

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): modal.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$6 = 'modal';
//   const DATA_KEY$6 = 'bs.modal';
//   const EVENT_KEY$6 = `.${DATA_KEY$6}`;
//   const DATA_API_KEY$3 = '.data-api';
//   const ESCAPE_KEY$1 = 'Escape';
//   const Default$5 = {
//     backdrop: true,
//     keyboard: true,
//     focus: true
//   };
//   const DefaultType$5 = {
//     backdrop: '(boolean|string)',
//     keyboard: 'boolean',
//     focus: 'boolean'
//   };
//   const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
//   const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
//   const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
//   const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
//   const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
//   const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
//   const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
//   const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
//   const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
//   const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
//   const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
//   const CLASS_NAME_OPEN = 'modal-open';
//   const CLASS_NAME_FADE$3 = 'fade';
//   const CLASS_NAME_SHOW$4 = 'show';
//   const CLASS_NAME_STATIC = 'modal-static';
//   const OPEN_SELECTOR$1 = '.modal.show';
//   const SELECTOR_DIALOG = '.modal-dialog';
//   const SELECTOR_MODAL_BODY = '.modal-body';
//   const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Modal extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._config = this._getConfig(config);
//       this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
//       this._backdrop = this._initializeBackDrop();
//       this._focustrap = this._initializeFocusTrap();
//       this._isShown = false;
//       this._ignoreBackdropClick = false;
//       this._isTransitioning = false;
//       this._scrollBar = new ScrollBarHelper();
//     } // Getters


//     static get Default() {
//       return Default$5;
//     }

//     static get NAME() {
//       return NAME$6;
//     } // Public


//     toggle(relatedTarget) {
//       return this._isShown ? this.hide() : this.show(relatedTarget);
//     }

//     show(relatedTarget) {
//       if (this._isShown || this._isTransitioning) {
//         return;
//       }

//       const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
//         relatedTarget
//       });

//       if (showEvent.defaultPrevented) {
//         return;
//       }

//       this._isShown = true;

//       if (this._isAnimated()) {
//         this._isTransitioning = true;
//       }

//       this._scrollBar.hide();

//       document.body.classList.add(CLASS_NAME_OPEN);

//       this._adjustDialog();

//       this._setEscapeEvent();

//       this._setResizeEvent();

//       EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
//         EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
//           if (event.target === this._element) {
//             this._ignoreBackdropClick = true;
//           }
//         });
//       });

//       this._showBackdrop(() => this._showElement(relatedTarget));
//     }

//     hide() {
//       if (!this._isShown || this._isTransitioning) {
//         return;
//       }

//       const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

//       if (hideEvent.defaultPrevented) {
//         return;
//       }

//       this._isShown = false;

//       const isAnimated = this._isAnimated();

//       if (isAnimated) {
//         this._isTransitioning = true;
//       }

//       this._setEscapeEvent();

//       this._setResizeEvent();

//       this._focustrap.deactivate();

//       this._element.classList.remove(CLASS_NAME_SHOW$4);

//       EventHandler.off(this._element, EVENT_CLICK_DISMISS);
//       EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

//       this._queueCallback(() => this._hideModal(), this._element, isAnimated);
//     }

//     dispose() {
//       [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

//       this._backdrop.dispose();

//       this._focustrap.deactivate();

//       super.dispose();
//     }

//     handleUpdate() {
//       this._adjustDialog();
//     } // Private


//     _initializeBackDrop() {
//       return new Backdrop({
//         isVisible: Boolean(this._config.backdrop),
//         // 'static' option will be translated to true, and booleans will keep their value
//         isAnimated: this._isAnimated()
//       });
//     }

//     _initializeFocusTrap() {
//       return new FocusTrap({
//         trapElement: this._element
//       });
//     }

//     _getConfig(config) {
//       config = { ...Default$5,
//         ...Manipulator.getDataAttributes(this._element),
//         ...(typeof config === 'object' ? config : {})
//       };
//       typeCheckConfig(NAME$6, config, DefaultType$5);
//       return config;
//     }

//     _showElement(relatedTarget) {
//       const isAnimated = this._isAnimated();

//       const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

//       if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
//         // Don't move modal's DOM position
//         document.body.append(this._element);
//       }

//       this._element.style.display = 'block';

//       this._element.removeAttribute('aria-hidden');

//       this._element.setAttribute('aria-modal', true);

//       this._element.setAttribute('role', 'dialog');

//       this._element.scrollTop = 0;

//       if (modalBody) {
//         modalBody.scrollTop = 0;
//       }

//       if (isAnimated) {
//         reflow(this._element);
//       }

//       this._element.classList.add(CLASS_NAME_SHOW$4);

//       const transitionComplete = () => {
//         if (this._config.focus) {
//           this._focustrap.activate();
//         }

//         this._isTransitioning = false;
//         EventHandler.trigger(this._element, EVENT_SHOWN$3, {
//           relatedTarget
//         });
//       };

//       this._queueCallback(transitionComplete, this._dialog, isAnimated);
//     }

//     _setEscapeEvent() {
//       if (this._isShown) {
//         EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
//           if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
//             event.preventDefault();
//             this.hide();
//           } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
//             this._triggerBackdropTransition();
//           }
//         });
//       } else {
//         EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
//       }
//     }

//     _setResizeEvent() {
//       if (this._isShown) {
//         EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
//       } else {
//         EventHandler.off(window, EVENT_RESIZE);
//       }
//     }

//     _hideModal() {
//       this._element.style.display = 'none';

//       this._element.setAttribute('aria-hidden', true);

//       this._element.removeAttribute('aria-modal');

//       this._element.removeAttribute('role');

//       this._isTransitioning = false;

//       this._backdrop.hide(() => {
//         document.body.classList.remove(CLASS_NAME_OPEN);

//         this._resetAdjustments();

//         this._scrollBar.reset();

//         EventHandler.trigger(this._element, EVENT_HIDDEN$3);
//       });
//     }

//     _showBackdrop(callback) {
//       EventHandler.on(this._element, EVENT_CLICK_DISMISS, event => {
//         if (this._ignoreBackdropClick) {
//           this._ignoreBackdropClick = false;
//           return;
//         }

//         if (event.target !== event.currentTarget) {
//           return;
//         }

//         if (this._config.backdrop === true) {
//           this.hide();
//         } else if (this._config.backdrop === 'static') {
//           this._triggerBackdropTransition();
//         }
//       });

//       this._backdrop.show(callback);
//     }

//     _isAnimated() {
//       return this._element.classList.contains(CLASS_NAME_FADE$3);
//     }

//     _triggerBackdropTransition() {
//       const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

//       if (hideEvent.defaultPrevented) {
//         return;
//       }

//       const {
//         classList,
//         scrollHeight,
//         style
//       } = this._element;
//       const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

//       if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
//         return;
//       }

//       if (!isModalOverflowing) {
//         style.overflowY = 'hidden';
//       }

//       classList.add(CLASS_NAME_STATIC);

//       this._queueCallback(() => {
//         classList.remove(CLASS_NAME_STATIC);

//         if (!isModalOverflowing) {
//           this._queueCallback(() => {
//             style.overflowY = '';
//           }, this._dialog);
//         }
//       }, this._dialog);

//       this._element.focus();
//     } // ----------------------------------------------------------------------
//     // the following methods are used to handle overflowing modals
//     // ----------------------------------------------------------------------


//     _adjustDialog() {
//       const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

//       const scrollbarWidth = this._scrollBar.getWidth();

//       const isBodyOverflowing = scrollbarWidth > 0;

//       if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
//         this._element.style.paddingLeft = `${scrollbarWidth}px`;
//       }

//       if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
//         this._element.style.paddingRight = `${scrollbarWidth}px`;
//       }
//     }

//     _resetAdjustments() {
//       this._element.style.paddingLeft = '';
//       this._element.style.paddingRight = '';
//     } // Static


//     static jQueryInterface(config, relatedTarget) {
//       return this.each(function () {
//         const data = Modal.getOrCreateInstance(this, config);

//         if (typeof config !== 'string') {
//           return;
//         }

//         if (typeof data[config] === 'undefined') {
//           throw new TypeError(`No method named "${config}"`);
//         }

//         data[config](relatedTarget);
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
//     const target = getElementFromSelector(this);

//     if (['A', 'AREA'].includes(this.tagName)) {
//       event.preventDefault();
//     }

//     EventHandler.one(target, EVENT_SHOW$3, showEvent => {
//       if (showEvent.defaultPrevented) {
//         // only register focus restorer if modal will actually get shown
//         return;
//       }

//       EventHandler.one(target, EVENT_HIDDEN$3, () => {
//         if (isVisible(this)) {
//           this.focus();
//         }
//       });
//     }); // avoid conflict when clicking moddal toggler while another one is open

//     const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

//     if (allReadyOpen) {
//       Modal.getInstance(allReadyOpen).hide();
//     }

//     const data = Modal.getOrCreateInstance(target);
//     data.toggle(this);
//   });
//   enableDismissTrigger(Modal);
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Modal to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Modal);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): offcanvas.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$5 = 'offcanvas';
//   const DATA_KEY$5 = 'bs.offcanvas';
//   const EVENT_KEY$5 = `.${DATA_KEY$5}`;
//   const DATA_API_KEY$2 = '.data-api';
//   const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
//   const ESCAPE_KEY = 'Escape';
//   const Default$4 = {
//     backdrop: true,
//     keyboard: true,
//     scroll: false
//   };
//   const DefaultType$4 = {
//     backdrop: 'boolean',
//     keyboard: 'boolean',
//     scroll: 'boolean'
//   };
//   const CLASS_NAME_SHOW$3 = 'show';
//   const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
//   const OPEN_SELECTOR = '.offcanvas.show';
//   const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
//   const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
//   const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
//   const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
//   const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
//   const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
//   const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Offcanvas extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._config = this._getConfig(config);
//       this._isShown = false;
//       this._backdrop = this._initializeBackDrop();
//       this._focustrap = this._initializeFocusTrap();

//       this._addEventListeners();
//     } // Getters


//     static get NAME() {
//       return NAME$5;
//     }

//     static get Default() {
//       return Default$4;
//     } // Public


//     toggle(relatedTarget) {
//       return this._isShown ? this.hide() : this.show(relatedTarget);
//     }

//     show(relatedTarget) {
//       if (this._isShown) {
//         return;
//       }

//       const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
//         relatedTarget
//       });

//       if (showEvent.defaultPrevented) {
//         return;
//       }

//       this._isShown = true;
//       this._element.style.visibility = 'visible';

//       this._backdrop.show();

//       if (!this._config.scroll) {
//         new ScrollBarHelper().hide();
//       }

//       this._element.removeAttribute('aria-hidden');

//       this._element.setAttribute('aria-modal', true);

//       this._element.setAttribute('role', 'dialog');

//       this._element.classList.add(CLASS_NAME_SHOW$3);

//       const completeCallBack = () => {
//         if (!this._config.scroll) {
//           this._focustrap.activate();
//         }

//         EventHandler.trigger(this._element, EVENT_SHOWN$2, {
//           relatedTarget
//         });
//       };

//       this._queueCallback(completeCallBack, this._element, true);
//     }

//     hide() {
//       if (!this._isShown) {
//         return;
//       }

//       const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

//       if (hideEvent.defaultPrevented) {
//         return;
//       }

//       this._focustrap.deactivate();

//       this._element.blur();

//       this._isShown = false;

//       this._element.classList.remove(CLASS_NAME_SHOW$3);

//       this._backdrop.hide();

//       const completeCallback = () => {
//         this._element.setAttribute('aria-hidden', true);

//         this._element.removeAttribute('aria-modal');

//         this._element.removeAttribute('role');

//         this._element.style.visibility = 'hidden';

//         if (!this._config.scroll) {
//           new ScrollBarHelper().reset();
//         }

//         EventHandler.trigger(this._element, EVENT_HIDDEN$2);
//       };

//       this._queueCallback(completeCallback, this._element, true);
//     }

//     dispose() {
//       this._backdrop.dispose();

//       this._focustrap.deactivate();

//       super.dispose();
//     } // Private


//     _getConfig(config) {
//       config = { ...Default$4,
//         ...Manipulator.getDataAttributes(this._element),
//         ...(typeof config === 'object' ? config : {})
//       };
//       typeCheckConfig(NAME$5, config, DefaultType$4);
//       return config;
//     }

//     _initializeBackDrop() {
//       return new Backdrop({
//         className: CLASS_NAME_BACKDROP,
//         isVisible: this._config.backdrop,
//         isAnimated: true,
//         rootElement: this._element.parentNode,
//         clickCallback: () => this.hide()
//       });
//     }

//     _initializeFocusTrap() {
//       return new FocusTrap({
//         trapElement: this._element
//       });
//     }

//     _addEventListeners() {
//       EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
//         if (this._config.keyboard && event.key === ESCAPE_KEY) {
//           this.hide();
//         }
//       });
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Offcanvas.getOrCreateInstance(this, config);

//         if (typeof config !== 'string') {
//           return;
//         }

//         if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
//           throw new TypeError(`No method named "${config}"`);
//         }

//         data[config](this);
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
//     const target = getElementFromSelector(this);

//     if (['A', 'AREA'].includes(this.tagName)) {
//       event.preventDefault();
//     }

//     if (isDisabled(this)) {
//       return;
//     }

//     EventHandler.one(target, EVENT_HIDDEN$2, () => {
//       // focus on trigger when it is closed
//       if (isVisible(this)) {
//         this.focus();
//       }
//     }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

//     const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

//     if (allReadyOpen && allReadyOpen !== target) {
//       Offcanvas.getInstance(allReadyOpen).hide();
//     }

//     const data = Offcanvas.getOrCreateInstance(target);
//     data.toggle(this);
//   });
//   EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
//   enableDismissTrigger(Offcanvas);
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    */

//   defineJQueryPlugin(Offcanvas);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): util/sanitizer.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
//   const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
//   /**
//    * A pattern that recognizes a commonly useful subset of URLs that are safe.
//    *
//    * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
//    */

//   const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
//   /**
//    * A pattern that matches safe data URLs. Only matches image, video and audio types.
//    *
//    * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
//    */

//   const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

//   const allowedAttribute = (attribute, allowedAttributeList) => {
//     const attributeName = attribute.nodeName.toLowerCase();

//     if (allowedAttributeList.includes(attributeName)) {
//       if (uriAttributes.has(attributeName)) {
//         return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
//       }

//       return true;
//     }

//     const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); // Check if a regular expression validates the attribute.

//     for (let i = 0, len = regExp.length; i < len; i++) {
//       if (regExp[i].test(attributeName)) {
//         return true;
//       }
//     }

//     return false;
//   };

//   const DefaultAllowlist = {
//     // Global attributes allowed on any supplied element below.
//     '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
//     a: ['target', 'href', 'title', 'rel'],
//     area: [],
//     b: [],
//     br: [],
//     col: [],
//     code: [],
//     div: [],
//     em: [],
//     hr: [],
//     h1: [],
//     h2: [],
//     h3: [],
//     h4: [],
//     h5: [],
//     h6: [],
//     i: [],
//     img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
//     li: [],
//     ol: [],
//     p: [],
//     pre: [],
//     s: [],
//     small: [],
//     span: [],
//     sub: [],
//     sup: [],
//     strong: [],
//     u: [],
//     ul: []
//   };
//   function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
//     if (!unsafeHtml.length) {
//       return unsafeHtml;
//     }

//     if (sanitizeFn && typeof sanitizeFn === 'function') {
//       return sanitizeFn(unsafeHtml);
//     }

//     const domParser = new window.DOMParser();
//     const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
//     const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

//     for (let i = 0, len = elements.length; i < len; i++) {
//       const element = elements[i];
//       const elementName = element.nodeName.toLowerCase();

//       if (!Object.keys(allowList).includes(elementName)) {
//         element.remove();
//         continue;
//       }

//       const attributeList = [].concat(...element.attributes);
//       const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
//       attributeList.forEach(attribute => {
//         if (!allowedAttribute(attribute, allowedAttributes)) {
//           element.removeAttribute(attribute.nodeName);
//         }
//       });
//     }

//     return createdDocument.body.innerHTML;
//   }

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): tooltip.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$4 = 'tooltip';
//   const DATA_KEY$4 = 'bs.tooltip';
//   const EVENT_KEY$4 = `.${DATA_KEY$4}`;
//   const CLASS_PREFIX$1 = 'bs-tooltip';
//   const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
//   const DefaultType$3 = {
//     animation: 'boolean',
//     template: 'string',
//     title: '(string|element|function)',
//     trigger: 'string',
//     delay: '(number|object)',
//     html: 'boolean',
//     selector: '(string|boolean)',
//     placement: '(string|function)',
//     offset: '(array|string|function)',
//     container: '(string|element|boolean)',
//     fallbackPlacements: 'array',
//     boundary: '(string|element)',
//     customClass: '(string|function)',
//     sanitize: 'boolean',
//     sanitizeFn: '(null|function)',
//     allowList: 'object',
//     popperConfig: '(null|object|function)'
//   };
//   const AttachmentMap = {
//     AUTO: 'auto',
//     TOP: 'top',
//     RIGHT: isRTL() ? 'left' : 'right',
//     BOTTOM: 'bottom',
//     LEFT: isRTL() ? 'right' : 'left'
//   };
//   const Default$3 = {
//     animation: true,
//     template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
//     trigger: 'hover focus',
//     title: '',
//     delay: 0,
//     html: false,
//     selector: false,
//     placement: 'top',
//     offset: [0, 0],
//     container: false,
//     fallbackPlacements: ['top', 'right', 'bottom', 'left'],
//     boundary: 'clippingParents',
//     customClass: '',
//     sanitize: true,
//     sanitizeFn: null,
//     allowList: DefaultAllowlist,
//     popperConfig: null
//   };
//   const Event$2 = {
//     HIDE: `hide${EVENT_KEY$4}`,
//     HIDDEN: `hidden${EVENT_KEY$4}`,
//     SHOW: `show${EVENT_KEY$4}`,
//     SHOWN: `shown${EVENT_KEY$4}`,
//     INSERTED: `inserted${EVENT_KEY$4}`,
//     CLICK: `click${EVENT_KEY$4}`,
//     FOCUSIN: `focusin${EVENT_KEY$4}`,
//     FOCUSOUT: `focusout${EVENT_KEY$4}`,
//     MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
//     MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
//   };
//   const CLASS_NAME_FADE$2 = 'fade';
//   const CLASS_NAME_MODAL = 'modal';
//   const CLASS_NAME_SHOW$2 = 'show';
//   const HOVER_STATE_SHOW = 'show';
//   const HOVER_STATE_OUT = 'out';
//   const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
//   const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
//   const EVENT_MODAL_HIDE = 'hide.bs.modal';
//   const TRIGGER_HOVER = 'hover';
//   const TRIGGER_FOCUS = 'focus';
//   const TRIGGER_CLICK = 'click';
//   const TRIGGER_MANUAL = 'manual';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Tooltip extends BaseComponent {
//     constructor(element, config) {
//       if (typeof Popper === 'undefined') {
//         throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
//       }

//       super(element); // private

//       this._isEnabled = true;
//       this._timeout = 0;
//       this._hoverState = '';
//       this._activeTrigger = {};
//       this._popper = null; // Protected

//       this._config = this._getConfig(config);
//       this.tip = null;

//       this._setListeners();
//     } // Getters


//     static get Default() {
//       return Default$3;
//     }

//     static get NAME() {
//       return NAME$4;
//     }

//     static get Event() {
//       return Event$2;
//     }

//     static get DefaultType() {
//       return DefaultType$3;
//     } // Public


//     enable() {
//       this._isEnabled = true;
//     }

//     disable() {
//       this._isEnabled = false;
//     }

//     toggleEnabled() {
//       this._isEnabled = !this._isEnabled;
//     }

//     toggle(event) {
//       if (!this._isEnabled) {
//         return;
//       }

//       if (event) {
//         const context = this._initializeOnDelegatedTarget(event);

//         context._activeTrigger.click = !context._activeTrigger.click;

//         if (context._isWithActiveTrigger()) {
//           context._enter(null, context);
//         } else {
//           context._leave(null, context);
//         }
//       } else {
//         if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
//           this._leave(null, this);

//           return;
//         }

//         this._enter(null, this);
//       }
//     }

//     dispose() {
//       clearTimeout(this._timeout);
//       EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

//       if (this.tip) {
//         this.tip.remove();
//       }

//       this._disposePopper();

//       super.dispose();
//     }

//     show() {
//       if (this._element.style.display === 'none') {
//         throw new Error('Please use show on visible elements');
//       }

//       if (!(this.isWithContent() && this._isEnabled)) {
//         return;
//       }

//       const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
//       const shadowRoot = findShadowRoot(this._element);
//       const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

//       if (showEvent.defaultPrevented || !isInTheDom) {
//         return;
//       } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
//       // This will be removed later in favor of a `setContent` method


//       if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
//         this._disposePopper();

//         this.tip.remove();
//         this.tip = null;
//       }

//       const tip = this.getTipElement();
//       const tipId = getUID(this.constructor.NAME);
//       tip.setAttribute('id', tipId);

//       this._element.setAttribute('aria-describedby', tipId);

//       if (this._config.animation) {
//         tip.classList.add(CLASS_NAME_FADE$2);
//       }

//       const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

//       const attachment = this._getAttachment(placement);

//       this._addAttachmentClass(attachment);

//       const {
//         container
//       } = this._config;
//       Data.set(tip, this.constructor.DATA_KEY, this);

//       if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
//         container.append(tip);
//         EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
//       }

//       if (this._popper) {
//         this._popper.update();
//       } else {
//         this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
//       }

//       tip.classList.add(CLASS_NAME_SHOW$2);

//       const customClass = this._resolvePossibleFunction(this._config.customClass);

//       if (customClass) {
//         tip.classList.add(...customClass.split(' '));
//       } // If this is a touch-enabled device we add extra
//       // empty mouseover listeners to the body's immediate children;
//       // only needed because of broken event delegation on iOS
//       // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


//       if ('ontouchstart' in document.documentElement) {
//         [].concat(...document.body.children).forEach(element => {
//           EventHandler.on(element, 'mouseover', noop);
//         });
//       }

//       const complete = () => {
//         const prevHoverState = this._hoverState;
//         this._hoverState = null;
//         EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

//         if (prevHoverState === HOVER_STATE_OUT) {
//           this._leave(null, this);
//         }
//       };

//       const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

//       this._queueCallback(complete, this.tip, isAnimated);
//     }

//     hide() {
//       if (!this._popper) {
//         return;
//       }

//       const tip = this.getTipElement();

//       const complete = () => {
//         if (this._isWithActiveTrigger()) {
//           return;
//         }

//         if (this._hoverState !== HOVER_STATE_SHOW) {
//           tip.remove();
//         }

//         this._cleanTipClass();

//         this._element.removeAttribute('aria-describedby');

//         EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

//         this._disposePopper();
//       };

//       const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

//       if (hideEvent.defaultPrevented) {
//         return;
//       }

//       tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
//       // empty mouseover listeners we added for iOS support

//       if ('ontouchstart' in document.documentElement) {
//         [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
//       }

//       this._activeTrigger[TRIGGER_CLICK] = false;
//       this._activeTrigger[TRIGGER_FOCUS] = false;
//       this._activeTrigger[TRIGGER_HOVER] = false;
//       const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

//       this._queueCallback(complete, this.tip, isAnimated);

//       this._hoverState = '';
//     }

//     update() {
//       if (this._popper !== null) {
//         this._popper.update();
//       }
//     } // Protected


//     isWithContent() {
//       return Boolean(this.getTitle());
//     }

//     getTipElement() {
//       if (this.tip) {
//         return this.tip;
//       }

//       const element = document.createElement('div');
//       element.innerHTML = this._config.template;
//       const tip = element.children[0];
//       this.setContent(tip);
//       tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
//       this.tip = tip;
//       return this.tip;
//     }

//     setContent(tip) {
//       this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
//     }

//     _sanitizeAndSetContent(template, content, selector) {
//       const templateElement = SelectorEngine.findOne(selector, template);

//       if (!content && templateElement) {
//         templateElement.remove();
//         return;
//       } // we use append for html objects to maintain js events


//       this.setElementContent(templateElement, content);
//     }

//     setElementContent(element, content) {
//       if (element === null) {
//         return;
//       }

//       if (isElement$1(content)) {
//         content = getElement(content); // content is a DOM node or a jQuery

//         if (this._config.html) {
//           if (content.parentNode !== element) {
//             element.innerHTML = '';
//             element.append(content);
//           }
//         } else {
//           element.textContent = content.textContent;
//         }

//         return;
//       }

//       if (this._config.html) {
//         if (this._config.sanitize) {
//           content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
//         }

//         element.innerHTML = content;
//       } else {
//         element.textContent = content;
//       }
//     }

//     getTitle() {
//       const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

//       return this._resolvePossibleFunction(title);
//     }

//     updateAttachment(attachment) {
//       if (attachment === 'right') {
//         return 'end';
//       }

//       if (attachment === 'left') {
//         return 'start';
//       }

//       return attachment;
//     } // Private


//     _initializeOnDelegatedTarget(event, context) {
//       return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
//     }

//     _getOffset() {
//       const {
//         offset
//       } = this._config;

//       if (typeof offset === 'string') {
//         return offset.split(',').map(val => Number.parseInt(val, 10));
//       }

//       if (typeof offset === 'function') {
//         return popperData => offset(popperData, this._element);
//       }

//       return offset;
//     }

//     _resolvePossibleFunction(content) {
//       return typeof content === 'function' ? content.call(this._element) : content;
//     }

//     _getPopperConfig(attachment) {
//       const defaultBsPopperConfig = {
//         placement: attachment,
//         modifiers: [{
//           name: 'flip',
//           options: {
//             fallbackPlacements: this._config.fallbackPlacements
//           }
//         }, {
//           name: 'offset',
//           options: {
//             offset: this._getOffset()
//           }
//         }, {
//           name: 'preventOverflow',
//           options: {
//             boundary: this._config.boundary
//           }
//         }, {
//           name: 'arrow',
//           options: {
//             element: `.${this.constructor.NAME}-arrow`
//           }
//         }, {
//           name: 'onChange',
//           enabled: true,
//           phase: 'afterWrite',
//           fn: data => this._handlePopperPlacementChange(data)
//         }],
//         onFirstUpdate: data => {
//           if (data.options.placement !== data.placement) {
//             this._handlePopperPlacementChange(data);
//           }
//         }
//       };
//       return { ...defaultBsPopperConfig,
//         ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
//       };
//     }

//     _addAttachmentClass(attachment) {
//       this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
//     }

//     _getAttachment(placement) {
//       return AttachmentMap[placement.toUpperCase()];
//     }

//     _setListeners() {
//       const triggers = this._config.trigger.split(' ');

//       triggers.forEach(trigger => {
//         if (trigger === 'click') {
//           EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
//         } else if (trigger !== TRIGGER_MANUAL) {
//           const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
//           const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
//           EventHandler.on(this._element, eventIn, this._config.selector, event => this._enter(event));
//           EventHandler.on(this._element, eventOut, this._config.selector, event => this._leave(event));
//         }
//       });

//       this._hideModalHandler = () => {
//         if (this._element) {
//           this.hide();
//         }
//       };

//       EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

//       if (this._config.selector) {
//         this._config = { ...this._config,
//           trigger: 'manual',
//           selector: ''
//         };
//       } else {
//         this._fixTitle();
//       }
//     }

//     _fixTitle() {
//       const title = this._element.getAttribute('title');

//       const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

//       if (title || originalTitleType !== 'string') {
//         this._element.setAttribute('data-bs-original-title', title || '');

//         if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
//           this._element.setAttribute('aria-label', title);
//         }

//         this._element.setAttribute('title', '');
//       }
//     }

//     _enter(event, context) {
//       context = this._initializeOnDelegatedTarget(event, context);

//       if (event) {
//         context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
//       }

//       if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
//         context._hoverState = HOVER_STATE_SHOW;
//         return;
//       }

//       clearTimeout(context._timeout);
//       context._hoverState = HOVER_STATE_SHOW;

//       if (!context._config.delay || !context._config.delay.show) {
//         context.show();
//         return;
//       }

//       context._timeout = setTimeout(() => {
//         if (context._hoverState === HOVER_STATE_SHOW) {
//           context.show();
//         }
//       }, context._config.delay.show);
//     }

//     _leave(event, context) {
//       context = this._initializeOnDelegatedTarget(event, context);

//       if (event) {
//         context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
//       }

//       if (context._isWithActiveTrigger()) {
//         return;
//       }

//       clearTimeout(context._timeout);
//       context._hoverState = HOVER_STATE_OUT;

//       if (!context._config.delay || !context._config.delay.hide) {
//         context.hide();
//         return;
//       }

//       context._timeout = setTimeout(() => {
//         if (context._hoverState === HOVER_STATE_OUT) {
//           context.hide();
//         }
//       }, context._config.delay.hide);
//     }

//     _isWithActiveTrigger() {
//       for (const trigger in this._activeTrigger) {
//         if (this._activeTrigger[trigger]) {
//           return true;
//         }
//       }

//       return false;
//     }

//     _getConfig(config) {
//       const dataAttributes = Manipulator.getDataAttributes(this._element);
//       Object.keys(dataAttributes).forEach(dataAttr => {
//         if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
//           delete dataAttributes[dataAttr];
//         }
//       });
//       config = { ...this.constructor.Default,
//         ...dataAttributes,
//         ...(typeof config === 'object' && config ? config : {})
//       };
//       config.container = config.container === false ? document.body : getElement(config.container);

//       if (typeof config.delay === 'number') {
//         config.delay = {
//           show: config.delay,
//           hide: config.delay
//         };
//       }

//       if (typeof config.title === 'number') {
//         config.title = config.title.toString();
//       }

//       if (typeof config.content === 'number') {
//         config.content = config.content.toString();
//       }

//       typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

//       if (config.sanitize) {
//         config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
//       }

//       return config;
//     }

//     _getDelegateConfig() {
//       const config = {};

//       for (const key in this._config) {
//         if (this.constructor.Default[key] !== this._config[key]) {
//           config[key] = this._config[key];
//         }
//       } // In the future can be replaced with:
//       // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
//       // `Object.fromEntries(keysWithDifferentValues)`


//       return config;
//     }

//     _cleanTipClass() {
//       const tip = this.getTipElement();
//       const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
//       const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

//       if (tabClass !== null && tabClass.length > 0) {
//         tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
//       }
//     }

//     _getBasicClassPrefix() {
//       return CLASS_PREFIX$1;
//     }

//     _handlePopperPlacementChange(popperData) {
//       const {
//         state
//       } = popperData;

//       if (!state) {
//         return;
//       }

//       this.tip = state.elements.popper;

//       this._cleanTipClass();

//       this._addAttachmentClass(this._getAttachment(state.placement));
//     }

//     _disposePopper() {
//       if (this._popper) {
//         this._popper.destroy();

//         this._popper = null;
//       }
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Tooltip.getOrCreateInstance(this, config);

//         if (typeof config === 'string') {
//           if (typeof data[config] === 'undefined') {
//             throw new TypeError(`No method named "${config}"`);
//           }

//           data[config]();
//         }
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Tooltip to jQuery only if jQuery is present
//    */


//   defineJQueryPlugin(Tooltip);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): popover.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$3 = 'popover';
//   const DATA_KEY$3 = 'bs.popover';
//   const EVENT_KEY$3 = `.${DATA_KEY$3}`;
//   const CLASS_PREFIX = 'bs-popover';
//   const Default$2 = { ...Tooltip.Default,
//     placement: 'right',
//     offset: [0, 8],
//     trigger: 'click',
//     content: '',
//     template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
//   };
//   const DefaultType$2 = { ...Tooltip.DefaultType,
//     content: '(string|element|function)'
//   };
//   const Event$1 = {
//     HIDE: `hide${EVENT_KEY$3}`,
//     HIDDEN: `hidden${EVENT_KEY$3}`,
//     SHOW: `show${EVENT_KEY$3}`,
//     SHOWN: `shown${EVENT_KEY$3}`,
//     INSERTED: `inserted${EVENT_KEY$3}`,
//     CLICK: `click${EVENT_KEY$3}`,
//     FOCUSIN: `focusin${EVENT_KEY$3}`,
//     FOCUSOUT: `focusout${EVENT_KEY$3}`,
//     MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
//     MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
//   };
//   const SELECTOR_TITLE = '.popover-header';
//   const SELECTOR_CONTENT = '.popover-body';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Popover extends Tooltip {
//     // Getters
//     static get Default() {
//       return Default$2;
//     }

//     static get NAME() {
//       return NAME$3;
//     }

//     static get Event() {
//       return Event$1;
//     }

//     static get DefaultType() {
//       return DefaultType$2;
//     } // Overrides


//     isWithContent() {
//       return this.getTitle() || this._getContent();
//     }

//     setContent(tip) {
//       this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

//       this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
//     } // Private


//     _getContent() {
//       return this._resolvePossibleFunction(this._config.content);
//     }

//     _getBasicClassPrefix() {
//       return CLASS_PREFIX;
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Popover.getOrCreateInstance(this, config);

//         if (typeof config === 'string') {
//           if (typeof data[config] === 'undefined') {
//             throw new TypeError(`No method named "${config}"`);
//           }

//           data[config]();
//         }
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Popover to jQuery only if jQuery is present
//    */


//   defineJQueryPlugin(Popover);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): scrollspy.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$2 = 'scrollspy';
//   const DATA_KEY$2 = 'bs.scrollspy';
//   const EVENT_KEY$2 = `.${DATA_KEY$2}`;
//   const DATA_API_KEY$1 = '.data-api';
//   const Default$1 = {
//     offset: 10,
//     method: 'auto',
//     target: ''
//   };
//   const DefaultType$1 = {
//     offset: 'number',
//     method: 'string',
//     target: '(string|element)'
//   };
//   const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
//   const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
//   const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
//   const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
//   const CLASS_NAME_ACTIVE$1 = 'active';
//   const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
//   const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
//   const SELECTOR_NAV_LINKS = '.nav-link';
//   const SELECTOR_NAV_ITEMS = '.nav-item';
//   const SELECTOR_LIST_ITEMS = '.list-group-item';
//   const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
//   const SELECTOR_DROPDOWN$1 = '.dropdown';
//   const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
//   const METHOD_OFFSET = 'offset';
//   const METHOD_POSITION = 'position';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class ScrollSpy extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
//       this._config = this._getConfig(config);
//       this._offsets = [];
//       this._targets = [];
//       this._activeTarget = null;
//       this._scrollHeight = 0;
//       EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
//       this.refresh();

//       this._process();
//     } // Getters


//     static get Default() {
//       return Default$1;
//     }

//     static get NAME() {
//       return NAME$2;
//     } // Public


//     refresh() {
//       const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
//       const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
//       const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
//       this._offsets = [];
//       this._targets = [];
//       this._scrollHeight = this._getScrollHeight();
//       const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
//       targets.map(element => {
//         const targetSelector = getSelectorFromElement(element);
//         const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

//         if (target) {
//           const targetBCR = target.getBoundingClientRect();

//           if (targetBCR.width || targetBCR.height) {
//             return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
//           }
//         }

//         return null;
//       }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
//         this._offsets.push(item[0]);

//         this._targets.push(item[1]);
//       });
//     }

//     dispose() {
//       EventHandler.off(this._scrollElement, EVENT_KEY$2);
//       super.dispose();
//     } // Private


//     _getConfig(config) {
//       config = { ...Default$1,
//         ...Manipulator.getDataAttributes(this._element),
//         ...(typeof config === 'object' && config ? config : {})
//       };
//       config.target = getElement(config.target) || document.documentElement;
//       typeCheckConfig(NAME$2, config, DefaultType$1);
//       return config;
//     }

//     _getScrollTop() {
//       return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
//     }

//     _getScrollHeight() {
//       return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
//     }

//     _getOffsetHeight() {
//       return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
//     }

//     _process() {
//       const scrollTop = this._getScrollTop() + this._config.offset;

//       const scrollHeight = this._getScrollHeight();

//       const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

//       if (this._scrollHeight !== scrollHeight) {
//         this.refresh();
//       }

//       if (scrollTop >= maxScroll) {
//         const target = this._targets[this._targets.length - 1];

//         if (this._activeTarget !== target) {
//           this._activate(target);
//         }

//         return;
//       }

//       if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
//         this._activeTarget = null;

//         this._clear();

//         return;
//       }

//       for (let i = this._offsets.length; i--;) {
//         const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

//         if (isActiveTarget) {
//           this._activate(this._targets[i]);
//         }
//       }
//     }

//     _activate(target) {
//       this._activeTarget = target;

//       this._clear();

//       const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
//       const link = SelectorEngine.findOne(queries.join(','), this._config.target);
//       link.classList.add(CLASS_NAME_ACTIVE$1);

//       if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
//         SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
//       } else {
//         SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
//           // Set triggered links parents as active
//           // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
//           SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

//           SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
//             SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
//           });
//         });
//       }

//       EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
//         relatedTarget: target
//       });
//     }

//     _clear() {
//       SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = ScrollSpy.getOrCreateInstance(this, config);

//         if (typeof config !== 'string') {
//           return;
//         }

//         if (typeof data[config] === 'undefined') {
//           throw new TypeError(`No method named "${config}"`);
//         }

//         data[config]();
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
//     SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .ScrollSpy to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(ScrollSpy);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): tab.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME$1 = 'tab';
//   const DATA_KEY$1 = 'bs.tab';
//   const EVENT_KEY$1 = `.${DATA_KEY$1}`;
//   const DATA_API_KEY = '.data-api';
//   const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
//   const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
//   const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
//   const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
//   const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
//   const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
//   const CLASS_NAME_ACTIVE = 'active';
//   const CLASS_NAME_FADE$1 = 'fade';
//   const CLASS_NAME_SHOW$1 = 'show';
//   const SELECTOR_DROPDOWN = '.dropdown';
//   const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
//   const SELECTOR_ACTIVE = '.active';
//   const SELECTOR_ACTIVE_UL = ':scope > li > .active';
//   const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
//   const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
//   const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Tab extends BaseComponent {
//     // Getters
//     static get NAME() {
//       return NAME$1;
//     } // Public


//     show() {
//       if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
//         return;
//       }

//       let previous;
//       const target = getElementFromSelector(this._element);

//       const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

//       if (listElement) {
//         const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
//         previous = SelectorEngine.find(itemSelector, listElement);
//         previous = previous[previous.length - 1];
//       }

//       const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
//         relatedTarget: this._element
//       }) : null;
//       const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
//         relatedTarget: previous
//       });

//       if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
//         return;
//       }

//       this._activate(this._element, listElement);

//       const complete = () => {
//         EventHandler.trigger(previous, EVENT_HIDDEN$1, {
//           relatedTarget: this._element
//         });
//         EventHandler.trigger(this._element, EVENT_SHOWN$1, {
//           relatedTarget: previous
//         });
//       };

//       if (target) {
//         this._activate(target, target.parentNode, complete);
//       } else {
//         complete();
//       }
//     } // Private


//     _activate(element, container, callback) {
//       const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
//       const active = activeElements[0];
//       const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

//       const complete = () => this._transitionComplete(element, active, callback);

//       if (active && isTransitioning) {
//         active.classList.remove(CLASS_NAME_SHOW$1);

//         this._queueCallback(complete, element, true);
//       } else {
//         complete();
//       }
//     }

//     _transitionComplete(element, active, callback) {
//       if (active) {
//         active.classList.remove(CLASS_NAME_ACTIVE);
//         const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

//         if (dropdownChild) {
//           dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
//         }

//         if (active.getAttribute('role') === 'tab') {
//           active.setAttribute('aria-selected', false);
//         }
//       }

//       element.classList.add(CLASS_NAME_ACTIVE);

//       if (element.getAttribute('role') === 'tab') {
//         element.setAttribute('aria-selected', true);
//       }

//       reflow(element);

//       if (element.classList.contains(CLASS_NAME_FADE$1)) {
//         element.classList.add(CLASS_NAME_SHOW$1);
//       }

//       let parent = element.parentNode;

//       if (parent && parent.nodeName === 'LI') {
//         parent = parent.parentNode;
//       }

//       if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
//         const dropdownElement = element.closest(SELECTOR_DROPDOWN);

//         if (dropdownElement) {
//           SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
//         }

//         element.setAttribute('aria-expanded', true);
//       }

//       if (callback) {
//         callback();
//       }
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Tab.getOrCreateInstance(this);

//         if (typeof config === 'string') {
//           if (typeof data[config] === 'undefined') {
//             throw new TypeError(`No method named "${config}"`);
//           }

//           data[config]();
//         }
//       });
//     }

//   }
//   /**
//    * ------------------------------------------------------------------------
//    * Data Api implementation
//    * ------------------------------------------------------------------------
//    */


//   EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
//     if (['A', 'AREA'].includes(this.tagName)) {
//       event.preventDefault();
//     }

//     if (isDisabled(this)) {
//       return;
//     }

//     const data = Tab.getOrCreateInstance(this);
//     data.show();
//   });
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Tab to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Tab);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): toast.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   /**
//    * ------------------------------------------------------------------------
//    * Constants
//    * ------------------------------------------------------------------------
//    */

//   const NAME = 'toast';
//   const DATA_KEY = 'bs.toast';
//   const EVENT_KEY = `.${DATA_KEY}`;
//   const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
//   const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
//   const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
//   const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
//   const EVENT_HIDE = `hide${EVENT_KEY}`;
//   const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
//   const EVENT_SHOW = `show${EVENT_KEY}`;
//   const EVENT_SHOWN = `shown${EVENT_KEY}`;
//   const CLASS_NAME_FADE = 'fade';
//   const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

//   const CLASS_NAME_SHOW = 'show';
//   const CLASS_NAME_SHOWING = 'showing';
//   const DefaultType = {
//     animation: 'boolean',
//     autohide: 'boolean',
//     delay: 'number'
//   };
//   const Default = {
//     animation: true,
//     autohide: true,
//     delay: 5000
//   };
//   /**
//    * ------------------------------------------------------------------------
//    * Class Definition
//    * ------------------------------------------------------------------------
//    */

//   class Toast extends BaseComponent {
//     constructor(element, config) {
//       super(element);
//       this._config = this._getConfig(config);
//       this._timeout = null;
//       this._hasMouseInteraction = false;
//       this._hasKeyboardInteraction = false;

//       this._setListeners();
//     } // Getters


//     static get DefaultType() {
//       return DefaultType;
//     }

//     static get Default() {
//       return Default;
//     }

//     static get NAME() {
//       return NAME;
//     } // Public


//     show() {
//       const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

//       if (showEvent.defaultPrevented) {
//         return;
//       }

//       this._clearTimeout();

//       if (this._config.animation) {
//         this._element.classList.add(CLASS_NAME_FADE);
//       }

//       const complete = () => {
//         this._element.classList.remove(CLASS_NAME_SHOWING);

//         EventHandler.trigger(this._element, EVENT_SHOWN);

//         this._maybeScheduleHide();
//       };

//       this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


//       reflow(this._element);

//       this._element.classList.add(CLASS_NAME_SHOW);

//       this._element.classList.add(CLASS_NAME_SHOWING);

//       this._queueCallback(complete, this._element, this._config.animation);
//     }

//     hide() {
//       if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
//         return;
//       }

//       const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

//       if (hideEvent.defaultPrevented) {
//         return;
//       }

//       const complete = () => {
//         this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


//         this._element.classList.remove(CLASS_NAME_SHOWING);

//         this._element.classList.remove(CLASS_NAME_SHOW);

//         EventHandler.trigger(this._element, EVENT_HIDDEN);
//       };

//       this._element.classList.add(CLASS_NAME_SHOWING);

//       this._queueCallback(complete, this._element, this._config.animation);
//     }

//     dispose() {
//       this._clearTimeout();

//       if (this._element.classList.contains(CLASS_NAME_SHOW)) {
//         this._element.classList.remove(CLASS_NAME_SHOW);
//       }

//       super.dispose();
//     } // Private


//     _getConfig(config) {
//       config = { ...Default,
//         ...Manipulator.getDataAttributes(this._element),
//         ...(typeof config === 'object' && config ? config : {})
//       };
//       typeCheckConfig(NAME, config, this.constructor.DefaultType);
//       return config;
//     }

//     _maybeScheduleHide() {
//       if (!this._config.autohide) {
//         return;
//       }

//       if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
//         return;
//       }

//       this._timeout = setTimeout(() => {
//         this.hide();
//       }, this._config.delay);
//     }

//     _onInteraction(event, isInteracting) {
//       switch (event.type) {
//         case 'mouseover':
//         case 'mouseout':
//           this._hasMouseInteraction = isInteracting;
//           break;

//         case 'focusin':
//         case 'focusout':
//           this._hasKeyboardInteraction = isInteracting;
//           break;
//       }

//       if (isInteracting) {
//         this._clearTimeout();

//         return;
//       }

//       const nextElement = event.relatedTarget;

//       if (this._element === nextElement || this._element.contains(nextElement)) {
//         return;
//       }

//       this._maybeScheduleHide();
//     }

//     _setListeners() {
//       EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
//       EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
//       EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
//       EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
//     }

//     _clearTimeout() {
//       clearTimeout(this._timeout);
//       this._timeout = null;
//     } // Static


//     static jQueryInterface(config) {
//       return this.each(function () {
//         const data = Toast.getOrCreateInstance(this, config);

//         if (typeof config === 'string') {
//           if (typeof data[config] === 'undefined') {
//             throw new TypeError(`No method named "${config}"`);
//           }

//           data[config](this);
//         }
//       });
//     }

//   }

//   enableDismissTrigger(Toast);
//   /**
//    * ------------------------------------------------------------------------
//    * jQuery
//    * ------------------------------------------------------------------------
//    * add .Toast to jQuery only if jQuery is present
//    */

//   defineJQueryPlugin(Toast);

//   /**
//    * --------------------------------------------------------------------------
//    * Bootstrap (v5.1.3): index.umd.js
//    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//    * --------------------------------------------------------------------------
//    */
//   const index_umd = {
//     Alert,
//     Button,
//     Carousel,
//     Collapse,
//     Dropdown,
//     Modal,
//     Offcanvas,
//     Popover,
//     ScrollSpy,
//     Tab,
//     Toast,
//     Tooltip
//   };

//   return index_umd;

// }));
// //# sourceMappingURL=bootstrap.bundle.js.map
/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var t={21:function(t){t.exports=function(){"use strict";const t="transitionend",e=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e},i=t=>{const i=e(t);return i&&document.querySelector(i)?i:null},n=t=>{const i=e(t);return i?document.querySelector(i):null},s=e=>{e.dispatchEvent(new Event(t))},o=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null,a=(t,e,i)=>{Object.keys(i).forEach((n=>{const s=i[n],r=e[n],a=r&&o(r)?"element":null==(l=r)?`${l}`:{}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();var l;if(!new RegExp(s).test(a))throw new TypeError(`${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`)}))},l=t=>!(!o(t)||0===t.getClientRects().length)&&"visible"===getComputedStyle(t).getPropertyValue("visibility"),c=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),h=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?h(t.parentNode):null},d=()=>{},u=t=>{t.offsetHeight},f=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},p=[],g=()=>"rtl"===document.documentElement.dir,m=t=>{var e;e=()=>{const e=f();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface)}},"loading"===document.readyState?(p.length||document.addEventListener("DOMContentLoaded",(()=>{p.forEach((t=>t()))})),p.push(e)):e()},_=t=>{"function"==typeof t&&t()},v=(e,i,n=!0)=>{if(!n)return void _(e);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(i)+5;let r=!1;const a=({target:n})=>{n===i&&(r=!0,i.removeEventListener(t,a),_(e))};i.addEventListener(t,a),setTimeout((()=>{r||s(i)}),o)},b=(t,e,i,n)=>{let s=t.indexOf(e);if(-1===s)return t[!i&&n?t.length-1:0];const o=t.length;return s+=i?1:-1,n&&(s=(s+o)%o),t[Math.max(0,Math.min(s,o-1))]},y=/[^.]*(?=\..*)\.|.*/,w=/\..*/,E=/::\d+$/,A={};let T=1;const O={mouseenter:"mouseover",mouseleave:"mouseout"},C=/^(mouseenter|mouseleave)/i,k=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function L(t,e){return e&&`${e}::${T++}`||t.uidEvent||T++}function x(t){const e=L(t);return t.uidEvent=e,A[e]=A[e]||{},A[e]}function $(t,e,i=null){const n=Object.keys(t);for(let s=0,o=n.length;s<o;s++){const o=t[n[s]];if(o.originalHandler===e&&o.delegationSelector===i)return o}return null}function D(t,e,i){const n="string"==typeof e,s=n?i:e;let o=I(t);return k.has(o)||(o=t),[n,s,o]}function S(t,e,i,n,s){if("string"!=typeof e||!t)return;if(i||(i=n,n=null),C.test(e)){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};n?n=t(n):i=t(i)}const[o,r,a]=D(e,i,n),l=x(t),c=l[a]||(l[a]={}),h=$(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=L(r,e.replace(y,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(let a=o.length;a--;)if(o[a]===r)return s.delegateTarget=r,n.oneOff&&P.off(t,s.type,e,i),i.apply(r,[s]);return null}}(t,i,n):function(t,e){return function i(n){return n.delegateTarget=t,i.oneOff&&P.off(t,n.type,e),e.apply(t,[n])}}(t,i);u.delegationSelector=o?i:null,u.originalHandler=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function N(t,e,i,n,s){const o=$(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent])}function I(t){return t=t.replace(w,""),O[t]||t}const P={on(t,e,i,n){S(t,e,i,n,!1)},one(t,e,i,n){S(t,e,i,n,!0)},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=D(e,i,n),a=r!==e,l=x(t),c=e.startsWith(".");if(void 0!==o){if(!l||!l[r])return;return void N(t,l,r,o,s?i:null)}c&&Object.keys(l).forEach((i=>{!function(t,e,i,n){const s=e[i]||{};Object.keys(s).forEach((o=>{if(o.includes(n)){const n=s[o];N(t,e,i,n.originalHandler,n.delegationSelector)}}))}(t,l,i,e.slice(1))}));const h=l[r]||{};Object.keys(h).forEach((i=>{const n=i.replace(E,"");if(!a||e.includes(n)){const e=h[i];N(t,l,r,e.originalHandler,e.delegationSelector)}}))},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=f(),s=I(e),o=e!==s,r=k.has(s);let a,l=!0,c=!0,h=!1,d=null;return o&&n&&(a=n.Event(e,i),n(t).trigger(a),l=!a.isPropagationStopped(),c=!a.isImmediatePropagationStopped(),h=a.isDefaultPrevented()),r?(d=document.createEvent("HTMLEvents"),d.initEvent(s,l,!0)):d=new CustomEvent(e,{bubbles:l,cancelable:!0}),void 0!==i&&Object.keys(i).forEach((t=>{Object.defineProperty(d,t,{get:()=>i[t]})})),h&&d.preventDefault(),c&&t.dispatchEvent(d),d.defaultPrevented&&void 0!==a&&a.preventDefault(),d}},j=new Map,M={set(t,e,i){j.has(t)||j.set(t,new Map);const n=j.get(t);n.has(e)||0===n.size?n.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)},get:(t,e)=>j.has(t)&&j.get(t).get(e)||null,remove(t,e){if(!j.has(t))return;const i=j.get(t);i.delete(e),0===i.size&&j.delete(t)}};class H{constructor(t){(t=r(t))&&(this._element=t,M.set(this._element,this.constructor.DATA_KEY,this))}dispose(){M.remove(this._element,this.constructor.DATA_KEY),P.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((t=>{this[t]=null}))}_queueCallback(t,e,i=!0){v(t,e,i)}static getInstance(t){return M.get(r(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.1.3"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const B=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,s=t.NAME;P.on(document,i,`[data-bs-dismiss="${s}"]`,(function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),c(this))return;const o=n(this)||this.closest(`.${s}`);t.getOrCreateInstance(o)[e]()}))},R=".bs.alert",W=`close${R}`,z=`closed${R}`;class q extends H{static get NAME(){return"alert"}close(){if(P.trigger(this._element,W).defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,t)}_destroyElement(){this._element.remove(),P.trigger(this._element,z),this.dispose()}static jQueryInterface(t){return this.each((function(){const e=q.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}B(q,"close"),m(q);const F='[data-bs-toggle="button"]';class U extends H{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){const e=U.getOrCreateInstance(this);"toggle"===t&&e[t]()}))}}function V(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function K(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}P.on(document,"click.bs.button.data-api",F,(t=>{t.preventDefault();const e=t.target.closest(F);U.getOrCreateInstance(e).toggle()})),m(U);const X={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${K(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${K(e)}`)},getDataAttributes(t){if(!t)return{};const e={};return Object.keys(t.dataset).filter((t=>t.startsWith("bs"))).forEach((i=>{let n=i.replace(/^bs/,"");n=n.charAt(0).toLowerCase()+n.slice(1,n.length),e[n]=V(t.dataset[i])})),e},getDataAttribute:(t,e)=>V(t.getAttribute(`data-bs-${K(e)}`)),offset(t){const e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},position:t=>({top:t.offsetTop,left:t.offsetLeft})},Y={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let n=t.parentNode;for(;n&&n.nodeType===Node.ELEMENT_NODE&&3!==n.nodeType;)n.matches(e)&&i.push(n),n=n.parentNode;return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(", ");return this.find(e,t).filter((t=>!c(t)&&l(t)))}},Q="carousel",G=".bs.carousel",Z=".data-api",J={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},tt={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},et="next",it="prev",nt="left",st="right",ot={ArrowLeft:st,ArrowRight:nt},rt=`slide${G}`,at=`slid${G}`,lt=`keydown${G}`,ct=`mouseenter${G}`,ht=`mouseleave${G}`,dt=`touchstart${G}`,ut=`touchmove${G}`,ft=`touchend${G}`,pt=`pointerdown${G}`,gt=`pointerup${G}`,mt=`dragstart${G}`,_t=`load${G}${Z}`,vt=`click${G}${Z}`,bt="active",yt=".active.carousel-item";class wt extends H{constructor(t,e){super(t),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._indicatorsElement=Y.findOne(".carousel-indicators",this._element),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent),this._addEventListeners()}static get Default(){return J}static get NAME(){return Q}next(){this._slide(et)}nextWhenVisible(){!document.hidden&&l(this._element)&&this.next()}prev(){this._slide(it)}pause(t){t||(this._isPaused=!0),Y.findOne(".carousel-item-next, .carousel-item-prev",this._element)&&(s(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}cycle(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))}to(t){this._activeElement=Y.findOne(yt,this._element);const e=this._getItemIndex(this._activeElement);if(t>this._items.length-1||t<0)return;if(this._isSliding)return void P.one(this._element,at,(()=>this.to(t)));if(e===t)return this.pause(),void this.cycle();const i=t>e?et:it;this._slide(i,this._items[t])}_getConfig(t){return t={...J,...X.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(Q,t,tt),t}_handleSwipe(){const t=Math.abs(this.touchDeltaX);if(t<=40)return;const e=t/this.touchDeltaX;this.touchDeltaX=0,e&&this._slide(e>0?st:nt)}_addEventListeners(){this._config.keyboard&&P.on(this._element,lt,(t=>this._keydown(t))),"hover"===this._config.pause&&(P.on(this._element,ct,(t=>this.pause(t))),P.on(this._element,ht,(t=>this.cycle(t)))),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()}_addTouchEventListeners(){const t=t=>this._pointerEvent&&("pen"===t.pointerType||"touch"===t.pointerType),e=e=>{t(e)?this.touchStartX=e.clientX:this._pointerEvent||(this.touchStartX=e.touches[0].clientX)},i=t=>{this.touchDeltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this.touchStartX},n=e=>{t(e)&&(this.touchDeltaX=e.clientX-this.touchStartX),this._handleSwipe(),"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((t=>this.cycle(t)),500+this._config.interval))};Y.find(".carousel-item img",this._element).forEach((t=>{P.on(t,mt,(t=>t.preventDefault()))})),this._pointerEvent?(P.on(this._element,pt,(t=>e(t))),P.on(this._element,gt,(t=>n(t))),this._element.classList.add("pointer-event")):(P.on(this._element,dt,(t=>e(t))),P.on(this._element,ut,(t=>i(t))),P.on(this._element,ft,(t=>n(t))))}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=ot[t.key];e&&(t.preventDefault(),this._slide(e))}_getItemIndex(t){return this._items=t&&t.parentNode?Y.find(".carousel-item",t.parentNode):[],this._items.indexOf(t)}_getItemByOrder(t,e){const i=t===et;return b(this._items,e,i,this._config.wrap)}_triggerSlideEvent(t,e){const i=this._getItemIndex(t),n=this._getItemIndex(Y.findOne(yt,this._element));return P.trigger(this._element,rt,{relatedTarget:t,direction:e,from:n,to:i})}_setActiveIndicatorElement(t){if(this._indicatorsElement){const e=Y.findOne(".active",this._indicatorsElement);e.classList.remove(bt),e.removeAttribute("aria-current");const i=Y.find("[data-bs-target]",this._indicatorsElement);for(let e=0;e<i.length;e++)if(Number.parseInt(i[e].getAttribute("data-bs-slide-to"),10)===this._getItemIndex(t)){i[e].classList.add(bt),i[e].setAttribute("aria-current","true");break}}}_updateInterval(){const t=this._activeElement||Y.findOne(yt,this._element);if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}_slide(t,e){const i=this._directionToOrder(t),n=Y.findOne(yt,this._element),s=this._getItemIndex(n),o=e||this._getItemByOrder(i,n),r=this._getItemIndex(o),a=Boolean(this._interval),l=i===et,c=l?"carousel-item-start":"carousel-item-end",h=l?"carousel-item-next":"carousel-item-prev",d=this._orderToDirection(i);if(o&&o.classList.contains(bt))return void(this._isSliding=!1);if(this._isSliding)return;if(this._triggerSlideEvent(o,d).defaultPrevented)return;if(!n||!o)return;this._isSliding=!0,a&&this.pause(),this._setActiveIndicatorElement(o),this._activeElement=o;const f=()=>{P.trigger(this._element,at,{relatedTarget:o,direction:d,from:s,to:r})};if(this._element.classList.contains("slide")){o.classList.add(h),u(o),n.classList.add(c),o.classList.add(c);const t=()=>{o.classList.remove(c,h),o.classList.add(bt),n.classList.remove(bt,h,c),this._isSliding=!1,setTimeout(f,0)};this._queueCallback(t,n,!0)}else n.classList.remove(bt),o.classList.add(bt),this._isSliding=!1,f();a&&this.cycle()}_directionToOrder(t){return[st,nt].includes(t)?g()?t===nt?it:et:t===nt?et:it:t}_orderToDirection(t){return[et,it].includes(t)?g()?t===it?nt:st:t===it?st:nt:t}static carouselInterface(t,e){const i=wt.getOrCreateInstance(t,e);let{_config:n}=i;"object"==typeof e&&(n={...n,...e});const s="string"==typeof e?e:n.slide;if("number"==typeof e)i.to(e);else if("string"==typeof s){if(void 0===i[s])throw new TypeError(`No method named "${s}"`);i[s]()}else n.interval&&n.ride&&(i.pause(),i.cycle())}static jQueryInterface(t){return this.each((function(){wt.carouselInterface(this,t)}))}static dataApiClickHandler(t){const e=n(this);if(!e||!e.classList.contains("carousel"))return;const i={...X.getDataAttributes(e),...X.getDataAttributes(this)},s=this.getAttribute("data-bs-slide-to");s&&(i.interval=!1),wt.carouselInterface(e,i),s&&wt.getInstance(e).to(s),t.preventDefault()}}P.on(document,vt,"[data-bs-slide], [data-bs-slide-to]",wt.dataApiClickHandler),P.on(window,_t,(()=>{const t=Y.find('[data-bs-ride="carousel"]');for(let e=0,i=t.length;e<i;e++)wt.carouselInterface(t[e],wt.getInstance(t[e]))})),m(wt);const Et="collapse",At="bs.collapse",Tt=`.${At}`,Ot={toggle:!0,parent:null},Ct={toggle:"boolean",parent:"(null|element)"},kt=`show${Tt}`,Lt=`shown${Tt}`,xt=`hide${Tt}`,$t=`hidden${Tt}`,Dt=`click${Tt}.data-api`,St="show",Nt="collapse",It="collapsing",Pt="collapsed",jt=`:scope .${Nt} .${Nt}`,Mt='[data-bs-toggle="collapse"]';class Ht extends H{constructor(t,e){super(t),this._isTransitioning=!1,this._config=this._getConfig(e),this._triggerArray=[];const n=Y.find(Mt);for(let t=0,e=n.length;t<e;t++){const e=n[t],s=i(e),o=Y.find(s).filter((t=>t===this._element));null!==s&&o.length&&(this._selector=s,this._triggerArray.push(e))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Ot}static get NAME(){return Et}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t,e=[];if(this._config.parent){const t=Y.find(jt,this._config.parent);e=Y.find(".collapse.show, .collapse.collapsing",this._config.parent).filter((e=>!t.includes(e)))}const i=Y.findOne(this._selector);if(e.length){const n=e.find((t=>i!==t));if(t=n?Ht.getInstance(n):null,t&&t._isTransitioning)return}if(P.trigger(this._element,kt).defaultPrevented)return;e.forEach((e=>{i!==e&&Ht.getOrCreateInstance(e,{toggle:!1}).hide(),t||M.set(e,At,null)}));const n=this._getDimension();this._element.classList.remove(Nt),this._element.classList.add(It),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const s=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(It),this._element.classList.add(Nt,St),this._element.style[n]="",P.trigger(this._element,Lt)}),this._element,!0),this._element.style[n]=`${this._element[s]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(P.trigger(this._element,xt).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,u(this._element),this._element.classList.add(It),this._element.classList.remove(Nt,St);const e=this._triggerArray.length;for(let t=0;t<e;t++){const e=this._triggerArray[t],i=n(e);i&&!this._isShown(i)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(It),this._element.classList.add(Nt),P.trigger(this._element,$t)}),this._element,!0)}_isShown(t=this._element){return t.classList.contains(St)}_getConfig(t){return(t={...Ot,...X.getDataAttributes(this._element),...t}).toggle=Boolean(t.toggle),t.parent=r(t.parent),a(Et,t,Ct),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=Y.find(jt,this._config.parent);Y.find(Mt,this._config.parent).filter((e=>!t.includes(e))).forEach((t=>{const e=n(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}))}_addAriaAndCollapsedClass(t,e){t.length&&t.forEach((t=>{e?t.classList.remove(Pt):t.classList.add(Pt),t.setAttribute("aria-expanded",e)}))}static jQueryInterface(t){return this.each((function(){const e={};"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1);const i=Ht.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}}))}}P.on(document,Dt,Mt,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const e=i(this);Y.find(e).forEach((t=>{Ht.getOrCreateInstance(t,{toggle:!1}).toggle()}))})),m(Ht);var Bt="top",Rt="bottom",Wt="right",zt="left",qt="auto",Ft=[Bt,Rt,Wt,zt],Ut="start",Vt="end",Kt="clippingParents",Xt="viewport",Yt="popper",Qt="reference",Gt=Ft.reduce((function(t,e){return t.concat([e+"-"+Ut,e+"-"+Vt])}),[]),Zt=[].concat(Ft,[qt]).reduce((function(t,e){return t.concat([e,e+"-"+Ut,e+"-"+Vt])}),[]),Jt="beforeRead",te="read",ee="afterRead",ie="beforeMain",ne="main",se="afterMain",oe="beforeWrite",re="write",ae="afterWrite",le=[Jt,te,ee,ie,ne,se,oe,re,ae];function ce(t){return t?(t.nodeName||"").toLowerCase():null}function he(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function de(t){return t instanceof he(t).Element||t instanceof Element}function ue(t){return t instanceof he(t).HTMLElement||t instanceof HTMLElement}function fe(t){return"undefined"!=typeof ShadowRoot&&(t instanceof he(t).ShadowRoot||t instanceof ShadowRoot)}const pe={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];ue(s)&&ce(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});ue(n)&&ce(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]};function ge(t){return t.split("-")[0]}function me(t,e){var i=t.getBoundingClientRect();return{width:i.width/1,height:i.height/1,top:i.top/1,right:i.right/1,bottom:i.bottom/1,left:i.left/1,x:i.left/1,y:i.top/1}}function _e(t){var e=me(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function ve(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&fe(i)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function be(t){return he(t).getComputedStyle(t)}function ye(t){return["table","td","th"].indexOf(ce(t))>=0}function we(t){return((de(t)?t.ownerDocument:t.document)||window.document).documentElement}function Ee(t){return"html"===ce(t)?t:t.assignedSlot||t.parentNode||(fe(t)?t.host:null)||we(t)}function Ae(t){return ue(t)&&"fixed"!==be(t).position?t.offsetParent:null}function Te(t){for(var e=he(t),i=Ae(t);i&&ye(i)&&"static"===be(i).position;)i=Ae(i);return i&&("html"===ce(i)||"body"===ce(i)&&"static"===be(i).position)?e:i||function(t){var e=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&ue(t)&&"fixed"===be(t).position)return null;for(var i=Ee(t);ue(i)&&["html","body"].indexOf(ce(i))<0;){var n=be(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode}return null}(t)||e}function Oe(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}var Ce=Math.max,ke=Math.min,Le=Math.round;function xe(t,e,i){return Ce(t,ke(e,i))}function $e(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function De(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}const Se={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=ge(i.placement),l=Oe(a),c=[zt,Wt].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return $e("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:De(t,Ft))}(s.padding,i),d=_e(o),u="y"===l?Bt:zt,f="y"===l?Rt:Wt,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],g=r[l]-i.rects.reference[l],m=Te(o),_=m?"y"===l?m.clientHeight||0:m.clientWidth||0:0,v=p/2-g/2,b=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+v,E=xe(b,w,y),A=l;i.modifiersData[n]=((e={})[A]=E,e.centerOffset=E-w,e)}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&ve(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Ne(t){return t.split("-")[1]}var Ie={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Pe(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.variation,r=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,h=t.roundOffsets,d=!0===h?function(t){var e=t.x,i=t.y,n=window.devicePixelRatio||1;return{x:Le(Le(e*n)/n)||0,y:Le(Le(i*n)/n)||0}}(r):"function"==typeof h?h(r):r,u=d.x,f=void 0===u?0:u,p=d.y,g=void 0===p?0:p,m=r.hasOwnProperty("x"),_=r.hasOwnProperty("y"),v=zt,b=Bt,y=window;if(c){var w=Te(i),E="clientHeight",A="clientWidth";w===he(i)&&"static"!==be(w=we(i)).position&&"absolute"===a&&(E="scrollHeight",A="scrollWidth"),s!==Bt&&(s!==zt&&s!==Wt||o!==Vt)||(b=Rt,g-=w[E]-n.height,g*=l?1:-1),s!==zt&&(s!==Bt&&s!==Rt||o!==Vt)||(v=Wt,f-=w[A]-n.width,f*=l?1:-1)}var T,O=Object.assign({position:a},c&&Ie);return l?Object.assign({},O,((T={})[b]=_?"0":"",T[v]=m?"0":"",T.transform=(y.devicePixelRatio||1)<=1?"translate("+f+"px, "+g+"px)":"translate3d("+f+"px, "+g+"px, 0)",T)):Object.assign({},O,((e={})[b]=_?g+"px":"",e[v]=m?f+"px":"",e.transform="",e))}const je={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:ge(e.placement),variation:Ne(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,Pe(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,Pe(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var Me={passive:!0};const He={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=he(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,Me)})),a&&l.addEventListener("resize",i.update,Me),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,Me)})),a&&l.removeEventListener("resize",i.update,Me)}},data:{}};var Be={left:"right",right:"left",bottom:"top",top:"bottom"};function Re(t){return t.replace(/left|right|bottom|top/g,(function(t){return Be[t]}))}var We={start:"end",end:"start"};function ze(t){return t.replace(/start|end/g,(function(t){return We[t]}))}function qe(t){var e=he(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Fe(t){return me(we(t)).left+qe(t).scrollLeft}function Ue(t){var e=be(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(i+s+n)}function Ve(t){return["html","body","#document"].indexOf(ce(t))>=0?t.ownerDocument.body:ue(t)&&Ue(t)?t:Ve(Ee(t))}function Ke(t,e){var i;void 0===e&&(e=[]);var n=Ve(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=he(n),r=s?[o].concat(o.visualViewport||[],Ue(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Ke(Ee(r)))}function Xe(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Ye(t,e){return e===Xt?Xe(function(t){var e=he(t),i=we(t),n=e.visualViewport,s=i.clientWidth,o=i.clientHeight,r=0,a=0;return n&&(s=n.width,o=n.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(r=n.offsetLeft,a=n.offsetTop)),{width:s,height:o,x:r+Fe(t),y:a}}(t)):ue(e)?function(t){var e=me(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}(e):Xe(function(t){var e,i=we(t),n=qe(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=Ce(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=Ce(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+Fe(t),l=-n.scrollTop;return"rtl"===be(s||i).direction&&(a+=Ce(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(we(t)))}function Qe(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?ge(s):null,r=s?Ne(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case Bt:e={x:a,y:i.y-n.height};break;case Rt:e={x:a,y:i.y+i.height};break;case Wt:e={x:i.x+i.width,y:l};break;case zt:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y}}var c=o?Oe(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case Ut:e[c]=e[c]-(i[h]/2-n[h]/2);break;case Vt:e[c]=e[c]+(i[h]/2-n[h]/2)}}return e}function Ge(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.boundary,r=void 0===o?Kt:o,a=i.rootBoundary,l=void 0===a?Xt:a,c=i.elementContext,h=void 0===c?Yt:c,d=i.altBoundary,u=void 0!==d&&d,f=i.padding,p=void 0===f?0:f,g=$e("number"!=typeof p?p:De(p,Ft)),m=h===Yt?Qt:Yt,_=t.rects.popper,v=t.elements[u?m:h],b=function(t,e,i){var n="clippingParents"===e?function(t){var e=Ke(Ee(t)),i=["absolute","fixed"].indexOf(be(t).position)>=0&&ue(t)?Te(t):t;return de(i)?e.filter((function(t){return de(t)&&ve(t,i)&&"body"!==ce(t)})):[]}(t):[].concat(e),s=[].concat(n,[i]),o=s[0],r=s.reduce((function(e,i){var n=Ye(t,i);return e.top=Ce(n.top,e.top),e.right=ke(n.right,e.right),e.bottom=ke(n.bottom,e.bottom),e.left=Ce(n.left,e.left),e}),Ye(t,o));return r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}(de(v)?v:v.contextElement||we(t.elements.popper),r,l),y=me(t.elements.reference),w=Qe({reference:y,element:_,strategy:"absolute",placement:s}),E=Xe(Object.assign({},_,w)),A=h===Yt?E:y,T={top:b.top-A.top+g.top,bottom:A.bottom-b.bottom+g.bottom,left:b.left-A.left+g.left,right:A.right-b.right+g.right},O=t.modifiersData.offset;if(h===Yt&&O){var C=O[s];Object.keys(T).forEach((function(t){var e=[Wt,Rt].indexOf(t)>=0?1:-1,i=[Bt,Rt].indexOf(t)>=0?"y":"x";T[t]+=C[i]*e}))}return T}const Ze={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,g=i.allowedAutoPlacements,m=e.options.placement,_=ge(m),v=l||(_!==m&&p?function(t){if(ge(t)===qt)return[];var e=Re(t);return[ze(t),e,ze(e)]}(m):[Re(m)]),b=[m].concat(v).reduce((function(t,i){return t.concat(ge(i)===qt?function(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?Zt:l,h=Ne(n),d=h?a?Gt:Gt.filter((function(t){return Ne(t)===h})):Ft,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=Ge(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[ge(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:g}):i)}),[]),y=e.rects.reference,w=e.rects.popper,E=new Map,A=!0,T=b[0],O=0;O<b.length;O++){var C=b[O],k=ge(C),L=Ne(C)===Ut,x=[Bt,Rt].indexOf(k)>=0,$=x?"width":"height",D=Ge(e,{placement:C,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),S=x?L?Wt:zt:L?Rt:Bt;y[$]>w[$]&&(S=Re(S));var N=Re(S),I=[];if(o&&I.push(D[k]<=0),a&&I.push(D[S]<=0,D[N]<=0),I.every((function(t){return t}))){T=C,A=!1;break}E.set(C,I)}if(A)for(var P=function(t){var e=b.find((function(e){var i=E.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},j=p?3:1;j>0&&"break"!==P(j);j--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function Je(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function ti(t){return[Bt,Wt,Rt,zt].some((function(e){return t[e]>=0}))}const ei={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=Ge(e,{elementContext:"reference"}),a=Ge(e,{altBoundary:!0}),l=Je(r,n),c=Je(a,s,o),h=ti(l),d=ti(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d})}},ii={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=Zt.reduce((function(t,i){return t[i]=function(t,e,i){var n=ge(t),s=[zt,Bt].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[zt,Wt].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r}},ni={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=Qe({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},si={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,g=void 0===p?0:p,m=Ge(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=ge(e.placement),v=Ne(e.placement),b=!v,y=Oe(_),w="x"===y?"y":"x",E=e.modifiersData.popperOffsets,A=e.rects.reference,T=e.rects.popper,O="function"==typeof g?g(Object.assign({},e.rects,{placement:e.placement})):g,C={x:0,y:0};if(E){if(o||a){var k="y"===y?Bt:zt,L="y"===y?Rt:Wt,x="y"===y?"height":"width",$=E[y],D=E[y]+m[k],S=E[y]-m[L],N=f?-T[x]/2:0,I=v===Ut?A[x]:T[x],P=v===Ut?-T[x]:-A[x],j=e.elements.arrow,M=f&&j?_e(j):{width:0,height:0},H=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},B=H[k],R=H[L],W=xe(0,A[x],M[x]),z=b?A[x]/2-N-W-B-O:I-W-B-O,q=b?-A[x]/2+N+W+R+O:P+W+R+O,F=e.elements.arrow&&Te(e.elements.arrow),U=F?"y"===y?F.clientTop||0:F.clientLeft||0:0,V=e.modifiersData.offset?e.modifiersData.offset[e.placement][y]:0,K=E[y]+z-V-U,X=E[y]+q-V;if(o){var Y=xe(f?ke(D,K):D,$,f?Ce(S,X):S);E[y]=Y,C[y]=Y-$}if(a){var Q="x"===y?Bt:zt,G="x"===y?Rt:Wt,Z=E[w],J=Z+m[Q],tt=Z-m[G],et=xe(f?ke(J,K):J,Z,f?Ce(tt,X):tt);E[w]=et,C[w]=et-Z}}e.modifiersData[n]=C}},requiresIfExists:["offset"]};function oi(t,e,i){void 0===i&&(i=!1);var n=ue(e);ue(e)&&function(t){var e=t.getBoundingClientRect();e.width,t.offsetWidth,e.height,t.offsetHeight}(e);var s,o,r=we(e),a=me(t),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!i)&&(("body"!==ce(e)||Ue(r))&&(l=(s=e)!==he(s)&&ue(s)?{scrollLeft:(o=s).scrollLeft,scrollTop:o.scrollTop}:qe(s)),ue(e)?((c=me(e)).x+=e.clientLeft,c.y+=e.clientTop):r&&(c.x=Fe(r))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function ri(t){var e=new Map,i=new Set,n=[];function s(t){i.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!i.has(t)){var n=e.get(t);n&&s(n)}})),n.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){i.has(t.name)||s(t)})),n}var ai={placement:"bottom",modifiers:[],strategy:"absolute"};function li(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function ci(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?ai:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},ai,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){var s="function"==typeof i?i(a.options):i;d(),a.options=Object.assign({},o,a.options,s),a.scrollParents={reference:de(t)?Ke(t):t.contextElement?Ke(t.contextElement):[],popper:Ke(e)};var r,c,u=function(t){var e=ri(t);return le.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((r=[].concat(n,a.options.modifiers),c=r.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){})}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(li(e,i)){a.rects={reference:oi(e,Te(i),"fixed"===a.options.strategy),popper:_e(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a)}else a.reset=!1,n=-1}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a)}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s())}))}))),r}),destroy:function(){d(),c=!0}};if(!li(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t)})),h}}var hi=ci(),di=ci({defaultModifiers:[He,ni,je,pe]}),ui=ci({defaultModifiers:[He,ni,je,pe,ii,Ze,si,Se,ei]});const fi=Object.freeze({__proto__:null,popperGenerator:ci,detectOverflow:Ge,createPopperBase:hi,createPopper:ui,createPopperLite:di,top:Bt,bottom:Rt,right:Wt,left:zt,auto:qt,basePlacements:Ft,start:Ut,end:Vt,clippingParents:Kt,viewport:Xt,popper:Yt,reference:Qt,variationPlacements:Gt,placements:Zt,beforeRead:Jt,read:te,afterRead:ee,beforeMain:ie,main:ne,afterMain:se,beforeWrite:oe,write:re,afterWrite:ae,modifierPhases:le,applyStyles:pe,arrow:Se,computeStyles:je,eventListeners:He,flip:Ze,hide:ei,offset:ii,popperOffsets:ni,preventOverflow:si}),pi="dropdown",gi=".bs.dropdown",mi=".data-api",_i="Escape",vi="Space",bi="ArrowUp",yi="ArrowDown",wi=new RegExp(`${bi}|${yi}|${_i}`),Ei=`hide${gi}`,Ai=`hidden${gi}`,Ti=`show${gi}`,Oi=`shown${gi}`,Ci=`click${gi}${mi}`,ki=`keydown${gi}${mi}`,Li=`keyup${gi}${mi}`,xi="show",$i='[data-bs-toggle="dropdown"]',Di=".dropdown-menu",Si=g()?"top-end":"top-start",Ni=g()?"top-start":"top-end",Ii=g()?"bottom-end":"bottom-start",Pi=g()?"bottom-start":"bottom-end",ji=g()?"left-start":"right-start",Mi=g()?"right-start":"left-start",Hi={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},Bi={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"};class Ri extends H{constructor(t,e){super(t),this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar()}static get Default(){return Hi}static get DefaultType(){return Bi}static get NAME(){return pi}toggle(){return this._isShown()?this.hide():this.show()}show(){if(c(this._element)||this._isShown(this._menu))return;const t={relatedTarget:this._element};if(P.trigger(this._element,Ti,t).defaultPrevented)return;const e=Ri.getParentFromElement(this._element);this._inNavbar?X.setDataAttribute(this._menu,"popper","none"):this._createPopper(e),"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((t=>P.on(t,"mouseover",d))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(xi),this._element.classList.add(xi),P.trigger(this._element,Oi,t)}hide(){if(c(this._element)||!this._isShown(this._menu))return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){P.trigger(this._element,Ei,t).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>P.off(t,"mouseover",d))),this._popper&&this._popper.destroy(),this._menu.classList.remove(xi),this._element.classList.remove(xi),this._element.setAttribute("aria-expanded","false"),X.removeDataAttribute(this._menu,"popper"),P.trigger(this._element,Ai,t))}_getConfig(t){if(t={...this.constructor.Default,...X.getDataAttributes(this._element),...t},a(pi,t,this.constructor.DefaultType),"object"==typeof t.reference&&!o(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${pi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(t){if(void 0===fi)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=t:o(this._config.reference)?e=r(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const i=this._getPopperConfig(),n=i.modifiers.find((t=>"applyStyles"===t.name&&!1===t.enabled));this._popper=ui(e,this._menu,i),n&&X.setDataAttribute(this._menu,"popper","static")}_isShown(t=this._element){return t.classList.contains(xi)}_getMenuElement(){return Y.next(this._element,Di)[0]}_getPlacement(){const t=this._element.parentNode;if(t.classList.contains("dropend"))return ji;if(t.classList.contains("dropstart"))return Mi;const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?Ni:Si:e?Pi:Ii}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return"static"===this._config.display&&(t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,..."function"==typeof this._config.popperConfig?this._config.popperConfig(t):this._config.popperConfig}}_selectMenuItem({key:t,target:e}){const i=Y.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(l);i.length&&b(i,e,t===yi,!i.includes(e)).focus()}static jQueryInterface(t){return this.each((function(){const e=Ri.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return;const e=Y.find($i);for(let i=0,n=e.length;i<n;i++){const n=Ri.getInstance(e[i]);if(!n||!1===n._config.autoClose)continue;if(!n._isShown())continue;const s={relatedTarget:n._element};if(t){const e=t.composedPath(),i=e.includes(n._menu);if(e.includes(n._element)||"inside"===n._config.autoClose&&!i||"outside"===n._config.autoClose&&i)continue;if(n._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;"click"===t.type&&(s.clickEvent=t)}n._completeHide(s)}}static getParentFromElement(t){return n(t)||t.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?t.key===vi||t.key!==_i&&(t.key!==yi&&t.key!==bi||t.target.closest(Di)):!wi.test(t.key))return;const e=this.classList.contains(xi);if(!e&&t.key===_i)return;if(t.preventDefault(),t.stopPropagation(),c(this))return;const i=this.matches($i)?this:Y.prev(this,$i)[0],n=Ri.getOrCreateInstance(i);if(t.key!==_i)return t.key===bi||t.key===yi?(e||n.show(),void n._selectMenuItem(t)):void(e&&t.key!==vi||Ri.clearMenus());n.hide()}}P.on(document,ki,$i,Ri.dataApiKeydownHandler),P.on(document,ki,Di,Ri.dataApiKeydownHandler),P.on(document,Ci,Ri.clearMenus),P.on(document,Li,Ri.clearMenus),P.on(document,Ci,$i,(function(t){t.preventDefault(),Ri.getOrCreateInstance(this).toggle()})),m(Ri);const Wi=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",zi=".sticky-top";class qi{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,"paddingRight",(e=>e+t)),this._setElementAttributes(Wi,"paddingRight",(e=>e+t)),this._setElementAttributes(zi,"marginRight",(e=>e-t))}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t)[e];t.style[e]=`${i(Number.parseFloat(s))}px`}))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,"paddingRight"),this._resetElementAttributes(Wi,"paddingRight"),this._resetElementAttributes(zi,"marginRight")}_saveInitialAttribute(t,e){const i=t.style[e];i&&X.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=X.getDataAttribute(t,e);void 0===i?t.style.removeProperty(e):(X.removeDataAttribute(t,e),t.style[e]=i)}))}_applyManipulationCallback(t,e){o(t)?e(t):Y.find(t,this._element).forEach(e)}isOverflowing(){return this.getWidth()>0}}const Fi={className:"modal-backdrop",isVisible:!0,isAnimated:!1,rootElement:"body",clickCallback:null},Ui={className:"string",isVisible:"boolean",isAnimated:"boolean",rootElement:"(element|string)",clickCallback:"(function|null)"},Vi="backdrop",Ki="show",Xi=`mousedown.bs.${Vi}`;class Yi{constructor(t){this._config=this._getConfig(t),this._isAppended=!1,this._element=null}show(t){this._config.isVisible?(this._append(),this._config.isAnimated&&u(this._getElement()),this._getElement().classList.add(Ki),this._emulateAnimation((()=>{_(t)}))):_(t)}hide(t){this._config.isVisible?(this._getElement().classList.remove(Ki),this._emulateAnimation((()=>{this.dispose(),_(t)}))):_(t)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_getConfig(t){return(t={...Fi,..."object"==typeof t?t:{}}).rootElement=r(t.rootElement),a(Vi,t,Ui),t}_append(){this._isAppended||(this._config.rootElement.append(this._getElement()),P.on(this._getElement(),Xi,(()=>{_(this._config.clickCallback)})),this._isAppended=!0)}dispose(){this._isAppended&&(P.off(this._element,Xi),this._element.remove(),this._isAppended=!1)}_emulateAnimation(t){v(t,this._getElement(),this._config.isAnimated)}}const Qi={trapElement:null,autofocus:!0},Gi={trapElement:"element",autofocus:"boolean"},Zi=".bs.focustrap",Ji=`focusin${Zi}`,tn=`keydown.tab${Zi}`,en="backward";class nn{constructor(t){this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}activate(){const{trapElement:t,autofocus:e}=this._config;this._isActive||(e&&t.focus(),P.off(document,Zi),P.on(document,Ji,(t=>this._handleFocusin(t))),P.on(document,tn,(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,P.off(document,Zi))}_handleFocusin(t){const{target:e}=t,{trapElement:i}=this._config;if(e===document||e===i||i.contains(e))return;const n=Y.focusableChildren(i);0===n.length?i.focus():this._lastTabNavDirection===en?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?en:"forward")}_getConfig(t){return t={...Qi,..."object"==typeof t?t:{}},a("focustrap",t,Gi),t}}const sn="modal",on=".bs.modal",rn="Escape",an={backdrop:!0,keyboard:!0,focus:!0},ln={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"},cn=`hide${on}`,hn=`hidePrevented${on}`,dn=`hidden${on}`,un=`show${on}`,fn=`shown${on}`,pn=`resize${on}`,gn=`click.dismiss${on}`,mn=`keydown.dismiss${on}`,_n=`mouseup.dismiss${on}`,vn=`mousedown.dismiss${on}`,bn=`click${on}.data-api`,yn="modal-open",wn="show",En="modal-static";class An extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._dialog=Y.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollBar=new qi}static get Default(){return an}static get NAME(){return sn}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||P.trigger(this._element,un,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isAnimated()&&(this._isTransitioning=!0),this._scrollBar.hide(),document.body.classList.add(yn),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),P.on(this._dialog,vn,(()=>{P.one(this._element,_n,(t=>{t.target===this._element&&(this._ignoreBackdropClick=!0)}))})),this._showBackdrop((()=>this._showElement(t))))}hide(){if(!this._isShown||this._isTransitioning)return;if(P.trigger(this._element,cn).defaultPrevented)return;this._isShown=!1;const t=this._isAnimated();t&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),this._focustrap.deactivate(),this._element.classList.remove(wn),P.off(this._element,gn),P.off(this._dialog,vn),this._queueCallback((()=>this._hideModal()),this._element,t)}dispose(){[window,this._dialog].forEach((t=>P.off(t,on))),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Yi({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new nn({trapElement:this._element})}_getConfig(t){return t={...an,...X.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(sn,t,ln),t}_showElement(t){const e=this._isAnimated(),i=Y.findOne(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,i&&(i.scrollTop=0),e&&u(this._element),this._element.classList.add(wn),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,P.trigger(this._element,fn,{relatedTarget:t})}),this._dialog,e)}_setEscapeEvent(){this._isShown?P.on(this._element,mn,(t=>{this._config.keyboard&&t.key===rn?(t.preventDefault(),this.hide()):this._config.keyboard||t.key!==rn||this._triggerBackdropTransition()})):P.off(this._element,mn)}_setResizeEvent(){this._isShown?P.on(window,pn,(()=>this._adjustDialog())):P.off(window,pn)}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(yn),this._resetAdjustments(),this._scrollBar.reset(),P.trigger(this._element,dn)}))}_showBackdrop(t){P.on(this._element,gn,(t=>{this._ignoreBackdropClick?this._ignoreBackdropClick=!1:t.target===t.currentTarget&&(!0===this._config.backdrop?this.hide():"static"===this._config.backdrop&&this._triggerBackdropTransition())})),this._backdrop.show(t)}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(P.trigger(this._element,hn).defaultPrevented)return;const{classList:t,scrollHeight:e,style:i}=this._element,n=e>document.documentElement.clientHeight;!n&&"hidden"===i.overflowY||t.contains(En)||(n||(i.overflowY="hidden"),t.add(En),this._queueCallback((()=>{t.remove(En),n||this._queueCallback((()=>{i.overflowY=""}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;(!i&&t&&!g()||i&&!t&&g())&&(this._element.style.paddingLeft=`${e}px`),(i&&!t&&!g()||!i&&t&&g())&&(this._element.style.paddingRight=`${e}px`)}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=An.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}P.on(document,bn,'[data-bs-toggle="modal"]',(function(t){const e=n(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),P.one(e,un,(t=>{t.defaultPrevented||P.one(e,dn,(()=>{l(this)&&this.focus()}))}));const i=Y.findOne(".modal.show");i&&An.getInstance(i).hide(),An.getOrCreateInstance(e).toggle(this)})),B(An),m(An);const Tn="offcanvas",On=".bs.offcanvas",Cn=".data-api",kn=`load${On}${Cn}`,Ln={backdrop:!0,keyboard:!0,scroll:!1},xn={backdrop:"boolean",keyboard:"boolean",scroll:"boolean"},$n="show",Dn=".offcanvas.show",Sn=`show${On}`,Nn=`shown${On}`,In=`hide${On}`,Pn=`hidden${On}`,jn=`click${On}${Cn}`,Mn=`keydown.dismiss${On}`;class Hn extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get NAME(){return Tn}static get Default(){return Ln}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||P.trigger(this._element,Sn,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._element.style.visibility="visible",this._backdrop.show(),this._config.scroll||(new qi).hide(),this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add($n),this._queueCallback((()=>{this._config.scroll||this._focustrap.activate(),P.trigger(this._element,Nn,{relatedTarget:t})}),this._element,!0))}hide(){this._isShown&&(P.trigger(this._element,In).defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.remove($n),this._backdrop.hide(),this._queueCallback((()=>{this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._element.style.visibility="hidden",this._config.scroll||(new qi).reset(),P.trigger(this._element,Pn)}),this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_getConfig(t){return t={...Ln,...X.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(Tn,t,xn),t}_initializeBackDrop(){return new Yi({className:"offcanvas-backdrop",isVisible:this._config.backdrop,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:()=>this.hide()})}_initializeFocusTrap(){return new nn({trapElement:this._element})}_addEventListeners(){P.on(this._element,Mn,(t=>{this._config.keyboard&&"Escape"===t.key&&this.hide()}))}static jQueryInterface(t){return this.each((function(){const e=Hn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}P.on(document,jn,'[data-bs-toggle="offcanvas"]',(function(t){const e=n(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),c(this))return;P.one(e,Pn,(()=>{l(this)&&this.focus()}));const i=Y.findOne(Dn);i&&i!==e&&Hn.getInstance(i).hide(),Hn.getOrCreateInstance(e).toggle(this)})),P.on(window,kn,(()=>Y.find(Dn).forEach((t=>Hn.getOrCreateInstance(t).show())))),B(Hn),m(Hn);const Bn=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Rn=/^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,Wn=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,zn=(t,e)=>{const i=t.nodeName.toLowerCase();if(e.includes(i))return!Bn.has(i)||Boolean(Rn.test(t.nodeValue)||Wn.test(t.nodeValue));const n=e.filter((t=>t instanceof RegExp));for(let t=0,e=n.length;t<e;t++)if(n[t].test(i))return!0;return!1};function qn(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=[].concat(...n.body.querySelectorAll("*"));for(let t=0,i=s.length;t<i;t++){const i=s[t],n=i.nodeName.toLowerCase();if(!Object.keys(e).includes(n)){i.remove();continue}const o=[].concat(...i.attributes),r=[].concat(e["*"]||[],e[n]||[]);o.forEach((t=>{zn(t,r)||i.removeAttribute(t.nodeName)}))}return n.body.innerHTML}const Fn="tooltip",Un=".bs.tooltip",Vn=new Set(["sanitize","allowList","sanitizeFn"]),Kn={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(array|string|function)",container:"(string|element|boolean)",fallbackPlacements:"array",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object|function)"},Xn={AUTO:"auto",TOP:"top",RIGHT:g()?"left":"right",BOTTOM:"bottom",LEFT:g()?"right":"left"},Yn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:[0,0],container:!1,fallbackPlacements:["top","right","bottom","left"],boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:{"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},popperConfig:null},Qn={HIDE:`hide${Un}`,HIDDEN:`hidden${Un}`,SHOW:`show${Un}`,SHOWN:`shown${Un}`,INSERTED:`inserted${Un}`,CLICK:`click${Un}`,FOCUSIN:`focusin${Un}`,FOCUSOUT:`focusout${Un}`,MOUSEENTER:`mouseenter${Un}`,MOUSELEAVE:`mouseleave${Un}`},Gn="fade",Zn="show",Jn="show",ts="out",es=".tooltip-inner",is=".modal",ns="hide.bs.modal",ss="hover",os="focus";class rs extends H{constructor(t,e){if(void 0===fi)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this._config=this._getConfig(e),this.tip=null,this._setListeners()}static get Default(){return Yn}static get NAME(){return Fn}static get Event(){return Qn}static get DefaultType(){return Kn}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(t){if(this._isEnabled)if(t){const e=this._initializeOnDelegatedTarget(t);e._activeTrigger.click=!e._activeTrigger.click,e._isWithActiveTrigger()?e._enter(null,e):e._leave(null,e)}else{if(this.getTipElement().classList.contains(Zn))return void this._leave(null,this);this._enter(null,this)}}dispose(){clearTimeout(this._timeout),P.off(this._element.closest(is),ns,this._hideModalHandler),this.tip&&this.tip.remove(),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this.isWithContent()||!this._isEnabled)return;const t=P.trigger(this._element,this.constructor.Event.SHOW),e=h(this._element),i=null===e?this._element.ownerDocument.documentElement.contains(this._element):e.contains(this._element);if(t.defaultPrevented||!i)return;"tooltip"===this.constructor.NAME&&this.tip&&this.getTitle()!==this.tip.querySelector(es).innerHTML&&(this._disposePopper(),this.tip.remove(),this.tip=null);const n=this.getTipElement(),s=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME);n.setAttribute("id",s),this._element.setAttribute("aria-describedby",s),this._config.animation&&n.classList.add(Gn);const o="function"==typeof this._config.placement?this._config.placement.call(this,n,this._element):this._config.placement,r=this._getAttachment(o);this._addAttachmentClass(r);const{container:a}=this._config;M.set(n,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||(a.append(n),P.trigger(this._element,this.constructor.Event.INSERTED)),this._popper?this._popper.update():this._popper=ui(this._element,n,this._getPopperConfig(r)),n.classList.add(Zn);const l=this._resolvePossibleFunction(this._config.customClass);l&&n.classList.add(...l.split(" ")),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>{P.on(t,"mouseover",d)}));const c=this.tip.classList.contains(Gn);this._queueCallback((()=>{const t=this._hoverState;this._hoverState=null,P.trigger(this._element,this.constructor.Event.SHOWN),t===ts&&this._leave(null,this)}),this.tip,c)}hide(){if(!this._popper)return;const t=this.getTipElement();if(P.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented)return;t.classList.remove(Zn),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>P.off(t,"mouseover",d))),this._activeTrigger.click=!1,this._activeTrigger[os]=!1,this._activeTrigger[ss]=!1;const e=this.tip.classList.contains(Gn);this._queueCallback((()=>{this._isWithActiveTrigger()||(this._hoverState!==Jn&&t.remove(),this._cleanTipClass(),this._element.removeAttribute("aria-describedby"),P.trigger(this._element,this.constructor.Event.HIDDEN),this._disposePopper())}),this.tip,e),this._hoverState=""}update(){null!==this._popper&&this._popper.update()}isWithContent(){return Boolean(this.getTitle())}getTipElement(){if(this.tip)return this.tip;const t=document.createElement("div");t.innerHTML=this._config.template;const e=t.children[0];return this.setContent(e),e.classList.remove(Gn,Zn),this.tip=e,this.tip}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),es)}_sanitizeAndSetContent(t,e,i){const n=Y.findOne(i,t);e||!n?this.setElementContent(n,e):n.remove()}setElementContent(t,e){if(null!==t)return o(e)?(e=r(e),void(this._config.html?e.parentNode!==t&&(t.innerHTML="",t.append(e)):t.textContent=e.textContent)):void(this._config.html?(this._config.sanitize&&(e=qn(e,this._config.allowList,this._config.sanitizeFn)),t.innerHTML=e):t.textContent=e)}getTitle(){const t=this._element.getAttribute("data-bs-original-title")||this._config.title;return this._resolvePossibleFunction(t)}updateAttachment(t){return"right"===t?"end":"left"===t?"start":t}_initializeOnDelegatedTarget(t,e){return e||this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return"function"==typeof t?t.call(this._element):t}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:t=>this._handlePopperPlacementChange(t)}],onFirstUpdate:t=>{t.options.placement!==t.placement&&this._handlePopperPlacementChange(t)}};return{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_addAttachmentClass(t){this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`)}_getAttachment(t){return Xn[t.toUpperCase()]}_setListeners(){this._config.trigger.split(" ").forEach((t=>{if("click"===t)P.on(this._element,this.constructor.Event.CLICK,this._config.selector,(t=>this.toggle(t)));else if("manual"!==t){const e=t===ss?this.constructor.Event.MOUSEENTER:this.constructor.Event.FOCUSIN,i=t===ss?this.constructor.Event.MOUSELEAVE:this.constructor.Event.FOCUSOUT;P.on(this._element,e,this._config.selector,(t=>this._enter(t))),P.on(this._element,i,this._config.selector,(t=>this._leave(t)))}})),this._hideModalHandler=()=>{this._element&&this.hide()},P.on(this._element.closest(is),ns,this._hideModalHandler),this._config.selector?this._config={...this._config,trigger:"manual",selector:""}:this._fixTitle()}_fixTitle(){const t=this._element.getAttribute("title"),e=typeof this._element.getAttribute("data-bs-original-title");(t||"string"!==e)&&(this._element.setAttribute("data-bs-original-title",t||""),!t||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",t),this._element.setAttribute("title",""))}_enter(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusin"===t.type?os:ss]=!0),e.getTipElement().classList.contains(Zn)||e._hoverState===Jn?e._hoverState=Jn:(clearTimeout(e._timeout),e._hoverState=Jn,e._config.delay&&e._config.delay.show?e._timeout=setTimeout((()=>{e._hoverState===Jn&&e.show()}),e._config.delay.show):e.show())}_leave(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusout"===t.type?os:ss]=e._element.contains(t.relatedTarget)),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=ts,e._config.delay&&e._config.delay.hide?e._timeout=setTimeout((()=>{e._hoverState===ts&&e.hide()}),e._config.delay.hide):e.hide())}_isWithActiveTrigger(){for(const t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1}_getConfig(t){const e=X.getDataAttributes(this._element);return Object.keys(e).forEach((t=>{Vn.has(t)&&delete e[t]})),(t={...this.constructor.Default,...e,..."object"==typeof t&&t?t:{}}).container=!1===t.container?document.body:r(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),a(Fn,t,this.constructor.DefaultType),t.sanitize&&(t.template=qn(t.template,t.allowList,t.sanitizeFn)),t}_getDelegateConfig(){const t={};for(const e in this._config)this.constructor.Default[e]!==this._config[e]&&(t[e]=this._config[e]);return t}_cleanTipClass(){const t=this.getTipElement(),e=new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`,"g"),i=t.getAttribute("class").match(e);null!==i&&i.length>0&&i.map((t=>t.trim())).forEach((e=>t.classList.remove(e)))}_getBasicClassPrefix(){return"bs-tooltip"}_handlePopperPlacementChange(t){const{state:e}=t;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null)}static jQueryInterface(t){return this.each((function(){const e=rs.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(rs);const as=".bs.popover",ls={...rs.Default,placement:"right",offset:[0,8],trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'},cs={...rs.DefaultType,content:"(string|element|function)"},hs={HIDE:`hide${as}`,HIDDEN:`hidden${as}`,SHOW:`show${as}`,SHOWN:`shown${as}`,INSERTED:`inserted${as}`,CLICK:`click${as}`,FOCUSIN:`focusin${as}`,FOCUSOUT:`focusout${as}`,MOUSEENTER:`mouseenter${as}`,MOUSELEAVE:`mouseleave${as}`};class ds extends rs{static get Default(){return ls}static get NAME(){return"popover"}static get Event(){return hs}static get DefaultType(){return cs}isWithContent(){return this.getTitle()||this._getContent()}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),".popover-header"),this._sanitizeAndSetContent(t,this._getContent(),".popover-body")}_getContent(){return this._resolvePossibleFunction(this._config.content)}_getBasicClassPrefix(){return"bs-popover"}static jQueryInterface(t){return this.each((function(){const e=ds.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}m(ds);const us="scrollspy",fs=".bs.scrollspy",ps={offset:10,method:"auto",target:""},gs={offset:"number",method:"string",target:"(string|element)"},ms=`activate${fs}`,_s=`scroll${fs}`,vs=`load${fs}.data-api`,bs="dropdown-item",ys="active",ws=".nav-link",Es=".list-group-item",As=`${ws}, ${Es}, .${bs}`,Ts="position";class Os extends H{constructor(t,e){super(t),this._scrollElement="BODY"===this._element.tagName?window:this._element,this._config=this._getConfig(e),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,P.on(this._scrollElement,_s,(()=>this._process())),this.refresh(),this._process()}static get Default(){return ps}static get NAME(){return us}refresh(){const t=this._scrollElement===this._scrollElement.window?"offset":Ts,e="auto"===this._config.method?t:this._config.method,n=e===Ts?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),Y.find(As,this._config.target).map((t=>{const s=i(t),o=s?Y.findOne(s):null;if(o){const t=o.getBoundingClientRect();if(t.width||t.height)return[X[e](o).top+n,s]}return null})).filter((t=>t)).sort(((t,e)=>t[0]-e[0])).forEach((t=>{this._offsets.push(t[0]),this._targets.push(t[1])}))}dispose(){P.off(this._scrollElement,fs),super.dispose()}_getConfig(t){return(t={...ps,...X.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}}).target=r(t.target)||document.documentElement,a(us,t,gs),t}_getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}_getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}_getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}_process(){const t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),i=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=i){const t=this._targets[this._targets.length-1];this._activeTarget!==t&&this._activate(t)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(let e=this._offsets.length;e--;)this._activeTarget!==this._targets[e]&&t>=this._offsets[e]&&(void 0===this._offsets[e+1]||t<this._offsets[e+1])&&this._activate(this._targets[e])}}_activate(t){this._activeTarget=t,this._clear();const e=As.split(",").map((e=>`${e}[data-bs-target="${t}"],${e}[href="${t}"]`)),i=Y.findOne(e.join(","),this._config.target);i.classList.add(ys),i.classList.contains(bs)?Y.findOne(".dropdown-toggle",i.closest(".dropdown")).classList.add(ys):Y.parents(i,".nav, .list-group").forEach((t=>{Y.prev(t,`${ws}, ${Es}`).forEach((t=>t.classList.add(ys))),Y.prev(t,".nav-item").forEach((t=>{Y.children(t,ws).forEach((t=>t.classList.add(ys)))}))})),P.trigger(this._scrollElement,ms,{relatedTarget:t})}_clear(){Y.find(As,this._config.target).filter((t=>t.classList.contains(ys))).forEach((t=>t.classList.remove(ys)))}static jQueryInterface(t){return this.each((function(){const e=Os.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}P.on(window,vs,(()=>{Y.find('[data-bs-spy="scroll"]').forEach((t=>new Os(t)))})),m(Os);const Cs=".bs.tab",ks=`hide${Cs}`,Ls=`hidden${Cs}`,xs=`show${Cs}`,$s=`shown${Cs}`,Ds=`click${Cs}.data-api`,Ss="active",Ns="fade",Is="show",Ps=".active",js=":scope > li > .active";class Ms extends H{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(Ss))return;let t;const e=n(this._element),i=this._element.closest(".nav, .list-group");if(i){const e="UL"===i.nodeName||"OL"===i.nodeName?js:Ps;t=Y.find(e,i),t=t[t.length-1]}const s=t?P.trigger(t,ks,{relatedTarget:this._element}):null;if(P.trigger(this._element,xs,{relatedTarget:t}).defaultPrevented||null!==s&&s.defaultPrevented)return;this._activate(this._element,i);const o=()=>{P.trigger(t,Ls,{relatedTarget:this._element}),P.trigger(this._element,$s,{relatedTarget:t})};e?this._activate(e,e.parentNode,o):o()}_activate(t,e,i){const n=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?Y.children(e,Ps):Y.find(js,e))[0],s=i&&n&&n.classList.contains(Ns),o=()=>this._transitionComplete(t,n,i);n&&s?(n.classList.remove(Is),this._queueCallback(o,t,!0)):o()}_transitionComplete(t,e,i){if(e){e.classList.remove(Ss);const t=Y.findOne(":scope > .dropdown-menu .active",e.parentNode);t&&t.classList.remove(Ss),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}t.classList.add(Ss),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),u(t),t.classList.contains(Ns)&&t.classList.add(Is);let n=t.parentNode;if(n&&"LI"===n.nodeName&&(n=n.parentNode),n&&n.classList.contains("dropdown-menu")){const e=t.closest(".dropdown");e&&Y.find(".dropdown-toggle",e).forEach((t=>t.classList.add(Ss))),t.setAttribute("aria-expanded",!0)}i&&i()}static jQueryInterface(t){return this.each((function(){const e=Ms.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}P.on(document,Ds,'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),c(this)||Ms.getOrCreateInstance(this).show()})),m(Ms);const Hs="toast",Bs=".bs.toast",Rs=`mouseover${Bs}`,Ws=`mouseout${Bs}`,zs=`focusin${Bs}`,qs=`focusout${Bs}`,Fs=`hide${Bs}`,Us=`hidden${Bs}`,Vs=`show${Bs}`,Ks=`shown${Bs}`,Xs="hide",Ys="show",Qs="showing",Gs={animation:"boolean",autohide:"boolean",delay:"number"},Zs={animation:!0,autohide:!0,delay:5e3};class Js extends H{constructor(t,e){super(t),this._config=this._getConfig(e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get DefaultType(){return Gs}static get Default(){return Zs}static get NAME(){return Hs}show(){P.trigger(this._element,Vs).defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(Xs),u(this._element),this._element.classList.add(Ys),this._element.classList.add(Qs),this._queueCallback((()=>{this._element.classList.remove(Qs),P.trigger(this._element,Ks),this._maybeScheduleHide()}),this._element,this._config.animation))}hide(){this._element.classList.contains(Ys)&&(P.trigger(this._element,Fs).defaultPrevented||(this._element.classList.add(Qs),this._queueCallback((()=>{this._element.classList.add(Xs),this._element.classList.remove(Qs),this._element.classList.remove(Ys),P.trigger(this._element,Us)}),this._element,this._config.animation)))}dispose(){this._clearTimeout(),this._element.classList.contains(Ys)&&this._element.classList.remove(Ys),super.dispose()}_getConfig(t){return t={...Zs,...X.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}},a(Hs,t,this.constructor.DefaultType),t}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){P.on(this._element,Rs,(t=>this._onInteraction(t,!0))),P.on(this._element,Ws,(t=>this._onInteraction(t,!1))),P.on(this._element,zs,(t=>this._onInteraction(t,!0))),P.on(this._element,qs,(t=>this._onInteraction(t,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){const e=Js.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return B(Js),m(Js),{Alert:q,Button:U,Carousel:wt,Collapse:Ht,Dropdown:Ri,Modal:An,Offcanvas:Hn,Popover:ds,ScrollSpy:Os,Tab:Ms,Toast:Js,Tooltip:rs}}()}},e={};!function i(n){var s=e[n];if(void 0!==s)return s.exports;var o=e[n]={exports:{}};return t[n].call(o.exports,o,o.exports,i),o.exports}(21)})();
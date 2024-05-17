/* @minVersion 7.0.0-beta.0 */

import _superPropBase from "./superPropBase.ts";

// https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.get
//
//  28.1ak.5 Reflect.get ( target, propertyKey [ , receiver ] )

type Object = {
  __proto__?: any;
} & { [key: string]: unknown };

export default function _get<T extends Object, P extends PropertyKey>(
  this: unknown,
  ...args: [target: T, property: P, receiver?: unknown]
): P extends keyof T ? T[P] : any {
  let _getImpl = _get;

  if (typeof Reflect !== "undefined" && Reflect.get) {
    // need a bind because https://github.com/babel/babel/issues/14527
    _getImpl = Reflect.get.bind(null);
  } else {
    _getImpl = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;

      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc && desc.get) {
        // STEP 3. If receiver is not present, then set receiver to target.
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc ? desc.value : undefined;
    };
  }
  return _getImpl.apply(this, args);
}

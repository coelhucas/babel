/* @minVersion 7.0.0-beta.0 */

export default function _setPrototypeOf(o: object, p: object | null) {
  // @ts-expect-error - assigning to function
  _setPrototypeOf = Object.setPrototypeOf
    ? // @ts-expect-error - intentionally omitted argument
      Object.setPrototypeOf.bind(/* undefined */)
    : function _setPrototypeOf(o: Object, p: object | null) {
        if (p) {
          o.__proto__ = p;
        }
        return o;
      };
  return _setPrototypeOf(o, p);
}

/**
 * Returns an interpolated given, given two endpoints and an interpolation value.
 *
 * @param {number} v0 The initial value
 * @param {number} v1 The final value
 * @param {number} t the amount of interpolation between v0 and v1. 0 implies v0 and 1 implies v1, with 0.5 being the value halfway between v0 and v1
 * @return {number} the interpolated value
 */
export default function lerp(v0:number, v1:number, t:number):number {
    return v0*(1-t)+v1*t
}

/**
 * Determines whether an object is iterable
 *
 * @param obj Object to examine
 * @return true if the object is iterable, else false
 */
export function isIterable(obj) {
    return (obj !== null) && (typeof obj[Symbol.iterator] == "function");
}

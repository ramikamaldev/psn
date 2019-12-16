/**
 * Creates a promise with the passed in promiseFunction, eases the binding with the 'then' object.
 */
export async function createAndReturnPromise(promiseFunction) {
    return new Promise(promiseFunction);
}
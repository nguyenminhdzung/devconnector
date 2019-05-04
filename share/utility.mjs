import util from 'util';

export const wrapper = promise => promise.then(data => [null, data]).catch(err => [err]);

export const convertPromise = callBackFunction => (...args) => wrapper(util.promisify(callBackFunction).apply(null, args));

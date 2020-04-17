/*
Copyright 2018 Jonah Snider

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * A [rate-limit store](https://github.com/nfriedly/express-rate-limit#stores) that
 * uses [Keyv](https://github.com/lukechilds/keyv).
 */
class KeyvStore {
  /**
   * @param {Keyv} keyv Keyv instance to use for the store
   */
  constructor(keyv) {
    this.keyv = keyv;

    // Clear out old data (users might be using persistent data storage)
    keyv.clear();
  }

  /**
   * Increments the value in the underlying store for the given key.
   * @async
   * @param {string} key The key to use as the unique identifier passed down from RateLimit
   * @param {Function} callback The callback issued when the underlying store is finished
   * @returns {Promise<void>}
   */
  async incr(key, callback) {
    const prev = await this.keyv.get(key);
    const updatedVal = prev + 1;

    await this.keyv.set(key, updatedVal);
    callback(null, updatedVal);
  }

  /**
   * Decrements the value in the underlying store for the given key.
   * Used only when `skipFailedRequests` is true.
   * @async
   * @param {string} key The key to use as the unique identifier passed down from RateLimit.
   * @returns {Promise<number>} Updated value of the key
   */
  async decrement(key) {
    const prev = await this.keyv.get(key);
    const updatedVal = prev - 1;

    await this.keyv.set(key, updatedVal);
    return updatedVal;
  }

  /**
   * Resets a value with the given key.
   * @param {string} key The key to reset
   * @returns {Promise<void>} Promise that resolves when the key is reset or rejects
   */
  resetKey(key) {
    return this.keyv
      .delete(key)
      .then(keyExists => Promise.resolve(keyExists))
      .catch(err => Promise.reject(err));
  }
}

module.exports = KeyvStore;

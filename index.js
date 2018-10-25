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
 * A store that uses Keyv.
 */
class KeyvStore {
  /**
   * @param {Keyv} keyv Keyv instance to use for the store
   */
  constructor(keyv) {
    this.keyv = keyv;

    keyv.on('error', err => console.error('KeyvStore connection error:', err));

    // Clear out old data (users might be using persistent data storage)
    keyv.clear();
  }


  /**
   * Increments the value in the underlying store for the given key.
   * @param {string} key The key to use as the unique identifier passed down from RateLimit.
   * @param {Function} cb The callback issued when the underlying  store is finished.
   */
  incr(key, cb) {
    this.keyv.set(key, this.keyv.get(key) + 1);
    cb(null, this.keyv.get(key));
  }

  /**
   * Decrements the value in the underlying store for the given key. Used only when skipFailedRequests is true
   * @param {string} key The key to use as the unique identifier passed down from RateLimit.
   */
  decrement(key) {
    this.keyv.set(key, this.keyv.get(key) - 1);
  }

  /**
   * Resets a value with the given key.
   * @param {string} key The key to reset
   */
  resetKey(key) {
    this.keyv.delete(key);
  }
}

module.exports = KeyvStore;

/**
 * - - - - - - - - - - - - - - - - - - - -
 * HTML5 Web Storage API wrapper library
 * - - - - - - - - - - - - - - - - - - - -
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2012 Yuu Kawanami
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * コンストラクタ
 *
 * @param {Object} storage localStorage または sessionStorage オブジェクト
 * @param {Object} options オプション
 *                  - {String} namespace 名前空間             (デフォルト: "")
 *                  - {Number} expire    有効期限(秒)の初期値 (デフォルト: 0 (期限なし))
 */
var WebStorage = function(storage, options) {

  // localStorage or sessionStorage Object
  var _storage = storage;
  
  // default configuration options
  var _options = {
    namespace: "",
    expire   : 0,
  };
  

  //** initialization **//

  if (typeof options == "object") {
    // namespace
    if (_isValidNamespace(options.namespace)) {
      _options.namespace = options.namespace;
    }

    // expire
    if (_isValidExpire(options.expire)) {
      _options.expire = options.expire;
    }
  }

  
  //**  private methods **//

  function _isValidNamespace(namespace) {
    return typeof namespace == "string"
  }

  function _isValidExpire(expire) {
    return typeof expire == "number" && expire >= 0;
  }

  function _getTimestamp() {
    var date = new Date();
    var now  =  date.getTime() / 1000;
    return Math.round(now);
  }

  function _prependNamespace(key) {
      return _options.namespace + "\\" + key;
  };

  
  //**  public methods **//

  /**
   * 名前空間ストレージから、キーを指定して値を取得する 
   *
   * @param {String} key ストレージのキー
   * @return {String} or {Number} or {Object} ストレージの値 (有効期限切れの場合、NULL)
   */
  this.get = function(key) {
    var nskey = _prependNamespace(key);
    var data  = _storage.getItem(nskey);

    if (data === null) {
      return null;
    }
    
    data = JSON.parse(data);
    
    if (data.expire > 0 && _getTimestamp() > data.timestamp + data.expire) {
      _storage.removeItem(nskey);
      
      return null;        
    }
    
    return data.value;
  };


  /**
   * 名前空間ストレージに、キーを指定して値を保存する
   *
   * @param {String}                         key    ストレージのキー
   * @param {String} or {Number} or {Object} value  ストレージの値
   * @param {Number}                         expire 有効期限(秒) (未指定の場合、コンストラクタで指定した有効期限)
   * @return {Object} WebStorage
   */
  this.set = function(key, value, expire) {
    var nskey = _prependNamespace(key);

    if (! _isValidExpire(expire)) {
      expire = _options.expire;
    }
    
    var data = {
      value    : value,
      timestamp: _getTimestamp(),
      expire   : expire,
    };

    _storage.setItem(nskey, JSON.stringify(data));
    return this;
  };


  /**
   * 名前空間ストレージから、キーを指定して値を削除する
   *
   * @param {String} ストレージのキー
   * @return {Object} WebStorage
   */
  this.remove = function(key) {
    var nskey = _prependNamespace(key);
    _storage.removeItem(nskey);
    return this;
  };


  /**
   * 名前空間ストレージから、値をすべて削除する
   *
   * @return {Object} WebStorage
   */
  this.clear = function() {
    var re =  new RegExp("^" + _options.namespace + "\\\\");
  
    for (var i=0; i < _storage.length; i++) {
      var nskey =  _storage.key(i);
      
      if (nskey.match(re)) {
        _storage.removeItem(nskey);
      }
    }

    return this;
  };
  
};

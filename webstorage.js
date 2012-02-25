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

var WebStorage = function(storage, options) {

  //** init **//

  // localStorage or sessionStorage Object
  var _storage = storage;

  
  // default configuration
  var _options = {
    namespace: "",
    expire   : 0,
  };
  

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

  this.get = function(key) {
    var nskey = _prependNamespace(key);
    
    var data = _storage.getItem(nskey);

    if (data === null) {
      return null;
    }
    
    data = JSON.parse(data);
    
    if (data.expire > 0 && _getTimestamp() > data.timestamp + data.expire) {
      this.remove(nskey);
      
      return null;        
    }
    
    return data.value;
  };


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

  
  this.remove = function(key) {
    var nskey = _prependNamespace(key);
    _storage.removeItem(nskey);
    return this;
  };


   this.clear = function() {
    _storage.clear();
    return this;
  };
  
};

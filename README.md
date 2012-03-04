HTML5 Web Storage API wrapper library
==================================================

Example
--------------------------------------

    var options = {
      namespace: "hoge",
      expire   : 24*60*60, // 名前空間"hoge"でのデフォルトの有効期限：１日
    };
    
    ls = new WebStorage(localStorage, options);
    
    ls.set("foo", "FOO");             // 有効期限：１日
    ls.set("bar", {one:1, two:2}, 0); // 有効期限なし
    
    alert(ls.get("foo"));     // "FOO"
    alert(ls.get("bar").one); // 1

API
--------------------------------------
####WebStorage(storage, options)

    /**
     * Web Storage (localStorage/sessionStorage) ラッパーライブラリ
     *
     * @param {Object} storage localStorage または sessionStorage オブジェクト
     * @param {Object} options オプション
     *                  - {String} namespace 名前空間             (デフォルト: "")
     *                  - {Number} expire    有効期限(秒)の初期値 (デフォルト: 0 (期限なし))
     */

####get(key)

    /**
     * 名前空間ストレージから、キーを指定して値を取得する 
     *
     * @param {String} key ストレージのキー
     * @return {String} or {Number} or {Object} ストレージの値 (有効期限切れの場合、NULL)
     */

####set(key, valuee, expire)

    /**
     * 名前空間ストレージに、キーを指定して値を保存する
     *
     * @param {String}                         key    ストレージのキー
     * @param {String} or {Number} or {Object} value  ストレージの値
     * @param {Number}                         expire 有効期限(秒) (未指定の場合、コンストラクタで指定した有効期限)
     * @return {Object} WebStorage
     */

####remove(key)

    /**
     * 名前空間ストレージから、キーを指定して値を削除する
     *
     * @param {String} ストレージのキー
     * @return {Object} WebStorage
     */

####clear()

    /**
     * 名前空間ストレージから、値をすべて削除する
     *
     * @return {Object} WebStorage
     */
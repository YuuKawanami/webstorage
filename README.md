HTML5 Web Storage API wrapper library
==================================================

Example
--------------------------------------

    var options = {
      namespace: "hoge",
      expire   : 24*60*60, // 名前空間"hoge"でのデフォルトの有効期限：１日
    };
    
    ls = new WebStorage(localStorage, options);
    
    ls.set("foo", "FOO");
    ls.set("bar", {one:1, two:2}, 0); // 第３引数：0 -> 有効期限なし
    
    alert(ls.get("foo"));     // "FOO"
    alert(ls.get("bar").one); // 1

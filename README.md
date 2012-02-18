HTML5 Web Storage API wapper library
==================================================

Example
--------------------------------------

    var options = {
      namespace: "hoge",
      expire   : 24*60*60, // 名前空間"hoge"でのデフォルトの有効期限：１日
    };
    
    ls2 = new WebStorage(localStorage, options);
    
    ls2.set("foo", "FOO");
    ls2.set("bar", {one:1, two:2}, 0); // 第３引数：0 -> 有効期限なし
    
    alert(ls2.get("foo"));     // "FOO"
    alert(ls2.get("bar").one); // 1

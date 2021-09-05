## Theme Listener

``` html
<meta id="theme-scheme-system" name="color-scheme" content="dark light"/>
<meta id="theme-light-system" name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>
<meta id="theme-dark-system" name="theme-color" media="(prefers-color-scheme: dark)" content="#000000"/>
```

``` js
(function(window,document,undefined){
  var theme = window.localStorage.getItem("theme"),
      system = window.localStorage.getItem("system-theme");
  function dark(){
    document.documentElement.style.setProperty("color-scheme","dark");
    document.documentElement.classList.add("dark")
  };
  function light(){
    document.documentElement.style.setProperty("color-scheme","light");
    document.documentElement.classList.contains("dark") && document.documentElement.classList.remove("dark")
  };
  function initTheme(scheme){
    switch(scheme){
      case "dark": dark(); break;
      case "light": light(); break;
      default: light()
    }
  };
  function addMeta(scheme){
    var metaTheme = document.createElement("meta"),
        metaScheme = document.createElement("meta");
    metaTheme.id = "theme-color-custom";
    metaTheme.name = "theme-color";
    metaScheme.id = "theme-scheme-custom";
    metaScheme.name = "color-scheme";
    function metaDark(){
      metaTheme.content = "#000000";
      metaScheme.content = "dark";
    };
    function metaLight(){
      metaTheme.content = "#ffffff";
      metaScheme.content = "light";
    };
    switch(scheme){
      case "dark": metaDark(); break;
      case "light": metaLight(); break;
      default: metaLight()
    };
    document.head.insertAdjacentElement("afterbegin",metaTheme);
    document.head.insertAdjacentElement("afterbegin",metaScheme);
  }
  function removeMeta(){
    var dark = document.getElementById("theme-dark-system"),
        light = document.getElementById("theme-light-system"),
        scheme = document.getElementById("theme-scheme-system");
    if(dark && light && scheme){
      dark.remove();
      light.remove();
      scheme.remove();
    }
  };
  function removeSystem(){
    window.localStorage.removeItem("system-theme")
  };
  if(!theme && system){
    initTheme(system);
  }
  else if(theme && !system){
    initTheme(theme);
    removeMeta();
    addMeta(theme);
  }
  else if(theme && system){
    initTheme(theme);
    removeSystem();
    removeMeta();
    addMeta(theme);
  }
  else{return false}
})(window,document);

```

Download (archive) <a href="https://rizkysaskiaputra.github.io/lib/theme-listener.js" target="_blank">theme-listener.js</a>

## Theme Listener
By default the theme is set to light mode, will be changed to dark when the user changes the theme color, this way you can switch themes automatically.

You must have this meta attribute:
```
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#fff">
```
Then put this listener after meta.
```
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#fff">
<script>
  // listener here
</script>
```
**NOTE**: don't use this method
```
<script src="../lib/theme-listener.js"></script>
```

### theme.light
css:
```
html:not([color-scheme]),[color-scheme="light"]{
  color-scheme: light;
  // your css variable here
}
```
js:
```
theme.setAttribute("content","#fff");
```
html:
```
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#fff">
```

### theme.dark
css:
```
[color-scheme="dark"]{
  color-scheme: dark;
  // your css variable here
}
```
js:
```
theme.setAttribute("content","#000");
```
html:
```
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#000">
```

Download <a href="https://rizkysaskiaputra.github.io/lib/theme-listener.js" download="theme-listener.js">theme-listener.js</a>

(function(r,s,p){
  (function(U,I){
    (function(l,o,a,d,i,n,g){
      s = r.loadEventEnd;
      p = r.navigationStart;
      l = -(s - p);
      o = parseInt((l/1000)%60)*100;
      a = 100 - 0;
      d = 0;
      i = 100 > 0? 1 : -1;
      n = Math.abs(Math.floor(o / a));
      g = setInterval(function(){
        d += i;
        if(d === 100){
          I.style.setProperty("display","none");
          clearInterval(g);
        };
      },n);
    })()
  })(document,document.querySelector(".progress"))
})(window.performance.timing)

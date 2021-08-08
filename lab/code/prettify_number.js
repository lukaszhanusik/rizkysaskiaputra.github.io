document.addEventListener("DOMContentLoaded",(event)=>{
  var select = document.createElement("select"),
    code = document.createElement("pre"),
    input = document.createElement("textarea"),
    result = document.createElement("textarea");
  var createOption = (id,target,selected)=>{
    var option = document.createElement("option");
      option.setAttribute("value",id);
      if(selected == "selected"){
        option.setAttribute("selected","");
      };
      option.textContent = id;
      target.appendChild(option);
    return option
  };
  select.setAttribute("class","code-option");
  document.body.appendChild(select);
  createOption("css",select);
  createOption("html",select,"selected");
  createOption("js",select);
  createOption("xml",select);
  input.setAttribute("class","code-input");
  document.body.appendChild(input);
  code.setAttribute("class","code-render prettyprint linenums lang-html");
  document.body.appendChild(code);
  result.setAttribute("class","code-result");
  document.body.appendChild(result);
  function htmlEscape(c){return c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};
  input.addEventListener("input",(event)=>{
    code.innerHTML = htmlEscape(event.target.value);
    PR.prettyPrint();
    result.innerHTML = htmlEscape(code.innerHTML);
  });
  select.addEventListener("change",(event)=>{
    code.setAttribute("class","code-render prettyprint linenums lang-"+event.target.value);
    PR.prettyPrint();
  });
});

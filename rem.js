 /**
  * REM自适应
  * designWidth 设计稿实际宽度
  * maxWidth 制作稿的最大宽度
  * */
 (function (designWidth, maxWidth) {
   var docEle = document.documentElement;
   //设置viewport
   var meta;
   var viewportContent =
     "width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"; //viewport-fit=cover用于适配iphoneX
   meta = document.querySelector("meta[name=viewport]");
   if (meta) {
     meta.setAttribute("content", viewportContent);
   } else {
     meta = document.createElement("meta");
     meta.setAttribute("name", "viewport");
     meta.setAttribute("content", viewportContent);
     if (docEle.firstElementChild) {
       docEle.firstElementChild.appendChild(meta);
     } else {
       var div = document.createElement("div");
       div.appendChild(meta);
       document.write(div.innerHTML);
       div = null;
     }
   }

   //创建REM样式
   var styleEle = document.createElement("style");
   if (docEle.firstElementChild) {
     docEle.firstElementChild.appendChild(styleEle);
   } else {
     var div = document.createElement("div");
     div.appendChild(styleEle);
     document.write(div.innerHTML);
     div = null;
   }

   //等待viewport设置好后执行refreshRem
   var refreshRem = function () {
     var width = docEle.getBoundingClientRect().width;
     maxWidth = maxWidth || 540; //限制在540的屏幕下，这样100%就跟10rem不一样了
     width > maxWidth && (width = maxWidth);

     var rem = (width * 200) / designWidth;
     styleEle.innerHTML = "html{font-size:" + rem + "px !important;}";
   };
   refreshRem();

   //事件监听
   var timeID;
   window.addEventListener(
     "resize",
     function () {
       clearTimeout(timeID); //防止执行两次
       timeID = setTimeout(refreshRem, 300);
     },
     false
   );
   window.addEventListener(
     "pageshow",
     function (evt) {
       //浏览器后退时重新计算
       if (evt.persisted) {
         clearTimeout(timeID);
         timeID = setTimeout(refresh, 300);
       }
     },
     false
   );

   //事件监听
   var defaultFontSize = "16px";
   if (document.readState === "complete") {
     document.body.style.fontSize = defaultFontSize;
   } else {
     document.addEventListener(
       "DOMContentLoaded",
       function (evt) {
         document.body.style.fontSize = defaultFontSize;
       },
       false
     );
   }
 })(750);

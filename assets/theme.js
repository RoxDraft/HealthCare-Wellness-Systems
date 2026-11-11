// Light/dark toggle shared by every page; the choice is remembered per browser when storage is available.
(function(){
  var root=document.documentElement, KEY='hws-theme';
  try{var saved=localStorage.getItem(KEY); if(saved) root.setAttribute('data-theme',saved);}catch(e){}
  function current(){
    var t=root.getAttribute('data-theme');
    if(t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.querySelector('.theme-btn'); if(!b) return;
    function label(){ b.textContent = current()==='dark' ? '☀ สว่าง' : '☾ มืด'; }
    label();
    b.addEventListener('click',function(){
      var next=current()==='dark'?'light':'dark';
      root.setAttribute('data-theme',next);
      try{localStorage.setItem(KEY,next);}catch(e){}
      label();
      document.dispatchEvent(new CustomEvent('themechange'));
    });
  });
})();

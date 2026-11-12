// Thai/English switch shared by every page.
// Any element with data-en="..." swaps its innerHTML; data-en-label swaps aria-label.
// The Thai text stays in the HTML, so the page reads correctly with scripts off.
(function(){
  var KEY='hws-lang', root=document.documentElement;
  function get(){try{var v=localStorage.getItem(KEY);return v==='en'?'en':'th';}catch(e){return 'th';}}
  function apply(lang){
    root.lang=lang;
    document.querySelectorAll('[data-en]').forEach(function(el){
      if(el.__th===undefined) el.__th=el.innerHTML;
      el.innerHTML = lang==='en' ? el.getAttribute('data-en') : el.__th;
    });
    document.querySelectorAll('[data-en-label]').forEach(function(el){
      if(el.__thl===undefined) el.__thl=el.getAttribute('aria-label')||'';
      el.setAttribute('aria-label', lang==='en' ? el.getAttribute('data-en-label') : el.__thl);
    });
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.textContent = lang==='en' ? 'ไทย' : 'EN';
      b.setAttribute('aria-label', lang==='en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English');
    });
    document.dispatchEvent(new CustomEvent('langchange',{detail:lang}));
  }
  var cur=get();
  window.HWS={
    lang:function(){return cur;},
    t:function(th,en){return cur==='en'?en:th;},
    setLang:function(l){try{localStorage.setItem(KEY,l);}catch(e){} cur=l; apply(l);}
  };
  if(cur==='en') root.lang='en';
  document.addEventListener('DOMContentLoaded',function(){
    apply(cur);
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.addEventListener('click',function(){window.HWS.setLang(cur==='en'?'th':'en');});
    });
  });
})();

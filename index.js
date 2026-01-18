import{a as g,S as p,i as a}from"./assets/vendor-DvfmeZXB.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="54256939-386fc06a8d30040304fc0768b",f="https://pixabay.com/api/";async function y(s,n=1){const r={key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:n};try{return(await g.get(f,{params:r})).data}catch(t){throw console.error("Error fetching images:",t),t}}let c;function h(){c=new p(".gallery a",{captionsData:"alt",captionDelay:250})}function L(s){const n=document.getElementById("gallery"),r=s.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}" class="gallery-link">
        <img 
          src="${t.webformatURL}" 
          alt="${t.tags}" 
          class="gallery-image"
          loading="lazy"
        />
        <div class="image-info">
          <p>
            <span class="icon">❤️</span>
            <strong>Likes:</strong> ${t.likes}
          </p>
          <p>
            <span class="icon">👁️</span>
            <strong>Views:</strong> ${t.views}
          </p>
          <p>
            <span class="icon">💬</span>
            <strong>Comments:</strong> ${t.comments}
          </p>
          <p>
            <span class="icon">📥</span>
            <strong>Downloads:</strong> ${t.downloads}
          </p>
        </div>
      </a>
    </li>
  `).join("");n.insertAdjacentHTML("beforeend",r),c&&c.refresh()}function w(){const s=document.getElementById("gallery");s.innerHTML=""}function E(){document.getElementById("loader").classList.add("show-loader")}function l(){document.getElementById("loader").classList.remove("show-loader")}const u=document.getElementById("search-form"),d=u.querySelector('input[name="search-text"]');h();a.settings({position:"topRight",timeout:5e3});u.addEventListener("submit",async s=>{s.preventDefault();const n=d.value.trim();if(!n){a.error({title:"Error",message:"Please enter a search query"});return}w(),E();try{const r=await y(n);if(l(),!r.hits||r.hits.length===0){a.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}L(r.hits),a.success({title:"Success",message:`Hooray! We found ${r.totalHits} images.`})}catch(r){l(),a.error({title:"Error",message:"Something went wrong. Please try again later."}),console.error("Error:",r)}d.value=""});
//# sourceMappingURL=index.js.map

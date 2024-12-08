import{a as b,i as c,S as w}from"./assets/vendor-Be8boZEL.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L="47392325-3e255e53541a2cdc9281782e2",S="https://pixabay.com/api/",v=15;async function p(t,r=1){var s,n;try{const{data:e}=await b.get(S,{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:v,page:r}});return e}catch(e){throw new Error(((n=(s=e.response)==null?void 0:s.data)==null?void 0:n.message)||"Network error")}}function d(t){return t.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:o,comments:l,downloads:h})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${s}">
            <img
            class="gallery-image"
            src="${r}"
            alt="${n}"
            />
        </a>
        <ul class="bottom-bar">
            <li>
                <p class="bottom-txt">Likes</p>
                <p class="bottom-value">${e}</p>
            </li>
            <li>
                <p class="bottom-txt">Views</p>
                <p class="bottom-value">${o}</p>
            </li>
            <li>
                <p class="bottom-txt">Comments</p>
                <p class="bottom-value">${l}</p>
            </li>
            <li>
                <p class="bottom-txt">Downloads</p>
                <p class="bottom-value">${h}</p>
            </li>
        </ul>
    </li>`).join("")}const m=document.querySelector(".gallery"),x=document.querySelector(".js-search-form"),u=document.getElementById("loader");let y,i=1,f="";const a=document.createElement("button");a.textContent="Load more";a.classList.add("load-more-btn");a.style.display="none";document.body.appendChild(a);x.addEventListener("submit",P);a.addEventListener("click",E);async function P(t){t.preventDefault();const r=t.target.elements.search.value.trim();if(M(r)){f=r,i=1,u.style.display="flex",m.innerHTML="",a.style.display="none";try{const s=await p(r,i);g(s)}catch(s){c.error({message:`Something went wrong: ${s.message}`})}finally{u.style.display="none"}}}async function E(){i+=1,u.style.display="flex";try{const t=await p(f,i);g(t,!0),q()}catch(t){c.error({message:`Something went wrong: ${t.message}`})}finally{u.style.display="none"}}function g(t,r=!1){if(t.hits.length===0){$();return}r?m.innerHTML+=d(t.hits):m.innerHTML=d(t.hits),y=new w(".gallery a",{captionsData:"alt",captionDelay:250}),y.refresh(),t.totalHits<=i*15?(a.style.display="none",c.info({message:"We're sorry, but you've reached the end of search results."})):a.style.display="block"}function $(){c.error({message:"Sorry, there are no images matching your search query. Please try again!"})}function M(t){return t?!0:(c.warning({message:"Please enter a search query."}),!1)}function q(){const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map

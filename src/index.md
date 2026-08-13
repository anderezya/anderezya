---

layout: layouts/index.njk
title: Beranda
description: Halaman Utama
quote: No, this is not your first day.

---

<div class="content home section-informasi__ul">
<div class="index__header ">
<div style="padding: unset;" class="postingan__p">
  
# Alexander "Anderezya"
  
Pelajar, warga sipil, konstituen, penggemar fiksi ilmiah, dan lebih banyak lagi.

Ikuti <a title="Help! What is a feed?" href="https://aboutfeeds.com/">RSS</a><span class="material-symbols-rounded" style="color: yellow; font-size: 1rem;">rss_feed</span> postingan dengan menyalin url pada halaman <a href="/feed.xml">ini</a>.
  
</div>
<img alt="Anderezya Logo" style="max-width: 200px; width: 100%; aspect-ratio: 1/1;" eleventy:ignore src="./external/asset/Anderezya_November.svg">
</div>
<div class="separator"></div>

# Artikel

Pedoman, tutorial, dan topik mendalam lainnya.

  <div style="flex: 1; grid-area: primary-container3">
  <article class="primary-container">
     <ul class="limit secondary-container--postingan" >
 {%- for post in collections.artikel reversed -%}   
        <li class="secondary-container--styled" {% if page.url == post.url %} aria-current="page" {% endif %} >
          <article>
          <a href="{{ post.url }}">
          <header class="container__header"">
            <h3>[ {{ post.data.title }} ]</h3>
            </header>
            <div>
            <p>{{ post.data.page.date | htmlDateString }}</p>
          </div>
             </a>
          </article>
        </li>
       {%- endfor -%}
   </ul>
       <p class="click"><a href="/konten">Lihat Semua Artikel</a></p>
    </article>
</li>
</div>

<div class="separator"></div>

# Postingan

Opini pribadi, blog, essay, dan tumpahan pikiran lainnya.

<div class="primary-container" style="flex: 1; grid-area: primary-container4">
    <ul style="flex: unset; padding: var(--ui-padding) 0;" class="limit secondary-container" >
 {%- for post in collections.postingan reversed -%}   
        <li style="flex: unset; padding: unset;" class="secondary-container column block" {% if page.url == post.url %} aria-current="page" {% endif %} >
          <article>
          <a style="color: unset;" href="{{ post.url }}">
          <header class="container__header--solo column">
            <h3 class="click">[ {{ post.data.title }} ]</h3>
            <p>{{ post.data.page.date | htmlDateString }}</p>
          </header>
             </a>
          </article>
        </li>
       {%- endfor -%}
   </ul>
       <p class="click"><a href="/konten">Lihat Semua Postingan</a></p>
</div>

<div class="separator"></div>

# Jurnal

Jurnal berkala, isi pikiran, perkembangan, dan hal pribadi lainnya. 

<div class="primary-container" style="flex: 1; grid-area: primary-container4">
    <ul style="flex: unset; padding: var(--ui-padding) 0;" class="limit secondary-container" >
 {%- for post in collections.jurnal reversed -%}   
        <li style="flex: unset; padding: unset;" class="secondary-container column block" {% if page.url == post.url %} aria-current="page" {% endif %} >
          <article>
          <a style="color: unset;" href="{{ post.url }}">
          <header class="container__header--solo column">
            <h3 class="click">[ {{ post.data.title }} ]</h3>
            <p>{{ post.data.page.date | customFormat }}</p>
          </header>
             </a>
          </article>
        </li>
       {%- endfor -%}
   </ul>
       <p class="click"><a href="/tags/jurnal/">Lihat Semua Masukan Jurnal</a></p>
</div>

</div>



"use strict";$(function(){function e(){var e="http://pokeapi.co/api/v1/pokemon/?limit="+u+"&offset="+f,a=$(".btn");$.ajax({type:"GET",url:e,dataType:"jsonp",async:!0,cache:!0,beforeSend:function(){$("#pkmn_list").html('<div class="preloader" ><img src="images/squares-preloader.gif"></div><div class="preloader">Please wait... Pokemons are very close now</div>'),a.hide()},complete:function(){$(".preloader").remove(),a.show(),m&&a.hide()},success:function(e){g=e,g.objects.length<u&&(m=!0),s();for(var a=0;u>a;a++)void 0!==p[a]&&n(p[a],a);t(),$("div.tagsort-tags-container").tagSort({items:".mix",sortType:"exclusive",fadeTime:400}),l(),d()},fail:function(){alert("Sorry! We could not load data at the moment")}})}function t(){for(var e,t=0;t<g.objects.length;t++)e+=1===g.objects[t].types.length?'<div class="mix pkmn hvr-hang" data-item-tags="'+g.objects[t].types[0].name+'"><a href="http://pokeapi.co'+g.objects[t].resource_uri+'"><div class="image-container"></div><div class="name">'+g.objects[t].name+'</div><div class="types"><div class="'+g.objects[t].types[0].name+'">'+g.objects[t].types[0].name+"</div></div></div></a></div>":'<div class="mix pkmn hvr-hang" data-item-tags="'+g.objects[t].types[0].name+", "+g.objects[t].types[1].name+'"><a href="http://pokeapi.co'+g.objects[t].resource_uri+'"><div class="image-container"></div><div class="name">'+g.objects[t].name+'</div><div class="types"><div class="'+g.objects[t].types[0].name+'">'+g.objects[t].types[0].name+'</div><div class="'+g.objects[t].types[1].name+'">'+g.objects[t].types[1].name+"</div></div></a></div>";var s=$("#pkmn_list");s.append(e);var n=$(".types");n.find("div.normal").css("background-color",v.normal),n.find("div.fire").css("background-color",v.fire),n.find("div.water").css("background-color",v.water),n.find("div.electric").css("background-color",v.electric),n.find("div.grass").css("background-color",v.grass),n.find("div.ice").css("background-color",v.ice),n.find("div.fighting").css("background-color",v.fighting),n.find("div.poison").css("background-color",v.poison),n.find("div.ground").css("background-color",v.ground),n.find("div.flying").css("background-color",v.flying),n.find("div.psychic").css("background-color",v.psychic),n.find("div.bug").css("background-color",v.bug),n.find("div.rock").css("background-color",v.rock),n.find("div.ghost").css("background-color",v.ghost),n.find("div.dragon").css("background-color",v.dragon),n.find("div.dark").css("background-color",v.dark),n.find("div.steel").css("background-color",v.steel),n.find("div.fairy").css("background-color",v.fairy),s.html(s.html().replace(/undefined/gi,""))}function s(){if(0==p.length)for(var e=0;e<g.objects.length;e++)void 0!==g.objects[e].sprites[0]?p.push(g.objects[e].sprites[0].resource_uri):console.log("There is no sprite for pokemon");else{p.length=0;for(var e=0;e<g.objects.length;e++)void 0!==g.objects[e].sprites[0]?p.push(g.objects[e].sprites[0].resource_uri):console.log("There is no sprite for pokemon")}}function n(e,t){var s="http://pokeapi.co/"+e;$.ajax({type:"GET",url:s,dataType:"jsonp",async:!0,cache:!0,success:function(e){var s="http://pokeapi.co"+e.image,n=$(".image-container");n.eq(t).append("<img>"),n.eq(t).find("img").attr("src",s).attr("alt",e.pokemon.name)}})}function a(e){$.ajax({type:"GET",url:e,dataType:"json",async:!0,cache:!0,success:function(e){y=e,o()},fail:function(){alert("Sorry! We could not load data at the moment")}})}function o(){$(".table-value").css("border","2px solid black");var e,t=y.name,s=$("#name-and-id"),n=y.pkdx_id+"";e=1==n.length?"#00"+y.pkdx_id:2==n.length?"#0"+y.pkdx_id:"#"+y.pkdx_id;var a=t+" "+e;s.text(a);var o=$("#type");o.empty();for(var i=0;i<y.types.length;i++){o.text(o.text()+y.types[i].name+" ")}$("#attack").text(y.attack),$("#defense").text(y.defense),$("#hp").text(y.hp),$("#sp-attack").text(y.sp_atk),$("#sp-defence").text(y.sp_def),$("#speed").text(y.speed),$("#weight").text(y.weight),$("#total-moves").text(y.moves.length)}function i(e){e.clone().appendTo("#image_pkmn")}function c(){$("#image_pkmn").empty(),$("#type").empty(),$("#attack").empty(),$("#defense").empty(),$("#hp").empty(),$("#sp-attack").empty(),$("#sp-defence").empty(),$("#speed").empty(),$("#weight").empty(),$("#total-moves").empty()}function r(){$(".pkmn").remove()}function d(){$(".tagsort-tags-container").prepend("Types:")}function l(){var e=$(".tagsort-tags-container");e.find('span:contains("normal")').css("background-color",v.normal),e.find('span:contains("fire")').css("background-color",v.fire),e.find('span:contains("water")').css("background-color",v.water),e.find('span:contains("electric")').css("background-color",v.electric),e.find('span:contains("grass")').css("background-color",v.grass),e.find('span:contains("ice")').css("background-color",v.ice),e.find('span:contains("fighting")').css("background-color",v.fighting),e.find('span:contains("poison")').css("background-color",v.poison),e.find('span:contains("ground")').css("background-color",v.ground),e.find('span:contains("flying")').css("background-color",v.flying),e.find('span:contains("psychic")').css("background-color",v.psychic),e.find('span:contains("bug")').css("background-color",v.bug),e.find('span:contains("rock")').css("background-color",v.rock),e.find('span:contains("ghost")').css("background-color",v.ghost),e.find('span:contains("dragon")').css("background-color",v.dragon),e.find('span:contains("dark")').css("background-color",v.dark),e.find('span:contains("steel")').css("background-color",v.steel),e.find('span:contains("fairy")').css("background-color",v.fairy)}var g,p=[],f=0,u=12,m=!1,v={normal:"#9F9F6E",fire:"#f08030",water:"#6890f0",electric:"#f8d030",grass:"#78c850",ice:"#98d8d8",fighting:"#c03028",poison:"#a040a0",ground:"#e0c068",flying:"#a890f0",psychic:"#f85888",bug:"#a8b820",rock:"#b8a038",ghost:"#705898",dragon:"#7038f8",dark:"#705848",steel:"#b8b8d0",fairy:"#e898e8"};e();var h=$("table");h.remove();var k,b,y;$("#pkmn_list").on("click",".pkmn a",function(e){e.preventDefault();var t=$(".table-value");t.html(h),c(),b=$(this).find("a").prevObject[0].href,a(b),k=$(this).find("img"),i(k),t.show()}),$(".btn").on("click",function(){$(".btn").hide(),r(),f+=u,e(),$(".tagsort-tags-container").children().remove();var t=$("#filter");t.html(t.html().replace(/Types:/gi,""))})}),function(e){e.fn.tagSort=function(t){var s={items:".item-tagsort",tagElement:"span",tagClassPrefix:!1,itemTagsView:!1,itemTagsSeperator:" ",itemTagsElement:!1,sortType:"exclusive",fadeTime:0,reset:!1};t=e.extend(s,t);var n={generateTags:function(s){var a={},o={pointers:[],tags:[]},i=e(document.createElement(t.tagElement));return s.each(function(s){var c=e(this),r=c.data("item-tags"),d=r.match(/,\s+/)?r.split(", "):r.split(",");e.each(d,function(o,r){var d=r.toLowerCase();a[d]||(a[d]=[],n.container.append(t.tagClassPrefix!==!1?i.clone().text(r).addClass((t.tagClassPrefix+r.toLowerCase()).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g,"")):i.clone().text(r))),t.itemTagsView!==!1&&(t.itemTagsElement!==!1?c.find(t.itemTagsView).append(e(document.createElement(t.itemTagsElement)).clone().text(r)):c.find(t.itemTagsView).append(o>0?t.itemTagsSeperator+r:r)),a[d].push(s)}),"exclusive"==t.sortType&&(o.pointers.push(s),o.tags.push(d))}),"inclusive"==t.sortType||"single"==t.sortType?a:"exclusive"==t.sortType?o:void 0},exclusiveSort:function(t){var s=[[],[]];return e.each(t.pointers,function(a,o){var i=!0;n.container.find(".tagsort-active").each(function(n){-1==t.tags[a].indexOf(e(this).text())&&(i=!1,s[0].push(o))}),1==i&&s[1].push(o)}),s},inclusiveSort:function(t,s){var a=[s,[]];return n.container.find(".tagsort-active").each(function(s){e.each(t[e(this).text().toLowerCase()],function(e,t){a[0].splice(a[0].indexOf(t),1),a[1].push(t)})}),a},showElements:function(s,n){e.each(s,function(e,s){n.eq(s).fadeIn(t.fadeTime)})},hideElements:function(s,n){e.each(s,function(e,s){n.eq(s).fadeOut(t.fadeTime)})},inititalize:function(s){n.container=s;for(var a,o=e(t.items),i=[],c=t.reset,r=0;r<o.length;r++)i.push(r);n.tags=n.generateTags(o,n.container);var d=n.container.find(t.tagElement);d.click(function(){"single"==t.sortType?e(this).hasClass("tagsort-active")?e(this).toggleClass("tagsort-active"):(e(".tagsort-active").removeClass("tagsort-active"),e(this).toggleClass("tagsort-active"),a=n.inclusiveSort(n.tags,i.slice())):(e(this).toggleClass("tagsort-active"),a="inclusive"==t.sortType?n.inclusiveSort(n.tags,i.slice()):n.exclusiveSort(n.tags)),d.hasClass("tagsort-active")||(a=[[],i.slice()]),a[0].length>0&&n.hideElements(a[0],o),a[1].length>0&&n.showElements(a[1],o)}),c&&e(c).click(function(){e(".tagsort-active").removeClass("tagsort-active"),a=[[],i.slice()],n.showElements(a[1],o)})}};return n.inititalize(this),e(this)}}(jQuery);
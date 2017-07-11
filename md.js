'use strict';
// 一开始我没有使用jquery, 后来为了完善功能方便开发,添加了进去, 所以里面有原生与$两种用法
let DOC       = document;
let container = $('body');
let hs        = DOC.querySelectorAll('h1,h2,h3,h4');
let NAV       = DOC.createElement('div');

// 保存当前的ul与li
let cur_ul = addSubUl(NAV);
let cur_li = null;
let lvl     = 1;

hs.forEach(function (h, i) {
    let l = h.localName.substring(1);
    h.setAttribute('id', i);
    if (l > lvl) {
        while(lvl<l){
            // 先在当前ul增加一个子li,再在li里增加一个子ul
            cur_li = addLi(cur_ul);
            cur_ul = addSubUl(cur_li);
            ++lvl;
        }
        // 当前ul里增加一个li,再li里增加a
        cur_li = addLi(cur_ul);
        addA(cur_li, i, h.innerText);
    } else if (l == lvl) {
        cur_li = addLi(cur_ul);
        addA(cur_li, i, h.innerText);
    } else if (l < lvl) {
        while(lvl!=l){
            --lvl;
            cur_ul = cur_ul.parentNode.parentNode;
        }
        cur_li = addLi(cur_ul);
        addA(cur_li, i, h.innerText);
    }
});
let lastNav = DOC.querySelector('.nav');
if(lastNav){
    container.removeChild(lastNav);
}
NAV.setAttribute('class', 'nav');
container.prepend(NAV);

// 项目列表下拉与隐藏
let pro = $('.nav>ul>li:nth-child(odd)');
let dwn = DOC.createElement('span');
dwn.innerHTML = '\u25BC';
$('dwn').addClass('dwn-show dwn');
pro.append(dwn);
// 监听事件
$('.nav>ul').on('click','.dwn', function(e){
    $(e.target).toggleClass('dwn-show');
    $(e.target).parent('li').next().toggle();
})

// 返回ul
function addSubUl(dom) {
    let ul = document.createElement('ul');
    dom.appendChild(ul);
    return ul;
}
// 返回li
function addLi(dom) {
    let li = document.createElement('li');
    dom.appendChild(li);
    return li;
}
function addA(dom, hrf, txt){
    let a  = document.createElement('a');
    a.setAttribute('href', '#'+hrf);
    a.innerHTML = txt;
    dom.appendChild(a);
    return dom;
}
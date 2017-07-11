'use strict';
// 一开始我没有使用jquery, 后来为了完善功能方便开发,添加了进去, 所以里面有原生与$两种用法
let DOC       = document;
let container = $('body');
let hs        = DOC.querySelectorAll('h1,h2,h3,h4');
let NAV       = DOC.createElement('div');

// 保存当前的ul与li, ul指向当前外层，li指向当前ul的内层
let cur_ul = addSubUl(NAV);
let cur_li = null;
let lvl     = 1;     // 当前li的等级

hs.forEach(function (h, i) {
    let l = h.localName.substring(1);
    h.setAttribute('id', i);
    if (l > lvl) {
        while(l > lvl){
            // 先当前在li里增加一个子ul,再在ul增加一个子li
            cur_ul = addSubUl(cur_li);
            cur_li = addLi(cur_ul);
            ++lvl;
        }
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
let pro = $('.nav>ul>li>a');
let dwn = DOC.createElement('span');
dwn.innerHTML = '&nbsp;\u25BC';
// $('dwn').addClass('dwn-show dwn');
dwn.setAttribute('class', 'dwn-show dwn');
pro.after(dwn);
// 监听事件
$('.nav>ul').on('click','.dwn', function(e){
    $(e.target).toggleClass('dwn-show');
    $(e.target).next('ul').toggle();
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
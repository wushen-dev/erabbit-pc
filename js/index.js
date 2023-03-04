window.addEventListener('load', function() {
// alert('11')
var banner = document.querySelector('.banner')
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')
// banner 的宽度
var bannerWidth = banner.offsetWidth
// 1. 鼠标经过banner 就显示隐藏左右按钮 mouseenter 
banner.addEventListener('mouseenter', function() {
    prev.style.display = 'block';
    next.style.display = 'block';
    // 停止自动轮播 清除定时器
    clearInterval(timer);
    timer = null; // 清除定时器变量

})
// 1. mouselesve 鼠标离开 左右箭头隐藏 
banner.addEventListener('mouseleave', function() {
    prev.style.display = 'none';
    next.style.display = 'none';
    // 鼠标离开，轮播图自动播放
    timer = setInterval(() => {
        // 手动调用点击事件
        next.click();
    }, 3000);

})

// 2. 动态生成小圈圈 active
var ul = banner.querySelector('ul');
var ol = banner.querySelector('ol');
// console.log(ul.children.length);
for(var i = 0; i < ul.children.length; i++) {
    // 创建一个小 li
    var li = this.document.createElement('li');
    // 记录当前的索引号，通过自定义属性
    li.setAttribute('index',i);
    // 将小li 插入到 ol 里面
    ol.appendChild(li);
    // 利用排他思想，给第一个小li做点击后的高亮效果，直接给小圈圈绑定点击事件
    li.addEventListener('click', function() {
        // 干掉所有人，去除所有人的class类名字
        for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
        // 留下我自己
        this.className = 'active';
        // 3. 点击小圆点，移动图片
        var index = this.getAttribute('index');
         // 当我们点击了某个小li 就要把这个li 的索引号给 num  
         num = index;
         // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
         circle = index;
        // console.log(index);
        // console.log(bannerWidth);
        animate(ul, -index * bannerWidth)
        }
    })

}
// 把ol 里面的第一个小 li 设置为高亮
ol.children[0].className = 'active';

// 5. 克隆第一张图片到最后面
var first = ul.children[0].cloneNode(true);
// 放到ul里面的最后一张
ul.appendChild(first);

// 6. 点击右侧按钮图片滚动一张
var num = 0;
// 7.circle 控制小圆圈的播放
var circle = 0;
// 节流阀
var flag = true;
// 4.点击右侧按钮，自增加1
next.addEventListener('click', function() {
    // alert('1')  测试是否生效
    // 如果走到了最后一张图片，此时我们的ul 要快速复原left = 0 ;
    if (flag) {
        flag = false; // 关闭节流阀
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0
        }
        num++
        animate(ul, -num * bannerWidth, function() {
            flag = true
        })
        // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle++;
         // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
         if (circle == ol.children.length) {
             circle = 0;
         };
    
        // 清除小圆圈样式
         circleChange();
    
    }
})

// 8.点击左侧按钮，自增加1
prev.addEventListener('click', function() {
    // alert('1')  测试是否生效
    if (flag) {
        flag = false
        // 如果num=0 点击左侧按钮 应该走到最后一张图片
    if (num == 0) {
        num = ul.children.length - 1
        // 最后一张图片距离左侧的距离 banner的宽度 * 4
        ul.style.left = -num * bannerWidth + 'px';
        
    }
    num--
    animate(ul, -num * bannerWidth, function() {
        flag = false;
    })
    // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
    circle--;
     // 如果circle < 0 说明第一张图片，小圈圈要改为最后一个小圈圈 length-1
    //  if (circle < 0) {
    //      circle = ol.children.length - 1;
    //  };
     circle = circle < 0 ? ol.children.length - 1 : circle;
     circleChange();
    }

});
// 去除小圆圈样式背景颜色
function circleChange() {

    //  先清除其他小圆点的 active 类
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    ol.children[circle].className = 'active'
}

// 10. 自动播放轮播图
var timer = setInterval(() => {
    // 手动调用点击事件
    next.click();
}, 3000);

})
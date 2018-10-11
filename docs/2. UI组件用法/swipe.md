### swipe组件

- 基础用法
    + 通过autoplay属性设置自动轮播间隔
```html
<div class="swipe-wrapper">
    <swipe :autoplay=2000 :list='list'>
    </swipe>
</div>

```

   + 控制滑块大小
    
```html
<div class="swipe-wrapper">
    <swipe :autoplay=2000>
    </swipe>
</div>

// css 父级设置宽高
.swipe-wrapper {
    width: 600px;
    heith: 200px;
}
```
- API

| 参数 | 说明 | 类型 | 默认值 |
|---------|-----------|-----------|-------------|
| autoplay      | 自动轮播间隔，单位为 ms       | Number | 3000 |
| duration      |动画时长，单位为 ms	        | Number	|500|
| loop	            |是否开启循环播放	        | Boolean	|true|
| touchable	        |是否可以通过手势滑动	    | Boolean	|true|
| show-indicators	|    是否显示指示器	        | Boolean	|true|
| list              |  数据                     | Array | -|
| type              |  以什么类型填充轮播项     | String |img|
| lazy              |  是否开启懒加载           | Boolean |true|


### NoticeBar 通告栏

- 基础用法
```html
<notice-bar
  message="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
  left-icon="https://img.yzcdn.cn/1.png"
/>
```

- 
```html
<notice-bar
    mode="closeable"
    @click="onClick"
    left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
>
    足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力
</notice-bar>
```

- API

参数	说明	类型	默认值
mode	通告栏模式，可选值为 closeable/link	String	''
delay	动画延迟时间 (s)	Number	1
speed	滚动速率 (px/s)	Number	50
scrollable	是否在长度溢出时滚动播放	Boolean	true
left-icon	左侧图标图片 URL	String	-
color	文本颜色	String	#f60
background	滚动条背景	String	#fff7cc

- Event

事件名	说明	参数
click	点击事件回调	-

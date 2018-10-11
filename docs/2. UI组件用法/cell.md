### cell单元格组件
- 用法
```html
<cell-group>
    <cell title="titleValue" icon="iconName"  value="val">
        <icon slot="icon" name="arrow-top"/>
        <div slot="right-icon" >1</div>
    </cell>
    <cell title="title" icon="icon"  value="value"/>
    <cell title="title" icon="icon"  value="value">
        <div slot="extra" >3</div>
    </cell>
</cell-group>
```

- API

| 参数 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 左侧图标,可见值见Icon组件| String | - |
| title | 左侧标题 | String/Number | - |
| value | 右侧内容 | String/Number | - |

- cell event

| 事件 | 说明 | 参数 |
| --- | --- | --- |
|click | 点击cell时触发 | - |

- cell slot

| 名称 | 说明 |
| --- | --- |
| icon | 自定义icon |
| title | 自定义title |
| right-icon | 自定义右侧标签 right-icon |

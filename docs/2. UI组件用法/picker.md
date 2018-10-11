### picker组件

- 用法

```html
<picker
    :columns = "columns"
    title="title"
    @cancel="onCancel"
    @confirm="onConfirm"
    @change="onChange"
/>
```
```javascript
data(){
    return {
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
}
```
- API

| 参数 | 说明 |  类型 | 默认值 |
| --- | --- | --- | --- |
|columns|对象数组，配置每一列显示的数据|Array|[]|
|show-toolbar|是否显示顶部栏|Boolean|false|
|title|顶部栏标题|String|""|
|visible-item-count|可见的选项个数	|Number|5|
|confirm-button-text|确认按钮文字	|String|确认|
|cancel-button-text	|取消按钮文字	|String|取消|
|item-height|选项高度|Number|44|


|事件名	|说明	|参数|
| --- | --- | --- |
|confirm |	点击完成按钮时触发 | 单列：选中值，选中值对应的索引多列：所有列选中值，所有列选中值对应的索引|
|cancel	 | 点击取消按钮时触发  | 单列：选中值，选中值对应的索引多列：所有列选中值，所有列选中值对应的索引|
|change	 | 选项改变时触发	   | 单列：Picker 实例，选中值，选中值对应的索引多列：Picker 实例，所有列选中值，当前列对应的索引|

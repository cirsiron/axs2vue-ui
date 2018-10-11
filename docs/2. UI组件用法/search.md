### search框组件

- 示例
```html

<search
    v-model="value"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    :showAction="true"
/>
```

- API

参数	说明	类型	默认值
background	搜索框背景色	String	#f2f2f2
show-action	是否在搜索框右侧显示取消按钮	Boolean	false

Search 默认支持 Input 标签所有的原生事件，如 focus、blur、keypress 等
事件名	说明	参数
cancel	取消搜索	-
search	确定搜索	-


Slot
名称	说明
action	自定义搜索框右侧按钮，需要在showAction为 true 时才会显示

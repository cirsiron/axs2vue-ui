### Field 输入框组件
input或textarea的输入框。

- 基础用法
    ```html
      <field  
          label="用户名"
          v-model="username"
          placeholder="请输入用户名"
          required
      ></field>
    ```
- API

|参数|说明|类型|默认值|
|---|---|---|---|
|label|输入框左侧文本|String|-|
|value|当前输入的值|String\Number|-|
|type|任意的原生类型,number,tel等|String|text|
|disabled|是否禁用|Boolean|false|
|readonly|是否只读|Boolean|false|
|clearable|是否启用清除控件	|Boolean|false|
|required|是否显示表单必填星号	|Boolean|false|
|error|是否将输入内容标红	|Boolean|false|

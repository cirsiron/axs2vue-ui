### toast轻提示组件

- 用法
    - 当作插件引入
    ```javascript
      import Vue from 'vue';
      import Toast from '../components/toast';
      import toast from '../components/toast/index.vue';
      Toast.install = () => {
          Vue.use(toast);
      };
      Vue.prototype.$toast = Toast;
    ```
    使用时直接在组件中 this.$toast({options})即可
    
    - 实例
    ```javascript
            this.$toast({
                timeout: 3000,
                message: 'message'
            });
    ```
- API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|position | 位置,可选值为 top,left,right, bottom| String| top|
|message|提示内容|String| - |
|timeout|展示时长(ms)|Number|2000|



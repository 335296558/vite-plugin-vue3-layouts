# vite-plugin-vue-layouts
#### 介绍
    vite-plugin-vue-layouts 是一个让项目开箱即用的layout布局插件
    通过页面设置layout，例如：layout: 'noAuth', 访问不同页面可以给不同的公共布局

    要安装vue-router@4 以上版本

#### 注意
    启用后你本地原有的App.vue|main.js将会失效，插件内会返回App.vue|main.js
    如果你需要插件导入，vue.use设置，请看下面plugins说明

#### 安装
    yarn add vite-plugin-vue-layouts -D
    npm i vite-plugin-vue-layouts -D
    pnpm install vite-plugin-vue-layouts -D

#### vite 使用说明
```js
    // vite.config.js
    import vitePluginVueLayouts from 'vite-plugin-vue-layouts'
    export default {
        plugins: [
            vitePluginVueLayouts()
        ]
    };
```

#### plugins 使用说明
    例如：我需要设置vue.use一个我的插件，或者只import不需要vue.use
    如下代码，
```js
    // vite.config.js
    import vitePluginVueLayouts from 'vite-plugin-vue-layouts'
    export default {
        plugins: [
            vitePluginVueLayouts({
                plugins:[
                    // 相当于 import xxx from 'auto-vue-router'
                    // vue.use(xxx)
                    'auto-vue-router'
                    // 相当于 import xxxx from './src/plugins/xxxx'
                    './src/plugins/xxxx:no-use'
                ]
            })
        ]
    };
```


#### 参数说明
| 参数名 | 类型 | 默认值 | 说明 |
| -------- | -------- | -------- | -------- |
| plugins | Array | [] | import plugin |

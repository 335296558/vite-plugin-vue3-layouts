'use strict';
/**
 * @desc layout布局
 * @author 凡尘
 * @date 2022/05
 * @author 335296558@qq.com
 * @name vite-plugin-vue-layouts || vitePluginVueLayouts
 */

import fs from 'fs';
const getMixName = ()=> {
    let str = '';
    for(let i =0;i<6;i++){
        str += String.fromCharCode(Math.floor(Math.random()*26+65))
    }
    return str
}
export default function vitePluginVueLayouts(opt={}) {
    const ModuleId = 'vue-layouts'
    const resolvedModuleId = '\0' + ModuleId
    opt = Object.assign({
        plugins:[]
    }, opt)

    let imports = ''
    opt.plugins.forEach(pluginPath => {
        const importName = getMixName()
        if (pluginPath.indexOf(':no-use')>=0) {
            imports+=`import ${importName} from '${pluginPath}';`
        } else {
            imports+=`import ${importName} from '${pluginPath}';\nVueApp.use(${importName});`
        }
    });
    return {
        name: 'vite-plugin-vue-layouts',
        // transformIndexHtml(html) {
        //     return `${html}\n`
        // },
        // resolveId(id) {
        //     if (id === ModuleId) {
        //         return resolvedModuleId
        //     }
        // },
        async load(id, code) {
            if (id.indexOf('main.js')>=0) {
                return `\n
                    \n
                    import { createApp } from 'vue'
                    import App from '${__dirname}/App.vue'
                    const VueApp = createApp(App);
                    \n${imports}
                    VueApp.mount('#app')
                \n`;
            }
        }
    }
}
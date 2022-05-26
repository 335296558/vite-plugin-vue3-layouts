'use strict';
/**
 * @desc layout布局
 * @author 凡尘
 * @date 2022/05
 * @author 335296558@qq.com
 * @name vite-plugin-vue3-layouts || vitePluginVue3Layouts
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
            const newPath = pluginPath.replace(/:no-use/g,'')
            imports+=`\nimport ${importName} from '${newPath}';`
        } else {
            imports+=`import ${importName} from '${pluginPath}';\nVueApp.use(${importName});`
        }
    });
    return {
        name: 'vite-plugin-vue3-layouts',
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
                return `\nimport { createApp } from 'vue'
                    \nimport App from '${__dirname}/App.vue'
                    \nconst VueApp = createApp(App);
                    \n${imports}
                    \nVueApp.mount('#app')
                \n`;
            }
        }
    }
}
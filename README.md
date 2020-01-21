# spa-simple-skeleton

针对spa项目网速慢或者js文件大而导致的首屏白屏现象，采用产生骨架屏优化用户体验的方案

## Usage

```bash
yarn add spa-simple-skeleton
# or
npm install spa-simple-skeleton
```

Configure in `.umirc.js`,

```js
const spasimpleskeleton = require('spa-simple-skeleton');
// 其他webpack配置代码
 plugins: [
        new spasimpleskeleton(Options)
 ]
```

## Options

```js
 {
    id:  string    // 挂载的id,如umi是在一个id为root的div下，此处应该为root
    skeleton: [   
        {route：string  // 匹配路由，针对不同路由，不同的骨架屏方案
                data:  [    // 骨架屏分布主要是竖形排列
                            {      // 骨架屏数据
                            showChild:Boolean,  // 是否只显示子元素，
                            width:number||string  // 默认 100%
                            height:number||string // 默认 根据rows的长度决定
                            rows : number || number[] // 容器内骨架条数 默认 1，使用数组则可合并骨架，如[3]，则表示该容器中存在3条骨架并合并它们展示
                            style: string; // 自己集成的容器样式
                            rowsStyle:string; // 自己集成的骨架样式
                            child:[]  //
                            }
                        ]
                }
            ]
        }
```

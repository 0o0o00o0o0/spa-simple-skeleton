function MySkeleton(options) {
    this.options = options;
}
// {
//     id:  string   挂载的id
//     skeleton: [{route：string  // 匹配路由
//                 data:  [{      // 骨架屏数据
//                         showChild:Boolean,   是否只显示子元素
//                         width:number||string   默认 100%
//                         height:number||string  默认 根据rows的长度决定
//                         rows : number || number[]  默认 1
//                         style: string;  自己集成的样式
//                         rowsStyle:string; 
//                         child:[]
//                 }]}]
//             }
MySkeleton.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('compilation', compilation => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap('html-webpack-plugin-after-html-processing', (htmlData) => {



            var config = this.options;
            function max(ar) {
                var str = "";
                for (var i = 0; i < ar.length; i++) {
                    var item = ar[i];
                    var w = item.width;
                    w = w ? (isNaN(w) ? w : w + 'px') : '100%';
                    var h = item.height;
                    h = h ? (isNaN(h) ? h : h + 'px') : '';
                    str += "<div style='width:" + w + ";" + (h ? "height:" + h + ";overflow:hidden;" : "") + ";" + (ar[i].style || "") + ";' class='skele-contain'>";

                    if (item.showChild) {
                        str += max(item.child);
                    } else {
                        var rows = item.rows;
                        if (Object.prototype.toString.call(rows) == '[object Array]') {
                            for (var j = 0; j < rows.length; j++) {
                                str += isNaN(rows[j]) ? "<div class='skele-line'></div>" : "<div style='height:" + (rows[j] * 38) + "px;" + (ar[i].rowsStyle || "") + ";' class='skele-line'></div>"
                            }
                        } else if (Object.prototype.toString.call(rows) == '[object Number]') {
                            rows = rows && !isNaN(rows) && rows > 0 ? Math.floor(rows) : 1;
                            for (var j = 0; j < rows; j++) {
                                str += "<div class='skele-line'></div>"
                            }
                        }
                    }
                    str += "</div>";
                }
                return str;
            }
            var style = ".skele-contain{padding:20px 0 0 0;display:flex;justify-content: space-between;flex-wrap: wrap}.skele-line{background:linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);height: 16px;margin-top:16px;width:calc(100% - 20px);margin-left:10px;" +
                ";background-size:400% 100%;animation:ant-skeleton-loading 1.4s ease infinite}@keyframes ant-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}";
            var d = [];
            for (var f = 0; f < config.skeleton.length; f++) {
                d.push({
                    test: config.skeleton[f].route,
                    content: max(config.skeleton[f].data)
                })
            }
            var content = "var d=" + JSON.stringify(d) + ";var syl='" + style + "';for(var i =0;i<d.length;i++){if(d[i].test=='/'||(d[i].test!='/'&& ~location.pathname.indexOf(d[i].test))){document.getElementById('" +
                config.id + "').innerHTML = '<style>'+syl+'</style>'+d[i].content;break;}}";


            htmlData.html = htmlData.html.replace(
                `<div id="app"></div>`,
                `<div id="app"></div><script>${content}</script>`
            );
        })
    });
};

module.exports = MySkeleton;
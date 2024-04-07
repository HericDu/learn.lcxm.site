import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import path from "path";

export default defineUserConfig<DefaultThemeOptions>({
  lang: "zh-CN",
  title: "灵创新媒",
  description: "灵创新媒 数字媒体技术实验室",
  base: "/",
  alias: {
    "@theme/Home.vue": path.resolve(__dirname, "./components/Home/index.vue"),
  },
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    ["meta", { name: "theme-color", content: "#000" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { property: "og:type", content: "article" }],
  ],
  plugins: [
    ["@vuepress/back-to-top"],
    [
      "@vuepress/pwa",
      {
        skipWaiting: true,
      },
    ],
    [
      "@vuepress/plugin-pwa-popup",
      {
        locales: {
          "/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
      },
    ],
    // [
    //     '@vuepress/plugin-google-analytics',
    //     {
    //         id: ''
    //     }
    // ],
    // [
    //     "@vuepress/plugin-docsearch",
    //     {
    //         apiKey: '',
    //         indexName: '',
    //         algoliaOptions: {
    //             facetFilters: ["lang:en-US"],
    //         },
    //     }
    // ]
  ],

  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    docsDir: "docs",
    navbar: [
      { text: "指引", link: "/guide2023/" },
      // {
      //   text: "指引",
      //   children: [
      //     { text: "了解灵创", link: "/guide/about2022" },
      //     { text: "加入灵创", link: "/guide/new-to-lcxm" },
      //   ],
      // },
      {
        text:"公告",
        children:[
          {text:"关于经费",link:"/notice/fund"},
        ]
      },
      { text: "新闻与文章", link: "/essay/" },
      { text: "数媒WIKI", link: "/wiki/wiki2023" },
      {
        text: "关于",
        children: [
          { text: "友情链接", link: "/about/friends" },
          { text: "参与贡献", link: "/about/contribution" },
        ],
      },
    ],
    //sidebar: "auto",
    sidebar: {

      '/guide2022/':[
        'about2022.html',
        'new-to-lcxm.html'
      ],

      '/guide2023/':[
        '灵创新媒实验室简介.html',
        '灵创新媒实验室组成.html',
        '灵创新媒实验室就业方向.html',
        '加入实验室.html'
      ],

      '/essay/':[
        '灵创新媒实验室开展互联网产业就业实践.html',
        '云极客团队携手灵创新媒实验室：远程办公成果揭示科技的力量.html',
        'ZB中一些需要注意的地方.html',
        '建模学习问题.html'
      ],

      '/':[
        ''
      ] //不能放在数组第一个，否则会导致右侧栏无法使用
    },
    
  },
});

// export default defineUserConfig<DefaultThemeOptions>({
//     base:'/',
//     title:'灵创新媒',
//     description:'灵创新媒 数字媒体 数媒 实验室',
//     plugins: [
//         [
//             '@vuepress/plugin-google-analytics',
//             {
//                 id: 'G-CZJ8X185MG'
//             }
//         ]
//     ],
//     theme: '@vuepress/theme-default',
//     themeConfig:{
//         docsDir: 'docs',
//         navbar: [
//             { text: '指引', children: [
//                 {text:'关于灵创',link:'/guide/'},
//                 {text:'加入灵创',link:'/guide/new-to-lcxm'}
//             ]},
//             { text: '历史文章', link: '/'},
//             { text: '数媒WIKI', link: '/wiki/'},
//             { text: '关于',children: [
//                 {text:'',link:'/guide/'},
//                 {text:'参与贡献',link:'/guide/new-to-lcxm'}
//             ]},
//         ],
//         sidebar: "auto",
//     }
// });

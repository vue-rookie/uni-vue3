export default {
  // 项目名称
  projectName: "uni-app-vue3-ts",
  // 项目描述
  projectDesc: "基于uni-app+vue3+ts的模板项目",

  classPrefix: "uniVue-",

  // 布局模式
  layoutEnum: {
    indexPage: {
      header: {
        isCustom: true,
        // 自定义样式
        customStyle: {
          type: 1,
          // 是否带搜索栏
          isNeedSearch: false,
        },
      },
      body: {
        bodyList: [
          // 组件type:
          {
            type: "banner",
            autoplay: true,
            interval: 5000,
            duration: 1000,
            circular: false,
            list: [],
          },
          {
            type: "card",
            border: true,
            padding: 30,
            num: 10,
            title: "标题",
            subTitle: "副标题",
          },
          {
            type: "form",
            formList: [
              {
                type: "input",
                inputType: "text",
                placehodel: "请输入",
                label: "用户名",
                icon: "",
                filed: "user",
              },
              {
                type: "select",
                filed: "user",
              },
              {
                type: "picker",
                list: [],
                filed: "province",
                title: "请选择",
              },
            ],
          },
        ],
      },
      tabBar: {},
    },
  },
}

export default {
  projectName: "uni-app-vue3-ts",
  projectDesc: "基于uni-app+vue3+ts的模板项目",

  classPrefix: "uniVue-",
  layoutEnum: {
    indexPage: {
      header: {
        isCustom: true,
        customStyle: {
          type: 1,
          isNeedSearch: false,
        },
      },
      body: {
        bodyList: [
          {
            componentType: "UpCard",
            props: {
              border: true,
              padding: 30,
              num: 10,
              title: "标题",
              subTitle: "副标题",
            },
            classNames: "font-bold text-64rpx text-[#cccccc]",
            contentClassNames: `font-bold text-64rpx text$cccccc`,
            subContentClassName: "text-[#333] text-[24rpx]",
            data: [],
            api: "/api/getCards",
            dataField: "cardData",
            paramsField: null,
            otherParams: {},
            image: {
              show: true,
            },
            subImage: {
              show: true,
            },
          },
          {
            componentType: "UpSwiper",
            props: {
              autoplay: true,
              interval: 5000,
              duration: 1000,
              circular: false,
            },
            data: [],
            classNames: "",
            api: "/api/getSwipers",
            dataField: "swiperData",
            paramsField: null,
          },

          {
            componentType: "UpList",
            props: {
              border: true,
              padding: 30,
              num: 10,
              title: "标题",
              subTitle: "副标题",
            },
            api: "/api/getLists",
            dataField: "scrollData",
            paramsField: null,
          },
        ],
        classNames: "",
      },
      tabBar: {},
    },
    cardDetailPage: {
      header: {
        isCustom: true,
        customStyle: {
          type: 1,
          isNeedSearch: false,
        },
      },
      body: {
        bodyList: [
          {
            componentType: "UpCard",
            props: {
              border: true,
              padding: 30,
              num: 10,
              title: "标题",
              subTitle: "副标题",
            },
            classNames: "",
            contentClassNames: ``,
            subContentClassName: "",
            data: [],
            api: "/api/getCardsDetail",
            dataField: "cardDetailData",
            paramsField: "cardParams",
            image: {
              show: true,
            },
            subImage: {
              show: true,
            },
          },
        ],
        classNames: "",
      },
    },
  },
}

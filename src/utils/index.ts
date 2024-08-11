// @ts-expect-error import json file
import { pages, subPackages, tabBar } from "@/pages.json"

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有tabBar的话，list不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currPath = lastPage.route
  return !!tabBar.list?.find((e) => e.pagePath === currPath)
}

export const currRoute = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const lastPage = getCurrentPages().at(-1)
  const currRoute = (lastPage as any).$page
  const { fullPath } = currRoute as { fullPath: string }
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith("%")) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split("?")
  console.log(path, queryStr)

  const query: Record<string, string> = {}
  queryStr.split("&").forEach((item) => {
    const [key, value] = item.split("=")
    console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
export const getAllPages = (key = "needLogin") => {
  // 这里处理主包
  const mainPages = [
    ...pages
      .filter((page) => !key || page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages("needLogin").map((page) => page.path)

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages("needLogin").map((page) => page.path)

/**
 * 获取url参数的值
 */

export const getUrlParam = (path): Record<string, string> => {
  const querys = path.substring(path.indexOf("?") + 1).split("&")
  const result = {}
  for (let i = 0; i < querys.length; i++) {
    const temp = querys[i].split("=")
    if (temp.length < 2) {
      result[temp[0]] = ""
    } else {
      result[temp[0]] = temp[1]
    }
  }
  return result
}

type Func = (...args: any[]) => void

export function debounce(fn: Func, wait: number): Func {
  let timeout: any

  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

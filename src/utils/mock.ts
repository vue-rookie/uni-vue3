import type { CustomRequestOptions } from "@/interceptors/request"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const ok = <T>(data: T): ApiResult<T> => ({
  success: true,
  traceid: "mock-trace-id",
  code: "0",
  msg: "",
  err: "",
  data,
  timestamp: Date.now(),
})

const extractPath = (url: string) => {
  // 取出 /api/... 起始的路径，忽略域名或代理前缀
  const marker = "/api/"
  const idx = url.indexOf(marker)
  if (idx >= 0) return url.substring(idx)
  try {
    const u = new URL(url)
    return u.pathname
  } catch (e) {
    return url
  }
}

export async function mockRequest<T>(options: CustomRequestOptions): Promise<ApiResult<T> | null> {
  // 仅在开发环境 mock
  if (!import.meta.env.DEV) return null

  const path = extractPath(options.url)
  // 只处理我们在电商示例中用到的接口
  if (!path.startsWith("/api/")) return null

  // 模拟网络延迟
  await wait(200)

  // Banner
  if (path === "/api/banners") {
    return ok([
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
    ]) as any
  }

  // 分类
  if (path === "/api/categories") {
    const icon = (seed: string) => `https://picsum.photos/seed/${seed}/120/120`
    return ok([
      { id: "c1", name: "手机数码", icon: icon("phone") },
      { id: "c2", name: "家用电器", icon: icon("appliance") },
      { id: "c3", name: "美妆个护", icon: icon("beauty") },
      { id: "c4", name: "服饰鞋靴", icon: icon("fashion") },
      { id: "c5", name: "母婴玩具", icon: icon("toy") },
      { id: "c6", name: "居家生活", icon: icon("home") },
      { id: "c7", name: "运动户外", icon: icon("sport") },
      { id: "c8", name: "食品生鲜", icon: icon("food") },
    ]) as any
  }

  // 推荐商品
  if (path === "/api/goods/recommend") {
    const list = Array.from({ length: 10 }).map((_, i) => ({
      spuId: `spu_${i + 1}`,
      title: `热卖商品 ${i + 1}`,
      subTitle: "热卖好物，品质保证",
      pictures: [`https://picsum.photos/seed/reco_${i + 1}/600/600`],
      price: Number((19.9 + i).toFixed(2)),
      originPrice: Number((29.9 + i).toFixed(2)),
      sales: 1000 + i * 23,
      tags: ["自营", "次日达"],
    }))
    return ok({ list, total: list.length, page: 1, pageSize: 10 }) as any
  }

  // 分类商品列表 /api/category/:id/goods
  const catGoodsMatch = path.match(/^\/api\/category\/([^/]+)\/goods/)
  if (catGoodsMatch) {
    const catId = catGoodsMatch[1]
    const list = Array.from({ length: 8 }).map((_, i) => ({
      spuId: `${catId}_spu_${i + 1}`,
      title: `分类${catId} 商品 ${i + 1}`,
      pictures: [`https://picsum.photos/seed/${catId}_${i + 1}/600/600`],
      price: Number((9.9 + i).toFixed(2)),
    }))
    return ok({ list, total: list.length, page: 1, pageSize: 20 }) as any
  }

  // 商品详情 /api/goods/:spuId
  const goodsDetailMatch = path.match(/^\/api\/goods\/([^/?#]+)/)
  if (goodsDetailMatch && !path.endsWith("/recommend")) {
    const spuId = goodsDetailMatch[1]
    const spu = {
      spuId,
      title: `商品 ${spuId}`,
      subTitle: "精选好物",
      pictures: [
        `https://picsum.photos/seed/${spuId}_1/800/800`,
        `https://picsum.photos/seed/${spuId}_2/800/800`,
      ],
      price: 99.9,
    }
    const skus = [
      { skuId: `${spuId}_S`, spuId, title: "S", price: 99.9, stock: 100, attrsText: "尺码:S" },
      { skuId: `${spuId}_M`, spuId, title: "M", price: 109.9, stock: 100, attrsText: "尺码:M" },
      { skuId: `${spuId}_L`, spuId, title: "L", price: 119.9, stock: 100, attrsText: "尺码:L" },
    ]
    return ok({ spu, skus }) as any
  }

  // 地址
  if (path === "/api/address/list") {
    return ok([
      {
        id: "addr1",
        receiver: "张三",
        phone: "13800000000",
        province: "上海市",
        city: "上海市",
        district: "浦东新区",
        detail: "张江路 666 号",
        isDefault: true,
      },
      {
        id: "addr2",
        receiver: "李四",
        phone: "13900000000",
        province: "浙江省",
        city: "杭州市",
        district: "西湖区",
        detail: "文三路 888 号",
      },
    ]) as any
  }
  if (path === "/api/address/save") {
    return ok("addr_" + Math.random().toString(36).slice(2, 8)) as any
  }
  if (path === "/api/address/delete") {
    return ok(true) as any
  }

  // 优惠券
  if (path === "/api/coupon/list") {
    return ok([
      { id: "c1", title: "满100减20", desc: "全场通用" },
      { id: "c2", title: "无门槛5元券", desc: "新人专享" },
    ]) as any
  }
  if (path === "/api/coupon/receive") {
    return ok(true) as any
  }

  // 订单
  if (path === "/api/order" && (options.method || "GET").toUpperCase() === "POST") {
    return ok({ orderId: "ORDER" + Date.now() }) as any
  }
  if (path.startsWith("/api/order/list")) {
    const list = Array.from({ length: 5 }).map((_, i) => ({
      orderId: `ORDER_${i + 1}`,
      amount: Number((88 + i * 3.5).toFixed(2)),
      status: ["UNPAID", "PAID", "SHIPPED", "FINISHED"][i % 4],
      createdAt: new Date(Date.now() - i * 86400000).toISOString().slice(0, 19).replace("T", " "),
    }))
    return ok({ list, total: list.length, page: 1, pageSize: 20 }) as any
  }
  const orderDetail = path.match(/^\/api\/order\/([^/?#]+)/)
  if (orderDetail) {
    const orderId = orderDetail[1]
    return ok({ orderId, amount: 188.8, status: "UNPAID" }) as any
  }

  // 未命中则不拦截
  return null
}

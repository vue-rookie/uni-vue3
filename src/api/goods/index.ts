import { requestGet } from "@/utils/request"
import type { PageParams, PageResult, SpuItemDTO, SkuItemDTO } from "@/api/types"

export const getRecommendGoodsApi = (params: Partial<PageParams>) =>
  requestGet<PageResult<SpuItemDTO>>("/api/goods/recommend", params)

export const getGoodsDetailApi = (spuId: string) =>
  requestGet<{ spu: SpuItemDTO; skus: SkuItemDTO[] }>(`/api/goods/${spuId}`)

export const getCategoryGoodsApi = (categoryId: string, params: Partial<PageParams>) =>
  requestGet<PageResult<SpuItemDTO>>(`/api/category/${categoryId}/goods`, params)



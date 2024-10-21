import { generateClient } from "./client";
import { urls } from "./urls";
import { IPagination, IResDto } from "../types/global-type";
import { Ipost } from "../types/post-type";
import { listLimit } from "../utils/config";

interface IFetchPostsReqDto extends IPagination {
  tag?: string | null;
}
interface IFetchPostsResDto extends IResDto {
  posts: Ipost[];
}
type fetchPostListType = (_?:IFetchPostsReqDto ) => Promise<IFetchPostsResDto>;
export const fetchPostList: fetchPostListType = async (params) => {
  const client = generateClient();
  const url = !params?.tag ? urls.posts.list : urls.posts.byTag(params.tag);
  const response = await client.get<IFetchPostsResDto>(url,{
    params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
  });
  return response.data;
};
type fetchPostByIdType = (_: number) => Promise<Ipost>;
export const fetchPostById: fetchPostByIdType = async (id: number) => {
  const client = generateClient();
  const response = await client.get<Ipost>(urls.posts.byId(id));
  return response.data;
};

interface IFetchPostsSearchReqDto extends IPagination {
  q?: string | null;
}
interface IFetchPostsSearchResDto extends IResDto {
  posts: Ipost[];
}
// search
type fetchPostSearchType = (_?:IFetchPostsSearchReqDto ) => Promise<IFetchPostsSearchResDto>;
export const fetchPostSearch: fetchPostSearchType = async (params) => {
  const client = generateClient();
  const response = await client.get<IFetchPostsSearchResDto>(urls.posts.search(params.q),{
    params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
  });
  return response.data;
};


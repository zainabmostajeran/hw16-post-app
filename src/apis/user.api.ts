import { generateClient } from "./client";
import { urls } from "./urls";
import { IUser } from "../types/user-type";
import { IPagination, IResDto } from "../types/global-type";
import { listLimit } from "../utils/config";
import { Ipost } from "../types/post-type";

interface IFetchUserResDto extends IResDto {
  users: IUser[];
}

type fetchUserListType = (_?: Array<number>) => Promise<Array<IUser>>;
export const fetchUserList: fetchUserListType = async (ids) => {
  const client = generateClient();
  const responses = await Promise.all(
    ids.map((id) => {
      return client.get<IUser>(urls.users.byId(id));
    })
  );

  const data: IUser[] = [];
  for (const r of responses) {
    data.push(r.data);
  }
  return data;
};
type fetchSingleUserById = (_: number) => Promise<IUser>;
export const fetchSingleUserById: fetchSingleUserById = async (id) => {
  const client = generateClient();
  const response = await client.get<IUser>(urls.users.byId(id));
  return response.data;
};

type fetchUser = (_: IPagination) => Promise<IFetchUserResDto>;
export const fetchAllUser: fetchUser = async (params) => {
  const client = generateClient();
  const response = await client.get<IFetchUserResDto>(urls.users.list, {
    params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
  });
  return response.data;
};

interface IFetchUsersPostsReqDto extends IPagination {
  userId: number;
}
interface IFetchUsersPostsResDto extends IResDto {
  posts: Ipost[];
}

type fetchUserPostsType = (
  _: IFetchUsersPostsReqDto
) => Promise<IFetchUsersPostsResDto>;
export const fetchUserPosts: fetchUserPostsType = async ({
  userId,
  ...params
}) => {
  const client = generateClient();
  const response = await client.get<IFetchUsersPostsResDto>(urls.users.post(userId9), {
    params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
  });
  return response.data;
};

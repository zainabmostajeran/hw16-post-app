import React from "react";
import { fetchPostList } from "../apis/posts.api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchUserList } from "../apis/user.api";
import { PostCard, PostCardSkeleton } from "../components/postcard";
import { IUser } from "../types/user-type";
import { Ipost } from "../types/post-type";

interface IData {
  user: IUser;
  post: Ipost;
}

export const PostsPage: React.FC = () => {
  const [page, setPage] = React.useState<number>(1);
  const [data, setData] = React.useState<IData[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const posts = useQuery({
    queryKey: ["fetching-posts", page, searchParams.get("tag")],
    queryFn: () => fetchPostList({ skip: 0, tag: searchParams.get("tag") }),
  });
  const Users = useQuery({
    queryKey: [
      "fetching-Users-byId",
      (posts.data?.posts || []).map((el) => String(el.userId)).join(""),
    ],
    queryFn: () =>
      fetchUserList((posts.data?.posts || []).map((el) => Number(el.userId))),
      enabled: posts.isSuccess,
  });

  React.useEffect(() => {
    setPage(1);
    setData([]);
  }, [searchParams]);

  React.useEffect(() => {
    if (!posts.isSuccess || !Users.isSuccess) return;
    if (!posts.data || !Users.data) return;
    setDataLoading(() => true);
    const newData: IData[] = [];
    for (const post of posts.data.posts) {
      const user = Users.data.find(
        (el) => Number(el.id) === Number(post.userId)
      ) as IUser;
      newData.push({ user, post });
    }
    setDataLoading(false);
    setData((prevState) => [...prevState, ...newData]);
  }, [posts.isSuccess, Users.isSuccess, posts.data, Users.data]);

  useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("something went wrong");
  }, [posts.error, posts.isError]);

  return (
    <main className="min-h-screen w-full bg-blue-100 px-2">
      <section className="mx-auto max-w-[600px] w-full grid grid-cols-1 gap-y-4 py-10">
        {data.map((item, index) => {
          return (
            <Link to={`/post-info/${item.post.id}`}>
              <PostCard user={item.user} post={item.post} />
            </Link>
          );
        })}
        {(posts.isLoading || Users.isLoading || dataLoading) && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        <div className="flex justify-center">
          <button
            disabled={Number(posts.data?.total || -1) < data.length}
            className="bg-slate-400 text-white font-bold text-sm px-2 py-1 rounded-md"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </button>
        </div>
      </section>
    </main>
  );
};

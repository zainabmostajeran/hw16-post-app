import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { fetchPostById } from "../apis/posts.api";
import { fetchSingleUserById } from "../apis/user.api";
import { PostCard, PostCardSkeleton } from "../components/postcard";

export const PostById: React.FC = () => {
  
  const { id } = useParams();
  const validId = !isNaN(Number(id));
  const location = useLocation();

  const post = useQuery({
    queryKey: ["fetching-post-info", id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: validId,
  });
  const user = useQuery({
    queryKey: ["fetching-user-by-id", post.data?.userId],
    queryFn: () => fetchSingleUserById(Number(post.data?.userId)),
    enabled: post.isSuccess,
  });

  if (
    !validId ||
    (post.error as AxiosError)?.status === 404 ||
    (user.error as AxiosError)?.status === 404
  ) {
    return <Navigate to="/404" />;
  }

  if (!user.isSuccess || !post.isSuccess) {
    return (
      <section className="mx-auto max-w-[500px] w-full py-10">
        <PostCardSkeleton />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[500px]  w-full py-10">
      <PostCard extendBody={true} user={user.data} post={post.data} />
      {!location.pathname.includes("comments") && (
        <div className="w-full flex justify-center pt-5">
          <Link to={`/post-info/${user.data.id}/comments`}>
            <button className="bg-blue-600 hover:bg-purple-600 text-white font-bold text-sm px-2 py-1 rounded-md">
              Show Comments
            </button>
          </Link>
        </div>
      )}
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

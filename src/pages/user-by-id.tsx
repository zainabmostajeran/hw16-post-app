import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { fetchUserPosts } from "../apis/user.api";
import { UserCardSkeleton } from "../components/usercard";
import { UserPost } from "../components/userpost";

export const UserById: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));
  const location = useLocation();

  const user = useQuery({
    queryKey: ["fetching-userPosts-by-id", id],
    queryFn: () => fetchUserPosts({ userId: Number(id) }),
    enabled: validId,
  });
  console.log(user.data?.posts);

  if (!validId || (user.error as AxiosError)?.status === 404) {
    return <Navigate to="/404" />;
  }

  if (!user.isSuccess) {
    return (
      <section className="mx-auto max-w-[500px] w-full py-10">
        <UserCardSkeleton />
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-[500px] w-full py-10">
      {user.data?.posts.map((el,index) => {
        return <UserPost  key={index} post={el} />;
      })}

      {!location.pathname.includes("comments") && (
        <div className="w-full flex justify-center pt-5">
          <Link to={`/user-info/${user.data.posts}/comments`}>
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

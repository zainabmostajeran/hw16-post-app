import { AiOutlineLike, AiOutlineDislike, AiOutlineEye } from "react-icons/ai";
import { IUser } from "../types/user-type";
import { Ipost } from "../types/post-type";
import { classNames } from "../utils/classname";
import { Link } from "react-router-dom";

interface IPostCardProps {
  user: IUser;
  post: Ipost;
  extendBody?: boolean;
}
export const PostCard: React.FC<IPostCardProps> = ({
  user,
  post,
  extendBody=false
}) => {
  return (
    <div className="shadow-md bg-white rounded-xl w-full py-3 px-4">
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={user.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="overflow-hidden">
          <p className="text-lg font-semibold text-gray-700 capitalize truncate">
            {user.username}
          </p>
          <p className="text-xs font-semibold text-gray-400 truncate">
            {user.email}
          </p>
        </div>
      </div>
      <p className="truncate text-gray-700 capitalize text-lg font-semibold pt-3 pb-1">
        {post.title}
      </p>
      <p
        className={classNames(
          "text-justify text-sm font-medium text-gray-600",
          extendBody ? "" : "line-clamp-1"
        )}
      >
        {extendBody ? post.body : post.body.slice(0, 90)}
      </p>
      <div className="flex flex-wrap pt-4 gap-2">
        {post.tags.map((tag, index) => {
          return (
            <Link key={index} to={`/posts?tag=${tag}`}>
              <div className="bg-blue-600 text-white px-2 py-1 rounded-xl hover:bg-purple-600 cursor-pointer text-xs font-medium">
                {tag}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex pt-4 gap-x-3">
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineLike className="w-5 h-5 text-blue-600" />
          <span className="text-xs">{post.reactions.likes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineDislike className="w-5 h-5 text-blue-600" />
          <span className="text-xs">{post.reactions.dislikes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineEye className="w-5 h-5 text-blue-600" />
          <span className="text-xs">{post.views}</span>
        </div>
      </div>
    </div>
  );
};
export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-md bg-white rounded-xl w-full py-3 px-4">
      <div className="flex items-center gap-3">
        <div className="bg-gray-300 w-12 h-12 rounded-full min-w-12"></div>
        <div className="overflow-hidden space-y-2">
          <div className="bg-gray-300 w-24 h-4 rounded-md"></div>
          <div className="bg-gray-300 w-44 h-3 rounded-md"></div>
        </div>
      </div>
      <div className="pt-5 pb-1 overflow-hidden">
        <div className="bg-gray-300 w-72 h-4 rounded-md"></div>
      </div>
      <div className="overflow-hidden pt-2">
        <div className="bg-gray-300 w-full h-3 rounded-md"></div>
      </div>
      <div className="flex pt-4 gap-x-3">
        {[1, 2, 3, 4].map((key) => {
          return (
            <div
              key={key}
              className="bg-gray-300 w-24 h-5 rounded-xl hover:bg-slate-300 cursor-pointer"
            ></div>
          );
        })}
      </div>
      <div className="flex pt-4 gap-x-3">
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineLike className="w-5 h-5" />
          <div className="bg-gray-300 w-5 h-3 rounded-md"></div>
        </div>
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineDislike className="w-5 h-5" />
          <div className="bg-gray-300 w-5 h-3 rounded-md"></div>
        </div>
        <div className="flex items-center gap-x-1 text-gray-600">
          <AiOutlineEye className="w-5 h-5" />
          <div className="bg-gray-300 w-5 h-3 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

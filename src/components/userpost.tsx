// import { PostById } from "../pages/post-by-id";
import { AiOutlineLike, AiOutlineDislike, AiOutlineEye } from "react-icons/ai";
import { Ipost } from "../types/post-type";
import { Link } from "react-router-dom";
interface IUserCardProps {
  post: Ipost;
}
export const UserPost: React.FC<IUserCardProps> = ({ post }) => {
  return (
    <div className="shadow-lg  rounded-xl w-full py-3 px-4 mb-4">
      <p className="truncate text-gray-700 capitalize text-lg font-semibold pt-3 pb-1">
        {post.title}
      </p>
      <p className="text-justify text-sm font-medium text-gray-600">
        {post.body}
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

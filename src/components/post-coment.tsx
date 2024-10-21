import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLike } from "react-icons/ai";

import { fetchPostComments } from "../apis/coment.api";

export const PostComments: React.FC = () => {
  const { id } = useParams();

  const comments = useQuery({
    queryKey: ["post-comments", id],
    queryFn: () =>
      fetchPostComments({
        postId: Number(id),
      }),
  });

  return (
    <section className="bg-blue-100 p-4 mt-6 rounded-lg">
      <p className="font-bold pb-3">comments:</p>
      {(comments.data?.comments || []).map((el) => (
        <div className="flex justify-between items-center">
          <p key={el.id}>{el.body}</p>
          <div className="flex gap-2 items-center justify-center">
            <p>{el.likes}</p>
            <AiOutlineLike className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      ))}
    </section>
  );
};

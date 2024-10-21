import React from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "../components/debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchPostSearch } from "../apis/posts.api";
import { useSearchParams } from "react-router-dom";

import { IoSearchSharp } from "react-icons/io5";
export const Navbar: React.FC = () => {

  const [searchParams] = useSearchParams();

  const search = useQuery({
    queryKey: ["search-post-id", searchParams.get("q")],
    queryFn: () => fetchPostSearch({ q: searchParams.get("q") }),
  });
  console.log(search.data);
  

  return (
    <section className="w-full flex justify-between  gap-x-2 bg-blue-600 text-white font-semibold text-xl py-3 px-2">
      <div className="flex items-center gap-4">
        <img className="shadow-xl" src="logo (1).svg" alt="" />
        <div className="relative">
          <DebounceInput/>
          <IoSearchSharp onClick={()=>search.data} className="absolute text-blue-600 top-2 max-w-5 right-3 font-bold" />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <Link to="/">
          <button className="border border-purple-200  px-2 py-1 rounded-lg hover:bg-purple-600">
            home
          </button>
        </Link>
        <Link to="/posts">
          <button className="border border-purple-200 px-2 py-1 rounded-lg hover:bg-purple-600">
            posts
          </button>
        </Link>
        <Link to="/users">
          <button className="border border-purple-200 px-2 py-1 rounded-lg hover:bg-purple-600 ">
            users
          </button>
        </Link>
      </div>
    </section>
  );
};

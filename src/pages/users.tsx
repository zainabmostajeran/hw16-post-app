import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllUser } from "../apis/user.api";
import { UserCard, UserCardSkeleton } from "../components/usercard";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import React from "react";

export const UsersPage: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["fetching-users"],
    queryFn: ({ pageParam = 0 }) => fetchAllUser({ skip: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalUsers = lastPage.total;
      const loadedUsers = allPages.flatMap((page) => page.users).length;
      if (loadedUsers < totalUsers) {
        return loadedUsers;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
  });

  function onIntersection(entries: IntersectionObserverEntry[]) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage]);

  const allUsers = data?.pages.flatMap((page) => page.users) || [];

  return (
    <main className="min-h-screen w-full bg-blue-100 px-2">
      <section className="mx-auto max-w-[600px] w-full grid grid-cols-1 gap-y-4 py-10">
        {allUsers.map((el, index) => (
          <Link key={index} to={`/user-info/${el.id}`}>
            <UserCard
              image={el.image}
              firstName={el.firstName}
              lastName={el.lastName}
              email={el.email}
              age={el.age}
              birthDate={el.birthDate}
              address={el.address}
            />
          </Link>
        ))}

        {(isLoading || isFetchingNextPage) && (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        )}

        <div ref={elementRef} style={{ height: 1 }} />
      </section>
    </main>
  );
};

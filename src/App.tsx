import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/Mainlayout";
import { UsersPage } from "./pages/users";
import { PostsPage } from "./pages/posts";
import { PostById } from "./pages/post-by-id";
import { UserById } from "./pages/user-by-id";
import { PostComments } from "./components/post-coment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notfound } from "./pages/not-found";
import { ErrorBoundary } from "./components/ErrorBoundray";
import { Hero } from "./components/hero";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hero/>,
      errorElement: <ErrorBoundary />,
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "Posts",
          element: <PostsPage />,
        },
        {
          path: "post-info/:id",
          element: <PostById />,
          children: [{ path: "comments", element: <PostComments /> }],
        },
        {
          path: "Users",
          element: <UsersPage />,
        },
        {
          path: "User-info/:id",
          element: <UserById />,
          children: [{ path: "comments", element: <PostComments /> }]
        },
        {
          path: "/404",
          element: <Notfound />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";
const Home = lazy(() => import("../pages/Home"));
const Registration = lazy(() => import("../pages/Registration"));
const Universities = lazy(() => import("../pages/Universities"));
const AddUniversity = lazy(() => import("../pages/AddUniversity"));
const ManageUniversities = lazy(() => import("../pages/ManageUniversities"));
const Main = lazy(() => import("../layouts/Main"));

const repoName = import.meta.env.VITE_REPO_NAME || "";

export const router = createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/registration",
          element: (
            <Suspense fallback={<Loading />}>
              <Registration />
            </Suspense>
          ),
        },
        {
          path: "/universities",
          element: (
            <Suspense fallback={<Loading />}>
              <Universities />
            </Suspense>
          ),
        },
        {
          path: "/add-university",
          element: (
            <Suspense fallback={<Loading />}>
              <AddUniversity />
            </Suspense>
          ),
        },
        {
          path: "/manage-universities",
          element: (
            <Suspense fallback={<Loading />}>
              <ManageUniversities />
            </Suspense>
          ),
        },
      ],
    },
  ],
  { basename: repoName ? `/${repoName}` : '/' }
);

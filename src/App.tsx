import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { BookDetailPage } from "@/pages/books/BookDetailPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import MyLoansPage from "@/pages/MyLoansPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailPage />,
      },
      {
        path: "/loans",
        element: <MyLoansPage />,
      },
    ],
  },
  {
    path: "*",
    element: <LoginPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
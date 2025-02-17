import "./App.css";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import UserRegistrationForm from "./UserRegistrationForm";
import LoginForm from "./LoginForm";
import Me from "./Me";
import UpdatePassword from "./UpdatePassword";

function App() {
  const routes = [
    {
      path: "/",
      element:(<><h1>welcome</h1> <Link to={`/register`}>register</Link></>),
      },
      {
        path: "/register",
        element: <UserRegistrationForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/me",
        element: <Me />,
      },
      {
        path: "/updatepassword",
        element: <UpdatePassword />,
      },
  ];
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;

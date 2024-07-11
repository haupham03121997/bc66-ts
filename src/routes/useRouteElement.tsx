import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../modules/Auth/Login';
import { RegisterPage } from "../modules/Auth/Register";
import { useAppSelector } from '../redux/hooks';
import { PATH } from './path';

const RejectedRouter = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser === null) {
    return <Outlet />;
  }

  return currentUser.maLoaiNguoiDung === 'QuanTri' ? <Navigate to={PATH.ADMIN} /> : <Navigate to={PATH.HOME} />;
};

const useRouteElement = () => {
  const routes = useRoutes([
    {
      path: 'auth',
      element: <RejectedRouter />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          ),
        }
      ],
    },
  ]);

  return routes;
};

export default useRouteElement;

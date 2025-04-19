import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './pages/MainPage';
import OrangePage from './pages/OrangePage';
import DoublePage from './pages/DoublePage';
import BellCouter from './pages/BellCouter';
import Minesweeper from './pages/Minesweeper';
import MainLayout from './layout/MainLayout';
import SplashPage from './pages/SplashPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'splash', element: <SplashPage /> },
      { path: 'orange', element: <OrangePage /> },
      { path: 'double', element: <DoublePage /> },
      { path: 'bellCount', element: <BellCouter /> },
      { path: 'minesweeper', element: <Minesweeper /> },
    ]
  },
]);

export default function AppWrapper() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

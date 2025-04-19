import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isSplash = location.pathname === '/splash';

  return (
    <div className={`w-full min-w-[23.438rem] h-screen overflow-hidden ${isSplash ? 'bg-[#09B7AB]' : 'bg-[#222222]'}`}>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}

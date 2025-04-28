import Dumpling from '../assets/images/Dumpling.svg?react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center justify-center pt-28">
        <Dumpling />
        <h1 className="font-bold text-[40px] pb-32">Dumpling</h1>
      </div>

      <button 
        onClick={handleStartClick}
        className="bottom-36 px-[60px] py-[11px] rounded-[10px] text-[18px] bg-[#22222280] text-white "
        type="button"
      >
        시작하기
      </button>
    </div>
  );
};

export default SplashPage;
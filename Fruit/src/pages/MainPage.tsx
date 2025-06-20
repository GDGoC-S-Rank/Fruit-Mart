import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto px-5 pt-5">
      <div
        className="bg-[url('./assets/images/Rectangle2.png')] bg-contain bg-no-repeat bg-center rounded-2xl h-[238px] flex items-center justify-center text-white text-[2rem] font-bold"
        onClick={() => navigate('/orange')}
      >
        OrangeBall
      </div>
      <div
        className="bg-[url('./assets/images/Rectangle3.png')] bg-contain bg-no-repeat bg-center rounded-2xl h-[238px] flex items-center justify-center text-white text-[2rem] font-bold"
        onClick={() => navigate('/minesweeper')}
      >
        Minesweeper
      </div>
      <div
        className="bg-[url('./assets/images/Rectangle4.png')] bg-contain bg-no-repeat bg-center rounded-2xl h-[238px] flex items-center justify-center text-white text-[2rem] font-bold"
        onClick={() => navigate('/bellCount')}
      >
        Fruit Bell
      </div>
      <div
        className="bg-[url('./assets/images/Rectangle5.png')] bg-contain bg-no-repeat bg-center rounded-2xl h-[238px] flex items-center justify-center text-white text-[2rem] font-bold"
        onClick={() => navigate('/double')}
      >
        Double Card
      </div>
    </div>
  );
}

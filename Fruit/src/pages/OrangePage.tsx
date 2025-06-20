import { useEffect, useState } from "react";
import orangeImg from "../assets/images/orange.png";

interface Orange {
  x: number;
  y: number;
  id: number;
}

export default function OrangePage() {
  const [player, setPlayer] = useState({ x: 1500, y: 1500, size: 80 });
  const [items, setItems] = useState<Orange[]>([]);
  const [isGameOver, setGameOver] = useState(false);
  const [isStarted, setStarted] = useState(false);

  // 아이템 생성
  useEffect(() => {
    const newItems: Orange[] = [];
    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 2800 + 100,
        y: Math.random() * 2800 + 100,
      });
    }
    setItems(newItems);
  }, []);

  // 키보드 이동 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isGameOver) return;

      const step = 20;
      setPlayer((prev) => {
        let nextX = prev.x;
        let nextY = prev.y;

        if (e.key === "ArrowUp") nextY -= step;
        if (e.key === "ArrowDown") nextY += step;
        if (e.key === "ArrowLeft") nextX -= step;
        if (e.key === "ArrowRight") nextX += step;

        const half = prev.size / 2;
        if (
          nextX - half < 0 ||
          nextX + half > 3000 ||
          nextY - half < 0 ||
          nextY + half > 3000
        ) {
          setGameOver(true);
          return prev;
        }

        return { ...prev, x: nextX, y: nextY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted, isGameOver]);

  // 충돌 처리
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    setItems((prev) =>
      prev.filter((item) => {
        const dx = item.x - player.x;
        const dy = item.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < player.size / 2 + 20) {
          setPlayer((p) => ({ ...p, size: p.size + 10 }));
          return false;
        }
        return true;
      })
    );
  }, [player, isStarted, isGameOver]);

  // 중심 카메라 위치 계산
  const cameraStyle = {
    width: 3000,
    height: 3000,
    transform: `translate(${-player.x + window.innerWidth / 2}px, ${
      -player.y + window.innerHeight / 2
    }px)`,
  };

  const playerStyle = {
    transform: `translate(${player.x - player.size / 2}px, ${
      player.y - player.size / 2
    }px)`,
    width: player.size,
    height: player.size,
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black"
      onClick={() => {
        if (!isStarted) setStarted(true);
      }}
    >
      {/* 게임 월드 전체 */}
      <div
        className="absolute border-8 border-white transition-transform duration-200 ease-linear"
        style={cameraStyle}
      >
        {/* 플레이어 오렌지 */}
        <div
          className="absolute transition-transform duration-200 ease-linear"
          style={playerStyle}
        >
          <img
            src={orangeImg}
            alt="player"
            className="w-full h-full"
          />
        </div>

        {/* 시작 메시지 */}
        {!isStarted && !isGameOver && (
          <div
            className="absolute z-30 text-white text-3xl font-bold pointer-events-none"
            style={{
              left: player.x,
              top: player.y - player.size,
              transform: "translate(-50%, -150%)",
            }}
          >
            클릭해서 시작!
          </div>
        )}

        {/* 아이템 오렌지 */}
        {items.map((item) => (
          <img
            key={item.id}
            src={orangeImg}
            alt="item"
            className="absolute"
            style={{
              left: item.x - 20,
              top: item.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </div>

      {/* Game Over 오버레이 */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="text-white text-4xl font-bold">Game Over</div>
        </div>
      )}
    </div>
  );
}

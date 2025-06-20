import { useEffect, useState } from "react";

type Cell = {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentBombs: number;
};

const ROWS = 9;
const COLS = 9;
const BOMB_RATIO = 0.15;

function generateBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isBomb: false,
      isRevealed: false,
      isFlagged: false,
      adjacentBombs: 0,
    }))
  );

  const totalBombs = Math.floor(ROWS * COLS * BOMB_RATIO);
  let placed = 0;
  while (placed < totalBombs) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].isBomb) {
      board[r][c].isBomb = true;
      placed++;
    }
  }

  const directions = [-1, 0, 1];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isBomb) continue;

      let count = 0;
      for (let dr of directions) {
        for (let dc of directions) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            board[nr][nc].isBomb
          ) {
            count++;
          }
        }
      }
      board[r][c].adjacentBombs = count;
    }
  }

  return board;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(generateBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const revealCell = (r: number, c: number, updated = false) => {
    if (gameOver || board[r][c].isRevealed || board[r][c].isFlagged) return;

    const newBoard = updated ? board : board.map(row => row.map(cell => ({ ...cell })));

    const cell = newBoard[r][c];
    cell.isRevealed = true;

    if (cell.isBomb) {
      setGameOver(true);
      setBoard([...newBoard]);
      return;
    }

    if (cell.adjacentBombs === 0) {
      const directions = [-1, 0, 1];
      for (let dr of directions) {
        for (let dc of directions) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            !newBoard[nr][nc].isRevealed
          ) {
            revealCell(nr, nc, true);
          }
        }
      }
    }

    setBoard([...newBoard]);
  };

  const toggleFlag = (r: number, c: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (gameOver || board[r][c].isRevealed) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  useEffect(() => {
    const allCells = board.flat();
    const unrevealed = allCells.filter(cell => !cell.isRevealed);
    const bombCount = allCells.filter(cell => cell.isBomb).length;

    if (!gameOver && unrevealed.length === bombCount) {
      setWon(true);
      setGameOver(true);
    }
  }, [board, gameOver]);

  const reset = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4 p-6">
      <h1 className="text-2xl font-bold">지뢰찾기</h1>
      <div className="grid grid-cols-9 gap-[2px] bg-gray-500 p-[2px]">
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => revealCell(rIdx, cIdx)}
              onContextMenu={(e) => toggleFlag(rIdx, cIdx, e)}
              className={`
                w-8 h-8 text-sm flex items-center justify-center border
                ${
                  cell.isRevealed
                    ? cell.isBomb
                      ? "bg-red-600 text-white"
                      : "bg-green-500 text-black"
                    : cell.isFlagged
                    ? "bg-yellow-400"
                    : "bg-gray-600"
                }
              `}
            >
              {cell.isRevealed
                ? cell.isBomb
                  ? "💣"
                  : cell.adjacentBombs > 0
                  ? cell.adjacentBombs
                  : ""
                : cell.isFlagged
                ? "🚩"
                : ""}
            </div>
          ))
        )}
      </div>

      {gameOver && (
        <div className="text-xl font-bold">
          {won ? "🎉 승리했습니다!" : "💥 지뢰를 밟았습니다!"}
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-white text-black rounded"
        onClick={reset}
      >
        다시 시작
      </button>
    </div>
  );
}

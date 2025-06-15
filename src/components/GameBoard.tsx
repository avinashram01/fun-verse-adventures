
import React, { useCallback, useEffect, useRef, useState } from "react";
import GameToolbar from "./GameToolbar";
import GameModal from "./GameModal";
import { cn } from "@/lib/utils";

const BOARD_SIZE = 6;
const GAME_DURATION = 30; // seconds
const TILE_COLORS = [
  "bg-fuchsia-400",
  "bg-cyan-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-rose-400",
  "bg-purple-400",
  "bg-sky-400",
  "bg-teal-400"
];

function getRandomTile(boardSize: number) {
  const idx = Math.floor(Math.random() * (boardSize * boardSize));
  return idx;
}

function getRandomColor() {
  const idx = Math.floor(Math.random() * TILE_COLORS.length);
  return TILE_COLORS[idx];
}

function getStoredBest() {
  const best = localStorage.getItem("ctc_bestscore");
  return best ? parseInt(best) : 0;
}

const GameBoard: React.FC = () => {
  // Game state
  const [tiles, setTiles] = useState<{ id: number; color: string; isTarget: boolean }[]>(
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, idx) => ({
      id: idx,
      color: getRandomColor(),
      isTarget: false
    }))
  );
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_DURATION);
  const [best, setBest] = useState(getStoredBest());
  const [playing, setPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Game Start Handler
  const startGame = useCallback(() => {
    setScore(0);
    setTimer(GAME_DURATION);
    setTiles(prev =>
      prev.map(tile => ({ ...tile, color: getRandomColor(), isTarget: false }))
    );
    setPlaying(true);
    setShowModal(false);
    // Set new random target
    setTiles(prev => {
      const tIdx = getRandomTile(BOARD_SIZE);
      return prev.map((tile, idx) => ({
        ...tile,
        isTarget: idx === tIdx
      }));
    });
  }, []);

  // Timer + target tile update logic
  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setTimer(t => t > 0 ? t - 1 : 0);
      // Animate new target every second if playing
      setTiles(prev => {
        const tIdx = getRandomTile(BOARD_SIZE);
        return prev.map((tile, idx) => ({
          ...tile,
          color: getRandomColor(),
          isTarget: idx === tIdx
        }));
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  // End game when time runs out
  useEffect(() => {
    if (timer === 0 && playing) {
      setPlaying(false);
      // Delay to allow last effect (tile highlight) then show modal
      setTimeout(() => setShowModal(true), 800);
      // update best
      setBest(prev => {
        const newBest = Math.max(prev, score);
        if (newBest !== prev) localStorage.setItem("ctc_bestscore", String(newBest));
        return newBest;
      });
    }
  }, [timer, playing, score]);

  const handleTileClick = (idx: number) => {
    if (!playing) return;
    if (tiles[idx].isTarget) {
      setScore(s => s + 1);
      // set new target & randomize colors
      setTiles(prev => {
        const tIdx = getRandomTile(BOARD_SIZE);
        return prev.map((tile, i) => ({
          ...tile,
          color: getRandomColor(),
          isTarget: i === tIdx
        }));
      });
    }
  };

  // Mount: start with modal
  useEffect(() => {
    setShowModal(true);
    setPlaying(false);
  }, []);

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-8">
      <GameToolbar score={score} timer={timer} best={best} playing={playing} onRestart={startGame} />
      <div
        className={cn(
          "grid gap-3 sm:gap-4 w-full transition-all duration-500",
          `grid-cols-${BOARD_SIZE}`
        )}
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile, idx) => (
          <button
            key={tile.id}
            className={cn(
              `aspect-square rounded-lg shadow-md border-2 hover:scale-110 transition-all duration-200 outline-none`,
              tile.color,
              tile.isTarget
                ? "ring-4 ring-primary animate-pulse"
                : "ring-0"
            )}
            aria-label={tile.isTarget ? "Target tile" : "Regular tile"}
            tabIndex={playing ? 0 : -1}
            disabled={!playing}
            onClick={() => handleTileClick(idx)}
            style={{
              boxShadow: tile.isTarget
                ? "0 0 0 3px #6366f1, 0 6px 20px 0 rgba(60,90,200,.07)"
                : undefined,
            }}
          />
        ))}
      </div>
      <GameModal
        open={showModal}
        onRestart={startGame}
        lastScore={score}
        bestScore={best}
        playing={playing}
      />
    </div>
  );
};

export default GameBoard;

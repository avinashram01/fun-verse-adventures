
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Props {
  score: number;
  timer: number;
  best: number;
  playing: boolean;
  onRestart: () => void;
}

const GameToolbar: React.FC<Props> = ({ score, timer, best, onRestart, playing }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-card/80 rounded-xl border border-border px-6 py-4 shadow-inner">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-lg sm:text-2xl">Score: <b>{score}</b></span>
        <span className="font-mono text-base bg-muted px-2 rounded">Best: {best}</span>
      </div>
      <div className="flex flex-col items-center md:items-end gap-2 flex-1">
        <Progress value={playing ? (timer / 30) * 100 : 0} className="w-40 sm:w-56 h-3" />
        <span>
          <span className="font-mono px-2 text-foreground">{playing ? timer : 30}</span>
          <span className="text-muted-foreground">sec</span>
        </span>
      </div>
      <Button variant="secondary" onClick={onRestart} className="font-bold text-md px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform">
        {playing ? "Restart" : "Start"}
      </Button>
    </div>
  );
};

export default GameToolbar;

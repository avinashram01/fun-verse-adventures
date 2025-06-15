
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onRestart: () => void;
  lastScore: number;
  bestScore: number;
  playing: boolean;
}

const GameModal: React.FC<Props> = ({ open, onRestart, lastScore, bestScore, playing }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center">
            {playing
              ? "Game Paused"
              : lastScore === 0 && !playing
                ? "Ready to Play?"
                : lastScore === bestScore
                  ? "🎉 New High Score!"
                  : "Game Over"}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-2 py-4">
          {(lastScore > 0 || !playing) && (
            <div>
              <div className="text-lg font-semibold text-primary">Your Score: {lastScore}</div>
              <div className="text-md text-muted-foreground">Best: {bestScore}</div>
            </div>
          )}
          <div className="pt-2 text-muted-foreground">
            Click the <span className="font-semibold text-primary">target tile</span> as fast as you can! More you click, higher your score.
          </div>
        </div>
        <DialogFooter>
          <Button size="lg" className="w-full font-bold text-xl" onClick={onRestart}>
            {lastScore === 0 && !playing ? "Start Game" : "Play Again"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;

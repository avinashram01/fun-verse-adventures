
import React, { useState } from "react";
import GameBoard from "@/components/GameBoard";
import HistoryPanel from "@/components/HistoryPanel";

const Index = () => {
  // Track history in Index, so it survives board remounts.
  const [history, setHistory] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-pink-100 flex flex-col">
      <header className="py-8 px-8 border-b border-border flex items-center justify-between bg-card/70 backdrop-blur-md shadow">
        <h1 className="font-bold text-2xl tracking-tight text-primary drop-shadow-md">
          MindSprint
        </h1>
        <span className="text-lg text-muted-foreground hidden md:inline">
          How many targets can you click in 30 seconds?
        </span>
      </header>
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 p-8">
        <div className="flex-1 flex justify-center w-full">
          <GameBoard history={history} setHistory={setHistory} />
        </div>
        <div className="w-full md:max-w-xs">
          <HistoryPanel history={history} />
        </div>
      </main>
      <footer className="text-sm text-muted-foreground py-6 text-center">
        &copy; {new Date().getFullYear()} MindSprint – Made with <span className="animate-pulse">🎮</span>
        <span className="mx-2">· made by Avinash</span>
      </footer>
    </div>
  );
};

export default Index;

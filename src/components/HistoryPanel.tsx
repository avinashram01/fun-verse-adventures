
import React from "react";

interface HistoryPanelProps {
  history: number[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  // Show latest at the top
  const reversed = [...history].reverse();

  return (
    <aside className="w-full md:w-64 bg-card/60 rounded-xl border border-border shadow p-4 mt-8 md:mt-0">
      <h2 className="font-bold text-lg text-primary mb-3 text-center">History</h2>
      {reversed.length === 0 ? (
        <div className="text-muted-foreground text-center pt-8 pb-10">
          No games played yet. <br />
          Finish a round to see your scores!
        </div>
      ) : (
        <ul className="space-y-2">
          {reversed.map((score, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-3 py-2 rounded bg-muted"
            >
              <span className="font-mono text-base text-primary">
                Game {reversed.length - i}
              </span>
              <span className="font-semibold text-lg">{score}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default HistoryPanel;

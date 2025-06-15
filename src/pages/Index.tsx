
import GameBoard from "@/components/GameBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-pink-100 flex flex-col">
      <header className="py-8 px-8 border-b border-border flex items-center justify-between bg-card/70 backdrop-blur-md shadow">
        <h1 className="font-bold text-2xl tracking-tight text-primary drop-shadow-md">Color Tile Clicker</h1>
        <span className="text-lg text-muted-foreground hidden md:inline">How many targets can you click in 30 seconds?</span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <GameBoard />
      </main>
      <footer className="text-sm text-muted-foreground py-6 text-center">
        &copy; {new Date().getFullYear()} Color Tile Clicker – Made with <span className="animate-pulse">🎮</span>
      </footer>
    </div>
  );
};

export default Index;

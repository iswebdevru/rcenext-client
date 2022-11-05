'use client';

export default function ThemeButton() {
  const handleClick = () => {
    document.documentElement.classList.toggle('dark');
    const hasDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('settings/theme', hasDark ? 'dark' : '');
  };

  return (
    <button
      className="w-5 h-5 bg-violet-300 rounded-full flex dark:bg-violet-600 transition-colors"
      aria-label="Switch theme"
      onClick={handleClick}
    >
      <span className="block bg-yellow-300 w-3/5 h-3/5 rounded-full m-auto hover:bg-yellow-400 transition-colors dark:bg-zinc-800"></span>
    </button>
  );
}

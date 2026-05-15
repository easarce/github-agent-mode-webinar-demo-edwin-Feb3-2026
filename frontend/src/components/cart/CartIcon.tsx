import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

type CartIconProps = {
  itemCount: number;
};

export default function CartIcon({ itemCount }: CartIconProps) {
  const { darkMode } = useTheme();
  const cappedCount = itemCount > 99 ? '99+' : itemCount;

  return (
    <Link
      to="/cart"
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        darkMode ? 'text-light hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
      }`}
      aria-label={`Open cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l1.2 9.2a2 2 0 002 1.8h8.9a2 2 0 001.9-1.4L21 7.5H7.1" />
        <circle cx="10" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-xs font-semibold leading-none text-white">
          {cappedCount}
        </span>
      )}
    </Link>
  );
}

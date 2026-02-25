import type { ScreenId } from '../../lib/types';

interface ScreenNavPillProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const order: Array<{ id: ScreenId; title: string }> = [
  { id: 'hero', title: 'Início' },
  { id: 'form', title: 'Formulário' },
  { id: 'summary', title: 'Resumo' },
  { id: 'dashboard', title: 'Dashboard' },
];

export const ScreenNavPill = ({ currentScreen, onNavigate }: ScreenNavPillProps) => {
  return (
    <nav className="screen-nav-pill" id="screen-nav" aria-label="Navegação de telas">
      {order.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === currentScreen ? 'nav-pill-dot active' : 'nav-pill-dot'}
          title={item.title}
          onClick={() => onNavigate(item.id)}
          aria-label={item.title}
        />
      ))}
    </nav>
  );
};


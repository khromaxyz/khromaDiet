import AppFlow from '@/app/AppFlow';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <AppFlow />
    </ThemeProvider>
  );
}

export default App;

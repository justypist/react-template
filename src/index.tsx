import './index.less';
import { createRoot } from 'react-dom/client';
import { App } from '@app';

const reactTemplateApp = document.getElementById('react-template-app');

if (reactTemplateApp) {
  const root = createRoot(reactTemplateApp);
  root.render(<App />);
}

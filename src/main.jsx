import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from 'src/App';
import Story from 'components/story';
import Menu from 'components/menu';
import storyPacks from 'modules/storyPacks';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Menu storyPacks={storyPacks} />} />
          <Route path="/story/:storyId" element={<Story />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

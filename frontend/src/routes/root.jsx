import LandingPage from '../pages/LandingPage';
import Kampus from '../pages/Kampus';
import Voting from '../pages/Voting';
import NotFound from '../pages/NotFound';
import Kegiatan from '../pages/Kegiatan';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/kampus', element: <Kampus /> },
  { path: '/voting', element: <Voting /> },
  { path: '/kegiatan', element: <Kegiatan /> },
  { path: '*', element: <NotFound /> },
]);

export default router;

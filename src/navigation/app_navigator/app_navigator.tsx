import { CalculatorPage } from '@pages/calculator_page/calculator_page';
import { RootPage } from '@pages/root_page/root_page';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '/',
        element: <CalculatorPage />,
      },
    ],
  },
]);

export { router };

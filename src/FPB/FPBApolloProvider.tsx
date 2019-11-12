import { createContext } from 'react';

const { Provider, Consumer } = createContext<{ url: string }>({
  url: null,
});
export { Provider, Consumer };

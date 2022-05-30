import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import store from './redux/store';
import theme from './theme';
import AppRoutes from './routes'

function App() {
  return (
    <Provider store={store()}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

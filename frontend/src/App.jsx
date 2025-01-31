import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store/store.js';
import Home from './pages/Home';
import theme from './theme/theme';

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </Provider>
    );
};

export default App;

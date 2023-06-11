import * as React from 'react';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import AppNavigation from './navigation/AppNavigation';
import {Provider} from 'react-redux';
import {store} from 'src/redux';

const App = () => {
    return (
        <Provider store={store}>
            {__DEV__ ? <FlipperAsyncStorage /> : null}
            <AppNavigation />
        </Provider>
    );
};
export default App;

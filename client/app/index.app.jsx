import React from 'react';
import { render } from 'react-dom';
import Home from './pages/home/home.component';

const App = () => <Home />;

render(<App />, document.getElementById('app-main'));

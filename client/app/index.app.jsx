import React from 'react';
import { render } from 'react-dom';
import {UIRouter, UIView, hashLocationPlugin, UrlRouter} from 'ui-router-react';
import routerStates from './routes.app';

const configRouter = router => {
    router.urlRouter.otherwise('/not-found');
    router.urlRouter.when('', '/');
}

render(
    <UIRouter plugins={[hashLocationPlugin]} states={routerStates} config={configRouter}>
        <UIView/>
    </UIRouter>,
    document.getElementById('app-main')
);

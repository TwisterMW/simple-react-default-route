/* Import statements ommited */

const loggerMiddleware = createLogger();
const history = createHistory();
const routingMW = routerMiddleware(history);

const availableRoutes = ['example-route'];

const checkLocations = (location) => {
    let pathname = location.pathname.replace('/', '');
    if(availableRoutes.includes(pathname) === false) history.push("/welcome"); 
}

checkLocations(history.location);
history.listen(checkLocations);

const store = createStore(
    applyMiddleware(
        routingMW,
        thunkMiddleware,
        loggerMiddleware
    )
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <div>
            <Route path="/example-route" component={ ExampleComponent } />
        </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

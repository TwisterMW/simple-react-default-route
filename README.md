# Managing Default (Undefined) routes
There are a lot of workarounds for managing undefined routes on React, also in combination with Redux usually becomes a bit tedious problem to solve.

There is a proposal for manage this on a easy way through history listener (react-router v4)

## The problem
On case of routing with React + Redux we have something like this on the router definition:
```jsx
  render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <div>
            <Route path="/example-path" component={ ExampleComponent } />
        </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
```
And there is no way to efficiently redirect from undefined routes to a component by default. 

## The solution
We'll take profit of the event handling feature provided by history.listen function, which look like this:
```js
  history.listen((location, action) => {
    // stuff here
  })
```
First of all we define an array with available routes at the top of the file (which is the only thing to be mantained):
```js
  let availableRoutes = ['example-route'];
````

Then we define a function who will take care of the route redirect (this function can be different depending on your necessities, show a 404 static page, etc...), something like this:
```js
  const checkLocations = (location) => {
    let pathname = location.pathname.replace('/', '');
    if(availableRoutes.includes(pathname) === false) history.push("/welcome"); 
}
```
PD: Note that using includes() function from the availableRoutes array we can directly redirect to a desired route. Also note that we're parsing the location in order to remove the slash '/', but we can do it without parsing and storing the route in the availableRoutes with the slashes.

Then the last step is execute the function checkLocations() in order to check the first route access, and pass that function to history.listen for handling route changes from now on:

```js
  checkLocations(history.location);
  history.listen(checkLocations);
```

With that few steps (all done in the entry point of your react application) you won't need to refactor your routing definition and you'll be able to redirect undefined routes to a desired one.

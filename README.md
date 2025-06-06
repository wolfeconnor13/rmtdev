# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Project Takeaways

## Why shouldn't we be using useEffect to grab the data for SearchForm.tsx?

In the previous projects we've been using useEffect to interact with external servivces, like when we're using fetch. We wanted to do this when the component first mounts, and then when something was updated. In the case of this project we're grabbing data after a user event, so instead we're grabbing data in SearchForm.tsx right in the onChange handler function. Except we aren't, in practice a lot of the time people will still use useEffect, and just have it update when the state that's updated by the user event is updated.

## useDebounce React Hook

Slows down our requests so we aren't making a network request with every typed letter / update in searchText state. In general, debouncing is useful when an event is firing many times a second (think of events like scrolling, mouse moving, etc.) We implemented our own debounce using a function like this:

const [debouncedSearchText, setDebouncedSearchText] = useState("");
useEffect(() => {
const timerId = setTimeout(() => setDebouncedSearchText(searchText), 1000);
return () => clearTimeout(timerId); //cleanup
}, [searchText]);

## Generics

Our debounce hook might be useful to use in other components as well, but when it's first created it's only taking a string. We can use union operations to specify more types, but then we also have to include that union in the return type. Overall, it would be better for us to describe the relationship between the input and the output. That's where we can use a generic.

Note: We need to specify in our hooks file that useDebounce is a so called "generic-function"

Named function:
export function useDebounce<T>(value: T, delay = 500): T {}

Arrow / anonymous function:
export const useDebounce = <T>(value: T, delay = 500): T => {}

## Caching fetch request @tanstack/react-query

In NextJS caching our search and selected item would be easier but here we have to implement it ourselves. We do this ourselves with a popular package from TanStack called react-query.

Notes on react-query:
useQuery() is the hook to call.
Takes 3 arguments {dependency array, function to fetch data, configuration}
Need to wrap the component that uses it in a ReactQueryProvider
Loading states can become confusing with react-query. In our app we wanted to display a loading spinner when we began fetching an expanded item. In react-query because there was no data initially, this is considered as isLoading was true! Changing the state from isLoading to isInitialLoading solves our problem.

## e.currentTarget vs e.target

e.currentTarget can be used to get the actual item that your function is being used on, even if the the event bubbled up from a child component.

## React Context API

We found a good use for the React Context API in this project in our BookmarkIcon component. The bookmark icon could be used many places throughout our application, so drilling down props from the App component all the way to down to wherever our bookmark icon would we unwieldy, and instead we can use the React Context API.

First we need to create a context for the ContextProvider (which is just a react component). We create it with createContext() from react. This way a component can be provided that context to use the functions/state/data in the ContextProvider.

There is one additional step to using the ContextProvider though, we have to wrap the components that want to use that context in the actual .Provider. As such BookmarksContextProvider also need to accept children, so that is can display whatever it is wrapping. We return the provider wrapping the children, with the props to the provider being whatever functions or values we want to use.

## Refs and Forwarded Refs.

In our BookmarksButton component we used state to manage whether the popover was open. We also wanted to close the popover when the user clicked outside of the popover. We can manage this with a document.eventListener(). It's easy to target the button itself, as the state and the button all exist in the BookmarksButton component. We can attach a ref to the button and then use a handleClick function to handle the logic that results from a mouseclick. We basically say hey, if the click's target was the button, we shouldn't be overriding the click on the button to open it.

What about the pop over? If you're thinking about it logically you could conclude that we just need to pass a ref to the popover component, accept it in the popover component, and then set it to the HTMLElement that contains the popover.

This is almost the correct approach. Technically a component takes two arguments props and ref!

export default function SomeComponent({someprop1, someprop2}, ref).

We also have to restructure the component to use the ref. We have to wrap the function in a forwardRef.

const SomeComponent = forwardRef(function (props, ref) {
... // component logic
});

export default SomeComponent;

### Tricky typing with forwardRef

When you pass the ref to the component, it doesn't infer what type the ref is, we need to specify what type that is. We can do that by using the angled brackets on forwardRef<>.

The thing is, the ref type comes FIRST! The type for the props is after.

### What if we want to use forwardRef and no props?

We can indicate that we aren't going to use the props by taking the props with a \_ character.

forwardedRef<HTMLDivElement>(function (\_, ref) {

})

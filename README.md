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

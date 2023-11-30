![Workflow Status](https://github.com/uxdxdev/vite-react-table-sort-filter-url/actions/workflows/deploy-github-pages.yml/badge.svg)

There are a couple of benefits of implementing search with URL params:

- Bookmarkable and Shareable URLs: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- Server-Side Rendering and Initial Load: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- Analytics and Tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

# Bootstrap

```
node v116.0.0 
npm 7.10.0
```

## Install dependencies

```bash
npm ci
```

## Run dev server
```bash
npm run dev
```
## Run tests

```bash
npm test
```
```bash
npm coverage
```

## Run dev server and JSON dev server

```bash
npm run start
```

# Components
## Table

The `Table` component requires a column configuration that has a `uid` that corresponds to a property in the expected data, e.g. `location`

The `Table` component requires an `id` property in the expected data to `key` each table row in order for React to minimise real DOM updates

```javascript
const columns = [
    { uid: "location", name: "Location" },
    { uid: "temprature", name: "Temprature" },
    ...
  ];

const tableData = [
    {
      id: 1,
      location: "Berlin",
      temprature: 20,
      ...
    }
  ]
```
The `Table` component can be used with only a column configuration and table data

```jsx
<Table rows={tableData} columns={columns} />
```

The filter input on a table column is a controlled component, so you need to handle the `onChange` events coming from it, and provide a controlled state variable to display a value

To enable filtering you must provide:
- `filterAllowList` an array of strings that correspond to column `uid`s
- `handleFilters` a function that will be called with an `input.onChange` event
- `appliedFilters` a map of column `uid` and filter input value

```jsx
<Table
  rows={tableData}
  columns={columns}
  // enable filter inputs
  filterAllowList={["name"]}
  handleFilters={(event) => {}}
  appliedFilters={{
    name: 'greg'
  }}        
/>
```

To enable sorting you must provide:
- `sortAllowList` an array of strings that correspond to column `uid`s
- `handleSortBy` a function that will be called with an `onKeyDown` or `onClick` event
- `appliedSorting` an object with `sortBy` and `order` values set, `sortBy` must correspond to a column `uid`

```jsx
<Table
  rows={tableData}
  columns={columns}
  // enable sort
  sortAllowList={["name"]}
  handleSortBy={(eventType, columnId, event) => {
      if (eventType === "onKeyDown") {
        if (event.key === "Enter") {
          // do something
        }
      }

      if (eventType === "onClick") {
        // do something
      }
    }
  }    
  appliedSorting={{
    sortBy: "name",
    order: "ASC"
  }}
/>
```

See `src\components\Table\Table.test.jsx` for examples on how to use it

# Hooks

## useTransform()

Used to filter and sort an array of objects based on it's configuration

```javascript
// #1 call hook
const { data, setTransformData, filterSortConfig, setFilterSortConfig } = useTransform();
```

Initially `data` is empty, you must call `setTransformData()` with an array of objects to initialise the hook. Then as you update the filter and sort configuration with `setFilterSortConfig()` the data is transformed

```javascript
// #2 set data to transform
setTransformData([
  {
    id: 1,
    location: "Ireland"
  },
  {
    id: 2,
    location: "Berlin"
  },
  {
    id: 3,
    location: "Belgium"
  }
])

// #3 set filter and sorting configuration
setFilterSortConfig({
  filter: {
    location: "be"
  },
  sorting: {
    sortBy: "location",
    order: "ASC"
  }
})

// #4 get transformed data
console.log(data)
// output
[
  {
    id: 3,
    location: "Belgium"
  },
  {
    id: 2,
    location: "Berlin"
  }
]

```

The filters and sortBy configurations must correspond to a property key in your data

## useUrlFilterSort()

Used to store user defined filter and sorting preferences in the URL, and keep them in sync as they are updated

```javascript
const { urlFilterSortMap, updateFilters, updateSortBy } = useUrlFilterSort({
    // default filtering
    location: "",
    // default sorting
    sortBy: "location"
    order: "ASC",
  });
```

Set an initial configuration to store preferences in the URL

```
http://uxdx.dev/?location=&sortBy=location&order=ASC
```

The `updateFilters` and `updateSortBy` functions are to be used to capture user input or click events on UI elements and to then store this information in the URL. This supports page reloading in an SPA or static site, and URL sharing

```javascript
updateFilters({
  id: "location",
  value: "ber"
})
```

```diff
-http://uxdx.dev/vite-react-table-sort-filter-url/?location=&sortBy=location&order=ASC
+http://uxdx.dev/vite-react-table-sort-filter-url/?location=ber&sortBy=location&order=ASC
```

```javascript
updateSortBy({
  uid: "temperature"
})
```

```diff
-http://uxdx.dev/vite-react-table-sort-filter-url/?location=ber&sortBy=location&order=ASC
+http://uxdx.dev/vite-react-table-sort-filter-url/?location=ber&sortBy=temperature&order=ASC
```

You can also access these filter and sorting configurations in `urlFilterSortMap` which will be kept up to date even if the user directly edits the URL

```
http://uxdx.dev/?name=greg&status=approved&position_applied=&sortBy=position_applied&order=ASC
```

```javascript
console.log(urlFilterSortMap)
// output
{
  name: "greg",
  status: "approved",
  position_applied: "",
  sortBy: "position_applied",
  order: "ASC"
}
```

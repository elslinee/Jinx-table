# Jinx Table

[![npm version](https://img.shields.io/npm/v/jinx-table.svg)](https://www.npmjs.com/package/jinx-table) [![npm downloads](https://img.shields.io/npm/dm/jinx-table.svg)](https://www.npmjs.com/package/jinx-table)

A modern, customizable React table component library built with Vite, Tailwind CSS, and Radix UI. Jinx Table provides flexible table rendering, sorting, filtering, pagination, and selection, along with a set of reusable UI components.

![Jinx Table preview](public/jinxtable.jpg)

Get it on npm: [jinx-table](https://www.npmjs.com/package/jinx-table)

## Features

- **Dynamic Table Rendering**: Easily display data with customizable columns and cell rendering.
- **Sorting, Filtering, Pagination**: Built-in support for common table operations.
- **Row Selection**: Optional checkbox selection for rows.
- **Composable UI Components**: Includes Button, Input, Checkbox, Dialog, and Table primitives.
- **Utility Functions**: Helpers for class name merging and column creation.
- **TypeScript-friendly (JSX/JS)**: Written in modern React with hooks and functional components.

## Project Structure

```
src/
  components/
    react-table/
      JinxTable.jsx         # Main table component with advanced features
    ui/
      button.jsx            # Button component (variants, sizes)
      checkbox.jsx          # Checkbox (Radix UI)
      dialog.jsx            # Dialog/modal (Radix UI)
      input.jsx             # Styled input field
      table.jsx             # Table primitives (Table, TableRow, etc.)
  lib/
    utils.js                # Utility for merging class names
  utils/
    columnsUtils.jsx        # Helpers for column/checkbox column creation
```

## Usage

### Installation

#### As an npm package:

```sh
npm install jinx-table
# or
yarn add jinx-table
```

#### From source:

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd jinx-table
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

### Basic Example

#### When using as npm package:

```jsx
import { JinxTable } from "jinx-table";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

export default function App() {
  return (
    <JinxTable
      data={data}
      keys={data}
      filterFields={["name"]}
      isCheckbox={true}
      isPagination={true}
      total={data.length}
      limit={10}
      skip={0}
      loading={false}
    />
  );
}
```

#### When using from source:

```jsx
import JinxTable from "./src/components/react-table/JinxTable";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

export default function App() {
  return (
    <JinxTable
      data={data}
      keys={data}
      filterFields={["name"]}
      isCheckbox={true}
      isPagination={true}
      total={data.length}
      limit={10}
      skip={0}
      loading={false}
    />
  );
}
```

### Custom Columns

Use `createColumn` and `checkboxColumn` from `src/utils/columnsUtils.jsx` to define custom columns and selection.

### UI Components

- **Button**: Variant, size, and icon support
- **Input**: Styled input for search/filter
- **Checkbox**: Accessible, Radix-based
- **Dialog**: Modal dialog for forms or details
- **Table**: Table primitives for custom layouts

## Customization

- **Styling**: Uses Tailwind CSS for easy customization
- **Slots & Props**: All components accept `className` and other props for flexibility
- **Extendable**: Add your own columns, dialogs, or actions as needed

## Utilities

- `cn(...inputs)`: Merges class names and resolves Tailwind conflicts
- `createColumn({ accessorKey, header, customCell })`: Helper for defining table columns
- `checkboxColumn()`: Adds a selection checkbox column

## Dependencies

- React
- Vite
- Tailwind CSS
- Radix UI (Dialog, Checkbox)
- @tanstack/react-table
- lucide-react (icons)
- class-variance-authority, clsx, tailwind-merge

## Publishing

To publish this package to npm:

1. **Build the package:**

   ```sh
   npm run build
   ```

2. **Login to npm:**

   ```sh
   npm login
   ```

3. **Publish:**
   ```sh
   npm publish
   ```

The `prepublishOnly` script will automatically build the package before publishing.

## License

MIT

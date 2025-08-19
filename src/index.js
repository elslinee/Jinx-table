// Main JinxTable component
export { default as JinxTable } from "./components/react-table/JinxTable.jsx";

// UI Components
export { Button } from "./components/ui/button.jsx";
export { Input } from "./components/ui/input.jsx";
export { Checkbox } from "./components/ui/checkbox.jsx";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog.jsx";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/ui/table.jsx";

// Utilities
export { cn } from "./lib/utils.js";
export { createColumn, checkboxColumn } from "./utils/columnsUtils.jsx";

# UI Patterns

> Common layouts, states, and interaction patterns for all customer apps.

## Layout Templates

### Sidebar Layout (Dashboard Apps)

Use for apps with navigation between multiple views (dashboards, admin panels).

```tsx
<div className="flex h-screen">
  {/* Desktop sidebar */}
  <aside className="hidden md:flex md:w-64 md:flex-col border-r">
    <nav className="flex-1 p-4 space-y-1">
      {/* Nav items */}
    </nav>
  </aside>

  {/* Mobile sidebar using shadcn Sheet */}
  <Sheet>
    <SheetTrigger asChild className="md:hidden">
      <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-64 p-4">
      <nav className="space-y-1">{/* Nav items */}</nav>
    </SheetContent>
  </Sheet>

  {/* Main content */}
  <main className="flex-1 overflow-auto p-6 md:p-8">
    {children}
  </main>
</div>
```

### Stacked Layout (Simpler Apps)

Use for apps with a single primary view or minimal navigation.

```tsx
<div className="min-h-screen flex flex-col">
  <header className="border-b">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{appName}</h1>
      {/* Actions */}
    </div>
  </header>

  <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
    {children}
  </main>
</div>
```

## Responsive Breakpoints

Mobile-first approach. Standard grid pattern:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

Key breakpoints:
- **Mobile**: `< 640px` — single column, full-width cards
- **Tablet**: `sm: 640px` — two columns
- **Desktop**: `lg: 1024px` — three columns (or sidebar layout)

## UI States

### Loading

Use shadcn `Skeleton` components. Never use spinners.

```tsx
<div className="space-y-4">
  <Skeleton className="h-8 w-48" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

### Empty State

Centered icon + heading + CTA button.

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <FileX className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">No items yet</h3>
  <p className="text-sm text-muted-foreground mt-1 mb-4">
    Get started by creating your first item.
  </p>
  <Button>
    <Plus className="h-4 w-4 mr-2" />
    Create Item
  </Button>
</div>
```

### Error State

Use shadcn `Alert` with the destructive variant.

```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>{errorMessage}</AlertDescription>
</Alert>
```

### Success Feedback

Use `sonner` toasts for success messages.

```bash
npm install sonner
```

```tsx
// In App.tsx or layout root
import { Toaster } from "sonner";
<Toaster position="top-right" />

// Anywhere in the app
import { toast } from "sonner";
toast.success("Item created successfully");
```

## Data Display

### Stat Cards

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        Total Revenue
      </CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$12,345</div>
      <p className="text-xs text-muted-foreground">+12% from last month</p>
    </CardContent>
  </Card>
</div>
```

### Tables

Use shadcn `Table` for tabular data.

### Charts

Use `recharts` for data visualizations. Install per-app:

```bash
npm install recharts
```

Use shadcn chart colors for consistency.

## Animation

Keep it minimal for MVPs:

- Hover transitions: `transition-colors duration-150`
- No `framer-motion` — too heavy for MVPs
- Use CSS transitions only for interactive feedback (hover, focus)

## Accessibility

All apps must meet these baseline requirements:

- **Contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- **Semantic HTML**: Use `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` landmarks
- **Skip navigation**: Add a skip-to-main-content link as the first focusable element
- **Form labels**: Every input must have an associated `<label>` or `aria-label`
- **Keyboard navigation**: All interactive elements must be reachable and operable via keyboard
- **Focus indicators**: Do not remove default focus outlines; shadcn components handle this

# Next.js Project with SCSS and Tailwind CSS

This is a Next.js project set up with:

- **Next.js 15** (stable version)
- **TypeScript** (.tsx files) - without complex type definitions
- **Tailwind CSS** for utility-first styling
- **SCSS** for advanced CSS features
- **ESLint** for code quality

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.scss    # Global SCSS styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
└── components/
    ├── Button.tsx      # Example button component
    └── Card.tsx        # Example card component
```

## Features

- **Tailwind CSS**: Use utility classes for rapid UI development
- **SCSS**: Write advanced CSS with variables, mixins, and nesting
- **TypeScript**: Simple .tsx files without complex type definitions
- **Components**: Reusable React components
- **Responsive Design**: Mobile-first approach with Tailwind

## Example Usage

### Using Tailwind Classes

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Tailwind styled element
</div>
```

### Using SCSS

```scss
.custom-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &:hover {
    transform: scale(1.05);
  }
}
```

### Simple Component Props

```tsx
export default function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  // Component implementation
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

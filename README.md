# Prefill UI

A React-based application for visualizing and configuring field prefill mappings in dynamic forms.

---

## 🚀 How do I run this locally?

### 1. Clone the repository

```bash
git clone https://github.com/JayByeun/f34239.git
cd f34239
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Start the development server!

```bash
yarn start
```

### 4. Run tests

-   Run all tests:

```bash
yarn test
```

-   Watch mode (for devleopment):

```bash
yarn run test:watch
```

## 🧩 How do I extend with new data sources?

### 1. Update `PREFILL_CONFIG` in `APP.tsx`

```
export const PREFILL_CONFIG = {
  email: { formName: "Form A", field: "email" },
  newField: { formName: "Form X", field: "custom_id" }, // Add new source
};
```

### 2. Ensure the from exsits in `graphData.forms`

The new form must:

-   Be present in `graphData.forms`
-   Define the relevant `field_schema.properties`

### 3. Update `PrefillModa.tsx` if special behavior is needed for the new source

## 🧠 What patterns should I be paying attention to?

-   Controlled Components

    State is manged using React's `useState`.

-   Component Composiion

    Modular components like `ToggleButton`, `Accordion`, and `PrefillModal` improve readability and reuse.

-   Data-Driven UI

    Forms and fields are rendered dynamically based on backend's `BlueprintGraph`.

-   Conditional Rendering

    View / Edit modes and modal visiblity are conditioanlly rendered using boolean.

-   Testable Architecture

    Build with Vitest, and compoents are tested with `@testing-library/react` for UI interactions.

## 🏛️ Project Structure

```
src/
├── components/
│   ├── styles/
│   │   ├── Accordion.css
│   │   ├── FormList.css
│   │   ├── PrefillModal.css
│   │   └── ToggleButton.css
│   ├── Accordion.tsx
│   ├── ToggleButton.tsx
│   ├── FormList.tsx
│   └── PrefillModal.tsx
├── icons/
│   ├── ArrowDown.tsx
│   ├── Close.tsx
│   ├── Database.tsx
│   ├── RightArrow.tsx
│   └── Search.tsx
├── test/
│   ├── App.test.tsx
│   └── setup.ts
├── utils/
│   ├── types.ts
│   └── utils.ts
├── App.tsx
├── App.css
├── index.css
└── index.tsx
```

## 🛠️ Example Scripts

```
"scripts": {
  "start": "PORT=3002 react-scripts start",
  "build": "react-scripts build",
  "eject": "react-scripts eject",
  "test": "vitest",
  "test:watch": "vitest --watch"
  "clean": "rm -rf node_modules package-lock.json"
}
```

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# AGENTS.md — 3D Model System

## Project Philosophy
- Follow **Clean Code** and **Clean Architecture** (moderate level).
- Prefer simple, predictable code over cleverness.
- No overengineering. No premature abstractions.
- Strong separation of concerns at all times.

## Absolute Rules (NEVER Violate)
- **NEVER** use `any`. Refuse to generate code that contains it.
- **NEVER** use external UI libraries. Tailwind only.
- **NEVER** install or use libraries without explicit permission.
- **NEVER** break the project's architectural patterns.
- **NEVER** put complex logic inside components.
- **REFUSE** to generate code that violates any of these rules.

---

## Project Structure

```
app/                          # Next.js pages (App Router)
components/
  ui/                         # Base primitives: Button, Input, Modal, etc.
  shared/                     # Cross-feature shared components
  features/[feature]/         # Feature-specific components
actions/
  [feature]/                  # Server Actions por feature
hooks/                        # Custom hooks (global/shared)
services/                     # API calls and business logic
store/                        # Zustand stores (global state)
lib/                          # Config, third-party setup
utils/                        # Pure utility functions
interfaces/                   # ALL global TypeScript interfaces
```

### Folder Responsibilities
| Directory | Contains |
|---|---|
| `components/ui/` | Primitive, reusable UI atoms (Button, Input, Select, etc.) |
| `components/shared/` | Composed components used across multiple features |
| `components/features/` | Components exclusive to a specific feature |
| `actions/` | Server Actions (POST, PUT, DELETE) |
| `hooks/` | Reusable logic extracted from components |
| `services/` | Data fetching, API communication, business rules |
| `store/` | Zustand stores for global state |
| `interfaces/` | All shared TypeScript interfaces |

---

## Architecture Rules

```
Component ──► Hook ──► Service ──► Fetch / API
                │
                ├──► Action ──► Server Mutation
                └──► Store (Zustand) ──► Global State
```

- **Component**: UI only. No logic, no direct API calls.
- **Hook**: Extracts and encapsulates component logic.
- **Service**: Centralizes API calls and business rules.
- **Action**: Server Actions for mutations (POST, PUT, DELETE).
- **Store**: Zustand for truly global state.
- **Context API**: Feature-scoped state (parent/child/grandchild sharing within a feature). NOT for global state.

---

## React Rules
- Default to **Server Components**. Only add `"use client"` when you need interactivity, browser APIs, or lifecycle hooks.
- Favor **server-side data fetching** with async Server Components.
- Keep components small and composable.
- Separate **container (logic)** from **presentational (UI)** — put logic in hooks, keep components clean.

```tsx
// ✅ Correct: component receives ready data
interface ProfileCardProps {
  name: string;
  email: string;
}

export const ProfileCard = ({ name, email }: ProfileCardProps) => (
  <div className="rounded-lg border p-4">
    <h2 className="text-lg font-semibold">{name}</h2>
    <p className="text-sm text-neutral-500">{email}</p>
  </div>
);
```

---

## Export Rules
| File Type | Export Style |
|---|---|
| Pages (`app/`) | `default export` |
| Everything else | `named export` |
| Barrel (`index.ts`) | Allowed for organizing exports |

```tsx
// ✅ Correct: component uses named export
export const Button = ({ ... }: ButtonProps) => { ... };

// ✅ Correct: page uses default export
export default function DashboardPage() { ... };
```

---

## Typing Rules (STRICT)
- **Always** use `interface` — never `type` for object shapes.
- **Never** use `any`. If you're tempted, the architecture is wrong.
- **Never** write `React.ReactNode`. Always import explicitly.
- Global types go into `interfaces/`.
- Keep interfaces close to where they're used when not global.

```tsx
// ✅ Correct
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// ❌ Wrong
// React.FC<{children: React.ReactNode}>
// type ButtonProps = { ... }
// any
```

---

## Hooks Rules
- Custom hooks for **all reusable logic**.
- Naming: `use[PascalCase]`.
- Never put complex logic directly inside components.
- Hooks should be pure or have clear side effect boundaries.

```tsx
// ✅ Correct
export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => { setProfile(data); setLoading(false); });
  }, [userId]);

  return { profile, loading };
};
```

---

## Data Fetching & API
- Use native `fetch` everywhere.
- **Never** call APIs directly inside components.
- Centralize all API calls in `services/`.
- Keep services simple: receive params, return data, throw on error.

```tsx
// ✅ Correct: service layer
// services/user.service.ts
export const getUserById = async (id: string): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};
```

### Server Actions
- Location: `actions/[feature]/`.
- Use for mutations only (POST, PUT, DELETE).
- Keep them focused on one operation.

```tsx
// ✅ Correct
// actions/user/update-profile.ts
'use server';

import { z } from 'zod';

const UpdateProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(500).optional(),
});

export const updateProfile = async (formData: FormData) => {
  const parsed = UpdateProfileSchema.parse(Object.fromEntries(formData));
  // mutate database...
};
```

---

## Forms & Validation
- `react-hook-form` for form state.
- `zod` + `@hookform/resolvers` for validation.
- Schema lives outside the component.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>; // uses z.infer — this is the ONLY exception to the "no type" rule

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('email')} />
      <input {...register('password')} type="password" />
      <button type="submit">Login</button>
    </form>
  );
};
```

---

## State Management

### Global State → Zustand
```ts
// store/auth.store.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Feature State → Context API
```tsx
// components/features/wizard/wizard.context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface WizardContextValue {
  step: number;
  next: () => void;
  prev: () => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  return (
    <WizardContext.Provider value={{ step, next: () => setStep(s => s + 1), prev: () => setStep(s => s - 1) }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
};
```

---

## Tailwind Rules
- Tailwind is the ONLY styling solution.
- **Avoid long class strings** — extract Tailwind classes into constants when they exceed ~4 classes.
- No CSS modules, no styled-components, no external UI kits.

```tsx
// ✅ Avoid long inline strings
const cardClasses = 'rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow';

export const Card = ({ children }: { children: ReactNode }) => (
  <div className={cardClasses}>{children}</div>
);
```

---

## Naming Conventions

| What | Convention | Example |
|---|---|---|
| Files/Directories | `kebab-case` | `user-profile.tsx`, `auth.store.ts` |
| Components | `PascalCase` | `UserProfile`, `LoginForm` |
| Hooks | `use[PascalCase]` | `useProfile`, `useAuth` |
| Services | `kebab-case.service.ts` | `user.service.ts` |
| Store files | `kebab-case.store.ts` | `auth.store.ts` |
| Interfaces | `PascalCase` | `UserProfile`, `AuthState` |
| Actions | `kebab-case.action.ts` | `update-profile.action.ts` |

---

## File Size Limit
- Maximum **250 lines** per file.
- If a file exceeds this, refactor — extract logic into hooks, split components, or split services.

---

## DO / DON'T

### DO ✅
- Create small, composable, reusable components.
- Follow the defined folder structure strictly.
- Keep logic in hooks, services, and actions — not in components.
- Use `interface` for all type definitions.
- Use native `fetch` with services layer.
- Use Server Components by default.
- Use Zustand for global state, Context API for feature-scoped state.
- Use react-hook-form + zod for forms.
- Write pure functions in `utils/`.
- Create barrel exports (`index.ts`) when it improves organization.

### DON'T ❌
- Do NOT use `any`.
- Do NOT install or use external UI libraries.
- Do NOT duplicate code.
- Do NOT create unnecessary abstractions.
- Do NOT break existing patterns in the codebase.
- Do NOT put complex logic directly in components.
- Do NOT use `React.ReactNode` — import `ReactNode` explicitly.
- Do NOT use Context API for global state.
- Do NOT create files over 250 lines.
- Do NOT overengineer solutions.

---

## Agent Behavior
- **Conservative**: only act on explicit instruction.
- **Do NOT** refactor, reorganize, or create files without being asked.
- **Do NOT** suggest architectural changes unless asked.
- **Do NOT** install packages or modify config files without permission.
- Respect existing code structure and conventions.
- When in doubt, ask the user — do not assume.

## Refusal Rules
The agent **MUST refuse** to generate code when:
1. The code would contain `any`.
2. The code violates the project's folder structure rules.
3. The code uses an external UI library.
4. The code puts logic where it doesn't belong (e.g., API calls in components).
5. The code would break export conventions.

**Refusal response example**: "I can't generate this code because it violates the project rules: [specific rule]. Would you like me to suggest an alternative that follows the project conventions?"

<!-- END:project-rules -->

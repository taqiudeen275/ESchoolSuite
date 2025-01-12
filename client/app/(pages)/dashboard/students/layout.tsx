// Example: app/(pages)/students/_layout.tsx
import { ReactNode } from 'react';

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Add any specific layout elements for students module here */}
      {children}
    </div>
  );
}
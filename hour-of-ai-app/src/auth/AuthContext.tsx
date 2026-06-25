import { createContext, useContext, useMemo, useState } from 'react';

export type UserRole = 'admin' | 'volunteer' | 'parent' | 'hub';

type AuthContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  signOut: () => void;
};

const ROLE_KEY = 'hour-of-ai-role';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(ROLE_KEY);
    return savedRole === 'admin' ||
      savedRole === 'volunteer' ||
      savedRole === 'parent' ||
      savedRole === 'hub'
      ? savedRole
      : 'volunteer';
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      setRole: nextRole => {
        localStorage.setItem(ROLE_KEY, nextRole);
        setRoleState(nextRole);
      },
      signOut: () => {
        localStorage.removeItem(ROLE_KEY);
        setRoleState('volunteer');
      },
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

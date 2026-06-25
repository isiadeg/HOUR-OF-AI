export type RegistrationRole = 'parent' | 'volunteer' | 'hub';

export type RegistrationRecord = {
  id: string;
  role: RegistrationRole;
  submittedAt: string;
  data: unknown;
};

const STORAGE_KEY = 'hour-of-ai-registrations';

export async function submitRegistration(
  role: RegistrationRole,
  data: unknown,
): Promise<RegistrationRecord> {
  await new Promise(resolve => window.setTimeout(resolve, 300));

  const record: RegistrationRecord = {
    id: crypto.randomUUID(),
    role,
    submittedAt: new Date().toISOString(),
    data,
  };

  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as RegistrationRecord[];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, record]));
  return record;
}

export const VALID_VARNAMALA_SUBMODES = [
  'sound',
  'writing',
  'quizzes',
  'workbooks',
  'worksheets',
] as const;

export type VarnamalaSubMode = (typeof VALID_VARNAMALA_SUBMODES)[number];

export const isValidVarnamalaSubMode = (mode: unknown): mode is VarnamalaSubMode =>
  typeof mode === 'string' && (VALID_VARNAMALA_SUBMODES as readonly string[]).includes(mode);

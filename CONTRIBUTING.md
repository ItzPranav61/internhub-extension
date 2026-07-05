# Contributing

Thanks for helping improve InternHub Extension. Keep contributions focused on the MVP unless a future milestone explicitly expands scope.

## Setup

```bash
git clone https://github.com/ItzPranav61/internhub-extension.git
cd internhub-extension/internhub-extension
npm install
```

## Development

```bash
npm run dev
```

For extension testing:

```bash
npm run build
```

Then load `internhub-extension/dist` from `chrome://extensions` with Developer Mode enabled.

## Coding Style

- Use TypeScript for app code.
- Keep Chrome API calls inside `storage/` or `utils/`.
- Keep React components presentational when possible.
- Run formatting before committing:

```bash
npm run format
```

## Testing

Run the full local verification set:

```bash
npm run lint
npm run build
npm test
```

## Commits

Use short conventional commit-style messages:

```text
feat: add focused feature
fix: correct specific bug
docs: update project documentation
ci: update automation
```

## Scope Boundaries

Do not add authentication, backend services, AI, notifications, reminders, search, filters, or cloud sync unless a future milestone explicitly asks for them.

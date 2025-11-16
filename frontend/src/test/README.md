# Master Thief Test Suite

## Test Coverage

This directory contains comprehensive tests for the Master Thief frontend application.

### Test Files

- **`setup.ts`** - Test configuration with localStorage mock and cleanup
- **`gameStore.test.ts`** - Game state management tests (76+ tests)
- **`characterCalculations.test.ts`** - Character math and utility tests (21+ tests)
- **`heistExecution.test.ts`** - Heist logic and dice rolling tests (30+ tests)
- **`GameHeader.test.tsx`** - Navigation component tests
- **`EnhancedCharacterCard.test.tsx`** - Character card component tests

### Running Tests

```bash
# Run all tests
npm run test

# Run tests once (CI mode)
npm run test:run

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

### Test Statistics

- **Total Tests:** 95+
- **Passing:** 76+
- **Coverage Areas:**
  - State management (Zustand store)
  - Character calculations and progression
  - Heist execution logic
  - D20 dice system
  - Team synergy
  - Environmental modifiers
  - Equipment system
  - Mission automation
  - Save/load functionality
  - UI components

### Writing New Tests

Follow these patterns:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Component/Feature Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Arrange
    const input = setupData();

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

### Known Issues

Some component tests may need adjustment based on actual component implementations:
- Character card components may need optional chaining for optional fields
- Game header component tests may need specific class names

### Mocks

- **localStorage** - Mocked in setup.ts
- **window.setInterval/clearInterval** - Stubbed in setup.ts

### CI Integration

Tests are run as part of the CI pipeline:

```bash
npm run ci        # Full CI with build
npm run ci:quick  # Quick validation
```

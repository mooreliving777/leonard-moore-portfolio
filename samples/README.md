# Independent JavaScript Code Comprehension Lab

This is an educational, public-safe sample prepared in October 2026 for interview practice. It is **not** copied from the private Business Command Center and is **not** proof of the original developer's unaided authorship.

## Run
Requires Node.js 18+. From this folder: `node --test invoice.test.mjs`. No dependencies or accounts are required.

## What to explain in an interview
1. JavaScript floating-point mathematics cannot be trusted for exact USD cent values. Parse decimal strings explicitly and use `BigInt` in conversion.
2. A retry with the same invoice ID must not duplicate an in-memory record. The `Map` example illustrates the rule but is **not** a database or concurrent-process solution.
3. In production, require a durable uniqueness constraint and an atomic transaction, plus tests for concurrent retries, crash recovery, and cross-tenant access.
4. Validation rejects negative, exponential, whitespace-padded and oversized amounts. No online payments are accepted.

## Suggested AI-fluency exercise
Ask Gemini to review the module for three failure modes. Independently verify each claim with a failing test. Explain which suggestions you accepted and why.
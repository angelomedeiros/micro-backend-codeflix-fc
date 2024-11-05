# Setup

- npm init -y
- pm i typescript -D
- npx tsc --init
- npm i jest @types/jest -D
- npm i @swc/core @swc/cli @swc/jest -D
- npx jest --init
- npm i ts-node -D

# Config jest:

Add no jest.config.ts

- `"^.+\\.(t|j)sx?$": "@swc/jest"`

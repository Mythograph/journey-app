// Moved: the canonical gate data now lives in src/lib/cosmic-core/gates.ts
// (the single source of truth shared with Story Loom). This shim keeps the
// old import path working.

export {
  GATES as GATE_DATA,
  getGateExpression,
  getGateName,
  type Gate,
  type GateExpression,
  type GateBand,
  type GateField,
} from "../cosmic-core/gates.js";

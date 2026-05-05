# Chart engine

Self-contained Human Design chart calculator. Owned by Mythograph; no external API
dependency at runtime.

Pipeline (Day 2):

1. **Geocode**: city → lat/lng + IANA timezone (Nominatim or OpenCage).
2. **Resolve birth moment**: local birth date + time + IANA tz → UTC instant
   (luxon, with historical DST handling).
3. **Astronomy**: planetary longitudes at the birth instant ("Personality")
   and at the moment ~88° solar arc earlier ("Design") — astronomy-engine.
4. **Map**: each planetary longitude → HD gate (1–64) and line (1–6) via the
   I-Ching wheel order.
5. **Derive**: activated gates → channels → defined centers → Type / Strategy /
   Authority / Profile / Incarnation Cross.

Validation: at least five known canonical charts (including Cléa's own) must
match before the free tool ships.

References:
- jdempcy/hdkit (MIT, archived) — channel→center table, derivation logic
- astronomy-engine (MIT) — planetary positions
- tz-lookup (BSD) — lat/lng → IANA timezone

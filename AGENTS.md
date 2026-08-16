# AGENTS.md

You are working on an evidence-sensitive genealogy investigation website.

## Non-negotiable rules

1. Never convert a hypothesis into a family-tree fact.
2. Base-tree relationships must be supported by:
   - official/public records,
   - user-provided court-record birth information,
   - user-provided Emmet County marriage records,
   - explicit Facebook family listings,
   - relevant public Facebook posts,
   - facts verified by multiple independent sources,
   - or DNA-supported pedigree evidence.
3. Candidate relationships belong in an investigation/candidate view, not the base pedigree.
4. Preserve provenance. Every date or relationship should have an evidence/source type.
5. Never attach Lori Lauer-Totten to a parent unless new evidence establishes that relationship.
6. Janet Lauer Wolf and Cynthia "Cindy" Lauer Van Berlo are research candidates only.
7. Scott Lauer cannot be Lori's father; their supplied court-record birth dates make that impossible.
8. Do not attach Briget / Bridget Lauer / Sievert to the pedigree until identity and relationships are established.
9. When updating a person's facts, update `data/evidence.json` first when practical, then render from or reconcile the UI with that data.
10. Prefer transparent labels such as `Record`, `DNA`, `Facebook family listing`, `Public Facebook`, `Multiple sources`, and `Inference`.

## UX goals

- Make the default view resemble a traditional family tree.
- Keep evidence details available on click or in an Evidence tab.
- Keep candidate-discovery reasoning visually separate.
- Make solid vs inferred relationships visually unmistakable.
- Optimize for readability on desktop while remaining usable on mobile.
- Avoid deleting evidence during visual refactors.

## Files

- `index.html` – current interactive webpage.
- `data/evidence.json` – structured investigation facts and provenance.
- `docs/INVESTIGATION.md` – human-readable investigation summary.

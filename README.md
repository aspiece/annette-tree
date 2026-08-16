# Lauer–Vigneau Family Investigation

Interactive evidence-backed family-tree project prepared for continued work in Codex.

## Start

Open this folder in Codex and ask it to inspect `AGENTS.md`, `docs/INVESTIGATION.md`, `data/evidence.json`, and `index.html` before making changes.

For a quick local preview, open `index.html` in a browser.

Click any person in the family tree to see their evidence, facts, and a **Why
this placement?** explanation. The explanation distinguishes a documented
parent/child relationship from a reconstructed branch, family cluster,
co-parent grouping, or unresolved DNA connection.

The **Candidate Status** tab is the audit view for every active, eliminated,
unresolved, or evidence-recovery case. Its structured source is
`data/candidates.json`; the narrative version is `docs/CANDIDATE_STATUS.md`.

## Add new findings

Open **Add New Findings** in the webpage to add people and relationships. Each
entry requires an evidence citation and can be marked as either supported or a
research candidate. Candidate entries remain visually separate from the proven
base pedigree.

The same page includes a **high-level candidate** form for recording a possible
biological-parent candidate, why the person was elevated, supporting evidence,
and the research needed to confirm or exclude them. These entries appear in
**How Candidates Were Found** beside Janet and Cindy, always labeled
**Candidate — not proven**. Candidates are grouped by **maternal side**,
**paternal side**, or **side uncertain** so both parent searches can proceed
without implying a relationship that has not been established.

Updates are saved in the current browser using local storage. Use **Export
backup** after a research session and keep the downloaded JSON file with the
case materials. **Import backup** restores those entries in another browser or
after local browser data is cleared.

## Suggested first Codex prompt

> Read AGENTS.md, docs/INVESTIGATION.md, data/evidence.json, and index.html. Continue improving the interactive genealogy site. Preserve every evidence rule and provenance distinction. First refactor the site so the family-tree view is easier to visually follow, while keeping the Evidence & DNA and How Candidates Were Found tabs. Do not create any new biological relationships unless they are supported by the evidence data.

## Project structure

- `index.html`
- `AGENTS.md`
- `data/evidence.json`
- `docs/INVESTIGATION.md`

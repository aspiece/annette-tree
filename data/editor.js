(function () {
  'use strict';

  const STORAGE_KEY = 'lauer-vigneau-research-updates-v1';
  const seed = { people: [], relationships: [], candidates: [] };
  let state = load();

  const style = document.createElement('style');
  style.textContent = `
    .editor-intro{display:flex;gap:12px;justify-content:space-between;align-items:flex-start;flex-wrap:wrap}
    .editor-intro p{margin:0;color:var(--muted);line-height:1.45;max-width:780px}
    .editor-actions{display:flex;gap:8px;flex-wrap:wrap}
    .editor-btn,.editor-input,.editor-select,.editor-textarea{font:inherit;border:1px solid var(--border);border-radius:10px;background:#fff;color:var(--text)}
    .editor-btn{padding:9px 13px;cursor:pointer;font-weight:700}
    .editor-btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
    .editor-btn.danger{color:#9f1239}
    .editor-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:18px}
    .editor-form{border-top:1px solid var(--border);padding-top:16px}
    .editor-form h3{margin:0 0 12px}
    .editor-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .editor-field{display:flex;flex-direction:column;gap:5px;font-size:13px;font-weight:700}
    .editor-field.full{grid-column:1/-1}
    .editor-input,.editor-select,.editor-textarea{width:100%;padding:9px;font-weight:400}
    .editor-textarea{min-height:72px;resize:vertical}
    .editor-help{font-size:12px;color:var(--muted);font-weight:400;line-height:1.35}
    .update-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:14px}
    .update-person{border:2px solid var(--border);border-radius:13px;padding:12px;background:#fff;position:relative}
    .update-person.candidate{border-style:dashed;border-color:var(--candidate-border);background:var(--candidate)}
    .update-person h4{margin:0 36px 5px 0}
    .update-person p{margin:5px 0;color:var(--muted);font-size:13px;line-height:1.4}
    .remove-update{position:absolute;right:8px;top:8px;border:0;background:transparent;color:var(--muted);cursor:pointer;font-weight:700}
    .relation-list{display:flex;flex-direction:column;gap:8px;margin-top:14px}
    .relation-row{display:grid;grid-template-columns:1fr auto 1fr auto;gap:9px;align-items:center;border-bottom:1px solid var(--border);padding:9px 0}
    .relation-arrow{text-align:center;font-size:12px;color:var(--muted)}
    .relation-row.candidate .relation-arrow{color:#8f2f56}
    .empty-updates{color:var(--muted);font-size:14px;margin:14px 0 0}
    .save-status{font-size:12px;color:var(--muted);margin-top:9px}
    .candidate-reason{margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
    #additionalCandidateCards .candidate-card{position:relative}
    .candidate-side{margin-top:22px}
    .candidate-side h3{text-align:center;margin-bottom:8px}
    .file-input{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
    @media(max-width:760px){.editor-grid,.editor-fields{grid-template-columns:1fr}.editor-field.full{grid-column:auto}.relation-row{grid-template-columns:1fr}.relation-arrow{text-align:left}}
  `;
  document.head.appendChild(style);

  const tabs = document.querySelector('.tabs');
  const tab = document.createElement('button');
  tab.className = 'tab';
  tab.dataset.tab = 'updates';
  tab.textContent = 'Add New Findings';
  tabs.appendChild(tab);

  const view = document.createElement('div');
  view.id = 'updates';
  view.className = 'view';
  view.innerHTML = `
    <div class="card">
      <div class="editor-intro">
        <div>
          <div class="section-title" style="text-align:left;margin-bottom:6px">Research Updates</div>
          <p>Add findings here as the investigation develops. Proven and candidate relationships stay visually distinct. Changes are saved in this browser; export a backup after each research session.</p>
        </div>
        <div class="editor-actions">
          <button class="editor-btn" id="importUpdates" type="button">Import backup</button>
          <input class="file-input" id="importUpdatesFile" type="file" accept="application/json,.json">
          <button class="editor-btn" id="exportUpdates" type="button">Export backup</button>
          <button class="editor-btn danger" id="clearUpdates" type="button">Clear updates</button>
        </div>
      </div>
      <div class="save-status" id="saveStatus" aria-live="polite"></div>
      <div class="editor-grid">
        <form class="editor-form" id="personForm">
          <h3>Add or update a person</h3>
          <div class="editor-fields">
            <label class="editor-field">Name<input class="editor-input" name="name" required></label>
            <label class="editor-field">Year or date<input class="editor-input" name="date" placeholder="e.g. 1979 or May 1966"></label>
            <label class="editor-field">Status<select class="editor-select" name="status"><option value="proven">Supported fact</option><option value="candidate">Research candidate</option></select></label>
            <label class="editor-field">Evidence type<select class="editor-select" name="evidenceType"><option>Record</option><option>DNA</option><option>Facebook family listing</option><option>Public Facebook</option><option>Multiple sources</option><option>Inference</option></select></label>
            <label class="editor-field full">Evidence citation<input class="editor-input" name="citation" required placeholder="Record, screenshot, DNA match, obituary, etc."><span class="editor-help">Describe exactly where the fact came from; avoid conclusions unsupported by the source.</span></label>
            <label class="editor-field full">Notes<textarea class="editor-textarea" name="notes" placeholder="Facts, uncertainty, spelling variants, location, or next research step"></textarea></label>
          </div>
          <button class="editor-btn primary" type="submit">Save person</button>
        </form>
        <form class="editor-form" id="relationshipForm">
          <h3>Add a relationship</h3>
          <div class="editor-fields">
            <label class="editor-field">Person 1<input class="editor-input" name="from" list="knownPeople" required></label>
            <label class="editor-field">Person 2<input class="editor-input" name="to" list="knownPeople" required></label>
            <label class="editor-field">Relationship<select class="editor-select" name="type"><option>Parent of</option><option>Child of</option><option>Spouse of</option><option>Sibling of</option><option>Cousin of</option><option>DNA match with</option><option>Other</option></select></label>
            <label class="editor-field">Status<select class="editor-select" name="status"><option value="proven">Supported relationship</option><option value="candidate">Candidate / inference</option></select></label>
            <label class="editor-field full">Evidence citation<input class="editor-input" name="citation" required></label>
            <label class="editor-field full">Notes<textarea class="editor-textarea" name="notes" placeholder="Shared cM, record date, wording from a family listing, or uncertainty"></textarea></label>
          </div>
          <button class="editor-btn primary" type="submit">Save relationship</button>
        </form>
      </div>
      <form class="editor-form" id="candidateForm">
        <h3>Add a high-level candidate</h3>
        <div class="editor-fields">
          <label class="editor-field">Candidate name<input class="editor-input" name="name" required></label>
          <label class="editor-field">Parent side<select class="editor-select" name="parentSide" required><option value="maternal">Maternal side</option><option value="paternal">Paternal side</option><option value="uncertain">Side uncertain</option></select></label>
          <label class="editor-field full">Candidate role<input class="editor-input" name="role" required placeholder="e.g. Possible biological mother or possible biological father"></label>
          <label class="editor-field full">Why this person is a candidate<textarea class="editor-textarea" name="rationale" required placeholder="Family position, age, geography, timeline, DNA pattern, or other reasoning"></textarea></label>
          <label class="editor-field full">Supporting evidence<textarea class="editor-textarea" name="evidence" required placeholder="List the records, DNA matches, family listings, and other sources supporting consideration"></textarea></label>
          <label class="editor-field full">What would confirm or exclude this candidate<textarea class="editor-textarea" name="nextStep" placeholder="Records to obtain, DNA tests to compare, people to contact, or conflicting evidence"></textarea></label>
        </div>
        <button class="editor-btn primary" type="submit">Save high-level candidate</button>
      </form>
      <datalist id="knownPeople"></datalist>
    </div>
    <div class="card">
      <div class="section-title">People Added During Research</div>
      <div id="peopleUpdates"></div>
    </div>
    <div class="card">
      <div class="section-title">Relationships Added During Research</div>
      <div id="relationshipUpdates"></div>
      <div class="note" style="margin-top:16px">Dashed pink cards and relationship labels are candidates or inferences. They are intentionally kept out of the proven base pedigree until supporting evidence is added.</div>
    </div>
  `;
  document.querySelector('.app').appendChild(view);

  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  }));

  const existingNames = Array.from(document.querySelectorAll('.person .name')).map(el => el.textContent.trim());

  document.getElementById('personForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const match = state.people.find(p => p.name.toLowerCase() === data.name.trim().toLowerCase());
    const person = { id: match?.id || cryptoId(), name: data.name.trim(), date: data.date.trim(), status: data.status, evidenceType: data.evidenceType, citation: data.citation.trim(), notes: data.notes.trim(), updatedAt: new Date().toISOString() };
    if (match) state.people[state.people.indexOf(match)] = person; else state.people.push(person);
    persist('Person saved.');
    event.currentTarget.reset();
  });

  document.getElementById('relationshipForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    state.relationships.push({ id: cryptoId(), from: data.from.trim(), to: data.to.trim(), type: data.type, status: data.status, citation: data.citation.trim(), notes: data.notes.trim(), updatedAt: new Date().toISOString() });
    persist('Relationship saved.');
    event.currentTarget.reset();
  });

  document.getElementById('candidateForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const existing = state.candidates.find(candidate => candidate.name.toLowerCase() === data.name.trim().toLowerCase());
    const candidate = { id: existing?.id || cryptoId(), name: data.name.trim(), parentSide: data.parentSide, role: data.role.trim(), rationale: data.rationale.trim(), evidence: data.evidence.trim(), nextStep: data.nextStep.trim(), updatedAt: new Date().toISOString() };
    if (existing) state.candidates[state.candidates.indexOf(existing)] = candidate; else state.candidates.push(candidate);
    persist('High-level candidate saved.');
    event.currentTarget.reset();
  });

  document.getElementById('exportUpdates').addEventListener('click', () => {
    const payload = { project: 'Lauer–Vigneau Family Investigation', exportedAt: new Date().toISOString(), ...state };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lauer-vigneau-research-updates.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    setStatus('Backup exported.');
  });

  document.getElementById('importUpdates').addEventListener('click', () => document.getElementById('importUpdatesFile').click());
  document.getElementById('importUpdatesFile').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed.people) || !Array.isArray(parsed.relationships)) throw new Error('Invalid backup format');
      state = { people: parsed.people, relationships: parsed.relationships, candidates: Array.isArray(parsed.candidates) ? parsed.candidates : [] };
      persist('Backup imported.');
    } catch (error) {
      setStatus('Import failed: ' + error.message, true);
    }
    event.target.value = '';
  });

  document.getElementById('clearUpdates').addEventListener('click', () => {
    if (!confirm('Clear all locally saved research updates? Export a backup first if you may need them.')) return;
    state = { people: [], relationships: [], candidates: [] };
    persist('All research updates cleared.');
  });

  document.querySelector('.app').addEventListener('click', event => {
    const button = event.target.closest('[data-remove-kind]');
    if (!button) return;
    const key = button.dataset.removeKind;
    state[key] = state[key].filter(item => item.id !== button.dataset.removeId);
    persist('Entry removed.');
  });

  function render() {
    const peopleRoot = document.getElementById('peopleUpdates');
    peopleRoot.innerHTML = state.people.length ? '<div class="update-list">' + state.people.map(person => `
      <article class="update-person ${person.status === 'candidate' ? 'candidate' : ''}">
        <button class="remove-update" type="button" aria-label="Remove ${escapeHtml(person.name)}" data-remove-kind="people" data-remove-id="${person.id}">×</button>
        <h4>${escapeHtml(person.name)}</h4>
        ${person.date ? `<p>${escapeHtml(person.date)}</p>` : ''}
        <div class="badges" style="justify-content:flex-start"><span class="badge ${badgeClass(person.evidenceType)}">${escapeHtml(person.evidenceType)}</span>${person.status === 'candidate' ? '<span class="badge inference">Candidate — not proven</span>' : ''}</div>
        <p><strong>Evidence:</strong> ${escapeHtml(person.citation)}</p>
        ${person.notes ? `<p>${escapeHtml(person.notes)}</p>` : ''}
      </article>`).join('') + '</div>' : '<p class="empty-updates">No new people have been added yet.</p>';

    const relationRoot = document.getElementById('relationshipUpdates');
    relationRoot.innerHTML = state.relationships.length ? '<div class="relation-list">' + state.relationships.map(rel => `
      <div class="relation-row ${rel.status === 'candidate' ? 'candidate' : ''}">
        <strong>${escapeHtml(rel.from)}</strong>
        <span class="relation-arrow">${rel.status === 'candidate' ? '⇢ ' : '→ '}${escapeHtml(rel.type)}${rel.status === 'candidate' ? ' · candidate' : ''}</span>
        <strong>${escapeHtml(rel.to)}</strong>
        <button class="editor-btn" type="button" data-remove-kind="relationships" data-remove-id="${rel.id}">Remove</button>
        <span class="editor-help" style="grid-column:1/-1"><strong>Evidence:</strong> ${escapeHtml(rel.citation)}${rel.notes ? ' · ' + escapeHtml(rel.notes) : ''}</span>
      </div>`).join('') + '</div>' : '<p class="empty-updates">No new relationships have been added yet.</p>';

    const allNames = Array.from(new Set(existingNames.concat(state.people.map(p => p.name)))).sort();
    document.getElementById('knownPeople').innerHTML = allNames.map(name => `<option value="${escapeHtml(name)}"></option>`).join('');

    let candidateRoot = document.getElementById('additionalCandidates');
    if (!candidateRoot) {
      candidateRoot = document.createElement('section');
      candidateRoot.id = 'additionalCandidates';
      candidateRoot.innerHTML = '<div class="section-title" style="margin-top:26px">Additional High-Level Candidates</div><div id="additionalCandidateCards"></div>';
      document.querySelector('#discovery .candidate-area').insertAdjacentElement('afterend', candidateRoot);
    }
    const cards = document.getElementById('additionalCandidateCards');
    const candidateCard = candidate => `
      <article class="candidate-card">
        <button class="remove-update" type="button" aria-label="Remove ${escapeHtml(candidate.name)}" data-remove-kind="candidates" data-remove-id="${candidate.id}">×</button>
        <div class="status">Candidate — not proven</div>
        <h3>${escapeHtml(candidate.name)}</h3>
        <p><strong>${escapeHtml(candidate.role)}</strong></p>
        <div class="candidate-reason"><strong>Why elevated:</strong> ${escapeHtml(candidate.rationale)}</div>
        <div class="candidate-reason"><strong>Supporting evidence:</strong> ${escapeHtml(candidate.evidence)}</div>
        ${candidate.nextStep ? `<div class="candidate-reason"><strong>Confirm or exclude:</strong> ${escapeHtml(candidate.nextStep)}</div>` : ''}
      </article>`;
    const candidateGroup = (side, heading) => {
      const candidates = state.candidates.filter(candidate => (candidate.parentSide || 'uncertain') === side);
      return `<section class="candidate-side"><h3>${heading}</h3><div class="candidate-area">${candidates.length ? candidates.map(candidateCard).join('') : `<p class="empty-updates" style="grid-column:1/-1">No ${heading.toLowerCase()} have been added.</p>`}</div></section>`;
    };
    cards.innerHTML = candidateGroup('maternal', 'Maternal-side candidates') + candidateGroup('paternal', 'Paternal-side candidates') + candidateGroup('uncertain', 'Candidates with uncertain parent side');
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return parsed && Array.isArray(parsed.people) && Array.isArray(parsed.relationships) ? { ...parsed, candidates: Array.isArray(parsed.candidates) ? parsed.candidates : [] } : structuredClone(seed);
    } catch (_) { return { people: [], relationships: [], candidates: [] }; }
  }
  function persist(message) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); render(); setStatus(message); }
  function setStatus(message, error) { const el = document.getElementById('saveStatus'); el.textContent = message; el.style.color = error ? '#9f1239' : 'var(--muted)'; }
  function cryptoId() { return (globalThis.crypto?.randomUUID?.() || Date.now() + '-' + Math.random().toString(16).slice(2)); }
  function badgeClass(type) { return type === 'DNA' ? 'dna' : type.includes('Facebook') ? 'fb' : type === 'Record' ? 'record' : type === 'Inference' ? 'inference' : 'multi'; }
  function escapeHtml(value) { const node = document.createElement('span'); node.textContent = String(value ?? ''); return node.innerHTML; }

  render();
  setStatus('Research updates are saved locally in this browser.');
})();

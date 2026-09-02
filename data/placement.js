(function () {
  'use strict';
  const placements = {
    ulysses: ['Ancestral Vigneau couple', 'Multiple-source genealogy reconstruction identifies Ulysses and Florence as a couple and places Eugene and Buzz in their descendant family.', 'The current summary describes Eugene and Buzz as their sons.'],
    florence: ['Ancestral Vigneau couple', 'Multiple-source genealogy reconstruction identifies Florence and Ulysses as a couple and places Eugene and Buzz in their descendant family.', 'The current summary describes Eugene and Buzz as their sons.'],
    eugene: ['Vigneau son branch', 'Multiple sources identify Eugene as a son in the Ulysses Vigneau and Florence Mayville family and as Buzz’s brother.', 'The birth year 1919 and sibling relationship support his generation.'],
    claudia: ['Eugene descendant branch', 'An Ancestry tree plus reconstructed pedigree says Claudia descends from Eugene’s line.', 'Her exact generation below Eugene is not preserved here; the line is a branch marker, not a claim that she is Eugene’s daughter.'],
    buzz: ['Vigneau son branch', 'Multiple sources identify Buzz as Eugene’s brother and place him with spouse June Affholter.', 'The reconstructed and DNA-supported family structure places Tim, Mike, Jeff, Chris, and Nina in their child generation.'],
    june: ['Affholter spouse and parent branch', 'Multiple-source family reconstruction identifies June as Buzz’s spouse and Sally Affholter Kolb’s sister.', 'The child generation is supported by the verified family structure.'],
    tim: ['Child generation of Buzz and June', 'The verified Vigneau/Affholter family structure identifies Tim P. Vigneau as their child. His 2016 obituary names Tira Vigneau as his wife and identifies the Lisa, Keri, and Paul child branches shown below him.', 'Tim remains eliminated as a biological-parent candidate; his descendant branch documents family structure but does not change Annette’s parentage status.'],
    lisa_hoffman: ['Tim/Tira child branch', 'Tim P. Vigneau’s 2016 obituary identifies Lisa Vigneau Hoffman as his child and Doug Hoffman as her spouse.', 'The grandchildren are shown only as grouped by the obituary branch.'],
    marin_hoffman: ['Lisa/Doug descendant branch', 'Tim P. Vigneau’s 2016 obituary names Marin Hoffman among the grandchildren in the Lisa and Doug Hoffman branch.', 'This is an obituary-based placement, not DNA evidence.'],
    cole_hoffman: ['Lisa/Doug descendant branch', 'Tim P. Vigneau’s 2016 obituary names Cole Hoffman among the grandchildren in the Lisa and Doug Hoffman branch.', 'This is an obituary-based placement, not DNA evidence.'],
    sydney_hoffman: ['Lisa/Doug descendant branch', 'Tim P. Vigneau’s 2016 obituary names Sydney Hoffman among the grandchildren in the Lisa and Doug Hoffman branch.', 'This is an obituary-based placement, not DNA evidence.'],
    keri_simonis: ['Tim/Tira child branch', 'Tim P. Vigneau’s 2016 obituary identifies Keri Vigneau Simonis as his child and John Simonis as her spouse.', 'This Keri is separate from Keri Matchinski on Chris Vigneau’s card.'],
    jordan_simonis: ['Keri/John descendant branch', 'Tim P. Vigneau’s 2016 obituary names Jordan Simonis among the grandchildren in the Keri and John Simonis branch.', 'This is an obituary-based placement, not DNA evidence.'],
    sarah_simonis: ['Keri/John descendant branch', 'Tim P. Vigneau’s 2016 obituary names Sarah Simonis among the grandchildren in the Keri and John Simonis branch.', 'This is an obituary-based placement, not DNA evidence.'],
    paul_vigneau: ['Tim/Tira child branch', 'Tim P. Vigneau’s 2016 obituary identifies Paul Vigneau as his child and Jill as his spouse.', 'The grandchildren are shown only as grouped by the obituary branch.'],
    megan_vigneau: ['Paul/Jill descendant branch', 'Tim P. Vigneau’s 2016 obituary names Megan Vigneau among the grandchildren in the Paul and Jill branch.', 'This is an obituary-based placement, not DNA evidence.'],
    andrea_vigneau: ['Paul/Jill descendant branch', 'Tim P. Vigneau’s 2016 obituary names Andrea Vigneau among the grandchildren in the Paul and Jill branch.', 'This is an obituary-based placement, not DNA evidence.'],
    natalie_vigneau: ['Paul/Jill descendant branch', 'Tim P. Vigneau’s 2016 obituary names Natalie Vigneau among the grandchildren in the Paul and Jill branch.', 'This is an obituary-based placement, not DNA evidence.'],
    mike: ['Child generation of Buzz and June', 'User-supplied notes give Michael “Mike” Vigneau Sr. birth year 1947. The verified Vigneau/Affholter family structure identifies him as Buzz and June’s child; confirmed son Mike Jr. is the DNA anchor used for elimination.', 'Mike Jr.’s 784 cM match with Annette is inconsistent with the half-sibling relationship expected if Mike Sr. were Annette’s father.'],
    mike_jr: ['Child generation below Mike Sr.', 'User-confirmed parentage identifies Mike Vigneau Jr. as Mike Sr.’s son and the DNA anchor used for Mike Sr.’s elimination.', 'Mike Jr. is shown as a DNA anchor, not as a parent candidate.'],
    jeff: ['Child generation of Buzz and June', 'The verified family structure identifies Jeff as their child; the screenshot-recorded Sally–Jeff value is 1,945 cM and supports the reconstructed maternal-aunt placement. The candidate registry marks him eliminated as a biological-parent candidate.', 'The aunt label is a pedigree interpretation, not a relationship label shown in the DNA screenshot.'],
    chris: ['Child generation of Buzz and June', 'Chris is shown in the Vigneau child generation, with Keri nested as spouse and Amanda/Anna below as user-confirmed children.', 'Annette’s dashed card under Chris marks him as the only remaining paternal option currently carried on the page. Verbal confirmation places Chris and Janet together during the summer 1978 conception period, but paternity still needs direct confirmation.'],
    amanda: ['Child generation below Chris', 'User confirmation identifies Amanda Gilkerson as a child of Chris Vigneau and Keri Matchinski.', 'This supports Amanda’s placement below Chris; it does not change Annette’s parentage status.'],
    anna: ['Child generation below Chris', 'User confirmation identifies Anna Vigneau as a child of Chris Vigneau and Keri Matchinski.', 'This supports Anna’s placement below Chris; it does not change Annette’s parentage status.'],
    nina: ['Child generation of Buzz and June', 'The verified Vigneau/Affholter family structure identifies Nina as their child; user-supplied notes give birth year 1958.', 'Nina is now eliminated as a parent candidate because Janet is verbally confirmed as Annette’s maternal side, leaving Chris as the only remaining paternal option currently carried on the page. Family confirmation identifies Briget as Nina’s oldest child.'],
    briget: ['Child generation below Nina', 'Family confirmation identifies Briget Marie Sievert / Briget Pope as Nina Vigneau’s oldest child.', 'This resolves Briget’s placement below Nina; exact birth date can still be refined separately.'],
    andrews: ['Child generation below Nina', 'User confirmation identifies Andrew Sievert as a child of Nina Vigneau.', 'This supports Andrew’s placement below Nina.'],
    matts: ['Child generation below Nina', 'User confirmation identifies Matt Sievert as a child of Nina Vigneau.', 'This supports Matt’s placement below Nina.'],
    adams: ['Child generation below Nina', 'User confirmation identifies Adam Sievert as a child of Nina Vigneau.', 'This supports Adam’s placement below Nina.'],
    sally: ['June Affholter’s sibling branch', 'Obituary/family records identify Sally as June’s sister; the screenshot records 1,945 cM shared with Jeff and supports the reconstructed maternal-aunt placement.', 'The aunt label is a pedigree interpretation, not a relationship label shown in the DNA screenshot.'],
    john: ['Ancestral Lauer/Zuber network', 'Multiple-source reconstruction identifies John and Christina Catherine Zuber as a couple in the ancestral Lauer network.', 'The lines below summarize reconstructed descendant branches; the current files do not preserve every generation-level source.'],
    christina: ['Ancestral Lauer/Zuber network', 'Multiple-source reconstruction identifies Christina and John Lauer as a couple in the ancestral Lauer network.', 'The lines below summarize reconstructed descendant branches; the current files do not preserve every generation-level source.'],
    robert: ['Brother branch beside Edward', 'Robert is shown as Edward H. Lauer’s brother and as the bridge from the older Lauer/Zuber generation into Donald Lauer’s branch, so Donald is not displayed as the same generation as Edward’s children.', 'This is a branch-orientation placement; the compact tree still depends on the project’s existing reconstruction for fuller source review.'],
    ernest: ['Ernest Lauer descendant branch', 'Verified pedigree reconstruction places Ernest in the Lauer branch containing George.', 'The compact tree summarizes the branch; it should not be read as a fully documented direct parent-child link for every displayed generation.'],
    neva: ['Spouse in Ernest branch', 'Verified pedigree reconstruction identifies Neva as the spouse associated with the Ernest Lauer branch.', 'The current files do not preserve fuller identifying facts.'],
    george: ['DNA anchor in Ernest branch', 'Pedigree reconstruction places George in Ernest’s branch, and Ancestry DNA makes him an important network anchor.', 'He shares 389 cM with Annette and 360 cM with Lori; those values support the family network but do not identify Annette’s exact parent.'],
    edward: ['Edward Henry Lauer branch', 'Edward H. Lauer’s 1997 obituary identifies Edward and Theresa as the parents of the 11 children shown beneath Edward’s card.', 'Donald Lauer is not placed under Edward; Donald remains in the Robert/Elsie branch.'],
    theresa: ['Edward Henry Lauer branch', 'Edward H. Lauer’s 1997 obituary identifies Theresa and Edward as the parents of the 11 children shown beneath Edward’s card.', 'Donald Lauer is not placed under Edward; Donald remains in the Robert/Elsie branch.'],
    cecelia: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Cecelia Lauer Pemberton as one of Edward and Theresa’s children and Philip Pemberton as her spouse.', 'No additional descendant claims are drawn from this obituary entry.'],
    diane: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Diane Lauer Hannan as one of Edward and Theresa’s children and David Hannan as her spouse.', 'No additional descendant claims are drawn from this obituary entry.'],
    barbara: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Barbara Lauer VanBerlo as one of Edward and Theresa’s children and Peter VanBerlo as her spouse; Elizabeth VanBerlo explicitly lists Barbara as her mother.', 'Elizabeth’s Facebook listing supports Barbara’s descendant line but does not itself identify Lori’s parent.'],
    richard: ['Edward/Theresa child generation', 'Richard is shown as Edward and Theresa’s child. User-confirmed parentage places Lori Lauer-Totten as the child of Richard Lauer and Betty Lauer.', 'Lori’s resolved placement and Annette’s 739 cM relationship to Lori support Richard as eliminated for Annette’s father.'],
    betty: ['Confirmed Lori parentage', 'User-confirmed parentage places Betty Lauer with Richard Lauer as Lori Lauer-Totten’s parents.', 'This confirms Lori’s immediate Lauer placement but does not identify Annette’s biological parent.'],
    janet: ['Edward/Theresa child generation and Annette’s maternal line', 'Janet is shown in Edward and Theresa’s child generation. Verbal confirmation says Janet became pregnant in summer 1978 and placed the child for adoption in spring 1979.', 'Annette is now shown below Janet with a solid maternal line based on verbal confirmation. A documentary adoption, birth, or court record would still be stronger archival confirmation.'],
    cindy: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Cynthia “Cindy” Lauer Van Berlo as one of Edward and Theresa’s children; Martin/Martie Van Berlo is nested on Cindy’s card as her married-in spouse.', 'Her June 1979 marriage remains timeline context; she is now eliminated as a parent candidate because Janet is verbally confirmed as Annette’s maternal line.'],
    patricia_edward: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Patricia Lauer as one of Edward and Theresa’s children and says she predeceased Edward.', 'This Patricia is kept separate from Patricia “Patty” Lauer Bek in Donald and Velda’s branch.'],
    catherine: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Catherine Lauer as one of Edward and Theresa’s children and says she predeceased Edward.', 'No descendant claims are drawn from this obituary entry; this Lauer relative is eliminated as an Annette parent candidate.'],
    james: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies James Lauer as one of Edward and Theresa’s children.', 'No spouse or descendant claims are drawn from this obituary entry; this Lauer relative is eliminated as an Annette parent candidate.'],
    lawrence: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Lawrence Lauer as one of Edward and Theresa’s children.', 'No spouse or descendant claims are drawn from this obituary entry; this Lauer relative is eliminated as an Annette parent candidate.'],
    timothy_lauer: ['Edward/Theresa child generation', 'Edward H. Lauer’s 1997 obituary identifies Timothy Lauer as one of Edward and Theresa’s children.', 'No spouse or descendant claims are drawn from this obituary entry; this Lauer relative is eliminated as an Annette parent candidate.'],
    elizabeth: ['Barbara VanBerlo descendant branch', 'Elizabeth’s Facebook family listing explicitly identifies Barbara VanBerlo as her mother and helped orient Lori in the extended Lauer family.', 'Lori’s immediate parentage is now separately confirmed as Richard Lauer and Betty Lauer.'],
    lori: ['Confirmed child of Richard and Betty Lauer', 'User-confirmed parentage places Lori Lauer-Totten as the child of Richard Lauer and Betty Lauer; court-record, DNA, and Facebook evidence also identify Lori and her Totten family unit.', 'This confirmed placement makes Lori a stronger Lauer-side DNA intermediary; Janet is now the verbally confirmed maternal line.'],
    tom: ['Co-parent in Totten family unit', 'Brandon Totten’s Facebook family section lists Tom as father and Lori as mother.', 'The horizontal grouping represents documented co-parent roles; it does not by itself prove a marriage or spouse relationship.'],
    jessica: ['Child of Lori', 'Facebook family evidence identifies Jessica as Lori’s daughter and Brandon’s sister; DNA of approximately 3,435 cM with Lori supports their mother-daughter relationship.', 'Jessica also shares 272 cM with Annette.'],
    brandon: ['Child of Lori and Tom', 'Brandon’s Facebook family section explicitly lists Lori as mother, Tom as father, Jessica as sister, and Kyle as brother.', 'This is explicit family-listing evidence.'],
    kyle: ['Totten sibling/child generation', 'Brandon’s Facebook family section lists Kyle as his brother while listing Lori and Tom as parents.', 'The placement is based on that explicit family listing.'],
    donald: ['Donald / Velda branch', 'Verified family reconstruction identifies Donald and Velda as a couple in the broader Lauer tree.', 'This branch is eliminated as an Annette parent-candidate path because Janet is verbally confirmed as the maternal line.'],
    velda: ['Donald / Velda branch', 'Verified family reconstruction identifies Velda and Donald as a couple.', 'This branch is eliminated as an Annette parent-candidate path because Janet is verbally confirmed as the maternal line.'],
    patty: ['Eliminated parent-candidate in Donald/Velda branch', 'Recovered notes citing Bryan’s obituary confirm Patty as a child of Donald and Velda and sibling of Bryan and Scott; user-supplied notes give birth year 1958.', 'Patty is eliminated as a biological-parent candidate for Annette based on family line plus marriage and children context.'],
    bryan: ['Eliminated parent-candidate in Donald/Velda branch', 'Recovered notes citing Bryan’s obituary identify Bryan as Donald and Velda’s son, Patty and Scott’s sibling, and Peter and Morgan’s father.', 'Bryan is eliminated as a biological-parent candidate for Annette based on family line and children context.'],
    scott: ['Child generation of Donald and Velda', 'Verified family reconstruction places Scott in this branch; a user-provided court record gives his September 1968 birth.', 'Scott is conclusively excluded as Lori’s father because Lori was born in May 1966.'],
    peter: ['Child of Bryan', 'Verified family reconstruction identifies Peter as Bryan Glen Lauer’s child.', 'No relationship between Peter and Lori is established.'],
    morgan: ['Child of Bryan', 'Verified family reconstruction identifies Morgan as Bryan Glen Lauer’s child.', 'No relationship between Morgan and Lori is established.'],
    wife: ['Maternal line plus paternal lead display', 'Annette was born March 9, 1979; likely conception is June 1978.', 'Shown under Janet as the verbally confirmed maternal line and under Chris as the only remaining paternal option currently carried on the page.']
  };

  const style = document.createElement('style');
  style.textContent = '.placement-explanation{margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}.placement-explanation h4{margin:0 0 6px}.placement-explanation p{margin:6px 0;font-size:13px;line-height:1.45}.placement-boundary{color:var(--muted)}';
  document.head.appendChild(style);

  const detail = document.getElementById('detail');
  const explanation = document.createElement('section');
  explanation.className = 'placement-explanation';
  explanation.id = 'placementExplanation';
  detail.appendChild(explanation);

  document.querySelectorAll('.person[data-id]').forEach(node => {
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', 'View evidence and tree placement for ' + (node.querySelector('.name')?.textContent || 'person'));
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        node.click();
      }
    });
    node.addEventListener('click', () => {
      const item = placements[node.dataset.id];
      explanation.innerHTML = item
        ? `<h4>Why this placement?</h4><p><strong>${item[0]}</strong></p><p>${item[1]}</p><p class="placement-boundary"><strong>Evidence boundary:</strong> ${item[2]}</p>`
        : '<h4>Why this placement?</h4><p class="placement-boundary">Placement explanation is not yet documented.</p>';
    });
  });
})();


// DE-2E.5 · Portrait presentation only; no modifications to dialogue state.
const portraitMap = [
 [/MARA/i,'mara'], [/IVO/i,'ivo'], [/ALMA/i,'alma'], [/NERA/i,'nera'],
 [/ASTER|MAESTRO/i,'aster'], [/SEREN/i,'seren'], [/GUARDIÁN|GUARDIAN|LEVIATÁN|SEGUNDERO/i,'guardian']
];
export function portraitForSpeaker(speaker) {
 return portraitMap.find(([pattern])=>pattern.test(String(speaker)))?.[1] || 'narrator';
}
export function updateDialoguePortrait(speaker) {
 const image=document.getElementById('dialogPortrait');
 if(!image)return;
 const name=portraitForSpeaker(speaker);
 const fractured=document.getElementById('realm')?.classList.contains('broken')||false;
 image.src=`assets/portraits/${name}${fractured?'_fracture':''}.png`;
 image.alt=`Retrato: ${name}`;
 image.dataset.character=name;
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../../services/LanguageContext';
import EprayogLogo from '../../components/EprayogLogo';
import BohrModel from '../../components/BohrModel';
import { ELEMENT_MAP, ElementData } from '../../data/elementData';

const CATEGORY_COLORS: Record<string, string> = {
  'alkali-metal':'#ffcccc','alkaline-earth-metal':'#ffe5cc',
  'transition-metal':'#fff2cc','post-transition-metal':'#d9e2f3',
  'metalloid':'#d1e7dd','nonmetal':'#e2f0d9','halogen':'#ffffcc',
  'noble-gas':'#e0ccff','lanthanide':'#fce4d6','actinide':'#fddddd','unknown':'#e0e0e0',
};

const ELEMENTS_BASE = [
  {number:1,symbol:'H',name:'Hydrogen',group:1,period:1,category:'nonmetal',mass:1.008,state:'Gas'},
  {number:2,symbol:'He',name:'Helium',group:18,period:1,category:'noble-gas',mass:4.003,state:'Gas'},
  {number:3,symbol:'Li',name:'Lithium',group:1,period:2,category:'alkali-metal',mass:6.94,state:'Solid'},
  {number:4,symbol:'Be',name:'Beryllium',group:2,period:2,category:'alkaline-earth-metal',mass:9.012,state:'Solid'},
  {number:5,symbol:'B',name:'Boron',group:13,period:2,category:'metalloid',mass:10.81,state:'Solid'},
  {number:6,symbol:'C',name:'Carbon',group:14,period:2,category:'nonmetal',mass:12.011,state:'Solid'},
  {number:7,symbol:'N',name:'Nitrogen',group:15,period:2,category:'nonmetal',mass:14.007,state:'Gas'},
  {number:8,symbol:'O',name:'Oxygen',group:16,period:2,category:'nonmetal',mass:15.999,state:'Gas'},
  {number:9,symbol:'F',name:'Fluorine',group:17,period:2,category:'halogen',mass:18.998,state:'Gas'},
  {number:10,symbol:'Ne',name:'Neon',group:18,period:2,category:'noble-gas',mass:20.18,state:'Gas'},
  {number:11,symbol:'Na',name:'Sodium',group:1,period:3,category:'alkali-metal',mass:22.99,state:'Solid'},
  {number:12,symbol:'Mg',name:'Magnesium',group:2,period:3,category:'alkaline-earth-metal',mass:24.305,state:'Solid'},
  {number:13,symbol:'Al',name:'Aluminium',group:13,period:3,category:'post-transition-metal',mass:26.982,state:'Solid'},
  {number:14,symbol:'Si',name:'Silicon',group:14,period:3,category:'metalloid',mass:28.085,state:'Solid'},
  {number:15,symbol:'P',name:'Phosphorus',group:15,period:3,category:'nonmetal',mass:30.974,state:'Solid'},
  {number:16,symbol:'S',name:'Sulfur',group:16,period:3,category:'nonmetal',mass:32.06,state:'Solid'},
  {number:17,symbol:'Cl',name:'Chlorine',group:17,period:3,category:'halogen',mass:35.45,state:'Gas'},
  {number:18,symbol:'Ar',name:'Argon',group:18,period:3,category:'noble-gas',mass:39.95,state:'Gas'},
  {number:19,symbol:'K',name:'Potassium',group:1,period:4,category:'alkali-metal',mass:39.098,state:'Solid'},
  {number:20,symbol:'Ca',name:'Calcium',group:2,period:4,category:'alkaline-earth-metal',mass:40.078,state:'Solid'},
  {number:21,symbol:'Sc',name:'Scandium',group:3,period:4,category:'transition-metal',mass:44.956,state:'Solid'},
  {number:22,symbol:'Ti',name:'Titanium',group:4,period:4,category:'transition-metal',mass:47.867,state:'Solid'},
  {number:23,symbol:'V',name:'Vanadium',group:5,period:4,category:'transition-metal',mass:50.942,state:'Solid'},
  {number:24,symbol:'Cr',name:'Chromium',group:6,period:4,category:'transition-metal',mass:51.996,state:'Solid'},
  {number:25,symbol:'Mn',name:'Manganese',group:7,period:4,category:'transition-metal',mass:54.938,state:'Solid'},
  {number:26,symbol:'Fe',name:'Iron',group:8,period:4,category:'transition-metal',mass:55.845,state:'Solid'},
  {number:27,symbol:'Co',name:'Cobalt',group:9,period:4,category:'transition-metal',mass:58.933,state:'Solid'},
  {number:28,symbol:'Ni',name:'Nickel',group:10,period:4,category:'transition-metal',mass:58.693,state:'Solid'},
  {number:29,symbol:'Cu',name:'Copper',group:11,period:4,category:'transition-metal',mass:63.546,state:'Solid'},
  {number:30,symbol:'Zn',name:'Zinc',group:12,period:4,category:'transition-metal',mass:65.38,state:'Solid'},
  {number:31,symbol:'Ga',name:'Gallium',group:13,period:4,category:'post-transition-metal',mass:69.723,state:'Solid'},
  {number:32,symbol:'Ge',name:'Germanium',group:14,period:4,category:'metalloid',mass:72.63,state:'Solid'},
  {number:33,symbol:'As',name:'Arsenic',group:15,period:4,category:'metalloid',mass:74.922,state:'Solid'},
  {number:34,symbol:'Se',name:'Selenium',group:16,period:4,category:'nonmetal',mass:78.971,state:'Solid'},
  {number:35,symbol:'Br',name:'Bromine',group:17,period:4,category:'halogen',mass:79.904,state:'Liquid'},
  {number:36,symbol:'Kr',name:'Krypton',group:18,period:4,category:'noble-gas',mass:83.798,state:'Gas'},
  {number:37,symbol:'Rb',name:'Rubidium',group:1,period:5,category:'alkali-metal',mass:85.468,state:'Solid'},
  {number:38,symbol:'Sr',name:'Strontium',group:2,period:5,category:'alkaline-earth-metal',mass:87.62,state:'Solid'},
  {number:47,symbol:'Ag',name:'Silver',group:11,period:5,category:'transition-metal',mass:107.87,state:'Solid'},
  {number:50,symbol:'Sn',name:'Tin',group:14,period:5,category:'post-transition-metal',mass:118.71,state:'Solid'},
  {number:53,symbol:'I',name:'Iodine',group:17,period:5,category:'halogen',mass:126.9,state:'Solid'},
  {number:54,symbol:'Xe',name:'Xenon',group:18,period:5,category:'noble-gas',mass:131.29,state:'Gas'},
  {number:55,symbol:'Cs',name:'Cesium',group:1,period:6,category:'alkali-metal',mass:132.91,state:'Solid'},
  {number:56,symbol:'Ba',name:'Barium',group:2,period:6,category:'alkaline-earth-metal',mass:137.33,state:'Solid'},
  {number:79,symbol:'Au',name:'Gold',group:11,period:6,category:'transition-metal',mass:196.97,state:'Solid'},
  {number:80,symbol:'Hg',name:'Mercury',group:12,period:6,category:'transition-metal',mass:200.59,state:'Liquid'},
  {number:82,symbol:'Pb',name:'Lead',group:14,period:6,category:'post-transition-metal',mass:207.2,state:'Solid'},
  {number:86,symbol:'Rn',name:'Radon',group:18,period:6,category:'noble-gas',mass:222,state:'Gas'},
  {number:87,symbol:'Fr',name:'Francium',group:1,period:7,category:'alkali-metal',mass:223,state:'Solid'},
  {number:88,symbol:'Ra',name:'Radium',group:2,period:7,category:'alkaline-earth-metal',mass:226,state:'Solid'},
  {number:118,symbol:'Og',name:'Oganesson',group:18,period:7,category:'noble-gas',mass:294,state:'Solid'},
];

// fill gaps
for(let i=57;i<=71;i++) if(!ELEMENTS_BASE.find(e=>e.number===i))
  ELEMENTS_BASE.push({number:i,symbol:`L${i}`,name:`Lanthanoid ${i}`,group:i-54,period:9,category:'lanthanide',mass:i*2,state:'Solid'});
for(let i=89;i<=103;i++) if(!ELEMENTS_BASE.find(e=>e.number===i))
  ELEMENTS_BASE.push({number:i,symbol:`A${i}`,name:`Actinoid ${i}`,group:i-86,period:10,category:'actinide',mass:i*2,state:'Solid'});
for(let i=1;i<=118;i++){
  if(!ELEMENTS_BASE.find(e=>e.number===i)){
    let p=1,g=1,c='unknown';
    // Period 4 gaps
    if(i>=19&&i<=36){p=4;g=i-18;if(g>=3&&g<=12)c='transition-metal';else if(g===1)c='alkali-metal';else if(g===2)c='alkaline-earth-metal';else c='post-transition-metal';}
    // Period 5 gaps (Y=39 to Xe=54)
    else if(i>=37&&i<=54){p=5;g=i-36;if(g>=3&&g<=12)c='transition-metal';else if(g===1)c='alkali-metal';else if(g===2)c='alkaline-earth-metal';else if(g===18)c='noble-gas';else c='post-transition-metal';}
    // Period 6 gaps (Hf=72 to Rn=86); 55-56 already in base
    else if(i>=72&&i<=86){p=6;g=i-68;if(g>=3&&g<=12)c='transition-metal';else if(g===18)c='noble-gas';else if(g===17)c='halogen';else c='post-transition-metal';}
    // Period 7 gaps (Rf=104 to Ts=117); 87-88 and 118 already in base
    else if(i>=104&&i<=118){p=7;g=i-100;if(g>=3&&g<=12)c='transition-metal';else if(g===18)c='noble-gas';else if(g===17)c='halogen';else c='post-transition-metal';}
    if(g>18)g=18;if(g<1)g=1;
    ELEMENTS_BASE.push({number:i,symbol:`E${i}`,name:`Element ${i}`,group:g,period:p,category:c,mass:i*2,state:'Unknown'});
  }
}
const ELEMENTS = Array.from(new Map(ELEMENTS_BASE.map(e=>[e.number,e])).values()).sort((a,b)=>a.number-b.number);

const ROW_BG: Record<string,string> = {
  'alkali-metal':'#fee2e2','alkaline-earth-metal':'#fef3c7','transition-metal':'#fef9c3',
  'post-transition-metal':'#dbeafe','metalloid':'#dcfce7','nonmetal':'#f0fdf4',
  'halogen':'#fefce8','noble-gas':'#ede9fe','lanthanide':'#fce7f3','actinide':'#fee2e2','unknown':'#f1f5f9',
};

const PeriodicTableTool: React.FC = () => {
  const { t } = useLang();
  const [sel, setSel] = useState<any>(null);

  const rich: ElementData | undefined = sel ? ELEMENT_MAP.get(sel.number) : undefined;
  const shells = rich?.shells ?? (sel ? [sel.number] : [1]);
  const config = rich?.config ?? '—';
  const block = rich?.block ?? '—';
  const ions = rich?.ions ?? [];

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4"><EprayogLogo size={72} idSuffix="periodic"/></div>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">{t.toolPeriodicTableTitle}</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">{t.toolPeriodicTableSubtitle}</p>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="grid gap-[2px] min-w-[1000px] mx-auto"
          style={{gridTemplateColumns:'repeat(18, minmax(50px, 1fr))',gridTemplateRows:'repeat(10, minmax(60px, auto))'}}>
          {ELEMENTS.map(el=>(
            <div key={el.number}
              style={{gridColumn:el.group,gridRow:el.period,
                background:CATEGORY_COLORS[el.category]||CATEGORY_COLORS['unknown'],cursor:'pointer'}}
              className="rounded-lg p-1 border border-black/10 hover:scale-110 hover:z-10 text-zinc-900 hover:shadow-2xl transition-transform relative flex flex-col justify-between"
              onClick={()=>setSel(el)}>
              <div className="text-[9px] font-bold opacity-60 text-left pl-0.5">{el.number}</div>
              <div className="text-base sm:text-xl font-black text-center leading-none my-auto">{el.symbol}</div>
              <div className="text-[7px] font-bold text-center opacity-70 truncate px-0.5">{el.name}</div>
            </div>
          ))}

          {/* La-Lu placeholder at period 6, group 3 */}
          <div style={{gridColumn:3,gridRow:6,background:'#fce7f3',cursor:'default'}}
            className="rounded-lg p-1 border border-black/10 text-zinc-900 relative flex flex-col justify-between">
            <div className="text-[8px] font-bold opacity-50 text-left pl-0.5">57-71</div>
            <div className="text-sm font-black text-center leading-none my-auto text-pink-700">La-Lu</div>
            <div className="text-[7px] font-bold text-center opacity-60 truncate px-0.5">Lanthanides</div>
          </div>

          {/* Ac-Lr placeholder at period 7, group 3 */}
          <div style={{gridColumn:3,gridRow:7,background:'#fddddd',cursor:'default'}}
            className="rounded-lg p-1 border border-black/10 text-zinc-900 relative flex flex-col justify-between">
            <div className="text-[8px] font-bold opacity-50 text-left pl-0.5">89-103</div>
            <div className="text-sm font-black text-center leading-none my-auto text-red-700">Ac-Lr</div>
            <div className="text-[7px] font-bold text-center opacity-60 truncate px-0.5">Actinides</div>
          </div>

          {/* Legend — placed in cols 4-13, rows 1-2 */}
          <div className="p-3 flex flex-col justify-center" style={{gridColumn:'4/14',gridRow:'1/3'}}>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(CATEGORY_COLORS).map(([key,color])=>(
                <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-black/20" style={{backgroundColor:color}}/>
                  <span className="text-xs text-zinc-400 capitalize">{key.replace(/-/g,' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Element Detail Modal ── */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={()=>setSel(null)}>
            <motion.div initial={{scale:0.9,y:20}} animate={{scale:1,y:0}} exit={{scale:0.9,y:20}}
              className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex"
              style={{minHeight:'420px'}}
              onClick={e=>e.stopPropagation()}>

              {/* LEFT — element info */}
              <div className="w-[280px] flex-shrink-0 flex flex-col"
                style={{background: CATEGORY_COLORS[sel.category]||'#f1f5f9'}}>
                {/* Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-zinc-600 text-sm font-bold leading-none">
                      <span className="text-xl">{sel.mass}</span><br/>
                      <span className="text-base">{sel.number}</span>
                    </div>
                  </div>
                  <div className="text-6xl font-black text-zinc-900 leading-none mt-1">{sel.symbol}</div>
                  <div className="text-xl font-bold text-zinc-700 mt-1">{sel.name}</div>
                </div>

                {/* Info card */}
                <div className="mx-3 mb-3 rounded-xl p-4 flex flex-col gap-3"
                  style={{background:'rgba(148,163,184,0.25)'}}>
                  {[
                    {label:'TYPE', val: sel.category.replace(/-/g,' ').replace(/\b\w/g,(c:string)=>c.toUpperCase())},
                    {label:'GROUP / PERIOD', val:`${sel.group} / ${sel.period<=7?sel.period:sel.period-3}`},
                    {label:'PHASE @ STP', val:sel.state},
                    {label:'ELECTRON BLOCK', val:block},
                  ].map(row=>(
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{row.label}</span>
                      <span className="text-sm font-bold text-zinc-800">{row.val}</span>
                    </div>
                  ))}

                  {ions.length > 0 && (
                    <div className="mt-2 pt-3 border-t border-zinc-400/30">
                      <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center mb-2">COMMON IONS</p>
                      <div className="flex flex-col gap-2">
                        {ions.map((ion,i)=>(
                          <div key={i} className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                            <span className="text-base font-black text-zinc-800">{ion.formula}</span>
                            <span className="text-xs text-zinc-500 font-medium">{ion.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — Bohr model */}
              <div className="flex-1 flex flex-col relative"
                style={{background:'linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)'}}>
                {/* top bar */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-sm font-mono font-bold text-zinc-600 bg-white/80 px-3 py-1 rounded-lg border border-zinc-200">
                    {config}
                  </span>
                  <button onClick={()=>setSel(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-600 transition-colors">
                    <X size={16}/>
                  </button>
                </div>

                {/* Bohr model */}
                <div className="flex-1 flex items-center justify-center px-4 pb-8">
                  <BohrModel shells={shells} atomicNumber={sel.number} id={`modal-${sel.number}`}/>
                </div>

                {/* Shell count labels */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4">
                  {shells.slice(0,7).map((count,i)=>(
                    <span key={i} className="text-[10px] font-bold text-zinc-500 bg-white/70 px-2 py-0.5 rounded-full border border-zinc-200">
                      {'KLMNOPQ'[i]}: {count}e⁻
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PeriodicTableTool;

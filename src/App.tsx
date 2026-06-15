import{useState}from'react'
  const SAMPLE='{"name":"1Sultan","role":"Full-Stack Developer","skills":["TypeScript","React","Node.js"],"location":{"city":"Taif","country":"Saudi Arabia"},"available":true,"projects":27}'
  function syntaxHighlight(json:string){
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,(match)=>{
      let cls='color:#a78bfa'
      if(/^"/.test(match)){if(/:$/.test(match))cls='color:#38bdf8';else cls='color:#86efac';}
      else if(/true|false/.test(match))cls='color:#fb923c'
      else if(/null/.test(match))cls='color:#94a3b8'
      else cls='color:#fbbf24'
      return`<span style="${cls}">${match}</span>`
    })
  }
  export default function App(){
    const[input,setInput]=useState(SAMPLE)
    const[output,setOutput]=useState('')
    const[err,setErr]=useState('')
    const[indent,setIndent]=useState(2)
    const format=()=>{try{const p=JSON.parse(input);setOutput(JSON.stringify(p,null,indent));setErr('')}catch(e:any){setErr(e.message);setOutput('')}}
    const minify=()=>{try{const p=JSON.parse(input);setOutput(JSON.stringify(p));setErr('')}catch(e:any){setErr(e.message);setOutput('')}}
    const copy=()=>navigator.clipboard.writeText(output)
    return(
      <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#0f172a',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0'}}>
        <header style={{padding:'0 1.5rem',height:56,borderBottom:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#111827',flexShrink:0}}>
          <span style={{fontWeight:700,color:'#38bdf8',fontSize:'1.1rem'}}>{'{ } JSON Formatter'}</span>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <span style={{color:'#475569',fontSize:'0.8rem'}}>Indent:</span>
            {[2,4].map(n=><button key={n} onClick={()=>setIndent(n)} style={{padding:'0.25rem 0.7rem',background:indent===n?'#1e40af':'#1e293b',color:indent===n?'#93c5fd':'#94a3b8',border:'none',borderRadius:5,cursor:'pointer',fontSize:'0.8rem'}}>{n}</button>)}
            <button onClick={format} style={{padding:'0.35rem 1rem',background:'#0ea5e9',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600,fontSize:'0.85rem'}}>Format</button>
            <button onClick={minify} style={{padding:'0.35rem 1rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:6,cursor:'pointer',fontSize:'0.85rem'}}>Minify</button>
            <button onClick={copy} disabled={!output} style={{padding:'0.35rem 1rem',background:'#1e293b',color:output?'#94a3b8':'#334155',border:'1px solid #334155',borderRadius:6,cursor:output?'pointer':'not-allowed',fontSize:'0.85rem'}}>Copy</button>
          </div>
        </header>
        {err&&<div style={{background:'#450a0a',borderBottom:'1px solid #7f1d1d',padding:'0.5rem 1.5rem',color:'#fca5a5',fontSize:'0.85rem'}}>❌ {err}</div>}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',flex:1,gap:0,overflow:'hidden'}}>
          <div style={{display:'flex',flexDirection:'column',borderRight:'1px solid #1e293b'}}>
            <div style={{padding:'0.5rem 1rem',background:'#111827',borderBottom:'1px solid #1e293b',fontSize:'0.75rem',color:'#475569',display:'flex',justifyContent:'space-between'}}>
              <span>INPUT</span><span>{input.length} chars</span>
            </div>
            <textarea value={input} onChange={e=>setInput(e.target.value)} style={{flex:1,background:'#0d1117',color:'#e2e8f0',border:'none',outline:'none',padding:'1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'0.85rem',resize:'none',lineHeight:1.6}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{padding:'0.5rem 1rem',background:'#111827',borderBottom:'1px solid #1e293b',fontSize:'0.75rem',color:'#475569',display:'flex',justifyContent:'space-between'}}>
              <span>OUTPUT</span><span style={{color:'#22c55e'}}>{output?'✓ Valid JSON':''}</span>
            </div>
            <pre style={{flex:1,background:'#0d1117',margin:0,padding:'1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'0.85rem',overflow:'auto',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:output?syntaxHighlight(output):''}}/>
          </div>
        </div>
      </div>
    )
  }
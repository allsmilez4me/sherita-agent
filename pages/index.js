import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

const CHIPS = [
  "What AI has she actually built?",
  "Show me her Anthropic certifications",
  "What is her biggest business impact?",
  "What do colleagues say about her?",
  "Why should I hire her?",
  "Tell me about her leadership",
  "Walk me through her career",
  "What awards has she earned?",
];

const CERTS = [
  "Claude 101",
  "Claude Code 101",
  "AI Fluency for Builders",
  "AI Fluency for Small Businesses",
  "Teaching AI Fluency",
  "Claude Code in Action",
];

const BUILDS = [
  "Microsoft Copilot Studio enterprise agent — architected from scratch, 80-page knowledge base, 38% adoption exceeding the 20–35% industry benchmark",
  "Microsoft Power App for field sales time tracking + PowerBI integration — built and launched June 2026",
  "AI agent for CoS Certified professional certification platform — in production using Claude",
  "This career agent — built independently in two days: system prompt architecture, Next.js front end, server-side API route, Vercel deployment",
];

const STATS = [
  ["$2.3B", "Revenue Retained"],
  ["$5.6M", "Annualized Impact"],
  ["$100M", "ARR Enabled"],
  ["800+", "Reps Enabled"],
  ["6", "Anthropic Certs"],
];

// Gold palette tokens
const C = {
  ink:      '#0D0D0D',
  navy:     '#1F3A5F',
  gold:     '#B8975A',
  goldHov:  '#C9A86C',
  goldPale: '#F5EFE3',
  cream:    '#F7F5F1',
  mid:      '#6B6B6B',
  rule:     '#DDD8D0',
  white:    '#FFFFFF',
};

function renderMessage(text) {
  const paragraphs = text.split(/\n{2,}/);
  return paragraphs.map((para, pi) => {
    const lines = para.split('\n');
    const isList = lines.every(l => l.trim() === '' || l.trim().startsWith('- ') || l.trim().startsWith('* '));
    if (isList && lines.some(l => l.trim().startsWith('- ') || l.trim().startsWith('* '))) {
      return (
        <ul key={pi} style={{ paddingLeft: 18, margin: pi > 0 ? '10px 0 0' : '0' }}>
          {lines.filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* ')).map((l, li) => (
            <li key={li} style={{ marginBottom: 4 }}>{renderInline(l.replace(/^[\-\*]\s+/, ''))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={pi} style={{ margin: pi > 0 ? '10px 0 0' : '0', lineHeight: 1.65 }}>
        {renderInline(para)}
      </p>
    );
  });
}

function renderInline(text) {
  const parts = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) parts.push(<strong key={match.index}>{match[1]}</strong>);
    else if (match[2]) parts.push(<em key={match.index}>{match[2]}</em>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}

export default function Home() {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, busy]);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setInput('');
    setErr(null);
    const history = [...msgs, { role: 'user', content: q }];
    setMsgs(history);
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || `Error ${res.status}`);
        setMsgs(msgs);
      } else {
        setMsgs([...history, { role: 'assistant', content: data.text }]);
      }
    } catch (e) {
      setErr('Network error: ' + e.message);
      setMsgs(msgs);
    }
    setBusy(false);
  }

  return (
    <>
      <Head>
        <title>Sherita Grinter, PMP — Career Agent</title>
        <meta name="description" content="AI-powered career agent for Sherita Grinter, PMP. Ask about her AI certifications, business impact, leadership, and why she belongs on your team." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: C.cream, fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ── HEADER ── */}
        <header style={{ background: C.ink, padding: '28px 24px 0', position: 'relative', overflow: 'hidden' }}>
          {/* crosshatch bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M0 0 L24 24 M-6 6 L18 30 M6 -6 L30 18' stroke='%23B8975A' stroke-width='0.5' opacity='0.1'/%3E%3Cpath d='M24 0 L0 24 M30 6 L6 30 M18 -6 L-6 18' stroke='%23B8975A' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E\")", pointerEvents: 'none' }} />
          <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>

            {/* Name + eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldHov})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 17, color: C.ink, flexShrink: 0, boxShadow: `0 4px 16px rgba(184,151,90,0.4)` }}>SG</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.55rem', fontWeight: 600, color: C.cream, letterSpacing: '-0.01em', lineHeight: 1.1 }}>Sherita Grinter, PMP</div>
                <div style={{ fontSize: '0.68rem', color: C.gold, marginTop: 4, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>AI Enablement · Strategic Communications · CoS Certified · 21 Years · Richmond, VA</div>
              </div>
            </div>

            {/* Portfolio callout */}
            <div style={{ background: `rgba(184,151,90,0.1)`, border: `1px solid rgba(184,151,90,0.28)`, borderRadius: 4, padding: '16px 20px', marginBottom: 18 }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color: C.gold, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 7 }}>This agent is her portfolio</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: `rgba(247,245,241,0.9)`, lineHeight: 1.6, marginBottom: 14 }}>
                Sherita holds 6 Anthropic certifications and builds AI systems in production. The agent you are using right now demonstrates that capability directly.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {CERTS.map(c => (
                  <span key={c} style={{ background: `rgba(184,151,90,0.15)`, border: `1px solid rgba(184,151,90,0.35)`, borderRadius: 3, padding: '3px 10px', fontSize: '0.63rem', color: `rgba(247,245,241,0.8)`, fontWeight: 500, letterSpacing: '0.04em' }}>✓ {c}</span>
                ))}
              </div>
            </div>

            {/* AI builds */}
            <div style={{ borderTop: `1px solid rgba(184,151,90,0.15)`, paddingTop: 16, paddingBottom: 22 }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 700, color: C.gold, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 11 }}>AI systems she has built</div>
              {BUILDS.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, marginTop: 7, flexShrink: 0 }} />
                  <div style={{ fontSize: '0.78rem', color: `rgba(247,245,241,0.7)`, lineHeight: 1.55, fontWeight: 300 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── STATS BAR ── */}
        <div style={{ background: C.white, borderBottom: `1px solid ${C.rule}`, padding: '12px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {STATS.map(([n, l]) => (
              <div key={n} style={{ background: C.goldPale, border: `1px solid rgba(184,151,90,0.3)`, borderRadius: 3, padding: '8px 16px', flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 600, color: C.gold, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.58rem', color: C.mid, whiteSpace: 'nowrap', marginTop: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CHAT AREA ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>

            {err && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 4, padding: '10px 14px', marginBottom: 14, fontSize: '0.78rem', color: '#991B1B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ wordBreak: 'break-all' }}>⚠️ {err}</span>
                <button onClick={() => setErr(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991B1B', fontSize: '1.2rem', marginLeft: 8, flexShrink: 0 }}>×</button>
              </div>
            )}

            {msgs.length === 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 4, padding: '24px 24px 20px', marginBottom: 16, boxShadow: '0 1px 4px rgba(13,13,13,0.05)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1.25rem', color: C.ink, marginBottom: 7, letterSpacing: '-0.01em' }}>Ask me anything about Sherita</div>
                <div style={{ fontSize: '0.83rem', color: C.mid, lineHeight: 1.7, marginBottom: 18, fontWeight: 300 }}>Business impact, AI builds, leadership, testimonials, certifications. Every answer is grounded in documented, verified evidence.</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CHIPS.map(c => (
                    <button key={c} onClick={() => send(c)}
                      style={{ background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 20, padding: '7px 15px', fontSize: '0.74rem', color: C.mid, cursor: 'pointer', fontWeight: 500, transition: 'all 0.18s', fontFamily: "'Inter', sans-serif" }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.goldPale; e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.borderColor = C.rule; e.currentTarget.style.color = C.mid; }}
                    >{c}</button>
                  ))}
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', gap: 10, marginBottom: 16, alignItems: 'flex-start' }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldHov})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 12, color: C.ink, flexShrink: 0, marginTop: 2 }}>SG</div>
                )}
                <div style={{
                  maxWidth: '80%',
                  background: m.role === 'user' ? C.ink : C.white,
                  border: m.role === 'user' ? 'none' : `1px solid ${C.rule}`,
                  borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  padding: '13px 16px',
                  fontSize: '0.875rem',
                  color: m.role === 'user' ? C.cream : C.ink,
                  boxShadow: m.role === 'user' ? `0 2px 8px rgba(13,13,13,0.18)` : '0 1px 4px rgba(13,13,13,0.06)',
                  fontWeight: m.role === 'user' ? 400 : 300,
                }}>
                  {m.role === 'user'
                    ? <p style={{ margin: 0, lineHeight: 1.65 }}>{m.content}</p>
                    : <div style={{ fontSize: '0.875rem' }}>{renderMessage(m.content)}</div>
                  }
                </div>
              </div>
            ))}

            {busy && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldHov})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 12, color: C.ink }}>SG</div>
                <div style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: '4px 18px 18px 18px', padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center', boxShadow: '0 1px 4px rgba(13,13,13,0.06)' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {msgs.length > 0 && !busy && msgs.length < 12 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14, paddingLeft: 46 }}>
                {CHIPS.filter(c => !msgs.some(m => m.content === c)).slice(0, 3).map(c => (
                  <button key={c} onClick={() => send(c)}
                    style={{ background: C.cream, border: `1px solid ${C.rule}`, borderRadius: 16, padding: '5px 13px', fontSize: '0.72rem', color: C.mid, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.goldPale; e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.borderColor = C.rule; e.currentTarget.style.color = C.mid; }}
                  >{c}</button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>
        </main>

        {/* ── INPUT FOOTER ── */}
        <footer style={{ background: C.white, borderTop: `1px solid ${C.rule}`, padding: '16px 24px 20px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask about AI skills, business impact, leadership, or fit for your role…"
                style={{ flex: 1, border: `1.5px solid ${C.rule}`, borderRadius: 4, padding: '11px 16px', fontSize: '0.875rem', color: C.ink, outline: 'none', background: C.cream, fontFamily: "'Inter', sans-serif', transition: 'border-color 0.18s'" }}
                onFocus={e => { e.target.style.borderColor = C.gold; e.target.style.background = C.white; }}
                onBlur={e => { e.target.style.borderColor = C.rule; e.target.style.background = C.cream; }}
              />
              <button onClick={() => send()} disabled={busy || !input.trim()}
                style={{ background: input.trim() && !busy ? C.gold : C.rule, border: 'none', borderRadius: 4, padding: '11px 24px', color: input.trim() && !busy ? C.ink : C.mid, fontWeight: 600, fontSize: '0.82rem', cursor: input.trim() && !busy ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", transition: 'background 0.18s' }}
                onMouseEnter={e => { if (input.trim() && !busy) e.currentTarget.style.background = C.goldHov; }}
                onMouseLeave={e => { if (input.trim() && !busy) e.currentTarget.style.background = C.gold; }}
              >Send →</button>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.62rem', color: C.rule, marginTop: 10, letterSpacing: '0.06em' }}>Powered by Claude · Built by Sherita Grinter, PMP · CoS Certified</div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-6px);opacity:1} }
        input::placeholder { color: #9A9590; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #DDD8D0; border-radius: 3px; }
        ul { list-style-type: disc; }
        @media (prefers-color-scheme: dark) {
          /* intentional single-theme — preserve branding on dark OS */
        }
      `}</style>
    </>
  );
}

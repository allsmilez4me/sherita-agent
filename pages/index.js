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
  "Microsoft Copilot enterprise agent — architected from scratch, 80-page knowledge base, 38% adoption vs 40% industry benchmark, tens of thousands of annual interactions",
  "Microsoft Power App for field sales time tracking + PowerBI integration — built and launched June 2026",
  "AI agent for CoS Certified professional certification platform — in development using Claude",
  "Daily Claude and Claude Code workflows for content, analytics, and operational tooling",
];

const STATS = [
  ["$2.3B", "Revenue Retained"],
  ["$100M", "ARR Enabled"],
  ["20K+", "CCPA Associates"],
  ["800", "Reps Enabled"],
  ["6", "Anthropic Certs"],
];

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
      </Head>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>

        {/* ── HEADER ── */}
        <header style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', padding: '24px 24px 0', color: '#fff' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>

            {/* Name row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16, flexShrink: 0,
                boxShadow: '0 4px 14px rgba(79,70,229,0.5)',
              }}>SG</div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>Sherita Grinter, PMP</div>
                <div style={{ fontSize: '0.72rem', color: '#A5B4FC', marginTop: 2 }}>
                  AI Enablement · Strategic Communications · 21 Years · Richmond, VA
                </div>
              </div>
            </div>

            {/* AI hero panel */}
            <div style={{
              background: 'rgba(79,70,229,0.25)',
              border: '1px solid rgba(165,180,252,0.35)',
              borderRadius: 12, padding: '16px 18px', marginBottom: 16,
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                This agent is her portfolio
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', lineHeight: 1.55, marginBottom: 12 }}>
                Sherita holds 6 Anthropic certifications and builds AI systems in production.
                The agent you are using right now demonstrates that capability directly.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {CERTS.map(c => (
                  <span key={c} style={{
                    background: 'rgba(99,102,241,0.3)',
                    border: '1px solid rgba(165,180,252,0.4)',
                    borderRadius: 6, padding: '3px 9px',
                    fontSize: '0.65rem', color: '#C7D2FE', fontWeight: 600,
                  }}>✓ {c}</span>
                ))}
              </div>
            </div>

            {/* AI builds */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, paddingBottom: 18 }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                AI systems she has built
              </div>
              {BUILDS.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F46E5', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── STATS BAR ── */}
        <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '10px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {STATS.map(([n, l]) => (
              <div key={n} style={{
                background: '#EEF2FF', border: '1px solid #C7D2FE',
                borderRadius: 8, padding: '7px 14px', flexShrink: 0, textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#4F46E5' }}>{n}</div>
                <div style={{ fontSize: '0.6rem', color: '#818CF8', whiteSpace: 'nowrap' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CHAT ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '18px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>

            {/* Error */}
            {err && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA',
                borderRadius: 10, padding: '10px 14px', marginBottom: 14,
                fontSize: '0.78rem', color: '#991B1B',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ wordBreak: 'break-all' }}>⚠️ {err}</span>
                <button onClick={() => setErr(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#991B1B', fontSize: '1.2rem', marginLeft: 8, flexShrink: 0 }}>×</button>
              </div>
            )}

            {/* Welcome */}
            {msgs.length === 0 && (
              <div style={{
                background: '#fff', border: '1px solid #E5E7EB',
                borderRadius: 14, padding: '22px 22px 18px', marginBottom: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>
                  Ask me anything about Sherita
                </div>
                <div style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.7, marginBottom: 14 }}>
                  Business impact, AI builds, leadership, testimonials, certifications. Every answer is grounded in documented, verified evidence.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CHIPS.map(c => (
                    <button key={c} onClick={() => send(c)} style={{
                      background: '#F9FAFB', border: '1px solid #E5E7EB',
                      borderRadius: 20, padding: '7px 14px',
                      fontSize: '0.75rem', color: '#374151',
                      cursor: 'pointer', fontWeight: 500,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.color = '#4F46E5'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.color = '#374151'; }}
                    >{c}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {msgs.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                gap: 10, marginBottom: 14, alignItems: 'flex-start',
              }}>
                {m.role === 'assistant' && (
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 11,
                    flexShrink: 0, marginTop: 2,
                  }}>SG</div>
                )}
                <div style={{
                  maxWidth: '80%',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#fff',
                  border: m.role === 'user' ? 'none' : '1px solid #E5E7EB',
                  borderRadius: m.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                  padding: '12px 16px', fontSize: '0.875rem', lineHeight: 1.65,
                  color: m.role === 'user' ? '#fff' : '#111827',
                  boxShadow: m.role === 'user' ? '0 2px 8px rgba(79,70,229,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
                  whiteSpace: 'pre-wrap',
                }}>{m.content}</div>
              </div>
            ))}

            {/* Typing */}
            {busy && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 11,
                }}>SG</div>
                <div style={{
                  background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '4px 18px 18px 18px',
                  padding: '14px 18px', display: 'flex', gap: 5,
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#A5B4FC',
                      animation: `bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up chips */}
            {msgs.length > 0 && !busy && msgs.length < 12 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14, paddingLeft: 44 }}>
                {CHIPS.filter(c => !msgs.some(m => m.content === c)).slice(0, 3).map(c => (
                  <button key={c} onClick={() => send(c)} style={{
                    background: '#F9FAFB', border: '1px solid #E5E7EB',
                    borderRadius: 16, padding: '5px 12px',
                    fontSize: '0.72rem', color: '#6B7280', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; e.currentTarget.style.color = '#4F46E5'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.color = '#6B7280'; }}
                  >{c}</button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>
        </main>

        {/* ── INPUT ── */}
        <footer style={{ background: '#fff', borderTop: '1px solid #E5E7EB', padding: '14px 24px 18px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask about AI skills, business impact, leadership, or fit for your role…"
                style={{
                  flex: 1, border: '1.5px solid #E5E7EB', borderRadius: 12,
                  padding: '11px 16px', fontSize: '0.875rem', color: '#111827',
                  outline: 'none', background: '#F9FAFB',
                }}
                onFocus={e => { e.target.style.borderColor = '#4F46E5'; e.target.style.background = '#fff'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
              />
              <button
                onClick={() => send()}
                disabled={busy || !input.trim()}
                style={{
                  background: input.trim() && !busy ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#E5E7EB',
                  border: 'none', borderRadius: 12, padding: '11px 22px',
                  color: input.trim() && !busy ? '#fff' : '#9CA3AF',
                  fontWeight: 600, fontSize: '0.875rem',
                  cursor: input.trim() && !busy ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                }}
              >Send →</button>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#D1D5DB', marginTop: 8 }}>
              Powered by Claude · Built by Sherita Grinter, PMP
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

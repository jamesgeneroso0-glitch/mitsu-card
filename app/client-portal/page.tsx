'use client';
import { useState, useEffect } from 'react';

export default function ClientPortalPage() {
  // 1. Automated at random na Client ID (5-digit number)
  const [clientId, setClientId] = useState('');
  
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [theme, setTheme] = useState('amber');
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState('');
  
  // Links array (Max of 3)
  const [links, setLinks] = useState([
    { name: 'Facebook', type: 'facebook', detail: '', url: '' }
  ]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate random ID pagka-load ng page
  useEffect(() => {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    setClientId(randomId);
  }, []);

  const handleAddLink = () => {
    if (links.length >= 3) {
      alert('Hanggang 3 links lang ang pinapayagan para sa digital card.');
      return;
    }
    setLinks([...links, { name: '', type: 'website', detail: '', url: '' }]);
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const clientData = {
      name: name || 'Aking Pangalan',
      subtitle: subtitle || 'Subtitle / Role',
      theme,
      isLocked,
      pinCode: isLocked ? pinCode : '',
      links,
    };

    try {
      const response = await fetch('/api/admin/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, clientData }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Tagumpay! Na-save na ang iyong card. Ang iyong ID/Slug ay: ${clientId}`);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage('Nagkaroon ng problema sa koneksyon.');
    } finally {
      setLoading(false);
    }
  };

  // Helper para sa theme colors sa Preview
  const getThemeColor = (t: string) => {
    switch(t) {
      case 'sky': return '#0ea5e9';
      case 'emerald': return '#10b981';
      case 'rose': return '#f43f5e';
      default: return '#f59e0b'; // amber
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', display: 'flex', gap: '30px', flexWrap: 'wrap', background: '#0b0f19', color: '#fff', borderRadius: '12px' }}>
      
      {/* FORM SECTION (Left) */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <h2>Mitsu Client Portal</h2>
        <p style={{ fontSize: '14px', color: '#aaa' }}>I-customize ang iyong digital card. Awtomatikong binigyan ka ng natatanging ID.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          
          {/* Automated Slug / ID */}
          <div>
            <label style={{ fontSize: '12px', color: '#888' }}>Generated Card ID / Slug (Automated):</label>
            <input 
              type="text" 
              value={clientId} 
              disabled
              style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#111', border: '1px solid #333', color: '#777', cursor: 'not-allowed' }}
            />
          </div>

          <div>
            <label>Full Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Hal. Juan Dela Cruz"
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          <div>
            <label>Subtitle / Role:</label>
            <input 
              type="text" 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)} 
              placeholder="Hal. Student / Influencer / Entrepreneur"
              style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          <div>
            <label>Theme Color:</label>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
            >
              <option value="amber">Amber (Orange)</option>
              <option value="sky">Sky Blue</option>
              <option value="emerald">Emerald Green</option>
              <option value="rose">Rose Pink</option>
            </select>
          </div>

          {/* Lock feature */}
          <div style={{ background: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                checked={isLocked} 
                onChange={(e) => setIsLocked(e.target.checked)} 
                id="lockCheck"
                style={{ width: '18px', height: '18px' }}
              />
              <label htmlFor="lockCheck" style={{ cursor: 'pointer', fontWeight: 'bold' }}>Lock Card with PIN (Privacy Mode)</label>
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>I-check ito kung gusto mong lagyan ng PIN code para sa mga pipiliin mo lang i-share.</p>

            {isLocked && (
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '13px' }}>Ilagay ang PIN Code:</label>
                <input 
                  type="password" 
                  value={pinCode} 
                  onChange={(e) => setPinCode(e.target.value)} 
                  placeholder="Hal. 1234"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                />
              </div>
            )}
          </div>

          <hr style={{ borderColor: '#333' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Social Links (Max 3)</h3>
            <span style={{ fontSize: '12px', color: links.length >= 3 ? '#f43f5e' : '#aaa' }}>
              {links.length}/3 ginamit
            </span>
          </div>

          {links.map((link, index) => (
            <div key={index} style={{ background: '#111827', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 'bold' }}>Link #{index + 1}</span>
                {links.length > 1 && (
                  <button type="button" onClick={() => handleRemoveLink(index)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '12px' }}>
                    Tanggalin
                  </button>
                )}
              </div>
              <input 
                type="text" 
                placeholder="Platform Name (e.g. Facebook, Instagram)" 
                value={link.name} 
                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                style={{ padding: '6px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
              />
              <input 
                type="text" 
                placeholder="URL (e.g. https://...)" 
                value={link.url} 
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                style={{ padding: '6px', background: '#1a2234', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
              />
            </div>
          ))}

          {links.length < 3 ? (
            <button type="button" onClick={handleAddLink} style={{ padding: '8px', background: '#222', color: '#fff', border: '1px dashed #555', borderRadius: '6px', cursor: 'pointer' }}>
              + Magdagdag ng Link
            </button>
          ) : (
            <p style={{ fontSize: '12px', color: '#f43f5e', textAlign: 'center' }}>Naabot na ang maximum na 3 links.</p>
          )}

          <button type="submit" disabled={loading} style={{ padding: '12px', background: '#f59e0b', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'Sine-save...' : 'Save & Publish My Card'}
          </button>

          {message && <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: message.includes('Tagumpay') ? '#10b981' : '#f43f5e' }}>{message}</p>}
        </form>
      </div>

      {/* LIVE PREVIEW SECTION (Right) */}
      <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#05070c', padding: '20px', borderRadius: '10px', border: '1px solid #222' }}>
        <h3 style={{ marginBottom: '15px', color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Card Preview</h3>
        
        {/* Mockup Card Container */}
        <div style={{ width: '100%', maxWidth: '320px', background: '#111', border: `2px solid ${getThemeColor(theme)}`, borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: getThemeColor(theme), margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
            {name ? name.charAt(0).toUpperCase() : 'M'}
          </div>

          <h2 style={{ fontSize: '20px', marginBottom: '5px', color: '#fff' }}>{name || 'Pangalan Mo Dito'}</h2>
          <p style={{ fontSize: '14px', color: getThemeColor(theme), marginBottom: '20px' }}>{subtitle || 'Subtitle / Role Mo'}</p>

          {isLocked && (
            <div style={{ fontSize: '11px', background: '#1f130e', color: '#f59e0b', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '15px', border: '1px solid #f59e0b33' }}>
              🔒 Protected with PIN
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {links.map((l, i) => (
              <div key={i} style={{ padding: '10px', background: '#1a2234', borderRadius: '8px', color: '#fff', fontSize: '14px', border: '1px solid #333' }}>
                {l.name || `Link #${i + 1}`}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
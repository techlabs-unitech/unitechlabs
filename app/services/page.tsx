import React from 'react';

export default function ServicesPage() {
  return (
    <main style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Our Services</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
        We provide expert solutions in Web Development, AI implementation, and IoT systems 
        to help your business grow in the digital world.
      </p>
      <div style={{ marginTop: '40px' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  return (
    <main>
      <div className="announcement">EDIÇÃO ESPECIAL DE NATAL · PONTO GUIADO</div>
      <header className="hero wrap">
        <div className="eyebrow">✨ PARA COMEÇAR DO ZERO</div>
        <h1>Crie peças natalinas encantadoras com <span>bordado em papel</span></h1>
        <p className="lead">Um ponto de partida guiado para quem quer aprender essa técnica artesanal e transformar ideias de Natal em projetos feitos à mão.</p>
        <div className="hero-actions">
          <a className="button primary" href="#oferta">QUERO CONHECER A OFERTA</a>
          <span className="small-note">Acesso digital · Comece no seu ritmo</span>
        </div>
        <div className="hero-art" aria-label="Ilustração decorativa de Natal">
          <div className="ornament ornament-one">✳</div><div className="ornament ornament-two">❋</div>
          <div className="card-art"><span className="tiny-label">FEITO À MÃO</span><div className="star">✦</div><strong>Um Natal<br/>feito por você</strong><span className="thread">〰 〰 〰</span></div>
          <span className="holly">✦</span>
        </div>
      </header>
      <section className="section cream">
        <div className="wrap two-col">
          <div><div className="eyebrow">UM COMEÇO MAIS SIMPLES</div><h2>Aprenda com mais clareza, um passo de cada vez.</h2></div>
          <div><p>Começar uma técnica artesanal pode parecer difícil quando você não sabe por onde ir. O Ponto Guiado — Edição de Natal foi pensado para ajudar você a dar os primeiros passos no bordado em papel com uma proposta temática e acolhedora.</p><ul className="check-list"><li>Uma proposta criativa com tema natalino</li><li>Ideal para explorar a técnica no seu próprio ritmo</li><li>Uma ideia artesanal para fazer e presentear</li></ul></div>
        </div>
      </section>
      <section className="section wrap">
        <div className="center"><div className="eyebrow">PARA QUEM É</div><h2>Seu próximo projeto pode começar aqui.</h2><p className="section-intro">Para iniciantes, pessoas criativas e quem quer experimentar uma atividade manual com clima de Natal.</p></div>
        <div className="feature-grid"><article><span>🎄</span><h3>Clima de Natal</h3><p>Explore ideias artesanais inspiradas em uma das épocas mais especiais do ano.</p></article><article><span>🧵</span><h3>Comece no seu ritmo</h3><p>Reserve um momento tranquilo para aprender e praticar, sem precisar correr.</p></article><article><span>🎁</span><h3>Feito por você</h3><p>Crie algo com significado para decorar ou presentear alguém especial.</p></article></div>
      </section>
      <section id="oferta" className="offer-section">
        <div className="offer-card"><div className="eyebrow">PONTO GUIADO · EDIÇÃO DE NATAL</div><h2>Comece seu projeto natalino</h2><p>Escolha a opção que faz sentido para você.</p><div className="price-row"><div><span className="price-label">Oferta básica</span><strong>R$ 15,90</strong></div><a className="button primary" href="#contato">QUERO COMEÇAR</a></div><div className="price-row premium"><div><span className="price-label">Opção premium</span><strong>R$ 27,00</strong><span className="subprice">Confira os detalhes antes de escolher.</span></div><a className="button secondary" href="#contato">VER OPÇÃO PREMIUM</a></div><p className="guarantee">✓ Garantia de 7 dias, conforme as condições da oferta.</p><p className="disclaimer">Os botões ainda precisam receber os links corretos de checkout antes da publicação.</p></div>
      </section>
      <footer id="contato"><div className="wrap footer-inner"><strong>Ponto Guiado · Edição de Natal</strong><span>Uma ideia artesanal para começar no seu ritmo.</span></div></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

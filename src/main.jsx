import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, Check, CircleHelp, Gift, Heart, Leaf, Scissors, Sparkles, Sprout, Target, Wallet, WandSparkles } from "lucide-react";
import "./index.css";
import { CONTENT, OFFER } from "./config";

function Dotted({ className = "" }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 120 12" fill="none"><path d="M3 6H117" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.1 8" /></svg>;
}

function TreeArt({ finished = false, className = "" }) {
  const dots = [];
  for (let row = 0; row < 6; row++) {
    const count = row + 1;
    for (let col = 0; col < count; col++) {
      dots.push({ x: 100 - row * 10 + col * 20, y: 38 + row * 25, color: (row + col) % 4 === 0 ? "#B4232C" : "#1F5C3F" });
    }
  }
  return <svg className={className} viewBox="0 0 200 220" role="img" aria-label={finished ? "Exemplo ilustrativo de cartão com árvore natalina artesanal" : "Molde ilustrativo de árvore de Natal com pontos indicados"}>
    <path d="M100 20 60 73h21L47 111h35L39 151h122l-43-40h35l-34-38h21L100 20Z" fill={finished ? "#E8F2EC" : "#F7F0E6"} stroke="#1F5C3F" strokeWidth="1.8" strokeLinejoin="round" strokeDasharray={finished ? "0" : "2 5"} />
    {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={finished ? 3.8 : 3.1} fill={finished ? d.color : "#FFFBF5"} stroke={d.color} strokeWidth="2" />)}
    <path d="M91 153h18v28H91z" fill={finished ? "#B4232C" : "#FFFBF5"} stroke="#1F5C3F" strokeWidth="2" strokeDasharray={finished ? "0" : "2 4"} />
    <path d="M100 7 103 15l8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-8Z" fill="#C99A2E" stroke="#A67C1F" strokeWidth="1" />
    {finished && <path d="M72 89q28 22 56 0M60 126q40 22 80 0" fill="none" stroke="#B4232C" strokeWidth="2.2" strokeLinecap="round" />}
  </svg>;
}

function HeroIllustration() {
  return <div className="hero-illustration" aria-label="Ilustração demonstrativa da transformação de um molde em cartão artesanal">
    <div className="pattern-card"><span className="art-label">MOLDE ILUSTRATIVO</span><TreeArt /><Dotted className="art-dots" /></div>
    <div className="transformation" aria-hidden="true"><ArrowDown size={20} /><span>bordar</span></div>
    <div className="finished-card"><span className="art-label">EXEMPLO ILUSTRATIVO</span><TreeArt finished /><div className="card-greeting">Feito com carinho</div><span className="gold-dot" /></div>
    <div className="floating-sparkle sparkle-a"><Sparkles size={23} /></div><div className="floating-sparkle sparkle-b"><Sprout size={25} /></div>
  </div>;
}

const pains = [
  { icon: WandSparkles, title: "Não sei desenhar", text: "Quero criar uma peça, mas não sei como começar pelo desenho." },
  { icon: Scissors, title: "Nunca bordei", text: "Tenho vontade de aprender, mas preciso de uma orientação simples." },
  { icon: Wallet, title: "Quero experimentar uma renda extra", text: "Gostaria de criar peças artesanais e descobrir se existe oportunidade de oferecê-las a outras pessoas." },
  { icon: Target, title: "Quero gastar com consciência", text: "Preciso entender quais materiais são necessários antes de começar." },
  { icon: Heart, title: "Quero presentear com significado", text: "Quero fazer algo especial para família, amigos ou pessoas da igreja." },
];

const audience = [
  { icon: Sprout, title: "Para quem nunca bordou", text: "Quer aprender seguindo uma referência visual." },
  { icon: Scissors, title: "Para quem gosta de trabalhos manuais", text: "Quer criar peças de Natal com as próprias mãos." },
  { icon: Wallet, title: "Para quem deseja testar uma renda extra", text: "Quer explorar a possibilidade de vender criações artesanais." },
  { icon: Gift, title: "Para quem gosta de presentes personalizados", text: "Quer criar lembranças para família e amigos." },
  { icon: Heart, title: "Para quem aprecia temas cristãos", text: "Procura inspiração natalina ligada à fé, caso haja projetos desse tema no conteúdo real." },
  { icon: Leaf, title: "Para quem quer aprender no próprio ritmo", text: "Prefere seguir as instruções sem promessa de prazo fixo." },
];

function App() {
  const entryItems = CONTENT.entryItems;
  return <main>
    <header className="site-header"><div className="shell header-inner"><a href="#top" className="brand" aria-label="Ponto Guiado, início"><span className="brand-mark"><Sprout size={21} /></span><span>Ponto Guiado<small>EDIÇÃO DE NATAL</small></span></a><span className="header-note"><span className="status-dot" /> Uma ideia artesanal para começar</span></div></header>

    <section id="top" className="hero-section">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" />IMPRIMA <span>·</span> FURE <span>·</span> BORDE</div>
          <h1>Neste Natal, transforme moldes guiados em <em>peças feitas por você.</em></h1>
          <p className="hero-lead">Comece pelo bordado no papel com desenhos que indicam onde fazer os pontos. Crie peças natalinas para presentear e explore a possibilidade de oferecer suas criações para venda, mesmo que esteja começando do zero.</p>
          <p className="support-line"><Check size={17} /> Um começo guiado para quem quer criar com as próprias mãos.</p>
          <a className="button button-primary hero-cta" href="#oferta"><span>Quero começar por {formatPrice(OFFER.entryPrice)}</span><ArrowDown size={18} /></a>
          <p className="cta-note">Conheça a proposta e confira os detalhes da oferta.</p>
        </div>
        <HeroIllustration />
      </div>
      <div className="hero-bottom-pattern" aria-hidden="true"><Dotted /></div>
    </section>

    <section className="section pains-section">
      <div className="shell">
        <div className="section-heading"><span className="kicker">SE VOCÊ ESTÁ COMEÇANDO</span><h2>Você também queria criar algo bonito neste Natal, mas <em>não sabe por onde começar?</em></h2></div>
        <div className="pain-grid">{pains.map(({icon: Icon,title,text},i)=><article className="pain-card" key={title}><div className="card-icon"><Icon size={23} strokeWidth={1.8} /></div><span className="card-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="transition-note"><div className="transition-icon"><Sparkles size={23}/></div><p>Você não precisa começar sabendo tudo. <strong>Um molde guiado pode ajudar a entender onde cada ponto deve ser feito.</strong></p></div>
      </div>
    </section>

    <section className="section receives-section">
      <div className="shell receives-grid">
        <div className="receives-visual"><div className="paper-sheet"><span className="paper-caption">MOLDE GUIADO</span><TreeArt /><Dotted className="paper-dots" /></div><div className="receives-sticker"><Sprout size={19}/><span>Comece<br/>pelo molde</span></div></div>
        <div className="receives-copy"><span className="kicker">O MATERIAL</span><h2>Um caminho guiado para começar no <em>bordado no papel</em></h2><p>Conheça os conteúdos digitais incluídos na oferta. A ideia é usar uma referência visual com os pontos indicados para orientar a execução do desenho.</p>
          <div className="receive-item"><span><Check size={17}/></span><div><strong>Moldes de bordado no papel</strong><p>Desenhos com os pontos de perfuração indicados para ajudar a orientar o trabalho manual.</p></div></div>
          <div className="receive-item"><span><Check size={17}/></span><div><strong>Uma referência visual para acompanhar</strong><p>Use o molde como apoio enquanto explora a técnica e cria suas peças.</p></div></div>
          {entryItems.length > 0 && <div className="receive-extra"><strong>Conteúdos confirmados desta oferta</strong><ul>{entryItems.map((item,i)=><li key={i}>{item}</li>)}</ul></div>}
          <p className="microcopy">A oferta não inclui materiais físicos, salvo se isso for informado expressamente na descrição final.</p>
        </div>
      </div>
    </section>

    <section className="section audience-section">
      <div className="shell"><div className="section-heading centered"><span className="kicker">FEITO PARA VOCÊ</span><h2>Feito para quem quer <em>começar do zero</em></h2><p>Uma proposta para explorar a criatividade, sem precisar se apresentar como especialista.</p></div>
        <div className="audience-grid">{audience.map(({icon:Icon,title,text})=><article className="audience-card" key={title}><div className="audience-icon"><Icon size={21}/></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="section demo-section">
      <div className="shell"><div className="section-heading centered"><span className="kicker">ENTENDA A PROPOSTA</span><h2>Veja a ideia: do molde à <em>peça artesanal</em></h2><p>Ilustrações próprias para mostrar, de forma simples, a diferença entre a referência e uma possível peça final.</p></div>
        <div className="demo-grid"><article className="demo-card"><div className="demo-art demo-pattern"><TreeArt/><Dotted className="demo-dots"/></div><div className="demo-caption"><span className="demo-step">01</span><div><h3>Molde ilustrativo</h3><p>Os pontos indicados funcionam como referência visual.</p></div></div></article><div className="demo-arrow" aria-hidden="true"><ArrowDown size={21}/></div><article className="demo-card"><div className="demo-art demo-finished"><TreeArt finished/><div className="card-greeting">Feito com carinho</div></div><div className="demo-caption"><span className="demo-step">02</span><div><h3>Exemplo ilustrativo</h3><p>Uma representação visual de como o desenho pode inspirar um cartão artesanal.</p></div></div></article></div>
        <p className="illustration-disclaimer"><CircleHelp size={15}/> As imagens desta seção são ilustrações demonstrativas, não fotografias de clientes nem amostras confirmadas do produto final.</p>
      </div>
    </section>

    <section className="section inspiration-section">
      <div className="shell"><div className="section-heading"><span className="kicker">POSSIBILIDADES CRIATIVAS</span><h2>Inspire-se em ideias para criar <em>neste Natal</em></h2><p>Exemplos ilustrativos de estilos que podem inspirar projetos natalinos. Não representam uma lista confirmada de moldes incluídos.</p></div>
        <div className="inspiration-grid"><article className="inspiration-card"><div className="inspiration-art red-art"><div className="mini-card"><span>✦</span><TreeArt finished/></div></div><div className="inspiration-text"><span className="inspiration-tag">EXEMPLO ILUSTRATIVO</span><h3>Árvore de Natal</h3><p>Uma ideia clássica para explorar formas, cores e detalhes artesanais.</p></div></article><article className="inspiration-card"><div className="inspiration-art green-art"><div className="mini-card wreath-card"><svg viewBox="0 0 180 180" role="img" aria-label="Ilustração de guirlanda natalina"><circle cx="90" cy="90" r="53" fill="none" stroke="#1F5C3F" strokeWidth="13" strokeDasharray="3 6" strokeLinecap="round"/><circle cx="90" cy="90" r="43" fill="none" stroke="#7A9A7B" strokeWidth="3" strokeDasharray="2 7"/><path d="M73 46 90 65 107 46 99 69 120 73 99 80 105 101 90 87 75 101 81 80 60 73 81 69Z" fill="#B4232C"/><circle cx="60" cy="100" r="5" fill="#C99A2E"/><circle cx="117" cy="112" r="5" fill="#C99A2E"/></svg></div></div><div className="inspiration-text"><span className="inspiration-tag">EXEMPLO ILUSTRATIVO</span><h3>Guirlanda decorativa</h3><p>Uma referência visual de tema natalino tradicional, mostrada apenas como inspiração.</p></div></article><article className="inspiration-card"><div className="inspiration-art gold-art"><div className="mini-card faith-card"><svg viewBox="0 0 180 180" role="img" aria-label="Ilustração de estrela de Belém"><path d="M90 18 101 69 143 40 115 82 163 92 115 102 143 144 101 115 90 162 79 115 37 144 65 102 17 92 65 82 37 40 79 69Z" fill="#C99A2E" stroke="#A67C1F" strokeWidth="2"/><circle cx="90" cy="92" r="12" fill="#FFFBF5"/></svg></div></div><div className="inspiration-text"><span className="inspiration-tag">EXEMPLO ILUSTRATIVO</span><h3>Estrela de Belém</h3><p>Um detalhe de inspiração cristã, sem definir a coleção inteira como religiosa.</p></div></article></div>
        <p className="illustration-disclaimer"><CircleHelp size={15}/> Estes exemplos são ilustrações conceituais. Confirme quais desenhos fazem parte da coleção real antes de anunciar temas específicos.</p>
      </div>
    </section>

    <div className="part-two-anchor" id="oferta" aria-label="Espaço reservado para a seção de oferta da Parte 2"><div className="shell"><p>Oferta e opções de compra serão apresentadas na Parte 2, com conteúdo confirmado e links de checkout configurados.</p></div></div>
    <footer className="site-footer"><div className="shell footer-inner"><a href="#top" className="brand footer-brand"><span className="brand-mark"><Sprout size={20}/></span><span>Ponto Guiado<small>EDIÇÃO DE NATAL</small></span></a><p>Uma ideia artesanal para começar no seu ritmo.</p></div><div className="shell footer-legal">© {new Date().getFullYear()} Ponto Guiado · Edição de Natal</div></footer>
  </main>;
}

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: OFFER.currency }).format(value);
}

createRoot(document.getElementById("root")).render(<App />);

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Check, ChevronDown, CircleHelp, X, ArrowRight, Leaf, Heart, Scissors, Printer, CircleDot, Sparkles } from "lucide-react";
import "./index.css";
import { OFFER, CHECKOUT, CONTENT, MATERIALS, GUARANTEE, DELIVERY, LICENSE, LINKS, IMAGES } from "./config";

const money = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const validUrl = (value) => { try { const u = new URL(value); return u.protocol === "https:" && u.hostname.length > 0; } catch { return false; } };
const itemLabel = (item) => `${item.quantity ? item.quantity + " " : ""}${item.title}`;
const allPremiumItems = () => [
  ...(CONTENT.premiumIncludesEntry === true ? CONTENT.entryItems.map((i) => ({ ...i, title: "Tudo da opção de entrada: " + i.title })) : []),
  ...(CONTENT.lesson.title.trim() ? [{ title: CONTENT.lesson.title, description: [CONTENT.lesson.format, CONTENT.lesson.duration].filter(Boolean).join(" · ") }] : []),
  ...CONTENT.premiumExtraItems,
];
export function getPendencias() {
  const p = [];
  if (!validUrl(CHECKOUT.entry)) p.push("Link de checkout Kirvano da opção de R$15,90");
  if (!validUrl(CHECKOUT.popup)) p.push("Link de checkout Kirvano do Plano Completo por R$19,90");
  if (!validUrl(CHECKOUT.premium)) p.push("Link de checkout Kirvano do Plano Completo por R$27,00");
  if (!CONTENT.entryItems.length) p.push("Cadastrar os itens confirmados da opção de R$15,90");
  if (CONTENT.premiumIncludesEntry === null) p.push("Confirmar se o Plano Completo inclui a opção de entrada");
  if (!CONTENT.lesson.title.trim()) p.push("Confirmar o título da aula do Plano Completo");
  if (!CONTENT.format.trim()) p.push("Confirmar o formato dos moldes");
  if (!CONTENT.premiumExtraItems.length) p.push("Confirmar outros itens do Plano Completo (ou registrar que não há extras)");
  if (!MATERIALS.confirmed) p.push("Confirmar a lista de materiais necessários");
  if (!DELIVERY.confirmed) p.push("Confirmar o procedimento de entrega pela Kirvano");
  if (!GUARANTEE.confirmed) p.push("Confirmar o procedimento de garantia/reembolso da Kirvano");
  if (LICENSE.sellFinishedPieces === null) p.push("Confirmar a licença para venda das peças prontas");
  if (!IMAGES.hero || !IMAGES.mold || !IMAGES.finished) p.push("Adicionar fotos reais do molde e da peça pronta");
  if (!LINKS.terms || !validUrl(LINKS.terms)) p.push("Adicionar URL válida dos Termos de Uso");
  if (!LINKS.privacy || !validUrl(LINKS.privacy)) p.push("Adicionar URL válida da Política de Privacidade");
  if (!LINKS.contact || !validUrl(LINKS.contact)) p.push("Adicionar URL válida de Contato");
  p.push("Configurar o Pixel da Meta com o ID fornecido pelo proprietário");
  return p;
}
function track(event, data) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (event === "CliqueCheckout") window.fbq("trackCustom", event, data);
    else window.fbq("trackCustom", event);
  } else if (import.meta.env.DEV) console.log("[tracking]", event, data || {});
}
function goToCheckout(tipo) {
  const link = CHECKOUT[tipo];
  if (!validUrl(link)) { if (import.meta.env.DEV) console.warn("Checkout vazio ou inválido:", tipo); return false; }
  const url = new URL(link);
  const current = new URL(window.location.href);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src"].forEach((key) => {
    const value = current.searchParams.get(key);
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  });
  const plan = tipo === "entry" ? OFFER.entryName : OFFER.premiumName;
  const value = tipo === "entry" ? OFFER.entryPrice : tipo === "popup" ? OFFER.popupPrice : OFFER.premiumPrice;
  track("CliqueCheckout", { plano: plan, value, currency: "BRL" });
  window.location.assign(url.toString());
  return true;
}
function Button({ children, onClick, disabled = false, secondary = false, className = "", type = "button" }) {
  return <button type={type} disabled={disabled} onClick={onClick} className={`btn ${secondary ? "btn-secondary" : "btn-primary"} ${className}`}>{children}</button>;
}
function DottedDivider() { return <div className="dotted-divider" aria-hidden="true"><span>• • • • • • • • • • • • • • • • • • • •</span></div>; }
function TreeIllustration({ finished = false, variant = "tree" }) {
  if (variant === "star") return <svg viewBox="0 0 180 140" role="img" aria-label="Ilustração de estrela natalina"><path d="M90 15 L101 55 L143 55 L109 80 L122 120 L90 95 L58 120 L71 80 L37 55 L79 55 Z" fill={finished ? "#C99A2E" : "none"} stroke="#C99A2E" strokeWidth="3" strokeLinejoin="round" strokeDasharray={finished ? "0" : "2 6"}/><path d="M90 25V110" stroke="#B4232C" strokeWidth="2" strokeDasharray="2 5"/></svg>;
  return <svg viewBox="0 0 220 240" role="img" aria-label={finished ? "Ilustração de cartão com árvore de Natal bordada" : "Ilustração de molde com pontos de perfuração em árvore de Natal"}><path d="M110 26 L62 87 H86 L42 137 H84 L55 177 H165 L136 137 H178 L134 87 H158 Z" fill={finished ? "#E8F2EC" : "none"} stroke="#1F5C3F" strokeWidth="3" strokeLinejoin="round" strokeDasharray={finished ? "0" : "2 7"}/>{Array.from({length: 27},(_,i)=>{const y=49+Math.floor(i/5)*27; const x=110+((i%5)-2)*17; return <circle key={i} cx={x} cy={y} r={finished?2.8:3.4} fill={i%3===0?"#B4232C":finished?"#1F5C3F":"#C99A2E"}/>})}<path d="M97 177H123V210H97Z" fill="#C99A2E" stroke="#1F5C3F" strokeWidth="2"/><path d="M110 12 L114 22 L125 22 L116 29 L120 40 L110 33 L100 40 L104 29 L95 22 L106 22Z" fill="#C99A2E"/></svg>;
}
function HeroArt() {
  if (IMAGES.hero) return <img className="hero-photo" src={IMAGES.hero.src} alt={IMAGES.hero.alt} width={IMAGES.hero.width} height={IMAGES.hero.height} fetchPriority="high" />;
  return <div className="hero-art"><div className="paper-sample"><span className="sample-label">Molde ilustrativo</span><TreeIllustration /></div><div className="finished-sample"><span className="sample-label">Peça ilustrativa</span><TreeIllustration finished /></div><span className="little-star">✦</span><span className="art-note">Ilustração</span></div>;
}
function ItemList({ items }) { if (!items?.length) return null; return <ul className="item-list">{items.map((item,i)=><li key={item.title+i}><Check size={19} aria-hidden="true"/><span><strong>{itemLabel(item)}</strong>{item.description && <small>{item.description}</small>}</span></li>)}</ul>; }
function ProductIcon({ index=0 }) { const icons=[Printer, CircleDot, Scissors, Leaf, Sparkles]; const Icon=icons[index%icons.length]; return <div className="product-icon"><Icon size={27} aria-hidden="true"/></div>; }
function App() {
  const [popupOpen,setPopupOpen]=useState(false);
  const [faqOpen,setFaqOpen]=useState({});
  const [pendingOpen,setPendingOpen]=useState(true);
  const [stickyVisible,setStickyVisible]=useState(false);
  const [popupUsed,setPopupUsed]=useState(false);
  const originRef=useRef(null);
  const titleRef=useRef(null);
  const dialogRef=useRef(null);
  const entryButtonRef=useRef(null);
  useEffect(()=> {
    const hero=document.getElementById("hero");
    const offer=document.getElementById("oferta");
    if (!hero || !offer || typeof IntersectionObserver==="undefined") return;
    const a=new IntersectionObserver(([e])=>setStickyVisible(!e.isIntersecting),{threshold:0.05}); a.observe(hero);
    const b=new IntersectionObserver(([e])=>{if(e.isIntersecting)setStickyVisible(false);},{threshold:0.12}); b.observe(offer);
    return ()=>{a.disconnect();b.disconnect();};
  },[]);
  useEffect(()=> {
    const enabled=import.meta.env.DEV || new URLSearchParams(window.location.search).get("pendencias")==="1";
    if (!enabled) return;
    // painel exibido abaixo; não altera o conteúdo comercial público
  },[]);
  useEffect(()=> {
    if(!popupOpen) return;
    const previous=document.activeElement;
    document.body.style.overflow="hidden";
    titleRef.current?.focus();
    const onKey=(e)=>{
      if(e.key==="Escape"){e.preventDefault();closePopup();return;}
      if(e.key==="Tab" && dialogRef.current){
        const nodes=dialogRef.current.querySelectorAll('button:not([disabled]),a[href], [tabindex="0"]');
        const list=Array.from(nodes); if(!list.length)return;
        if(e.shiftKey && document.activeElement===list[0]){e.preventDefault();list[list.length-1].focus();}
        else if(!e.shiftKey && document.activeElement===list[list.length-1]){e.preventDefault();list[0].focus();}
      }
    };
    window.addEventListener("keydown",onKey);
    return ()=>{window.removeEventListener("keydown",onKey);document.body.style.overflow="";if(previous && previous.focus) previous.focus();};
  },[popupOpen]);
  function closePopup(){setPopupOpen(false);setTimeout(()=>originRef.current?.focus(),0);}
  function openPopup() {
    if (!validUrl(CHECKOUT.popup)) { goToCheckout("entry"); return; }
    let used=popupUsed;
    try { used=used || sessionStorage.getItem("pontoGuiadoPopupUsed")==="1"; } catch {}
    if(used){goToCheckout("entry");return;}
    try { sessionStorage.setItem("pontoGuiadoPopupUsed","1"); } catch {}
    setPopupUsed(true); originRef.current=entryButtonRef.current;
    setPopupOpen(true); track("PopupCompleto");
  }
  const faq = [
    ["Nunca bordei. Consigo fazer?","Os moldes foram pensados para quem está começando: o desenho já vem pronto e os pontos mostram onde furar e por onde passar a linha."],
    ["Preciso saber desenhar?","Não. Você segue o desenho e os pontos que já estão no molde."],
    ["O que é bordado no papel?","É uma técnica artesanal: você fura o papel nos pontos indicados e passa a linha por eles para formar o desenho."],
    ...(CONTENT.format.trim() ? [["Preciso ter impressora?",`Os moldes são em ${CONTENT.format}. Se não tiver impressora, dá para imprimir em uma papelaria.`]] : []),
    ...(MATERIALS.confirmed ? [["Quais materiais vou precisar?",<>Os materiais não estão inclusos. Em geral, você vai usar:<ul>{MATERIALS.items.map(x=><li key={x}>{x}</li>)}</ul></>]] : []),
    ...(CONTENT.entryItems.length ? [["O que recebo por R$15,90?",<ItemList items={CONTENT.entryItems}/>]] : []),
    ...((CONTENT.lesson.title.trim() || CONTENT.premiumExtraItems.length || CONTENT.premiumIncludesEntry === true) ? [["O que inclui o Plano Completo de R$27?",<><ItemList items={allPremiumItems()}/>{!CONTENT.lesson.title.trim() && <p>Aula de bordado no papel.</p>}</>]] : []),
    ...(LICENSE.sellFinishedPieces === true ? [["Posso vender as peças que eu fizer?","Pode. As peças prontas que você fizer são suas para vender; só os arquivos dos moldes não podem ser revendidos nem compartilhados. As vendas dependem de preço, divulgação, procura e acabamento; não há garantia de encomendas nem de renda."]] : []),
    ...(DELIVERY.confirmed ? [["Como recebo o acesso?",DELIVERY.text]] : []),
    ["Como funciona a garantia?",<><p>Você tem {GUARANTEE.days} dias para avaliar sua compra. Se não for o que você esperava, peça o reembolso em até {GUARANTEE.days} dias depois da compra, pela própria Kirvano.</p>{GUARANTEE.confirmed && <p>{GUARANTEE.howTo}</p>}</>],
  ];
  const entryReady=validUrl(CHECKOUT.entry), popupReady=validUrl(CHECKOUT.popup), premiumReady=validUrl(CHECKOUT.premium);
  const facts=[CONTENT.format.trim(),OFFER.oneTimePayment===true?"Pagamento único":"",...OFFER.paymentMethods].filter(Boolean);
  const devPanel=import.meta.env.DEV || new URLSearchParams(window.location.search).get("pendencias")==="1";
  const pending=getPendencias();
  return <div className="page-shell">
    <header className="hero section-wrap" id="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> Imprima · Fure · Borde</div><h1>Peças de Natal bordadas por você, <em>mesmo sem saber desenhar.</em></h1><p className="hero-sub">Os moldes já vêm com os pontos marcados: você imprime, fura e borda. Para presentear ou para vender neste fim de ano.</p><p className="hero-support">Se você sabe ligar os pontinhos, consegue seguir o molde.</p><Button onClick={()=>document.getElementById("oferta")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}>Quero começar por {money(OFFER.entryPrice)} <ArrowRight size={20}/></Button>{facts.length>0&&<p className="hero-facts">{facts.join(" · ")}</p>}</div><HeroArt /></header>
    <DottedDivider/>
    <section className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">A gente começa do começo</span><h2>Você também queria criar algo bonito neste Natal, mas não sabe por onde começar?</h2></div><div className="pain-grid">{[["Não sei desenhar","Vejo peças lindas, mas travo no desenho."],["Acho que não levo jeito","Já tentei um trabalho manual e a linha embolou, o ponto saiu torto."],["Tenho medo de gastar à toa","Não quero comprar material e deixar tudo parado na gaveta."],["Dezembro aperta","Presente, ceia, amigo secreto: a lista cresce e o orçamento não."],["Quero vender algo no fim de ano","Vejo gente vendendo de tudo e não sei o que fazer."],["Quero um presente com significado","Algo feito por mim para a família, os amigos ou as pessoas da igreja."]].map(([t,d],i)=><article className="pain-card" key={t}><span className="pain-number">0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="transition-note"><Heart size={24}/><p><strong>Não é falta de talento. É falta de um molde que mostre o caminho.</strong> No Ponto Guiado, o desenho já vem pronto no molde e os pontos mostram onde a agulha entra.</p></div></section>
    <section className="alt-section"><div className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">Simples, ponto a ponto</span><h2>Um caminho guiado para começar no bordado no papel</h2><p>Veja como funciona e o que vem em cada opção.</p></div><div className="steps-grid">{[["Imprima o molde","O desenho já vem pronto, com os pontos marcados.",Printer],["Fure os pontos","Com um alfinete ou uma agulha grossa, sobre uma base macia.",CircleDot],["Borde seguindo o desenho","Passe a linha de ponto em ponto até formar a peça.",Scissors]].map(([t,d,Icon],i)=><article className="step-card" key={t}><div className="step-icon"><Icon size={28}/></div><span className="step-count">PASSO 0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="content-items"><h3>O que vem na opção de entrada</h3>{CONTENT.entryItems.length?<div className="items-grid">{CONTENT.entryItems.map((item,i)=><article className="included-card" key={item.title+i}><ProductIcon index={i}/><h4>{itemLabel(item)}</h4>{item.description&&<p>{item.description}</p>}</article>)}</div>:null}</div>{MATERIALS.confirmed&&<div className="materials-box"><h3>O que você vai precisar ter em casa <span>(não incluso)</span></h3><ul>{MATERIALS.items.map(x=><li key={x}>{x}</li>)}</ul></div>}</div></section>
    <section className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">Feito para você</span><h2>Feito para quem quer começar do zero</h2></div><div className="audience-grid">{[["Para quem nunca bordou","Quer aprender seguindo uma referência visual."],["Para quem não sabe desenhar","O desenho já vem no molde."],["Para quem quer fazer os próprios presentes","Para a família, os amigos e o amigo secreto."],["Para quem quer ter o que vender no fim de ano","Procura uma peça artesanal para oferecer."],...(CONTENT.hasChristianThemes===true?[["Para quem gosta de temas cristãos","Quer peças de Natal ligadas à fé."]]:[]),["Para quem prefere o próprio ritmo","Sem prazo fixo para terminar."]].map(([t,d])=><div className="audience-item" key={t}><Check size={20}/><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></section>
    <section className="alt-section"><div className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">Visualize o processo</span><h2>Veja a ideia: do molde à peça</h2></div><div className="compare-grid"><article className="compare-card">{IMAGES.mold?<img src={IMAGES.mold.src} alt={IMAGES.mold.alt} width={IMAGES.mold.width} height={IMAGES.mold.height} loading="lazy"/>:<div className="compare-illustration"><TreeIllustration/><span>Molde ilustrativo</span></div>}<h3>O molde com os pontos</h3></article><article className="compare-card">{IMAGES.finished?<img src={IMAGES.finished.src} alt={IMAGES.finished.alt} width={IMAGES.finished.width} height={IMAGES.finished.height} loading="lazy"/>:<div className="compare-illustration"><TreeIllustration finished/><span>Exemplo ilustrativo</span></div>}<h3>A peça pronta</h3></article></div></div></section>
    <section className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">Ideias para inspirar</span><h2>Inspire-se em ideias para criar neste Natal</h2></div>{IMAGES.gallery.length>0?<><div className="gallery-grid">{IMAGES.gallery.map((img,i)=><figure className="gallery-card" key={img.src}><img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy"/><figcaption>{img.alt}</figcaption></figure>)}</div><p className="gallery-caption">Peças feitas com os moldes do Ponto Guiado</p></>:<div className="ideas-grid">{[["Cartão natalino","card"],["Enfeite de Natal","tree"],["Estrela decorativa","star"]].map(([label,variant])=><article className="idea-card" key={label}><div className="idea-art">{variant==="star"?<TreeIllustration variant="star"/>:<TreeIllustration finished={variant==="tree"}/>}</div><h3>{label}</h3><span>Ilustração</span></article>)}</div>}</section>
    <section className="offer-section" id="oferta"><div className="section-wrap section-block"><div className="section-heading"><span className="section-kicker">Escolha seu caminho</span><h2>Escolha como começar seu bordado de Natal</h2><p>Compare as opções e comece no seu ritmo.</p></div><div className="pricing-grid"><article className="price-card"><div className="price-top"><span className="price-label">PARA COMEÇAR</span><h3>{OFFER.entryName}</h3><p className="price-description">Para conhecer o bordado no papel e começar a criar peças de Natal seguindo moldes guiados.</p><p className="price">{money(OFFER.entryPrice)}</p></div><ItemList items={CONTENT.entryItems}/><Button onClick={openPopup} disabled={!entryReady}>{entryReady?"Quero começar por "+money(OFFER.entryPrice):"Disponível em breve"}</Button></article><article className="price-card premium-card"><div className="premium-tag">Mais completo</div><div className="price-top"><span className="price-label">PARA TER MAIS APOIO</span><h3>{OFFER.premiumName}</h3><p className="price-description">Para quem quer aprender com mais apoio.</p><p className="price">{money(OFFER.premiumPrice)}</p></div>{CONTENT.premiumIncludesEntry===true&&<><h4>Inclui também a opção de entrada</h4><ItemList items={CONTENT.entryItems}/></>}{!CONTENT.lesson.title.trim()&&<ul className="item-list"><li><Check size={19}/><span><strong>Aula de bordado no papel</strong></span></li></ul>}<ItemList items={allPremiumItems().filter(i=>i.title!==CONTENT.lesson.title)}/><Button onClick={()=>goToCheckout("premium")} disabled={!premiumReady}>{premiumReady?"Quero o Plano Completo por "+money(OFFER.premiumPrice):"Disponível em breve"}</Button></article></div><p className="checkout-note">{[OFFER.oneTimePayment===true?"Pagamento único":"",...OFFER.paymentMethods].filter(Boolean).join(" · ")}</p></div></section>
    <section className="section-wrap section-block guarantee-section"><div className="guarantee-icon"><Heart size={30}/></div><div><span className="section-kicker">Sua compra, suas regras</span><h2>Você tem {GUARANTEE.days} dias para avaliar sua compra</h2><p>Se não for o que você esperava, peça o reembolso em até {GUARANTEE.days} dias depois da compra, pela própria Kirvano.</p>{GUARANTEE.confirmed&&<p className="guarantee-steps">{GUARANTEE.howTo}</p>}</div></section>
    <section className="alt-section"><div className="section-wrap section-block faq-section"><div className="section-heading"><span className="section-kicker">Dúvidas frequentes</span><h2>Ficou com alguma dúvida?</h2></div><div className="faq-list">{faq.map(([q,a],i)=><article className="faq-item" key={q}><h3><button aria-expanded={!!faqOpen[i]} aria-controls={"faq-answer-"+i} onClick={()=>setFaqOpen(s=>({...s,[i]:!s[i]}))}>{q}<ChevronDown size={21} className={faqOpen[i]?"chevron-open":""}/></button></h3>{faqOpen[i]&&<div id={"faq-answer-"+i} className="faq-answer">{a}</div>}</article>)}</div></div></section>
    <section className="final-cta"><div className="section-wrap final-cta-inner"><span className="section-kicker">Seu próximo ponto começa aqui</span><h2>Neste Natal, dê o primeiro ponto na sua própria criação.</h2><p>Imprima o molde, fure os pontos marcados e borde peças de Natal para presentear ou para vender.</p><div className="final-price">Comece por {money(OFFER.entryPrice)}</div><Button onClick={()=>document.getElementById("oferta")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}>Quero começar por {money(OFFER.entryPrice)} <ArrowRight size={20}/></Button></div></section>
    <footer className="site-footer"><div className="section-wrap footer-inner"><strong>Ponto Guiado · Edição de Natal</strong><nav aria-label="Links do rodapé">{validUrl(LINKS.terms)&&<a href={LINKS.terms}>Termos de Uso</a>}{validUrl(LINKS.privacy)&&<a href={LINKS.privacy}>Política de Privacidade</a>}{validUrl(LINKS.contact)&&<a href={LINKS.contact}>Contato</a>}</nav>{[CHECKOUT.entry,CHECKOUT.popup,CHECKOUT.premium].some(validUrl)&&<p>Pagamento processado pela Kirvano.</p>}<p className="legal-note">Os resultados de venda dependem de fatores individuais e de mercado. Não há promessa de renda ou de vendas.</p></div></footer>
    {stickyVisible&&<div className="sticky-cta"><Button onClick={()=>document.getElementById("oferta")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}>Quero começar por {money(OFFER.entryPrice)}</Button></div>}
    {popupOpen&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)closePopup();}}><div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="popup-title" ref={dialogRef}><button className="modal-close" aria-label="Fechar" onClick={closePopup}><X size={23}/></button><span className="modal-pill">Antes de continuar</span><h2 id="popup-title" tabIndex={-1} ref={titleRef}>Leve o Plano Completo por {money(OFFER.popupPrice)}</h2><p>É o mesmo Plano Completo de {money(OFFER.premiumPrice)} da página, por {money(OFFER.popupPrice-OFFER.entryPrice)} a mais que a opção de {money(OFFER.entryPrice)}.</p><ItemList items={allPremiumItems()}/>{!CONTENT.lesson.title.trim()&&<p className="modal-pending-lesson">Aula de bordado no papel</p>}<Button onClick={()=>goToCheckout("popup")} disabled={!popupReady}>{popupReady?"Quero o Plano Completo por "+money(OFFER.popupPrice):"Disponível em breve"}</Button><button className="decline-link" onClick={()=>goToCheckout("entry")} disabled={!entryReady}>Não, obrigado. Quero a opção de {money(OFFER.entryPrice)}</button></div></div>}
    {devPanel&&<aside className="pending-panel"><button className="pending-toggle" onClick={()=>setPendingOpen(v=>!v)} aria-expanded={pendingOpen}><CircleHelp size={18}/> Pendências antes de publicar <ChevronDown size={18} className={pendingOpen?"chevron-open":""}/></button>{pendingOpen&&<div className="pending-body"><p>Visível apenas em desenvolvimento ou com <code>?pendencias=1</code>.</p><ul>{pending.map(x=><li key={x}>{x}</li>)}</ul></div>}</aside>}
  </div>;
}
createRoot(document.getElementById("root")).render(<App />);

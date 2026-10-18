import { useEffect, useRef, useState } from 'react'
import pausa from '../assets/editorial/pausa-v1.png'
import cotidiano from '../assets/editorial/cotidiano-v1.png'
import contexto from '../assets/editorial/contexto-v1.png'
import encontro from '../assets/editorial/encontro-v1.png'
import aparoLogo from '../assets/brand/aparo-logo.png'

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal'

function Button({ href, children, className = '', onClick }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      onClick={onClick}
      type={href ? undefined : 'button'}
      className={`action-button inline-flex h-14 shrink-0 items-center bg-ink px-6 text-base leading-6 font-medium whitespace-nowrap text-paper ${focusRing} ${className}`}
    >
      {children}
    </Tag>
  )
}

function Section({ id, bg, title, children }) {
  return (
    <section id={id} className={`${bg} px-6 py-18 md:px-24 md:py-28`}>
      <div className="mx-auto flex max-w-312 flex-col gap-10">
        <h2 className="font-display text-[40px] leading-11 font-medium tracking-[-0.03em] md:text-[64px] md:leading-18">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function Navigation() {
  const navRef = useRef(null)

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      navRef.current?.style.setProperty('--nav-progress', Math.min(1, Math.max(0, window.scrollY / 160)))
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav ref={navRef} aria-label="Navegação principal" className="site-navigation">
      <div className="navigation-inner">
        <a href="#inicio" className={`navigation-brand ${focusRing}`}>
          <img src={aparoLogo} alt="Aparo · início" width="560" height="187" />
        </a>
        <div className="navigation-links">
          <a href="#possibilidades" className={focusRing}>O que ele faz</a>
          <a href="#controle" className={focusRing}>Seu controle</a>
        </div>
        <Button href="#demo" className="navigation-cta">Experimentar</Button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header id="inicio" className="hero">
      <div className="hero-photography" aria-hidden="true">
        <img src={pausa} alt="" width="1024" height="1280" fetchPriority="high" />
        <img src={cotidiano} alt="" width="1122" height="1402" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-message">
          <p className="hero-eyebrow">SEU ASSISTENTE PESSOAL NO WHATSAPP</p>
          <h1>Mais vida.<br />Menos pendências.</h1>
          <p className="hero-description">O Aparo cuida dos próximos passos.<br />Você volta pro que importa.</p>
          <Button href="#demo" className="hero-main-cta">Experimente uma conversa</Button>
        </div>
        <a href="#sobre" className={`hero-discover ${focusRing}`}><span>Um pouco de apoio.<br />Muito mais espaço.</span><span aria-hidden="true">↓</span></a>
      </div>
    </header>
  )
}

const SCENARIOS = {
  Jantar: {
    request: 'Quero fazer um risoto de cogumelos para duas pessoas hoje. Separa os ingredientes que faltam.',
    preference: 'Já tenho arroz e azeite. Quero gastar até R$ 80.',
    steps: ['Calcular as quantidades para duas pessoas', 'Conferir o que você já tem', 'Montar uma cesta dentro do orçamento'],
    prepared: 'O jantar já tem caminho. Separei o que falta.',
    options: [{ title: 'Sua cesta · R$ 58,90', detail: 'Cogumelos, caldo de legumes, cebola, manteiga e parmesão. Arroz e azeite ficaram fora da lista. Entrega e disponibilidade precisam ser confirmadas antes da compra.' }],
    approval: 'Quer seguir com esta cesta e conferir a entrega?',
    done: 'Cesta aprovada nesta demonstração. O próximo passo seria confirmar a entrega e o pagamento.',
  },
  'E-mails': {
    request: 'Olha meus e-mails e prepara respostas para os que precisam de mim hoje.',
    preference: 'Prioriza clientes e o projeto novo. Quero revisar antes de enviar.',
    steps: ['Separar mensagens que pedem uma ação', 'Priorizar clientes e o projeto novo', 'Escrever respostas com o contexto das conversas'],
    prepared: 'Três e-mails pedem sua atenção. A primeira resposta está pronta.',
    options: [{ title: 'Para Marina · proposta do projeto', detail: 'Oi, Marina! Consigo te enviar a proposta revisada até quinta. Vou incluir o novo escopo que conversamos. Obrigado pelo retorno!' }],
    approval: 'Posso enviar esta resposta para Marina?',
    done: 'Resposta enviada nesta simulação. As outras duas ficam na fila para sua revisão.',
  },
  Rotina: {
    request: 'Me ajuda a voltar a treinar três vezes por semana, sem atropelar meu trabalho.',
    preference: 'Prefiro de manhã. Às terças começo a trabalhar mais cedo.',
    steps: ['Considerar seus horários de trabalho', 'Encontrar três manhãs possíveis', 'Preparar uma rotina que caiba na sua semana'],
    prepared: 'Segunda, quarta e sexta. Um começo possível, no seu ritmo.',
    options: [{ title: 'Seu plano · 7h às 7h40', detail: 'Três treinos de 40 minutos, com terça livre e tempo para se preparar antes do trabalho. Podemos ajustar os horários conforme sua semana mudar.' }],
    approval: 'Quer colocar esses blocos na sua agenda?',
    done: 'Rotina adicionada nesta demonstração. Você pode pedir ajustes na mesma conversa.',
  },
  Viagem: {
    request: 'Preciso ir a São Paulo na terça e chegar antes das 10h. Compara duas opções, sem reservar.',
    preference: 'Voo direto e bagagem de mão.',
    steps: ['Comparar horários de chegada', 'Separar voos diretos', 'Preparar as condições para sua revisão'],
    prepared: 'Duas opções chegam a tempo. Qual prefere revisar?',
    options: [
      { title: 'Opção A · 06:10 → 08:00 · R$ 640', detail: 'Voo direto. Bagagem de mão incluída. Sem mala despachada. Tarifa não reembolsável.' },
      { title: 'Opção B · 07:00 → 09:10 · R$ 720', detail: 'Voo direto. Bagagem de mão incluída. Sem mala despachada. Tarifa não reembolsável.' },
    ],
    approval: 'Posso seguir com esta reserva?',
    done: 'Reserva feita. A confirmação já está aqui na conversa.',
  },
  Candidatura: {
    request: 'Prepara minha candidatura para uma vaga de designer de produto. Quero revisar antes de enviar.',
    preference: 'Ana Lima · quatro anos em produtos B2B e pesquisa com usuários.',
    steps: ['Relacionar sua experiência à vaga', 'Organizar currículo e portfólio', 'Preparar uma apresentação para revisão'],
    prepared: 'Organizei os materiais e preparei uma apresentação para você revisar.',
    options: [{ title: 'Revisar candidatura · Ana Lima', detail: 'Olá! Sou Ana Lima, designer de produto com quatro anos de experiência em produtos B2B. Trabalho com pesquisa e desenho de soluções que simplificam a rotina das pessoas. Gostaria de conversar sobre como posso contribuir com o time. Anexos: currículo e portfólio.' }],
    approval: 'Você autoriza o envio desta apresentação e dos materiais para a vaga?',
    done: 'Candidatura enviada. Eu acompanho a resposta e te aviso por aqui.',
  },
  Agenda: {
    request: 'Encontra 30 minutos na segunda para eu conversar com a equipe. Preserva meu tempo de foco.',
    preference: 'Foco das 14h às 16h. Compromissos às 9h, 11h e 16h30.',
    steps: ['Conferir os compromissos', 'Preservar o bloco de foco', 'Separar um horário livre para sua aprovação'],
    prepared: 'Das 10h às 10h30 sua agenda está livre. Seu tempo de foco fica preservado.',
    options: [{ title: 'Revisar evento · segunda, 10h–10h30', detail: 'Conversa com a equipe · 30 minutos. Sem conflito com seus compromissos. Nenhum convite foi enviado.' }],
    approval: 'Posso criar este evento e enviar o convite à equipe?',
    done: 'Evento criado e convite enviado. Te aviso quando a equipe confirmar.',
  },
}

function Demo({ initialScenario = 'Viagem' }) {
  const [scenario, setScenario] = useState(initialScenario)
  const [stage, setStage] = useState(0)
  const [choice, setChoice] = useState(0)
  const threadRef = useRef(null)
  const s = SCENARIOS[scenario]
  const stages = ['Pedido', 'Preparado', 'Sua aprovação', 'Concluído']

  function goTo(nextStage) {
    setStage(nextStage)
    threadRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  function reset(name = scenario) {
    setScenario(name)
    setChoice(0)
    goTo(0)
  }

  return (
    <div className="demo-window">
      <div className="demo-topbar">
        <div className="demo-identity"><p>aparo</p><span>UMA CONVERSA NO WHATSAPP</span></div>
        <span className="demo-disclaimer">Demonstração interativa<br />Dados ilustrativos</span>
      </div>
      <div className="demo-scenarios" role="group" aria-label="Escolha uma situação">
        {Object.keys(SCENARIOS).map(name => (
          <button key={name} type="button" aria-pressed={name === scenario}
            onClick={() => { if (name !== scenario) reset(name) }}
            className={`demo-scenario ${focusRing}`}>
            {name}
          </button>
        ))}
      </div>
      <ol className="demo-progress" aria-label="Etapas da conversa">
        {stages.map((label, i) => <li key={label} aria-current={stage === i ? 'step' : undefined} data-complete={stage > i}>
          <span aria-hidden="true">{stage > i ? '✓' : `0${i + 1}`}</span><span>{label}</span>
        </li>)}
      </ol>
      <div className="demo-thread" ref={threadRef} tabIndex={0} role="region" aria-label="Conversa de exemplo">
        <div key={scenario} className="demo-request demo-reply"><span className="demo-speaker">Você</span><p>{s.request}</p><span className="demo-preference">{s.preference}</span></div>
        <div className="demo-response" aria-live="polite" aria-atomic="true">
          <span className="demo-speaker">aparo</span>
          <div key={`${scenario}-${stage}`} className="demo-reply demo-response-content">
            {stage === 0 && <>
              <h3>Pode deixar. Começo por aqui.</h3>
              <ol className="demo-task-list">{s.steps.map((step, i) => <li key={step}><span aria-hidden="true">0{i + 1}</span>{step}</li>)}</ol>
              <p className="demo-hint">Veja o que fica pronto antes de decidir.</p>
            </>}
            {stage === 1 && <>
              <h3>{s.prepared}</h3>
              {s.options.length === 1 ? (
                <div className="demo-summary"><strong>{s.options[0].title}</strong><p>{s.options[0].detail}</p></div>
              ) : <fieldset className="demo-options"><legend className="sr-only">Escolha o que deseja revisar</legend>
                {s.options.map((option, i) => <label key={option.title} className="demo-option">
                  <input type="radio" name="demo-choice" checked={choice === i} onChange={() => setChoice(i)} />
                  <span><strong>{option.title}</strong><span>{option.detail}</span></span>
                </label>)}
              </fieldset>}
            </>}
            {stage === 2 && <>
              <h3>{s.approval}</h3>
              <div className="demo-summary"><strong>{s.options[choice].title}</strong><p>{s.options[choice].detail}</p></div>
              <p className="demo-hint">Nada segue adiante sem o seu sim.</p>
            </>}
            {stage === 3 && <>
              <span className="demo-success" aria-hidden="true">✓</span><h3>Tudo certo por aqui.</h3><p>{s.done}</p>
              <p className="demo-hint">Você acompanha os próximos passos na mesma conversa.</p>
            </>}
          </div>
        </div>
      </div>
      <div className="demo-actions">
        <div className="demo-action-context"><span>{stage === 3 ? 'Pode voltar pro seu dia.' : 'Você acompanha. Você decide.'}</span><small>Esta conversa é uma simulação.</small></div>
        <div className="demo-action-buttons">
          <button type="button" disabled={stage === 0} className={`demo-back ${focusRing}`} onClick={() => goTo(stage - 1)}><span aria-hidden="true">←</span> Voltar</button>
          <button type="button" className={`demo-primary ${focusRing}`} onClick={() => stage === 3 ? reset() : goTo(stage + 1)}>
            {['Ver o que fica pronto', 'Revisar e continuar', 'Autorizar nesta demo', 'Experimentar de novo'][stage]}<span aria-hidden="true">{stage === 3 ? '↻' : '↗'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const PRINCIPLES = [
  ['Você escolhe o acesso.', 'O trabalho depende das integrações e permissões que você disponibilizar.'],
  ['Você autoriza as ações.', 'Enviar mensagens, enviar candidaturas e efetivar reservas exige sua autorização explícita.'],
  ['Você sabe onde está.', 'Acompanhe o que foi preparado, o que está em andamento e o que espera sua decisão.'],
]

const POSSIBILITIES = [
  { name: 'Jantar', category: '01 / VIDA PRÁTICA', title: 'Do “o que tem pra jantar?” ao que falta na geladeira.', request: '“Separa os ingredientes pra um risoto hoje?”', result: 'Receita escolhida. Lista resolvida.', art: 'recipe', words: ['arroz arbóreo', 'cogumelos', 'parmesão'], tone: 'peach' },
  { name: 'Candidatura', category: '02 / PRÓXIMO CAPÍTULO', title: 'Seu próximo trabalho começa antes da candidatura.', request: '“Procura vagas que tenham a ver comigo.”', result: 'Busca, materiais e acompanhamento.', art: 'career', words: ['seu próximo', 'capítulo.', 'currículo.pdf ↗'], tone: 'cream' },
  { name: 'E-mails', category: '03 / MENOS PENDÊNCIAS', title: 'Sua caixa de entrada pode andar sem ocupar seu dia.', request: '“O que precisa de resposta minha hoje?”', result: 'Prioridades claras. Respostas preparadas.', art: 'mail', words: ['RE: proposta do projeto', 'Resposta pronta para revisar', 'Pode deixar comigo.'], tone: 'blush' },
  { name: 'Rotina', category: '04 / TEMPO PRA VOCÊ', title: 'Uma rotina que cabe na vida que você já tem.', request: '“Encaixa três treinos na minha semana?”', result: 'Seus compromissos e você, na mesma conta.', art: 'routine', words: ['SEG', 'QUA', 'SEX'], tone: 'sage' },
]

function Possibilities({ onChoose }) {
  return (
    <section id="possibilidades" className="product-section">
      <div className="section-topline"><span>UM ASSISTENTE. MUITAS POSSIBILIDADES.</span><span>Feito para a vida acontecendo.</span></div>
      <div className="feature-heading"><h2>O que você tem<br />em aberto hoje?</h2><p>Das pequenas tarefas aos próximos grandes passos. Comece com o que está na sua cabeça.</p></div>
      <div className="product-grid">
        {POSSIBILITIES.map(item => <a href="#demo" onClick={() => onChoose(item.name)} className={`product-card ${focusRing}`} key={item.name}>
          <div className={`product-art art-${item.art} tone-${item.tone}`} aria-hidden="true">
            <span className="art-caption">aparo / {item.name.toLowerCase()}</span>
            <div className="art-object">{item.words.map((word, i) => <span key={word} style={{ '--i': i }}>{word}</span>)}</div>
            <span className="art-request">{item.request}</span><span className="art-arrow">↗</span>
          </div>
          <div className="product-info"><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><p>{item.result}</p><span className="product-link">Ver na conversa <span aria-hidden="true">↗</span></span></div>
        </a>)}
      </div>
      <p className="possibility-footnote">E também viagens, pesquisas, documentos, compromissos, presentes, planos…<br />A lista começa com você. As ações dependem dos acessos que você conectar.</p>
    </section>
  )
}

export default function App() {
  const [example, setExample] = useState('Viagem')
  return (
    <>
      <Navigation />
      <Hero />
      <main>
        <section id="sobre" className="about-product">
          <div className="about-label"><span className="eyebrow">CONHEÇA O APARO</span><img src={contexto} alt="Uma mulher lê um livro à mesa, com uma xícara de café na luz da tarde." width="1024" height="1280" className="about-photo" loading="lazy" /></div>
          <div><h2>Alguém por dentro.<br />Pra você ficar<br /><em>mais livre.</em></h2><div className="about-copy"><p>O Aparo é um assistente pessoal que entende o que você está fazendo, o que importa pra você e o que ainda precisa acontecer.</p><p>Ele pesquisa, organiza, prepara e acompanha. Da compra do jantar à próxima oportunidade de trabalho. Tudo em uma conversa, no WhatsApp que já está no seu telefone.</p></div><a href="#possibilidades" className={`editorial-link ${focusRing}`}>Conheça as possibilidades <span aria-hidden="true">↓</span></a></div>
        </section>
        <section className="getting-started" aria-labelledby="getting-started-title">
          <div className="getting-started-title"><span className="eyebrow">SIMPLES ASSIM</span><h2 id="getting-started-title">Comece com<br />“me ajuda com…”</h2></div>
          <ol className="getting-started-steps">
            <li><span className="step-number">01</span><h3>Conte do seu jeito.</h3><p>Uma tarefa, um plano ou aquela pendência. A conversa começa com você.</p></li>
            <li><span className="step-number">02</span><h3>Deixe ganhar caminho.</h3><p>O Aparo reúne o contexto, pesquisa e prepara os próximos passos.</p></li>
            <li><span className="step-number">03</span><h3>Decida e siga o dia.</h3><p>Você revisa o que ficou pronto e autoriza o que pode seguir.</p></li>
          </ol>
        </section>
        <Possibilities onChoose={setExample} />
        <section className="phone-story">
          <div className="phone-story-copy"><span className="eyebrow">JÁ ESTÁ ONDE VOCÊ ESTÁ</span><h2>Uma vida inteira.<br />Uma conversa<br /><em>só.</em></h2><p>Sem aprender outro aplicativo. Mande uma mensagem do seu jeito e continue o dia. Seu assistente conecta os pontos e volta com o próximo passo.</p><a href="#demo" className={`editorial-link ${focusRing}`}>Veja como funciona <span aria-hidden="true">↗</span></a></div>
          <div className="conversation-preview"><div className="conversation-header"><div><img src={aparoLogo} alt="Aparo" width="120" height="40" className="brand-logo" loading="lazy" /><small>Seu assistente pessoal</small></div><span aria-hidden="true">···</span></div><span className="conversation-date">UMA QUARTA-FEIRA QUALQUER</span><div className="chat-bubble outgoing">A semana apertou. Me ajuda a abrir espaço?<small>09:41 ✓✓</small></div><div className="chat-bubble incoming">Vamos por partes. Posso preparar as respostas dos e-mails e organizar o jantar de hoje.<small>09:41</small></div><div className="chat-bubble incoming">E o treino fica na sexta de manhã, como você prefere. Quer revisar o plano?<small>09:42</small></div><div className="conversation-note">Seu contexto vira próximo passo.</div><p className="preview-caption">Exemplo ilustrativo de conversa</p></div>
        </section>
        <Section bg="bg-paper" title={<>Ele lembra dos detalhes.<br />Você segue em frente.</>}>
          <div className="context-grid"><p className="text-lg leading-7">Seu jeito de trabalhar. Os horários que você protege. Aquela mudança de planos. Com o contexto que você compartilha, cada pedido começa um pouco mais adiante.</p><div className="context-note"><span className="eyebrow">MENOS REPETIR. MAIS CONTINUAR.</span><p>“Às terças, preciso buscar<br />minha filha às cinco.”</p><span className="context-divider" aria-hidden="true">↓</span><p>“Separei reuniões que terminam<br />antes das quatro e meia.”</p><span className="text-sm text-muted">O que importa pra você entra na conta.</span></div></div>
        </Section>
        <Section id="demo" bg="bg-cream" title={<>Peça uma coisa.<br />Veja o que acontece.</>}>
          <p className="text-lg leading-7">Escolha uma situação e percorra a conversa, do pedido à sua aprovação.</p>
          <Demo key={example} initialScenario={example} />
        </Section>
        <Section id="controle" bg="bg-paper" title={<>Ele toma a iniciativa.<br />Você tem a última palavra.</>}>
          <dl className="principles-grid">{PRINCIPLES.map(([term, desc], i) => <div key={term}><span className="eyebrow" aria-hidden="true">0{i + 1} / NO SEU CONTROLE</span><dt>{term}</dt><dd>{desc}</dd></div>)}</dl>
        </Section>
        <section className="faq-section" aria-labelledby="faq-title">
          <div><span className="eyebrow">ANTES DA PRIMEIRA MENSAGEM</span><h2 id="faq-title">Talvez você<br />esteja pensando.</h2><a href="#demo" className={`editorial-link ${focusRing}`}>Experimente uma conversa <span aria-hidden="true">↗</span></a></div>
          <div className="faq-list">
            <details><summary>Preciso aprender outro aplicativo?</summary><p>Você conversa pelo WhatsApp que já usa. Os pedidos, as revisões e os próximos passos ficam no mesmo lugar.</p></details>
            <details><summary>O que posso pedir ao Aparo?</summary><p>Comece com algo real do seu dia: organizar o jantar, preparar uma candidatura, revisar e-mails ou encontrar tempo na agenda. O que ele consegue executar depende dos serviços e acessos conectados.</p></details>
            <details><summary>Ele faz as coisas sem me perguntar?</summary><p>O Aparo pode pesquisar, organizar e preparar. Compras, reservas e envios passam pela sua aprovação antes de seguir.</p></details>
            <details><summary>Já posso testar com os meus dados?</summary><p>A conversa desta página é uma demonstração com dados ilustrativos. Você pode explorar os exemplos sem conectar contas ou enviar informações pessoais.</p></details>
          </div>
        </section>
        <section className="closing-story"><img loading="lazy" src={encontro} alt="Duas pessoas compartilham um café e uma conversa em uma mesa ao ar livre." /><div><span className="eyebrow">ABRA ESPAÇO PRO QUE IMPORTA</span><h2>Seu dia tem<br />mais coisas<br />que tarefas.</h2><p>Deixe os próximos passos com o Aparo.<br />E volte para o que só você pode viver.</p><Button href="#demo">Experimentar a conversa</Button><span className="closing-caption">No seu telefone. Do seu jeito.</span></div></section>
      </main>
      <footer className="site-footer"><a href="#" className={`footer-brand ${focusRing}`}><img src={aparoLogo} alt="Aparo" width="192" height="64" className="brand-logo" /></a><div><a href="#sobre">O assistente</a><a href="#possibilidades">Possibilidades</a><a href="#demo">Experimentar</a></div><span>© 2026 Aparo</span></footer>
    </>
  )
}

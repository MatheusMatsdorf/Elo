const ALL_SK=["Atendimento","Vendas","Excel","Logística","Cozinha","Informática básica","Programação","Design","Costura","Construção civil","Cuidador","Comunicação","Contabilidade","Idiomas","Motorista"];
const S={tab:"inicio",me:{nome:"Seu Nome",cidade:"Porto Alegre, RS",status:"Em busca",bio:"Em transição de carreira, aberto a novas oportunidades.",skills:["Atendimento","Informática básica","Comunicação"]},
applied:{},saved:{},mentor:{},enrolled:{},liked:{},
posts:[
{id:1,n:"Marina Souza",c:"Recife, PE",t:"Fiquei 14 meses desempregada. O que me ajudou foi aprender Excel por um curso gratuito e pedir mentoria aqui no Elo. Hoje trabalho em um escritório de contabilidade. Não desistam!",l:128,tag:"História de superação"},
{id:2,n:"Padaria Pão Quente",c:"Manaus, AM",t:"Estamos contratando 3 auxiliares de padaria. Aceitamos candidatos sem experiência, damos treinamento no primeiro mês.",l:42,tag:"Vaga aberta"},
{id:3,n:"Carlos Mendes",c:"São Paulo, SP",t:"Dica para entrevistas: conte uma história real em que você resolveu um problema. Vale mais do que listar qualidades.",l:77,tag:"Dica"}],
jobs:[
{id:1,t:"Auxiliar administrativo",e:"Contabilidade Alfa",c:"Porto Alegre, RS",m:"Presencial",exp:false,sk:["Excel","Informática básica","Comunicação"],s:"R$ 2.100"},
{id:2,t:"Atendente de loja",e:"Moda Sul",c:"Caxias do Sul, RS",m:"Presencial",exp:false,sk:["Atendimento","Vendas","Comunicação"],s:"R$ 1.800"},
{id:3,t:"Desenvolvedor júnior",e:"TechNorte",c:"Remoto",m:"Remoto",exp:true,sk:["Programação","Idiomas","Informática básica"],s:"R$ 4.500"},
{id:4,t:"Auxiliar de logística",e:"Rápido Log",c:"Curitiba, PR",m:"Presencial",exp:false,sk:["Logística","Informática básica"],s:"R$ 2.200"},
{id:5,t:"Designer gráfico",e:"Studio Cor",c:"Remoto",m:"Remoto",exp:true,sk:["Design","Comunicação"],s:"R$ 3.200"},
{id:6,t:"Cuidador de idosos",e:"Casa Serena",c:"Salvador, BA",m:"Presencial",exp:false,sk:["Cuidador","Comunicação"],s:"R$ 2.000"},
{id:7,t:"Ajudante de cozinha",e:"Restaurante Sabor",c:"Recife, PE",m:"Presencial",exp:false,sk:["Cozinha","Atendimento"],s:"R$ 1.700"}],
courses:[
{id:1,t:"Excel do zero ao intermediário",o:"Parceria Senac/SENAI",h:"20h",sk:"Excel"},
{id:2,t:"Informática básica",o:"Curso gratuito online",h:"12h",sk:"Informática básica"},
{id:3,t:"Atendimento ao cliente",o:"Sebrae",h:"8h",sk:"Atendimento"},
{id:4,t:"Lógica de programação",o:"Plataforma aberta",h:"30h",sk:"Programação"},
{id:5,t:"Como montar um currículo e se preparar para entrevistas",o:"Elo Academia",h:"3h",sk:"Comunicação"}],
mentors:[
{id:1,n:"Ana Ribeiro",r:"Analista de RH",a:"Currículo e entrevistas"},
{id:2,n:"Paulo Teixeira",r:"Gerente de logística",a:"Logística e operações"},
{id:3,n:"Júlia Campos",r:"Desenvolvedora sênior",a:"Tecnologia e transição de carreira"}],
reg:[["Norte",7.1],["Nordeste",8.4],["Sudeste",6.5],["Sul",4.3],["Centro-Oeste",5.2]],
age:[["14–17 anos",22],["18–24 anos",14],["25–39 anos",6.5],["40–59 anos",4],["60+ anos",2.8]]};
const KEY="elo_v1";
try{const d=JSON.parse(localStorage.getItem(KEY)||"null");if(d){["me","applied","saved","mentor","enrolled","liked"].forEach(k=>{if(d[k])S[k]=d[k]});if(Array.isArray(d.mine))S.posts=d.mine.concat(S.posts)}}catch(e){}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({me:S.me,applied:S.applied,saved:S.saved,mentor:S.mentor,enrolled:S.enrolled,liked:S.liked,mine:S.posts.filter(p=>p.mine)}))}catch(e){}}
function resetAll(){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}
const $=s=>document.querySelector(s);
const ini=n=>n.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("s");setTimeout(()=>t.classList.remove("s"),2200)}
function match(j){const h=j.sk.filter(k=>S.me.skills.includes(k)).length;return Math.round(h/j.sk.length*100)}
const tabs=[["inicio","Início"],["vagas","Vagas"],["salvas","Salvas"],["aprender","Capacitação"],["mentoria","Mentoria"],["painel","Painel"],["perfil","Perfil"],["sobre","Sobre"]];
function nav(){$("#nav").innerHTML=tabs.map(([k,l])=>`<button class="${S.tab==k?"on":""}" onclick="go('${k}')">${l}${k=="salvas"&&nsv()?" ("+nsv()+")":""}</button>`).join("")}
function go(t){S.focus=null;S.tab=t;render();window.scrollTo(0,0)}
function side(){const m=S.me;$("#side").innerHTML=`<div class="card"><div class="row"><div class="av">${ini(m.nome)}</div><div><h3>${m.nome}</h3><div class="mt">${m.cidade}</div></div></div>
<p style="margin:12px 0 6px"><span class="tag a">${m.status}</span></p>
<div class="mt">Habilidades: ${m.skills.length}</div>
<div class="mt" style="margin-top:6px">Candidaturas: ${Object.keys(S.applied).length} · Cursos: ${Object.keys(S.enrolled).length}</div>
<div style="margin-top:10px;border-top:1px solid var(--bd);padding-top:8px"><b style="font-size:13px">Vagas salvas (${nsv()})</b>${savedList().map(j=>`<div><a class="lk" onclick="openSaved(${j.id})">★ ${j.t}</a></div>`).join("")||'<div class="mt">Nenhuma ainda.</div>'}</div>
<button class="btn o" style="margin-top:12px;width:100%" onclick="go('perfil')">Editar perfil</button></div>
<div class="card"><h3>Por que o Elo?</h3><p class="mt" style="margin:6px 0 0">Aqui o seu valor está nas habilidades, não só no currículo. Conectamos quem busca trabalho a vagas, cursos e mentores.</p></div>`}
function inicio(){return `<div class="card"><textarea id="np" placeholder="Compartilhe uma dica, conquista ou vaga..."></textarea>
<div style="text-align:right;margin-top:8px"><button class="btn" onclick="post()">Publicar</button></div></div>`+
S.posts.map(p=>`<div class="card"><div class="row"><div class="av">${ini(p.n)}</div><div><h3>${p.n}</h3><div class="mt">${p.c}</div></div></div>
<p style="margin:12px 0 6px">${p.t}</p><span class="tag ${p.tag=="Vaga aberta"?"a":""}">${p.tag}</span>
<div class="acts"><button class="${S.liked[p.id]?"on":""}" onclick="like(${p.id})">👍 Apoiar (${p.l+(S.liked[p.id]?1:0)})</button><button onclick="toast('Compartilhado com sua rede')">↗ Compartilhar</button>${p.mine?(S.cd==p.id?`<button style="margin-left:auto;color:#d33;font-weight:600" onclick="delPost(${p.id})">Confirmar exclusão</button><button onclick="S.cd=null;render()">Cancelar</button>`:`<button style="margin-left:auto" onclick="S.cd=${p.id};render()">🗑 Excluir</button>`):""}</div></div>`).join("")}
function post(){const v=$("#np").value.trim();if(!v)return toast("Escreva algo primeiro");S.posts.unshift({id:Date.now(),n:S.me.nome,c:S.me.cidade,t:v.replace(/</g,"&lt;"),l:0,tag:"Publicação",mine:true});render()}
function like(i){S.liked[i]=!S.liked[i];render()}
function delPost(i){S.posts=S.posts.filter(p=>p.id!=i);S.cd=null;toast("Postagem excluída");render()}
function vagas(){const q=(S.q||"").toLowerCase(),md=S.md||"",ne=S.ne;
const list=S.jobs.filter(j=>(j.t+j.e+j.c).toLowerCase().includes(q)&&(!md||j.m==md)&&(!ne||!j.exp)).sort((a,b)=>match(b)-match(a));
return `<div class="card"><h2>Vagas para você</h2><div class="fl"><input placeholder="Buscar cargo, empresa ou cidade" value="${S.q||""}" oninput="S.q=this.value;vlist()">
<select onchange="S.md=this.value;vlist()"><option value="">Todas as modalidades</option><option ${md=="Remoto"?"selected":""}>Remoto</option><option ${md=="Presencial"?"selected":""}>Presencial</option></select></div>
<label class="mt"><input type="checkbox" style="width:auto" ${ne?"checked":""} onchange="S.ne=this.checked;vlist()"> Mostrar só vagas sem exigência de experiência</label>
<div class="note">Diferencial do Elo: ordenamos as vagas pela compatibilidade entre as suas habilidades e as da vaga.</div></div><div id="vl">${vcards(list)}</div>`}
function vcards(l){return l.length?l.map(j=>{const m=match(j),miss=j.sk.filter(k=>!S.me.skills.includes(k));return `<div class="card" id="j${j.id}" ${S.focus==j.id?'style="outline:2px solid var(--pr)"':''}><div class="row" style="justify-content:space-between;align-items:flex-start"><div><h3>${j.t}</h3><div class="mt">${j.e} · ${j.c} · ${j.m}</div></div><div class="match">${m}%</div></div>
<div class="bw" style="margin:8px 0"><i style="width:${m}%"></i></div>
<div>${j.sk.map(k=>`<span class="tag ${S.me.skills.includes(k)?"":"a"}">${k}</span>`).join("")}${j.exp?"":'<span class="tag">Sem experiência</span>'}</div>
<div class="mt" style="margin-top:6px">Salário: ${j.s}${miss.length?" · Falta desenvolver: "+miss.join(", "):" · Você tem todas as habilidades!"}</div>
<div class="acts"><button class="btn" ${S.applied[j.id]?"disabled":""} onclick="apply(${j.id})">${S.applied[j.id]?"Candidatura enviada ✓":"Candidatar-se"}</button>
<button class="btn o" onclick="sv(${j.id})">${S.saved[j.id]?"Salva ★":"Salvar ☆"}</button></div></div>`}).join(""):'<div class="card mt">Nenhuma vaga encontrada.</div>'}
function vlist(){const q=(S.q||"").toLowerCase();const l=S.jobs.filter(j=>(j.t+j.e+j.c).toLowerCase().includes(q)&&(!S.md||j.m==S.md)&&(!S.ne||!j.exp)).sort((a,b)=>match(b)-match(a));$("#vl").innerHTML=vcards(l)}
function apply(i){S.applied[i]=1;toast("Candidatura enviada!");render()}
function sv(i){S.saved[i]=!S.saved[i];toast(S.saved[i]?"Vaga salva! Veja em Salvas":"Vaga removida das salvas");render()}
function aprender(){return `<div class="card"><h2>Capacitação gratuita</h2><p class="mt" style="margin:0">Ao concluir um curso, a habilidade é adicionada ao seu perfil e melhora a compatibilidade com as vagas.</p></div>`+
S.courses.map(c=>`<div class="card"><h3>${c.t}</h3><div class="mt">${c.o} · ${c.h}</div><div style="margin:6px 0"><span class="tag">${c.sk}</span></div>
<button class="btn" ${S.enrolled[c.id]?"disabled":""} onclick="enroll(${c.id})">${S.enrolled[c.id]?"Concluído ✓":"Concluir curso (demo)"}</button></div>`).join("")}
function enroll(i){const c=S.courses.find(x=>x.id==i);S.enrolled[i]=1;if(!S.me.skills.includes(c.sk))S.me.skills.push(c.sk);toast("Habilidade adicionada: "+c.sk);render()}
function mentoria(){return `<div class="card"><h2>Mentoria solidária</h2><p class="mt" style="margin:0">Profissionais empregados dedicam algumas horas por mês para orientar quem está em busca de trabalho.</p></div>`+
S.mentors.map(m=>`<div class="card"><div class="row"><div class="av">${ini(m.n)}</div><div style="flex:1"><h3>${m.n}</h3><div class="mt">${m.r} · ${m.a}</div></div>
<button class="btn" ${S.mentor[m.id]?"disabled":""} onclick="mt(${m.id})">${S.mentor[m.id]?"Solicitada ✓":"Pedir mentoria"}</button></div></div>`).join("")+
`<div class="card"><h3>Quer ser mentor?</h3><p class="mt">Cadastre-se e ajude alguém a voltar ao mercado.</p><button class="btn o" onclick="toast('Cadastro de mentor recebido!')">Quero ajudar</button></div>`}
function mt(i){S.mentor[i]=1;toast("Pedido enviado ao mentor");render()}
function bars(d,u,mx){return d.map(([k,v])=>`<div style="margin:8px 0"><div class="row" style="justify-content:space-between"><span style="font-size:14px">${k}</span><b>${v}${u}</b></div><div class="bw"><i style="width:${v/mx*100}%"></i></div></div>`).join("")}
function painel(){return `<div class="card"><h2>Painel do desemprego no Brasil</h2>
<div class="stat"><div><b>5,6%</b><span class="mt">desocupação média em 2025, a menor da série (IBGE)</span></div><div><b>16,2%</b><span class="mt">subutilização em 2024, cerca de 19 milhões de pessoas</span></div><div><b>38,1%</b><span class="mt">informalidade em 2025 (39,0% em 2024)</span></div></div>
<p class="mt" style="margin:10px 0 0">A queda do desemprego não elimina a informalidade, a subutilização e as desigualdades de acesso ao trabalho.</p></div>
<div class="card"><h3>Taxa média anual de desocupação (%)</h3>${bars([["2021",13.2],["2022",9.3],["2024",6.6],["2025",5.6]],"%",15)}<div class="mt">Em 2020, o país chegou a 13,4 milhões de desocupados, a maior marca da série.</div></div>
<div class="card"><h3>Quem sofre mais: desocupação por grupo, 2º tri de 2022 (%)</h3>${bars([["Jovens de 18 a 24 anos",19.3],["Mulheres",11.6],["Pretos",11.3],["Pardos",10.8],["Média nacional",9.3],["Homens",7.5],["Brancos",7.3]],"%",20)}</div>
<div class="card"><h3>Empregados do setor privado com carteira assinada, 4º tri de 2024 (%)</h3>${bars([["Brasil",73.4],["Região Norte",60.3],["Região Nordeste",58.1]],"%",100)}<div class="mt">O Nordeste teve a maior desocupação regional: 8,6%, contra 6,2% da média nacional.</div></div>
<div class="card"><h3>Causas</h3><ol class="stp"><li><b>Estruturais:</b> descompasso entre a qualificação dos trabalhadores e as exigências do mercado</li><li><b>Conjunturais:</b> crises econômicas e políticas e choques como a pandemia</li><li>Globalização e automação, que pressionam as ocupações menos qualificadas</li><li>Má distribuição de renda e disparidades regionais</li><li>Pouco incentivo ao empreendedorismo e à inovação</li></ol></div>
<div class="card"><h3>Como o Elo responde</h3><ul class="stp"><li><b>Jovens e primeiro emprego:</b> filtro de vagas sem exigência de experiência</li><li><b>Descompasso de qualificação:</b> cursos ligados às habilidades que as vagas pedem</li><li><b>Desigualdade regional:</b> busca por cidade e vagas remotas</li><li><b>Exclusão e desalento:</b> mentoria e rede de apoio entre pessoas na mesma situação</li></ul><div class="mt">Fonte: artigo “O Desemprego no Brasil”, com dados do IBGE (PNAD Contínua).</div></div>`}
function sobre(){return `<div class="card"><h2>Sobre o projeto</h2><p>O <b>Elo</b> nasceu do artigo “O Desemprego no Brasil”, que analisa as causas históricas e estruturais do desemprego, seus impactos sociais e econômicos e as políticas públicas de enfrentamento.</p><p>A conclusão do artigo é que o desemprego exige uma abordagem ampla e de longo prazo. Entre as medidas, destacam-se a qualificação alinhada ao mercado, o incentivo ao primeiro emprego e à formalização e a atenção às desigualdades regionais e sociais. O Elo transforma essas ideias em funcionalidades.</p></div>
<div class="card"><h3>Metodologia do artigo</h3><p class="mt" style="margin:6px 0 0">Pesquisa qualitativa e bibliográfica, com relatórios do IBGE, IPEA, DIEESE e OIT, artigos acadêmicos e legislação. Recorte de 2012 a 2025 (PNAD Contínua).</p></div>
<div class="card"><h3>Políticas públicas citadas</h3><div><span class="tag">Seguro-desemprego</span><span class="tag">SINE</span><span class="tag">Lei da Aprendizagem</span><span class="tag">Pronatec</span><span class="tag">Economia solidária</span></div></div>
<div class="card"><h3>Por que o pleno emprego importa</h3><p class="mt" style="margin:6px 0 0">A busca do pleno emprego é um princípio da ordem econômica na Constituição Federal de 1988 (art. 170, inc. VIII). Para o artigo, é uma exigência ética, social e constitucional.</p></div>`}
function perfil(){const m=S.me;return `<div class="card"><h2>Meu perfil</h2>
<label class="mt">Nome</label><input value="${m.nome}" oninput="S.me.nome=this.value">
<label class="mt">Cidade</label><input value="${m.cidade}" oninput="S.me.cidade=this.value">
<label class="mt">Situação</label><select onchange="S.me.status=this.value;side()"><option ${m.status=="Em busca"?"selected":""}>Em busca</option><option ${m.status=="Empregado"?"selected":""}>Empregado</option><option ${m.status=="Mentor voluntário"?"selected":""}>Mentor voluntário</option></select>
<label class="mt">Sobre mim</label><textarea oninput="S.me.bio=this.value">${m.bio}</textarea>
<label class="mt">Habilidades (toque para marcar)</label><div class="sk">${ALL_SK.map(k=>`<button class="${m.skills.includes(k)?"on":""}" onclick="tk('${k}')">${k}</button>`).join("")}</div>
<button class="btn" style="margin-top:14px" onclick="persist();toast('Perfil salvo!');side()">Salvar</button><button class="btn o" style="margin:14px 0 0 8px" onclick="resetAll()">Limpar dados</button></div>
<div class="card"><h3>Vagas salvas</h3>${Object.keys(S.saved).filter(k=>S.saved[k]).map(k=>{const j=S.jobs.find(x=>x.id==k);return `<div><a class="lk" onclick="openSaved(${j.id})">★ ${j.t} – ${j.e}</a></div>`}).join("")||'<div class="mt">Nenhuma ainda.</div>'}</div>`}
function tk(k){const a=S.me.skills,i=a.indexOf(k);i<0?a.push(k):a.splice(i,1);render()}
function savedList(){return S.jobs.filter(j=>S.saved[j.id])}
function nsv(){return savedList().length}
function openSaved(id){S.focus=id;S.tab="salvas";render();window.scrollTo(0,0);setTimeout(()=>{const e=document.getElementById("j"+id);e&&e.scrollIntoView({block:"center",behavior:"smooth"})},60)}
function salvas(){const l=savedList().sort((a,b)=>match(b)-match(a));return `<div class="card"><h2>Vagas salvas (${l.length})</h2><p class="mt" style="margin:0">Suas vagas de interesse, ordenadas pela compatibilidade com as suas habilidades. Candidate-se ou remova da lista quando quiser.</p></div>`+(l.length?vcards(l):`<div class="card"><p class="mt">Você ainda não salvou nenhuma vaga. Toque em “Salvar ☆” em uma vaga para ela aparecer aqui.</p><button class="btn" onclick="go('vagas')">Ver vagas</button></div>`)}
function render(){persist();nav();side();$("#view").innerHTML={inicio,vagas,salvas,aprender,mentoria,painel,perfil,sobre}[S.tab]()}
render();

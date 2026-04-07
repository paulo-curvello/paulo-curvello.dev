export interface TimelineItem {
  id: string;
  num: string;
  rolePt: string;
  roleEn: string;
  company: string;
  date: string;
  descPt: string;
  descEn: string;
}

export const timeline: TimelineItem[] = [
  {
    id: "01",
    num: "01",
    rolePt: "Desenvolvedor Júnior",
    roleEn: "Junior Developer",
    company: "Morning Star Consulting",
    date: "Nov 2018",
    descPt:
      "Onde tudo começou. Entrei na Morning Star e mergulhei no desenvolvimento .NET — corrigindo bugs, aprendendo a base de código e construindo uma fundação sólida em engenharia backend.",
    descEn:
      "Where it all started. Joined Morning Star and dived into .NET development — fixing bugs, learning the codebase and building a solid foundation in backend engineering.",
  },
  {
    id: "02",
    num: "02",
    rolePt: "Desenvolvedor Pleno",
    roleEn: "Mid-level Developer",
    company: "Morning Star Consulting",
    date: "Jun 2021",
    descPt:
      "Conquistei a promoção após mais de 2 anos de entregas consistentes. Passei a ser dono de funcionalidades do início ao fim, projetando APIs RESTful e introduzindo Clean Architecture em codebases legados.",
    descEn:
      "Earned the promotion after 2+ years of consistent delivery. Started owning features end-to-end, designing RESTful APIs and introducing Clean Architecture into legacy codebases.",
  },
  {
    id: "03",
    num: "03",
    rolePt: "Fundador",
    roleEn: "Founder",
    company: "Ulequi Digital Solutions",
    date: "Jan 2022",
    descPt:
      "Comecei um projeto paralelo — uma agência digital entregando soluções em WordPress e React/.NET. Assumi todos os papéis: desenvolvedor, designer, gerente e vendedor. Entreguei para mais de 150 clientes.",
    descEn:
      "Started a side project — a digital agency delivering WordPress and React/.NET solutions. Took on every role: developer, designer, manager and salesperson. Delivered for 150+ clients.",
  },
  {
    id: "04",
    num: "04",
    rolePt: "Desenvolvedor Sênior",
    roleEn: "Senior Developer",
    company: "Morning Star Consulting",
    date: "Dez 2023",
    descPt:
      "O título pelo qual trabalhei. Hoje projeto sistemas distribuídos na AWS, oriento juniores e conduzo decisões de arquitetura. A mesma curiosidade de sempre, só com mais superfície.",
    descEn:
      "The title I worked toward. Today I design distributed systems on AWS, mentor juniors and drive architecture decisions. Same curiosity as always, just with more surface area.",
  },
];

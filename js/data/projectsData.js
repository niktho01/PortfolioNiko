import Project from '../models/Project.js';

export const projectsData = [
  new Project({
    id: 'digitaltryghed',
    name: 'Digital Tryghed',
    url: 'https://niktho01.github.io/Digitaltryghed/',
    desc: 'En cybersikkerhedsplatform der gør digital sikkerhed enkelt og tilgængeligt for alle. Bygget med fokus på UX og interaktiv læring.',
    tech: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Inter Font'],
    grad: ['#4f6ef7', '#8b5cf6'],
    image: 'images/shield.png'
  }),
  new Project({
    id: 'danitrading',
    name: 'Dani Trading A/S',
    url: 'https://niktho01.github.io/DanitradingdkAS/',
    desc: 'B2B webshop og firmapræsentation for Dani Trading A/S med 10.000+ varenumre, SEO og bæredygtighedsfokus.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Responsivt Design'],
    grad: ['#f97316', '#eab308'],
    image: 'images/DT_logo_transparent.png'
  }),
  new Project({
    id: 'groentildaglig',
    name: 'Grøn Til Daglig',
    url: 'https://niktho01.github.io/Groentildaglig/',
    desc: 'Bæredygtig livsstilsguide med tips om madspild, genbrug og grønne hverdagsvaner. Stærkt WCAG-fokus og semantisk HTML.',
    tech: ['HTML', 'CSS', 'WCAG', 'ARIA', 'Semantisk HTML'],
    grad: ['#22c55e', '#14b8a6'],
    image: 'images/Groentildagliglogo.png'
  }),
  new Project({
    id: 'kystnaer',
    name: 'Kystnær',
    url: 'https://niktho01.github.io/Kystnaer/',
    desc: 'E-commerce site for håndlavet dansk kyst-sæbe og shampoo med hero-video, topbar slider og avanceret mobilmenu.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Video', 'E-commerce UX'],
    grad: ['#14b8a6', '#4f6ef7'],
    image: 'images/logokyst_circle.jpg'
  })
];



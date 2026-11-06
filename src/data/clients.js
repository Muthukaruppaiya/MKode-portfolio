import h2rLogo from '../assets/clients/h2r-sports.png'
import jagathaLogo from '../assets/clients/jagatha-organics.svg'
import vasrithaLogo from '../assets/clients/vasritha.png'
import h2rShot from '../assets/shots/h2r-sports.jpg'
import jagathaShot from '../assets/shots/jagatha-organics.jpg'

export const clients = [
  {
    name: 'H2R Sports',
    domain: 'h2rsports.in',
    url: 'https://h2rsports.in/',
    logo: h2rLogo,
    shot: h2rShot,
    logoBg: '#ffffff',
    place: 'Tamil Nadu',
    route: 'Tamil Nadu → all of India',
    trade: 'Cricket bats',
    category: 'Online Shop',
    desc: 'A cricket bat store that ships across India. Hard tennis, soft tennis, and willow bats, paid by UPI or card, delivered free.',
    tags: ['Online store', 'UPI & cards', 'Pan-India shipping'],
    sky: 'linear-gradient(180deg, #dbe3f0 0%, #eef2f7 100%)',
  },
  {
    name: 'Jagatha Organics',
    domain: 'jagathaorganics.com',
    url: 'https://jagathaorganics.com/',
    logo: jagathaLogo,
    shot: jagathaShot,
    logoBg: '#1f3d32',
    place: 'Pallikaranai, Chennai',
    route: 'Chennai kitchen → your door',
    trade: 'Healthy snacks',
    category: 'Online Shop',
    desc: 'Millet laddus, protein bars, and health mixes from a Chennai kitchen, with a no-sugar range. Shoppers browse, add to cart, and track the order.',
    tags: ['Product catalog', 'Order tracking', 'WhatsApp'],
    sky: 'linear-gradient(180deg, #efe6cf 0%, #f4f1e6 100%)',
  },
  {
    name: 'Vasritha',
    domain: 'vasritha.com',
    url: 'https://vasritha.com/',
    logo: vasrithaLogo,
    logoBg: '#1a0c03',
    place: 'India',
    route: 'Loom and workshop → wardrobe',
    trade: 'Sarees & jewelry',
    category: 'Online Shop',
    desc: 'A storefront for sarees, jewelry, apparel, and handcrafted pieces. “Timeless elegance” in warm bronze and gold.',
    tags: ['Fashion store', 'Brand look', 'Product pages'],
    sky: 'linear-gradient(180deg, #f1e2cf 0%, #f6efe6 100%)',
  },
]

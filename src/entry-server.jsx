import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './AppRoutes'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BillingSoftwarePage from './pages/BillingSoftwarePage'
import EcommerceSoftwarePage from './pages/EcommerceSoftwarePage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'

export { PAGE_META, SITE_URL, canonicalUrl } from './data/pageMeta'

const pages = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/billing-software': BillingSoftwarePage,
  '/ecommerce-software': EcommerceSoftwarePage,
  '/portfolio': PortfolioPage,
  '/contact': ContactPage,
}

/** Build-time only: render one route to static HTML for crawlers. */
export function render(url) {
  return renderToString(
    <ThemeProvider>
      <StaticRouter location={url}>
        <AppRoutes pages={pages} />
      </StaticRouter>
    </ThemeProvider>,
  )
}

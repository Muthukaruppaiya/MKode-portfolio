import { MdCheck } from 'react-icons/md'
import Reveal from './Reveal'
import { COMPANY, formatUsd } from '../data/siteContent'
import './ProductPlans.css'

export default function ProductPlans({ title, plans, highlights = [], mockLabel = 'Product preview' }) {
  return (
    <section className="product-plans">
      <div className="container">
        {highlights.length > 0 && (
          <Reveal className="product-highlights">
            {highlights.map((item) => (
              <div key={item.title} className="product-highlight glass-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>
        )}

        <Reveal className="product-mock glass-card" aria-label={mockLabel}>
          <div className="product-mock__chrome">
            <span /><span /><span />
            <em>{mockLabel}</em>
          </div>
          <div className="product-mock__body">
            <aside>
              <b />
              <i /><i /><i /><i />
            </aside>
            <div className="product-mock__main">
              <header><b /><i /><i /></header>
              <div className="product-mock__grid">
                <div /><div /><div /><div />
              </div>
              <div className="product-mock__table">
                <span /><span /><span />
                <span /><span /><span />
              </div>
            </div>
          </div>
          <p className="product-mock__note">UI mockup — replace with real screenshots when ready.</p>
        </Reveal>

        <Reveal className="center product-plans__intro">
          <p className="kicker">Pricing</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">
            Prices shown in USD as starting points. Final quote depends on scope. GST, UPI and multi-currency payment options available where needed.
          </p>
        </Reveal>

        <div className="plan-grid">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              className={`plan-card glass-card ${plan.featured ? 'is-featured' : ''}`}
              delay={i * 0.05}
            >
              {plan.featured && <span className="plan-card__badge">Most chosen</span>}
              <h3>{plan.name}</h3>
              <p className="plan-card__blurb">{plan.blurb}</p>
              <p className="plan-card__price">
                {plan.price == null ? (
                  <strong>Custom</strong>
                ) : (
                  <>
                    <span>From</span>
                    <strong>{formatUsd(plan.price)}</strong>
                  </>
                )}
              </p>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}><MdCheck size={16} /> {f}</li>
                ))}
              </ul>
              <a href={COMPANY.quote} target="_blank" rel="noreferrer" className="btn-primary">
                Request a demo
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

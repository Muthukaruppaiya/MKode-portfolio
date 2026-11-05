import { useRef } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

export default function SlideRow({ children, label = 'Scroll sideways' }) {
  const ref = useRef(null)

  const move = (direction) => {
    const el = ref.current
    if (!el) return
    const card = el.firstElementChild
    const width = card ? card.getBoundingClientRect().width + 18 : el.clientWidth * 0.8
    el.scrollBy({ left: direction * width, behavior: 'smooth' })
  }

  return (
    <div className="slide-row">
      <div className="slide-row__bar">
        <p className="slide-row__hint">{label}</p>
        <div className="slide-row__nav">
          <button type="button" aria-label="Previous" onClick={() => move(-1)}>
            <MdChevronLeft size={22} />
          </button>
          <button type="button" aria-label="Next" onClick={() => move(1)}>
            <MdChevronRight size={22} />
          </button>
        </div>
      </div>
      <div className="h-slides" ref={ref}>{children}</div>
    </div>
  )
}

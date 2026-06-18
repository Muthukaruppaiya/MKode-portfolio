import { useEffect, useRef } from 'react'
import { Link } from 'react-scroll'
import { MdRocketLaunch, MdArrowDownward } from 'react-icons/md'
import { HiCode } from 'react-icons/hi'
import logo from '../assets/gypsy-coder-logo.png'
import './Hero.css'

import * as THREE from 'three'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 400

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Main Group for parallax
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Globe/Sphere Wireframe Network
    const geometry = new THREE.IcosahedronGeometry(130, 2)
    
    // Deform geometry slightly for organic/premium digital look
    const positionAttribute = geometry.getAttribute('position')
    const vertex = new THREE.Vector3()
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)
      // Subtle organic deformation
      vertex.multiplyScalar(1 + (Math.sin(i * 0.5) * 0.08))
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    geometry.computeVertexNormals()

    // Wireframe lines
    const wireframeGeom = new THREE.WireframeGeometry(geometry)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    })
    const network = new THREE.LineSegments(wireframeGeom, lineMat)
    mainGroup.add(network)

    // Node points
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
    const networkPoints = new THREE.Points(geometry, pointsMat)
    mainGroup.add(networkPoints)

    // 2. Deep Space Starfield
    const starsCount = 500
    const starsGeom = new THREE.BufferGeometry()
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)

    const colorGold = new THREE.Color(0xD4AF37)
    const colorSilver = new THREE.Color(0xd7e2ea)

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200

      const mixedColor = Math.random() > 0.4 ? colorSilver : colorGold
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    starsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starsMat = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    })
    const starField = new THREE.Points(starsGeom, starsMat)
    mainGroup.add(starField)

    // 3. Orbiting Planetary Rings (3D Particle Rings)
    const ringsGroup = new THREE.Group()
    ringsGroup.rotation.x = Math.PI / 3 // Tilt the ring
    ringsGroup.rotation.y = Math.PI / 6
    mainGroup.add(ringsGroup)

    const ringCount = 200
    const ringGeom = new THREE.BufferGeometry()
    const ringPositions = new Float32Array(ringCount * 3)
    const ringColors = new Float32Array(ringCount * 3)

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      const radius = 175 + Math.random() * 30 // Distance from center
      
      ringPositions[i * 3] = Math.cos(angle) * radius
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 12 // Thickness
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius

      // Make ring particles golden and cyan/silver
      const isGold = Math.random() > 0.5
      ringColors[i * 3] = isGold ? 0.83 : 0.0  // R
      ringColors[i * 3 + 1] = isGold ? 0.68 : 0.7  // G
      ringColors[i * 3 + 2] = isGold ? 0.21 : 0.85  // B
    }

    ringGeom.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3))
    ringGeom.setAttribute('color', new THREE.BufferAttribute(ringColors, 3))

    const ringMat = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    })
    const ringParticles = new THREE.Points(ringGeom, ringMat)
    ringsGroup.add(ringParticles)

    // Interactions
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.04
      mouseY = (event.clientY - window.innerHeight / 2) * 0.04
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Loop
    let animId
    const tick = () => {
      // Subtle continuous rotations
      network.rotation.y += 0.0015
      network.rotation.x += 0.0008
      networkPoints.rotation.y += 0.0015
      networkPoints.rotation.x += 0.0008
      starField.rotation.y -= 0.0003
      ringsGroup.rotation.z += 0.004

      // Parallax hover smoothing
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      mainGroup.rotation.y = targetX * 0.003
      mainGroup.rotation.x = targetY * 0.003

      renderer.render(scene, camera)
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      wireframeGeom.dispose()
      lineMat.dispose()
      pointsMat.dispose()
      starsGeom.dispose()
      starsMat.dispose()
      ringGeom.dispose()
      ringMat.dispose()
    }
  }, [])

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '30+', label: 'Happy Clients' },
    { value: '3+', label: 'Years Experience' },
    { value: '99%', label: 'Satisfaction Rate' },
  ]

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Gradient Orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="container hero__content">
        {/* Badge */}
        <div className="hero__badge">
          <HiCode size={14} />
          <span>Premium Software Development Studio</span>
        </div>

        {/* Logo */}
        <div className="hero__logo-wrap">
          <img src={logo} alt="Gypsy Coder" className="hero__logo" />
        </div>

        {/* Heading */}
        <h1 className="hero__title">
          We Build <span className="text-gradient-silver">Digital</span><br />
          Experiences That <span className="text-gradient">Convert</span>
        </h1>

        <p className="hero__subtitle">
          From stunning landing pages to powerful billing & shopping software —
          Gypsy Coder delivers premium, scalable solutions for businesses that demand excellence.
        </p>

        {/* CTAs */}
        <div className="hero__ctas">
          <Link to="services" smooth={true} offset={-80} duration={600} className="btn-primary hero__cta-main">
            <MdRocketLaunch size={18} />
            Explore Services
          </Link>
          <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-outline">
            Start a Project →
          </Link>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Creative</span>
            <span className="hero__stat-label">Unique Designs</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Modern</span>
            <span className="hero__stat-label">Latest Tech Stack</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Quality</span>
            <span className="hero__stat-label">Clean Coding</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Secure</span>
            <span className="hero__stat-label">Protected Sites</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Link to="services" smooth={true} offset={-80} duration={600} className="hero__scroll">
        <MdArrowDownward size={18} />
      </Link>
    </section>
  )
}

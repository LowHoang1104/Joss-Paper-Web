import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import Reveal from '../components/Reveal.jsx'
import { products } from '../data/siteData.js'
import modelUrl from '../assets/model.glb?url'

function ProductModel({ url }) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(), [scene])

  return (
    <Center>
      <primitive object={model} />
    </Center>
  )
}

useGLTF.preload(modelUrl)

function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState(null)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProduct(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openViewer = (product) => {
    setActiveProduct(product)
  }

  const closeViewer = () => {
    setActiveProduct(null)
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Sản phẩm ✦</span>
          <h1 className="page-hero-title">
            Danh Mục <em>Vàng Mã</em>
          </h1>
          <p className="page-hero-copy">
            Toàn bộ vật phẩm được đặt vào một route riêng, giúp bạn xem như một catalog
            độc lập thay vì phải cuộn từ đầu trang xuống dưới mới tới phần sản phẩm.
          </p>
          <div className="page-hero-meta">
            <span className="page-chip">4 nhóm vật phẩm</span>
            <span className="page-chip">Tư vấn theo dịp lễ</span>
            <span className="page-chip">Giao hàng toàn quốc</span>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">✦ Chọn nhanh ✦</span>
            <h2 className="section-title">
              Bộ Sưu Tập <em>Tâm Thành</em>
            </h2>
          </Reveal>

          <div className="products-grid">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 0.1}>
                <article className="product-card">
                  <div className={`card-img ${product.imageClass}`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-product-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="card-img-inner">{product.icon}</div>
                    )}
                    {product.badge ? <span className="card-badge">{product.badge}</span> : null}
                  </div>
                  <div className="card-body">
                    <p className="card-cat">{product.category}</p>
                    <h3 className="card-name">{product.name}</h3>
                    <p className="card-desc">{product.description}</p>
                    <div className="card-footer">
                      <div className="card-price">
                        {product.price} <span>{product.unit}</span>
                      </div>
                      <button
                        type="button"
                        className="card-btn"
                        onClick={() => openViewer(product)}
                      >
                        Xem mô hình 3D
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {activeProduct ? (
        <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-label="Xem mô hình 3D">
          <div className="viewer-panel">
            <button type="button" className="viewer-close" onClick={closeViewer}>
              Đóng
            </button>

            <div
              className="viewer-stage"
            >
              <Canvas className={`viewer-canvas ${activeProduct.imageClass}`} camera={{ position: [0, 1.1, 5.2], fov: 46 }}>
                <fog attach="fog" args={['#0f0604', 4.5, 10]} />
                <ambientLight intensity={1.1} />
                <hemisphereLight intensity={0.65} groundColor="#2a1209" />
                <directionalLight position={[4, 6, 3]} intensity={1.1} color="#ffe9b5" />
                <directionalLight position={[-3, 2, -3]} intensity={0.45} color="#c9972b" />

                <Suspense fallback={null}>
                  <Bounds fit clip observe margin={1.35}>
                    <ProductModel url={activeProduct.modelUrl || modelUrl} />
                  </Bounds>
                  <Environment preset="sunset" />
                </Suspense>

                <OrbitControls
                  enablePan={false}
                  minDistance={3.6}
                  maxDistance={14}
                  minPolarAngle={Math.PI / 4.2}
                  maxPolarAngle={Math.PI / 1.9}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Canvas>
            </div>

            <div className="viewer-meta">
              <p className="card-cat">{activeProduct.category}</p>
              <h3 className="card-name">{activeProduct.name}</h3>
              <p className="card-desc">Kéo để xoay mô hình 3D và xem vật phẩm theo nhiều góc.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductsPage
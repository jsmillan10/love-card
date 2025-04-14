import './index.scss'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const handleToggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleShowDialog = () => {
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  return (
    <>
      <div className="header">
        <h1 className="title">Nuevo mensaje para Chiara</h1>
        <button className="open-button" onClick={handleToggleOpen}>
          {isOpen ? 'Ciérrame y ámame' : 'Abrir'}
        </button>
      </div>

      <div
        id="email"
        className={isOpen ? 'open' : ''}
        onClick={isOpen ? handleShowDialog : undefined}
      >
        <div className="body">
          <div className="body__border"></div>
          <div className="body__layers">
            <div className="body__layer-1"></div>
            <div className="body__layer-2"></div>
          </div>
          <div className="body__shadow"></div>
        </div>

        <div className="inner">
          <div className="inner__inside">
            <div className="inner__background"></div>
            <div className="inner__content">
              <div className="preview-card">
                <p className="texto-preview">
                  Amorcito felices 2 meses ❤️
                  <br />
                  Estoy muy feliz de tenerte en mi vida, agradezco mucho ese 14
                  de Febrero que decidí pedirte que iniciaras una relación
                  conmigo porque desde ese día he sido muy muy feliz contigo!
                  <br />
                  <br />
                  Si quieres seguir leyendo haz click en la carta linda
                  <br />
                  <br />
                  <span className="texto-preview-heart">❤️❤️❤️</span>
                </p>
              </div>
            </div>
            <div className="inner__shadow"></div>
          </div>
        </div>

        <div className="top">
          <div className="top__flap">
            <div className="top__inset"></div>
          </div>
        </div>
      </div>

      {showDialog && (
        <div className="notebook-dialog-overlay" onClick={handleCloseDialog}>
          <div className="notebook-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="notebook-paper">
              <div className="notebook-content">
                <p>
                  Amorcito felices 2 meses ❤️
                  <span className="custom-break"></span>
                  Estoy muy feliz de tenerte en mi vida, agradezco mucho ese 14
                  de Febrero que decidí pedirte que iniciaras una relación
                  conmigo porque desde ese día he sido muy muy feliz contigo! 😁
                  <span className="custom-break"></span>
                  Eres una personita increíble, con muchísimas cualidades,
                  capacidades y demasiado amor en tu corazón, y yo soy demasiado
                  afortunado de tenerte y recibir todo ese amor de ti 🥰
                  <span className="custom-break"></span>
                  Yo a ti te amo con todo mi corazón mi vida y amo cada parte de
                  ti, tu forma de ser conmigo me llena el corazón y me hace
                  sentir feliz y tranquilo, y yo solo quiero que tú te sientas
                  igual todo el tiempo así que de mi parte seguiré dándolo todo
                  por ti para que construyamos un futuro juntitos 👩🏼‍🤝‍👨🏽👩🏼‍❤️‍💋‍👨🏽
                  <span className="custom-break"></span>
                  Te amo niña linda ❤️
                  <span className="custom-break"></span>
                  Att: tu ingeniero (lindo) 👨🏽‍💻
                  <span className="custom-break"></span>
                  Pdt: me hubiera encantado hacer una carta física, pero opté
                  por hacerla digital para que la tengas contigo todo el tiempo
                  ☺️
                </p>
              </div>
            </div>
            <button className="close-dialog" onClick={handleCloseDialog}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App

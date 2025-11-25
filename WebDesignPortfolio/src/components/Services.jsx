import { useLanguage } from '../context/LanguageContext'
import './Services.css'

const Services = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  const services = [
    {
      icon: 'fas fa-code',
      title: language === 'pt' ? 'Desenvolvimento Frontend' : 'Frontend Development',
      description: language === 'pt' 
        ? 'Criação de interfaces modernas e responsivas utilizando React.js, HTML5, CSS3 e JavaScript. Foco na experiência do usuário e design intuitivo com performance otimizada.'
        : 'Creation of modern and responsive interfaces using React.js, HTML5, CSS3 and JavaScript. Focus on user experience and intuitive design with optimized performance.'
    },
    {
      icon: 'fas fa-server',
      title: language === 'pt' ? 'Desenvolvimento Backend' : 'Backend Development',
      description: language === 'pt'
        ? 'Desenvolvimento de APIs robustas e escaláveis com Node.js e Python. Implementação de bancos de dados, autenticação e integração de serviços externos.'
        : 'Development of robust and scalable APIs with Node.js and Python. Implementation of databases, authentication and integration of external services.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: language === 'pt' ? 'Aplicações Full Stack' : 'Full Stack Applications',
      description: language === 'pt'
        ? 'Desenvolvimento completo de aplicações web, desde o frontend até o backend, incluindo deploy e manutenção. Soluções personalizadas para diferentes necessidades de negócio.'
        : 'Complete development of web applications, from frontend to backend, including deployment and maintenance. Customized solutions for different business needs.'
    }
  ]

  return (
    <section className="services" id="services">
      <div className="max-width">
        <h2 className="title">{t.services.title}</h2>
        <div className="serv-content">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="box">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services


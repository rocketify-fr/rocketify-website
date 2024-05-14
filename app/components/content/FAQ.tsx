import clsx from 'clsx'

import Container from '../Container'
import Separator from '../Separator'

const FAQ = ({ title, description, faqItems }) => (
  <>
    <Container className='flex flex-col gap-8'>
      <h2 className='text-3xl sm:text-[56px]'>{title}</h2>
      <p className='text-paragraph'>{description}</p>
    </Container>
    <Container>
      <Separator></Separator>
      <div className='flex flex-col'>
        {faqItems.map((item, i) => (
          <>
            <div className='flex flex-col gap-6 sm:flex-row'>
              <h4 className='text-lg sm:flex-[2] sm:text-[26px]'>
                {item.title}
              </h4>
              <p className='text-sm sm:flex-[3] sm:pl-12 lg:text-paragraph'>
                {item.description}
              </p>
            </div>
            {i + 1 < faqItems.length && <Separator></Separator>}
          </>
        ))}
      </div>
    </Container>
  </>
)

export default FAQ

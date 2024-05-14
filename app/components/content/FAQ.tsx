import clsx from 'clsx'

import Container from '../Container'
import Separator from '../Separator'

const FAQ = ({ title, description, faqItems }) => (
  <Container className='flex flex-col'>
    <h2 className='text-[56px]'>{title}</h2>
    <p className='text-paragraph'>{description}</p>

    <Separator></Separator>
    <div className='flex  flex-col'>
      {faqItems.map((item, i) => (
        <>
          <div className='flex'>
            <h4 className='flex-[2] text-[26px]'>{item.title}</h4>
            <p className='flex-[3] text-paragraph sm:pl-12'>
              {item.description}
            </p>
          </div>
          {i + 1 < faqItems.length && <Separator></Separator>}
        </>
      ))}
    </div>
  </Container>
)

export default FAQ

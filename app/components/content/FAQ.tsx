import clsx from 'clsx'

import Container from '../Container'
import Separator from '../Separator'

const FAQ = ({ title, description, faqItems }) => (
  <Container className="flex flex-col">
    <h2 className='text-[56px]'>{title}</h2>
    <p className='text-paragraph' >{description}</p>

    <Separator></Separator>
    <div className='flex  flex-col'>
      {faqItems.map((item, i) => (
        <>
          <div className="flex">
            <h4 className='text-3xl flex-[2]'>{item.title}</h4>
            <p className="text-paragraph flex-[3]">{item.description}</p>
          </div>
          {i + 1 < faqItems.length && (
            <Separator></Separator>
          )}
        </>

      ))}
    </div>
  </Container>
)

export default FAQ











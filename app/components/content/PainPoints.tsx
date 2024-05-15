import { getColor } from '~/utils/colors'

import Container from '../Container'
import RocketIcon from '../icons/Rocket'

const PainPoints = ({ title, colorName, painPoints }) => {
  return (
    <Container>
      <div className='flex flex-col sm:flex-row'>
        <h2 className='py-4 text-2xl sm:flex-[1] sm:text-[56px]'>{title}</h2>
        <div className='flex flex-col gap-8 py-8 sm:flex-[2]'>
          {painPoints.map((point, i) => (
            <div
              className='flex items-start justify-start gap-8 sm:items-center'
              key={i}
            >
              <RocketIcon color={getColor(colorName)} width={48} height={38} />
              <p className='flex-1'>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default PainPoints

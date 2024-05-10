import Container from '../Container'

const PainPoints = ({ title, colorName, painPoints }) => {
  return (
    <Container>
      <div className='flex'>
        <h2 className='flex-[1] text-[56px]'>{title}</h2>
        <div className='flex flex-[2] flex-col gap-8'>
          {painPoints.map((point) => (
            <div className='flex items-center gap-8'>
              <img
                src='/img/rocket.svg'
                alt='bullet'
                className={`fill-${colorName}`}
              />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default PainPoints

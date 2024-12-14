export const Share = ({ url }) => {
  return (
    <div className='flex gap-x-2'>
      {['link', 'linkedin', 'twitter', 'facebook'].map((name) => (
        <div
          key={name}
          title={name}
          className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'
        >
          <img src={`/img/share-${name}.svg`} alt='' />
        </div>
      ))}
    </div>
  )
}

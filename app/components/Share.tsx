export const Share = ({ url }) => {
  return (
    <div className='flex gap-x-2'>
      {['link', 'linkedin', 'x', 'facebook'].map((name) => (
        <div
          key={name}
          title={name}
          className='flex size-[64px] items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'
        >
          {name[0]}
        </div>
      ))}
    </div>
  )
}

import { Tags } from './Tags'

export const PreHeader = ({ tags, estimatedReadingTime }) => {
  return (
    <div className='flex items-center space-x-4'>
      <Tags tags={tags}></Tags>
      <p className='text-xs font-bold'>{estimatedReadingTime} min read</p>
    </div>
  )
}

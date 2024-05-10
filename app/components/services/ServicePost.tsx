import Container from '../Container'
import { PostContent } from '../content/PostContent'
import Separator from '../Separator'

const ServicePost = ({ post: postData }) => {
  const { title, description, image, content } = postData
  return (
    <>
      <Container className='flex flex-col gap-16'>
        <div className='flex items-center gap-16'>
          <div className='w-1/2 pr-16 font-bai text-6xl'>{title}</div>
          <div className='w-1/2 text-lg'>{description}</div>
        </div>
        <img
          src={image.url}
          alt={image.alt}
          className='h-[350px] w-full rounded-3xl object-cover'
        />
      </Container>
      <Separator />

      <PostContent content={content}></PostContent>
    </>
  )
}

export default ServicePost

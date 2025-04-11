import Container from '../Container'
import { PostContent } from '../content/PostContent'
import Image from '../Image'
import Separator from '../Separator'

const ServicePost = ({ post: postData }) => {
  const { title, description, image, content } = postData
  return (
    <>
      <Container className='flex flex-col gap-16'>
        <div className='flex flex-col items-center gap-16 sm:flex-row'>
          <div className='pr-16 font-bai text-3xl sm:w-1/2 lg:text-6xl'>
            {title}
          </div>
          <div className='text-lg sm:w-1/2'>{description}</div>
        </div>
        <Image
          image={image}
          className='aspect-[4/3] h-[350px] w-full rounded-3xl object-cover'
          width={1452}
          height={350}
        />
      </Container>
      <Separator />

      <PostContent content={content}></PostContent>
    </>
  )
}

export default ServicePost

import { PortableText } from '@portabletext/react'
import { Fragment } from 'react/jsx-runtime'

import Container from '../Container'
import RealisationsGrid from '../realisations/RealisationsGrid'
import Separator from '../Separator'
import AppsGrid from './AppsGrid'
import BlogPostsGrid from './BlogPostsGrid'
import FAQ from './FAQ'
import Headband from './Headband'
import HeadingTagline from './HeadingTagline'
import HeroSection from './HeroSection'
import ImageGallery from './ImageGallery'
import Methodology from './Methodology'
import PainPoints from './PainPoints'
import ProjectShowcase from './ProjectShowcase'
import ServiceHighlights from './ServiceHighlights'
import TextAndImage from './TextAndImage'
import UseCaseItem from './UseCaseItem'

const ContentBlock = ({ item, firstOfType, lastOfType, even }) => {
  switch (item._type) {
    case 'useCaseItem':
      return (
        <UseCaseItem
          {...item}
          reverse={!firstOfType && !even}
          separator={!lastOfType}
        />
      )
    case 'methodology':
      return <Methodology {...item} />
    case 'textAndImage':
      return <TextAndImage {...item} reverse={even} separator={!lastOfType} />
    case 'useCaseGallery':
      return <ImageGallery {...item}></ImageGallery>
    case 'painPoints':
      return <PainPoints {...item} />
    case 'faq':
      return <FAQ {...item} />
    case 'headingTagline':
      return <HeadingTagline {...item} />
    case 'headband':
      return <Headband {...item} />
    case 'projectShowcase':
      return <ProjectShowcase {...item} />
    case 'heroSection':
      return <HeroSection {...item} />
    case 'serviceHighlights':
      return <ServiceHighlights {...item} />
    case 'useCaseGrid':
      return <RealisationsGrid {...item} />
    case 'blogPostsGrid':
      return <BlogPostsGrid {...item} />
    case 'appsGrid':
      return <AppsGrid {...item} />
    case 'rawContent':
      return (
        <Container className='post-content'>
          <PortableText value={item.content} />
        </Container>
      )
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

const noSeparator = ['useCaseIntro', 'faq', 'headband', 'headingTagline']

export const PostContent = ({ content }) => {
  let lastType = null
  return content.map((item, i) => {
    const even = i % 2 === 0
    const firstOfType = item._type !== lastType
    const lastOfType = item._type !== content[i + 1]?._type
    const isLast = i === content.length - 1

    lastType = item._type

    const separator =
      lastOfType &&
      !isLast &&
      !noSeparator.includes(item._type) &&
      !(lastOfType && content[i + 1]?._type === 'headband')

    return (
      <Fragment key={i}>
        <ContentBlock {...{ item, even, firstOfType, lastOfType }} />
        {separator ? <Separator /> : null}
      </Fragment>
    )
  })
}

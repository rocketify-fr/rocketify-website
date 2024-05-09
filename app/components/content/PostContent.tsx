import {
  ImageGallery,
  Separator,
  UseCaseIntro,
  UseCaseItem,
} from './ContentBlocks'

const ContentBlock = ({ item, firstOfType, lastOfType, even }) => {
  switch (item._type) {
    case 'useCaseItem': {
      return (
        <UseCaseItem
          {...item}
          reverse={!firstOfType && !even}
          separator={!lastOfType}
        />
      )
    }
    case 'useCaseGallery': {
      return <ImageGallery {...item}></ImageGallery>
    }
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

const noSeparator = ['useCaseIntro']

export const PostContent = ({ content }) => {
  let lastType = null
  return content.map((item, i) => {
    const even = i % 2 === 0
    const firstOfType = item._type !== lastType
    const lastOfType = item._type !== content[i + 1]?._type
    const isLast = i === content.length - 1

    lastType = item._type

    return (
      <>
        <ContentBlock
          {...{ item, even, firstOfType, lastOfType }}
        ></ContentBlock>
        {lastOfType && !isLast && !noSeparator.includes(item._type)
? (
          <Separator />
        )
: null}
      </>
    )
  })
}

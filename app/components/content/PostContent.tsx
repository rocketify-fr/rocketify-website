import { ImageGallery, Separator, UseCaseItem } from './ContentBlocks'

export const PostContent = ({ content }) => {
  let lastType = null
  return content.map((item, i) => {
    const even = i % 2 === 0
    const isFirstOfType = item._type !== lastType
    const isLastOfType = item._type !== content[i + 1]?._type
    const isLast = i === content.length - 1

    lastType = item._type

    let component = null

    switch (item._type) {
      case 'useCaseItem': {
        component = (
          <UseCaseItem
            {...item}
            reverse={!isFirstOfType && !even}
            separator={!isLastOfType}
          />
        )
        break
      }
      case 'useCaseGallery': {
        component = <ImageGallery {...item}></ImageGallery>
        break
      }
      default:
        component = <pre>{JSON.stringify(item, null, 2)}</pre>
    }

    return (
      <>
        {component}
        {isLastOfType && !isLast ? <Separator /> : null}
      </>
    )
  })
}

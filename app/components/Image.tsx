import T from 'prop-types'

import { urlFor } from '~/utils/image'

export default function Image({ image, className, width = 500, height = 500 }) {
  const srcSet = [
    { w: Math.floor(width * 0.75), h: Math.floor(height * 0.75) },
    { w: Math.floor(width * 0.5), h: Math.floor(height * 0.5) },
  ]

  const set = srcSet
    .map(
      ({ w, h }) =>
        `${urlFor(image._id)
          .width(w)
          .height(h)
          .quality(90)
          .fit('clip')
          .auto('format')
          .url()} ${w}w`
    )
    .join(', ')

  return (
    <img
      className={className}
      alt={image?.alt ?? ``}
      src={urlFor(image._id)
        .size(width, height)
        .auto('format')
        .fit('clip')
        .url()}
      srcSet={set}
      sizes={srcSet.map(({ w }) => `(max-width: ${w}px) ${w}px`).join(',')}
    />
  )
}

Image.propTypes = {
  image: T.object.isRequired,
  className: T.string,
  width: T.number,
  height: T.number,
}

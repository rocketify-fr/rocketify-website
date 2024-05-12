import '../css/swiper.css'

import clsx from 'classnames'
import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'

export const Slider = ({
  className,
  children,
  slidesPerView = 'auto',
  navigation = false,
  pagination = false,
  spaceBetween = 10,
  effect,
  separate,
  name,
}) => {
  const swiperRef = useRef(null)

  useEffect(() => {
    register()

    const params = {
      slidesPerView,
      effect,
      navigation: false /* navigation && {
        prevEl: `.swipe-prev-${name}`,
        nextEl: `.swipe-next-${name}`,
      } */,
      mousewheel: {
        forceToAxis: true,
      },
      pagination,
      spaceBetween,
    }

    try {
      Object.assign(swiperRef.current, params)

      swiperRef.current.initialize()
    } catch (e) {}
  }, [effect, name, navigation, pagination, slidesPerView, spaceBetween])

  return (
    <swiper-container class={clsx(className)} init='false' ref={swiperRef}>
      {children
        .filter((c) => !!c)
        .map((child, i) => (
          <swiper-slide
            class={clsx(
              'w-[90%] sm:w-fit',
              'pb-0 sm:pb-0',
              separate ? 'border-r border-black' : ''
            )}
            key={child.key}
          >
            {child}
          </swiper-slide>
        ))}
    </swiper-container>
  )
}

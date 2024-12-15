import queryString from 'query-string'
import { toast } from 'react-toastify'

import { useTranslations } from './contexts/translations'

const ShareLink = ({ url, title }) => {
  const { t } = useTranslations()
  return (
    <div className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'>
      <img
        src={`/img/share-link.svg`}
        alt=''
        onClick={() => {
          navigator.clipboard.writeText(`${title} ${url}`)
          toast(t('common.linkCopied'))
        }}
      />
    </div>
  )
}

const ShareLinkedin = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'
      href={`https://www.linkedin.com/shareArticle?${queryString.stringify({ mini: true, url, title })}`}
      rel='noreferrer'
    >
      <img src={`/img/share-linkedin.svg`} alt='' />
    </a>
  )
}
export const Share = ({ url, title }) => {
  return (
    <div className='flex gap-x-2'>
      <ShareLink url={url} title={title}></ShareLink>
      <ShareLinkedin url={url}></ShareLinkedin>
      {['twitter', 'facebook'].map((name) => (
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

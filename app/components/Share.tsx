import queryString from 'query-string'
import { toast } from 'react-toastify'

import { sanitize } from '~/utils/string'

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

const ShareX = ({ url, title }) => {
  return (
    <a
      target='_blank'
      className='flex size-[32px] cursor-pointer items-center justify-center rounded-full bg-gray-100 p-2 font-bai text-3xl font-bold'
      href={`https://x.com/share?url=${url}&text=${title}`}
      rel='noreferrer'
    >
      <img
        width={32}
        height={32}
        src={`/img/share-x.svg`}
        className='size-[32px]'
        alt=''
      />
    </a>
  )
}
export const Share = ({ url, title }) => {
  title = sanitize(title)
  return (
    <div className='flex gap-x-2'>
      <ShareLink url={url} title={title}></ShareLink>
      <ShareLinkedin url={url} title={title}></ShareLinkedin>
      <ShareX url={url} title={title}></ShareX>
    </div>
  )
}

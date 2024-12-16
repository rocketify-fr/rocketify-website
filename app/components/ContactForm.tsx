import { useForm } from '@formspree/react'
import { Form, useFetcher, useLoaderData, useLocation } from '@remix-run/react'
import clsx from 'clsx'

import Container from './Container'
import { useTranslations } from './contexts/translations'

const Input = ({ type = 'text', label, children = [], ...props }) => (
  <label className='relative flex w-full flex-col items-start text-paragraph'>
    <span className='absolute -top-10 left-0'>{label}</span>

    {type === 'select' && (
      <select
        {...props}
        className={clsx(
          'flex h-12 w-full items-center justify-center rounded-xl border border-black bg-white px-2',
          props.className
        )}
      >
        {children}
      </select>
    )}
    {type === 'textarea' && (
      <textarea
        {...props}
        id='message'
        name='message'
        cols={30}
        rows={10}
        className={clsx(
          'flex w-full rounded-xl border border-black bg-white p-2',
          props.className
        )}
      ></textarea>
    )}
    {!['select', 'textarea'].includes(type) && (
      <input
        type={type}
        {...props}
        className={clsx(
          'flex h-12 w-full items-start justify-start rounded-xl border border-black px-2 placeholder:text-gray-300',
          props.className
        )}
      />
    )}
  </label>
)

const ContactForm = () => {
  const fetcher = useFetcher()
  const { services } = useLoaderData()
  const [state, handleSubmit] = useForm('moqgbywe')
  const { t } = useTranslations()

  return (
    <Container>
      <h1 className='mb-16 text-2xl sm:text-6xl'>{t('contact.title')}</h1>
      <p className='text-paragraph'></p>
      <div className='flex flex-col gap-8 sm:flex-row lg:gap-48'>
        <fetcher.Form
          className='flex grow flex-col gap-16 sm:w-2/3'
          onSubmit={handleSubmit}
        >
          <Input name='name' label={t('contact.name')}></Input>
          <Input name='company' label={t('contact.company')}></Input>
          <div className='flex gap-8'>
            <Input name='email' label={t('contact.email')} type='email'></Input>
            <Input name='tel' label={t('contact.phone')} type='tel'></Input>
          </div>
          <Input name='topic' label={t('contact.topic')} type='select'>
            <option className='text-gray-400' value={null}>
              {t('contact.topic.choose')}
            </option>
            {services
              .concat({
                title: t('contact.topic.other'),
                description:
                  'Veuillez détailler votre problème dans le champ ci-dessous',
              })
              .map((option) => (
                <option value={option.title} key={option.title}>
                  {option.title}
                </option>
              ))}
          </Input>
          <div className='flex gap-8'>
            <Input label={t('contact.budget')} type='select'>
              <option value={null}>{t('contact.budget.choose')}</option>
              {t('contact.budget.options')
                .split(';')
                .map((option) => (
                  <option value={option}>{option}</option>
                ))}
            </Input>
            <Input name='delay' label={t('contact.deadline')} type='select'>
              <option value={null}>{t('contact.deadline.choose')}</option>
              {t('contact.deadline.options')
                .split(';')
                .map((option) => (
                  <option value={option}>{option}</option>
                ))}
            </Input>
          </div>
          <Input
            type='textarea'
            name='message'
            label={t('contact.message')}
            placeholder={t('contact.message.placeholder')}
            className='min-h-[180px]'
          ></Input>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='mx-auto self-center rounded-3xl border border-black bg-rPurple px-4 py-2'
            >
              {t('common.send')}
            </button>
          </div>
          <div
            className={clsx(
              'flex h-16 items-center justify-center transition-opacity',
              state.succeeded ? 'opacity-100' : 'opacity-0'
            )}
          >
            Votre message a été envoyé
          </div>
        </fetcher.Form>
        <div className='flex flex-col items-stretch gap-8 sm:w-1/3'>
          {[
            {
              title: t('contact.byEmail'),
              value: 'contact@rocketify.io',
              link: 'mailto:contact@rocketify.io',
            },
            {
              title: t('contact.byPhone'),
              value: '+33 6 52 62 76 28',
              link: 'tel:+33652627628',
            },
            {
              title: t('contact.appointment.title'),
              value: t('contact.appointment.body'),
              link: 'https://tidycal.com/rocketify/faisons-connaissance',
              target: '_blank',
            },
          ].map((method, i) => (
            <a
              href={method.link}
              className='flex flex-col gap-2 rounded-3xl border border-black p-6'
              target={method.target}
              key={i}
              rel='noreferrer'
            >
              <h3 className='text-[26px]'>{method.title}</h3>
              <p className='text-paragraph'>{method.value}</p>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default ContactForm

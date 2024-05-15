import { useForm } from '@formspree/react'
import { Form, useFetcher, useLoaderData, useLocation } from '@remix-run/react'
import clsx from 'clsx'

import Container from './Container'
import Button from './layout/Button'

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

  return (
    <Container>
      <h1 className='mb-16 text-2xl sm:text-6xl'>Nous contacter</h1>
      <p className='text-paragraph'></p>
      <div className='flex flex-col gap-8 sm:flex-row sm:gap-48'>
        <fetcher.Form
          className='flex grow flex-col gap-16 sm:w-2/3'
          onSubmit={handleSubmit}
        >
          <Input name='name' label='Nom'></Input>
          <Input name='company' label='Société'></Input>
          <div className='flex gap-8'>
            <Input name='email' label='Email' type='email'></Input>
            <Input name='tel' label='Téléphone' type='tel'></Input>
          </div>
          <Input name='topic' label='Problématique' type='select'>
            <option className='text-gray-400' value={null}>
              Sélectionnez votre sujet
            </option>
            {services
              .concat({
                title: 'Autre',
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
            <Input label='Budget' type='select'>
              <option value='5k'>{`< 5 000€`}</option>
              <option value='10k'>5 000€ - 10 000€</option>
              <option value='20k'>10 000€ - 20 000€</option>
              <option value='50k'>20 000€ - 50 000€</option>
              <option value='gt50k'>{`> 50 000€`}</option>
            </Input>
            <Input name='delay' label='Délai' type='select'>
              <option value='4w'>2 - 4 semaines</option>
              <option value='8w'>1 - 2 mois</option>
              <option value='32w'>2 - 6 mois</option>
              <option value='gt32w'>6 mois et plus</option>
            </Input>
          </div>
          <Input
            type='textarea'
            name='message'
            label='message'
            placeholder='Votre message'
            className='min-h-[180px]'
          ></Input>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='mx-auto self-center rounded-3xl border border-black bg-rPurple px-4 py-2'
            >
              Envoyer
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
              title: 'Par mail',
              value: 'contact@rocketify.com',
              link: 'mailto:contact@rocketify.com',
            },
            {
              title: 'Par téléphone',
              value: '+337 12 34 56 78',
              link: 'tel:+33712345678',
            },
            {
              title: 'Prendre rendez-vous',
              value: 'Lien Calendly',
              link: 'https://duckduckgo.com',
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

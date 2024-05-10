import { Form, useFetcher, useLocation } from '@remix-run/react'
import clsx from 'clsx'

import Container from './Container'
import Button from './layout/Button'

const Input = ({ type = 'text', label, children = [], ...props }) => (
  <label className='relative flex w-full flex-col items-start text-paragraph'>
    <span className='absolute -top-10 left-0'>{label}</span>

    {type !== 'select' ? (
      <input
        type={type}
        {...props}
        className={clsx(
          'flex h-12 w-full items-start justify-start rounded-xl border border-black px-2 placeholder:text-gray-300',
          props.className
        )}
      />
    ) : (
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
  </label>
)

const ContactForm = () => {
  const fetcher = useFetcher()

  return (
    <Container>
      <h1 className='mb-16 text-6xl'>Nous contacter</h1>
      <p className='text-paragraph'></p>
      <div className='flex gap-48'>
        <fetcher.Form
          action='/contact'
          className='flex w-2/3 grow flex-col gap-16'
          method='post'
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
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input>
          <div className='flex gap-8'>
            <Input label='budget' label='Budget' type='select'>
              <option value='1'>0€ - 5 000€</option>
              <option value='2'>5 000€ - 10 000€</option>
              <option value='3'>10 000€ - 20 000€</option>
              <option value='4'>20 000€ - 50 000€</option>
              <option value='5'>50 000€ et plus</option>
            </Input>
            <Input name='delay' label='Délai' type='select'>
              <option value='1'>2 - 4 semaines</option>
              <option value='2'>1 - 2 mois</option>
              <option value='3'>2 - 6 mois</option>
              <option value='4'>6 mois et plus</option>
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
        </fetcher.Form>
        <div className='flex w-1/3 flex-col items-stretch gap-8'>
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

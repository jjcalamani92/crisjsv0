/* eslint-disable react/no-children-prop */

import 'antd/dist/antd.variable.min.css';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import rehypeRaw from "rehype-raw";
import { Input, Button, Form } from 'antd';
import { useState } from 'react';
import remarkGfm from 'remark-gfm'
import Image from 'next/image';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const onFinish = (values: any) => {
  console.log(values);
};

export const MarkdownEditor = () => {
  const [input, setInput] = useState(`
  # **Initialization**
In Next.js, you can define an API route that will catch all requests that begin with a certain path. Conveniently, this is called [Catch all API routes](#).

When you define a /pages/api/auth/[...nextauth] JS/TS file, you instruct NextAuth.js that every API request beginning with /api/auth/* should be handled by the code written in the [...nextauth] file.

Depending on your use case, you can initialize NextAuth.js in two different ways:
## Simple Initialization
In most cases, you won't need to worry about what NextAuth.js does, and you will get by just fine with the following initialization:
~~~js
 /pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
export default NextAuth({
  ...
})
~~~
Here, you only need to pass your [options](#) to NextAuth, and NextAuth does the rest.

This is the preferred initialization in tutorials/other parts of the documentation, as it simplifies the code and reduces potential errors in the authentication flow.
## Advanced Initialization
If you have a specific use case and need to make NextAuth.js do something slightly different than what it is designed for, keep in mind, the [...nextauth].js config file is still just **a regular** [API Route](#) at the end of the day.

That said, you can initialize NextAuth.js like this:
~~~d
/pages/api/auth/[...nextauth].ts
~~~
~~~javascript
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to 'NextAuth'
  return await NextAuth(req, res, {
    ...
  })
}
~~~

The ... section will still be your [options](#), but you now have the possibility to execute/modify certain things on the request.

You could for example log the request, add headers, read query or body parameters, whatever you would do in an API ~~route~~.

## Advanced Initialization
If you have a specific use case and need to make NextAuth.js do something slightly different than what it is designed for, keep in mind, the [...nextauth].js config file is still just **a regular** [API Route](#) at the end of the day.

That said, you can initialize NextAuth.js like this:
~~~d
/pages/api/auth/[...nextauth].ts
~~~
~~~javascript
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to 'NextAuth'
  return await NextAuth(req, res, {
    ...
  })
}
~~~

The ... section will still be your [options](#), but you now have the possibility to execute/modify certain things on the request.

You could for example log the request, add headers, read query or body parameters, whatever you would do in an API route.

### **Tip**
Since this is a catch-all route, remember to check what kind of NextAuth.js "action" is running. Compare the REST API with the req.query.nextauth parameter.

For example to execute something on the "callback" action when the request is a POST method, you can check for req.query.nextauth.includes("callback") && req.method === "POST"

### **Note**
NextAuth will implicitly close the response (by calling res.end, res.send or similar), so you should not run code after NextAuth in the function body. Using return NextAuth makes sure you don't forget that.

Any variable you create this way will be available in the NextAuth options as well, since they are in the same scope.
~~~d
/pages/api/auth/[...nextauth].ts
~~~
~~~javascript
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }

  // Get a custom cookie value from the request
  const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, {
    ...
    callbacks: {
      session({ session, token }) {
        // Return a cookie value as part of the session
        // This is read when ´req.query.nextauth.includes("session") && req.method === "GET"´
        session.someCookie = someCookie
        return session
      }
    }
  })
}
~~~
A practical example could be to not show a certain provider on the default sign-in page, but still be able to sign in with it. (The idea is taken from [this discussion](#)):

~~~d
/pages/api/auth/[...nextauth].ts
~~~
~~~javascript
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider(...),
    GoogleProvider(...),
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // Will hide the ´GoogleProvider´ when you visit ´/api/auth/signin´
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    ...
  })
}
~~~
For more details on all available actions and which methods are supported, please check out the [REST API documentation](#) or the appropriate area in [the source code](#)

### **WARNING**

Changing parts of the request that is essential to NextAuth to do it's job - like messing with the  <u>default cookies</u> - can have unforeseen consequences, and have the potential to introduce security holes if done incorrectly. Only change those if you understand 

´Hola´'Hola'

When you define a ~~/pages/api/auth/[...nextauth]~~. JS/TS file, you instruct NextAuth.js that every API request beginning with /api/auth/* should be handled by the code written in the [...nextauth] file.

~~~js
<ReactMarkdown
          children={DOMpurify.sanitize(input)}
          rehypePlugins={[rehypeRaw]}
          // rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomOneDark as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
~~~
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
>
![The San Juan Mountains are beautiful!](https://www.markdownguide.org/assets/images/san-juan-mountains.jpg "San Juan Mountains")

# **30 Días de Escritura de Código**
aprende haciendo, luego hazlo más.

por **Jesus Calamani** 16 de marzo

Recientemente llegué a los 30 días seguidos de al menos una confirmación por día en un repositorio de código abierto. Mi cartera personal y un proyecto de galería de NFT me han hecho perder la cabeza en Next.js y TypeScript. No me propuse completar una racha de ningún tipo, pero he estado en un estado de flujo, divirtiéndome mucho escribiendo código.

En el transcurso del último mes de proyectos de construcción, se destacaron algunas cosas notables, las compartiré en esta publicación.

## Aprovechar el poder de la comunidad

Este es primordial si necesita obtener una larga lista de cosas construidas y trabajando juntas, rápidamente. Me encontré tomando un enfoque "rápido y sucio" para crear una función y pasar la mayor parte de mi tiempo inicial en pruebas de navegador/dispositivo y UX.

Una vez que las cosas se sienten bien desde una perspectiva de UI/UX, me gusta hacer un buen pase de SEO, accesibilidad y experiencia de desarrollador. Saqué los datos codificados de los componentes, puse la metainformación en las áreas apropiadas, probé manualmente la navegación del teclado, agregué las etiquetas ARIA apropiadas y me aseguré de que el código fuera eficaz, reutilizable (cuando correspondiera) y fácil de leer.

## Usa la Aplicación

Conviértete en usuario de tu propio producto. Me gusta tener mi mente en el marco de un usuario final. La prueba como un elemento en una lista de verificación no es útil para nadie, debe usar la aplicación. Los problemas importantes, las ideas de mejora y las peculiaridades surgen cuando se aleja del IDE y pasa 30 minutos usando su aplicación.

Use su aplicación en su iPhone, luego pruébela en ese teléfono antiguo que tiene por ahí. Ábrelo en Microsoft Edge. Pruébelo en OSX y iOS Safari. Pruebe Firefox, Chrome, Android, tabletas, monitores ultra anchos y su televisor. Aprenderá mucho sobre las deficiencias de la interfaz de usuario y la funcionalidad si prueba por sí mismo en diferentes dispositivos.

Y "usar la aplicación" no se detiene allí. Intente apagar WiFi y conectarse a un punto de acceso móvil, ¿cómo es el rendimiento y los tiempos de carga? ¿Notas algún problema? Es posible que necesite indicadores de carga o cargas útiles json más pequeñas cuando navegue con una conexión lenta.

## Diseño de su propia cabeza
Opinión controvertida, a menos que sea nuevo y esté aprendiendo los conceptos básicos, omita los tutoriales, Dribbble y Twitter. Deshazte de las bibliotecas de interfaz de usuario y las guías de estilo.

Todos aprenden, trabajan y procesan las cosas de manera diferente. Lo que funciona para mi puede no funcionar para ti. Dicho esto, encuentro los recursos externos para nublar mi juicio, intuición y desarrollo personal como diseñador. Cuando estoy en el proceso de diseño o construcción, lo hago casi exclusivamente sin ideas externas o inspiración.

Una vez que tengo una línea de base, perfecciono e itero por el bien de la funcionalidad y la usabilidad. Refino el estilo 15-20+ veces. Tengo cuidado de mantener actualizado mi diseño original de Adobe XD a medida que realizo cambios. A través de esta iteración encuentro mi propia identidad de diseño y lenguaje visual.

## Pensamientos finales

Proponer una idea, luego diseñarla, desarrollarla e iterar sobre ella es una experiencia invaluable para los desarrolladores de todos los niveles de habilidad. Aprenderás mucho sobre el cómo y el por qué , pero más que nada aprenderás sobre ti mismo. Usted descubre cómo aprende, qué lo mantiene motivado, qué lo hace divertido para usted personalmente y qué herramientas y procesos son efectivos para construir su proyecto.

Si está considerando la idea de actualizar su cartera, crear una aplicación que le resulte útil o explorar algo nuevo que le parezca interesante; ¡hazlo! Piensa en un plan, sumérgete y no te detengas hasta que esté hecho. Luego, cuando haya terminado, ÚSALO. Entonces hazlo mejor. Codificación feliz 👨‍💻🥳

`)
  return (
    <div className='grid grid-cols-2 gap-6 my-6'>
      <div>
        <Form name="nest-messages" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input your Product Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']}  label="Content">
            <Input.TextArea value={input} onChange={(e) => setInput(e.target.value)} autoFocus autoSize={{ minRows: 20, maxRows: 50 }}/>
          </Form.Item>
        </Form>

      </div>
      <div>
        <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">

          <div className="w-full mx-auto space-y-4 text-center">
            <p className="text-xs font-semibold tracking-wider uppercase">#React</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">NextAuth.js</h1>
            <p className="text-sm dark:text-gray-400">by
              <a rel="noopener noreferrer" href="#" target="_blank" className="underline dark:text-violet-400">
                <span itemProp="name"> Jesus Calamani</span>
              </a> on
              <div>Feb 12th 2021</div>
            </p>
          </div>
          <div className="dark:text-gray-100">
            <ReactMarkdown
              remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              children={input}
              rehypePlugins={[rehypeRaw]}
              // rehypePlugins={[rehypeHighlight]}
              components={{
                // u({node, ...props}) { return <u style={{textDecoration: 'underline'}} {...props} />} ,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <>

                      <SyntaxHighlighter
                        unwrapDisallowed={true}

                        children={String(children).replace(/\n$/, '')}
                        style={atomOneDark as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    </>
                  ) : (


                    <code className={className} {...props}>
                      <>
                        {children}
                      </>
                    </code>
                  )
                }
              }}
            />
            <p>Insert the actual text content here...</p>
          </div>
          <div className="pt-12 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <Image width={200} height={200} objectFit="contain" src="https://res.cloudinary.com/dqsbh2kn0/image/upload/v1662000520/d11idlulvsozv4qtw25j.jpg" alt='image description'/>
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">Jesus Calamani</h4>
                <p className="dark:text-gray-400">Sed non nibh iaculis, posuere diam vitae, consectetur neque. Integer velit ligula, semper sed nisl in, cursus commodo elit. Pellentesque sit amet mi luctus ligula euismod lobortis ultricies et nibh.</p>
              </div>
            </div>
            <div className="flex justify-center pt-4 space-x-4 align-center">
              <a rel="noopener noreferrer" href="#" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </a>
              <a rel="noopener noreferrer" href="#" aria-label="Dribble" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
                  <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
                </svg>
              </a>
              <a rel="noopener noreferrer" href="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </a>
              <a rel="noopener noreferrer" href="#" aria-label="Email" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
                  <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>

      </div>
    </div>
  )
}


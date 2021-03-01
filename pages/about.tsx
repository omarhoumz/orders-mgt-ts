import Head from 'next/head'
import * as React from 'react'

function About() {
  return (
    <div>
      <Head>
        <title>Hello ts</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>About</h1>
      </main>

      <footer></footer>
    </div>
  )
}

About.propTypes = {}

export default About

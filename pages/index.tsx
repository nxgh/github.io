// import yaml from 'js-yaml'
import fs from 'fs'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import path from 'path'
import { FC, PropsWithChildren } from 'react'
import { isEndWith } from 'src/utils'
import Image from 'next/image'

const Menu = [
  {
    title: 'Three.js',
    path: '/three-js/basic-component',
  },
]

type IProps = {
  files: {
    files: string[]
    title: string
    path: string
  }[]
}

const Home: NextPage<IProps> = ({ files }) => {
  const router = useRouter()
  return (
    <div className="w-full h-full flex justify-between bg-dark p-20">
      {files.map((item) => {
        return (
          <div key={item.title} className="bg-green-300/50 w-[30vw] m-5 p-5 white">
            <h2 className="font-fangsong color-white cursor-pointer" onClick={() => router.push(`${item.path}`)}>
              {item.title}
            </h2>
            <ul className="list-none">
              {item.files.map((file) => {
                const path = `${item.path}/${file.replace(/\.(mdx|md|tsx|ts)$/, '')}`
                return (
                  <li className="font-fangsong color-white text-xl cursor-pointer my-2" key={path}>
                    <a onClick={() => router.push(path)}>{file.replace(/\.(mdx|md)$/, '')}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
 
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const paths: { title: string; path: string; resource: string }[] = [
    {
      title: 'Three.js 交互式指南',
      resource: '/pages/three-js',
      path: '/three-js',
    },
    {
      title: '速查表',
      path: '/cheat-sheet',
      resource: '/notes/cheat-sheet',
    },
    {
      title: '笔记本',
      path: '/notes',
      resource: '/notes/docs',
    },
  ]

  const files = paths.map((item) => {
    const files = fs.readdirSync(path.join(process.cwd(), item.resource)).filter((f) => isEndWith(f, ['.mdx', '.md']))

    return {
      ...item,
      files: files,
    }
  })

  return { props: { files } }
}

export default Home

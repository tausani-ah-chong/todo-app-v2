import Head from 'next/head'
import Router from 'next/router'
import { useState, ChangeEvent, FormEvent } from 'react'
import Axios from 'axios'
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Home (): JSX.Element {
  const getRoute = 'http://localhost:3000/api/get-todos'
  const postRoute = 'http://localhost:3000/api/create-todo'

  const { data, error } = useSwr(getRoute, fetcher)

  const [newTodo, setNewTodo] = useState('')

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  type Todo = {
		id: number
		text: string
		done: boolean
	}

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await Axios({method: 'post', url: postRoute, data: {text: newTodo}})
      .then(() => {
        Router.reload()
      })
  }

  return (
    <div>
      <Head>
        <title>Todo App v2!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header>
          <h1>Todo App</h1>
        </header>
        <main>
          <form action='POST' className="todo" onSubmit={onSubmit}>
            <input type="text" id="text" name="text" placeholder="What do you want to achieve?" value={newTodo} onChange={onChange} />
          </form>
          <ul className="todos">
            {data.map((todo: Todo) => {
              return (
                <li key={todo.id}>
                  <input id="cb" type="checkbox" />
                  <label htmlFor="cb">{todo.text}</label>
                </li>
              )
            })}
          </ul>
        </main>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 5% 40%;
        }

        .todo {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-bottom: 5px;
        }
        
        .todo input {
          width: 300px;
          height: 30px;
          font-size: 20px;
          padding-left: 15px;
          margin: 5px;
        }
        
        .todos {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          list-style: none;
          margin-left: 15px;
        }
        
        .todos li {
          margin: 5px 0;
          font-size: 25px;
        }
        
        label {
          margin-left: 5px;
        }
        
        @media screen and (max-width: 600px) {
          .container {
            padding: 5% 0;
          }
        }
        
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home

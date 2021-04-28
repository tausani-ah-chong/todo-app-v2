import Head from 'next/head'
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Home (): JSX.Element {
  const { data, error } = useSwr('http://localhost:3000/api/get-todos', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  type Todo = {
		id: number
		text: string
		done: boolean
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
          <form action="" className="todo">
            <input type="text" placeholder="What do you want to achieve?" />
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

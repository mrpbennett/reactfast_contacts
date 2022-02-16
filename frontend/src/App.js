import './input.css';
import { Helmet } from 'react-helmet';

import Contacts from './components/allContacts';
import Footer from './components/base/footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>FastAPI Contact Book</title>
      </Helmet>
      <main className="flex grow justify-center px-4">
        <div className="prose p-10">
          <div className="flex items-center justify-center">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-8 w-8 fill-[#009688]"
            >
              <title>FastAPI</title>
              <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
            </svg>
            <h1 className="m-0">ReactFast Contacts </h1>
          </div>

          <div className="flex justify-evenly">
            <img
              src="https://img.shields.io/badge/react-35495e.svg?&style=for-the-badge&logo=react&logoColor=61DAFB"
              alt="React"
            />
            <img
              src="https://img.shields.io/badge/tailwindcss-gray.svg?&style=for-the-badge&logo=tailwindcss&logoColor=06B6D4"
              alt="TailWindCSS"
            />
            <img
              src="https://img.shields.io/badge/fastapi-009688.svg?&style=for-the-badge&logo=fastapi&logoColor=white"
              alt="FastAPI"
            />
            <img
              src="https://img.shields.io/badge/sqlite-003B57.svg?&style=for-the-badge&logo=sqlite&logoColor=white"
              alt="SQLite"
            />
          </div>
          <div className="flex justify-center">
            <Contacts />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

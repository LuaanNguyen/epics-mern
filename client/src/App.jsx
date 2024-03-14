import "./index.css";

function Navigation() {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-[#8EAC50] p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-3">
          {/* <img
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            src="/tree-logo.svg"
          ></img> */}
          <span className="font-semibold text-xl tracking-tight">
            Online Database for Study Abroad Program
          </span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="#responsive-header"
              className="block mt-4 m lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              User
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Data
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Record
            </a>
          </div>
          <div>
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Background() {
  return <div className="bg-[#222831] h-[100vh]"></div>;
}

function App() {
  return (
    <>
      <Navigation />
      <Background />
    </>
  );
}

export default App;

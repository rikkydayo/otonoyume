import Head from "next/head";
import Link from "next/link";
import Image from "next/dist/client/image";
import Header from "./Head";
import BlogId from "../pages/blog/[id]";

export default function Layout({ children, title, url, image }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono  min-w-full">
      <Header
        pageTitle={title}
        pageImg={image}
        pageImgWidth={1280}
        pageImgHeight={960}
        pagePath={url}
      />
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 text-base px-3 py-2 p-2">
                  ウタノユメ -つらつら音楽-
                </a>
              </Link>
              <Link href="/contact-page">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                  Contact
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
      <footer className="w-screen h-12 flex justify-center items-center border-t">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex item-center"
        >
          {" "}
          Powered By {}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
}

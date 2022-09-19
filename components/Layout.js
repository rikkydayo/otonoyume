import Head from "next/head";
import Link from "next/link";
import Image from "next/dist/client/image";
import Header from "./Head";
import BlogId from "../pages/blog/[id]";
import { useState } from "react";

export default function Layout({ children, title, url, image }) {
  const nav = [
    {
      title: "人気記事",
      href: "/popular-page",
    },
    {
      title: "contact",
      href: "/contact-page",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 text-sm font-mono  min-w-full">
      <Header
        pageTitle={title}
        pageImg={image}
        pageImgWidth={1280}
        pageImgHeight={960}
        pagePath={url}
      />
      <header className="relative z-10 bg-white ring-1 ring-gray-900 ring-opacity-5 shadow-sm">
        <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex items-center justify-between py-4">
            <div className="w-full flex items-center">
              <h1 className="flex-shrink-0">
                <Link href="/">
                  <a>
                    <span className="sr-only">ウタノユメ -つらつら音楽-</span>
                    <span className="text-gray-800" aria-hidden="true">
                    <Image src="/utanoyume.jpg" alt="blog Logo" width={180} height={70} />
                    </span>
                  </a>
                </Link>
              </h1>
              <div className="w-full ml-0 flex justify-end lg:justify-start lg:ml-16">
                <button
                  type="button"
                  className="flex justify-center items-center h-10 w-10 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-200"
                  onClick={toggle}
                  aria-expanded={`${isOpen ? "true" : "false"}`}
                  aria-owns="mainmenu"
                >
                  <span className="sr-only">メインメニューを開閉する</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <nav
                  id="mainmenu"
                  className={`${isOpen ? "" : "hidden"}
                                absolute top-20 right-0 z-20 bg-white rounded-md shadow-lg p-4 lg:block lg:relative lg:top-0 lg:shadow-none lg:p-0`}
                  aria-label="メインメニュー"
                >
                  <ul className="space-y-2 lg:flex lg:items-center lg:space-x-8 lg:space-y-0">
                    {nav.map((item, idx) => (
                      <li key={idx}>
                        <Link href={item.href}>
                          <a className="block px-4 py-2 rounded-md text-base font-bold text-gray-900 lg:inline-block hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-200">
                            {item.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>
      <footer className="w-screen h-24 flex justify-center items-center border-t">
          Produced By <Image src="/blog.svg" alt="blog Logo" width={72} height={60} />
      </footer>
    </div>
  );
}

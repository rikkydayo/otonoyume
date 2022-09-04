import Layout from "../components/Layout";
import { client } from "../libs/client";
import Link from "next/link";

export default function Home({ blogs }) {
  return (
    <Layout title="ウタノユメ -つらつら音楽ブログ-">
      <div className="max-w-md mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-7xl">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              className="flex flex-col rounded-lg bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <Link href={`/blog/${blog.id}`}>
                <div className="flex flex-col-reverse">
                  <div className="flex-1">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover sm:h-56"
                      src={blog.eyecatch.url}
                      alt=""
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </a>
          ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return {
    props: {
      blogs: data.contents,
    },
  };
};

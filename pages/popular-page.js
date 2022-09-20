import Layout from "../components/Layout";
import { client } from "../libs/client";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "../styles/Home.module.scss";

export default function Home({ blogs }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <Layout title="トップページ" url="https://utanoyume.com/">
      <div className="container mx-auto my-4 px-4">
        <h2 className="text-xl text-gray-800 flex justify-center ">1か月のランキングを表示しています。</h2>
      </div>
      <ranktop className={styles.ranking}>
        <div className="max-w-md mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-7xl mt-auto mt-5">
          {blogs.map((blog) => (
            <rank key={blog.id}>
              <a
                className="flex flex-col rounded-lg bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <Link href={`/blog/${blog.id}`}>
                  <div className="flex flex-col-reverse">
                    <div className="flex-1">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {blog.title}
                        </h3>
                        <h2 className="text-xs font-bold text-gray-900">
                          {dayjs
                            .utc(blog.publishedAt)
                            .tz("Asia/Tokyo")
                            .format("YYYY-MM-DD")}
                        </h2>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        className="h-80 w-full object-cover sm:h-80"
                        src={blog.eyecatch.url}
                        alt={blog.title}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Link>
              </a>
            </rank>
          ))}
        </div>
      </ranktop>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const offset = 0;
  const limit = 10;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({
    endpoint: "popular-bs",
    queries: queries,
  });
  return {
    props: {
      blogs: data.popular.slice(0, 6),
    },
  };
};

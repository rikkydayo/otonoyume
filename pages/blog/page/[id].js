import { client } from '../../../libs/client';
import Layout from '../../../components/Layout';
import Link from "next/link";
import { Pagination } from '../../../components/Pagination';

export default function BlogPageId({ blogs, totalCount, currentPageNumber }) {
  return (
    <Layout title="トップページ" url="https://utanoyume.com/">
    <div className="max-w-md mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-7xl mt-auto mt-5">
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
      ))}
      
    </div>
    <Pagination currentPageNumber={currentPageNumber} maxPageNumber={Math.ceil(totalCount / 6)}  />
  </Layout>
  );
}

export const getStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({ endpoint: 'blogs' });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / 6)).map((i) => `/blog/page/${i}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const numId = context.params.id;
  const offset = (numId - 1) * 6;
  const limit = 6;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'blogs', queries: queries});


  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
    },
  };
};
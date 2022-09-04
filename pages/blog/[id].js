import { client } from "../../libs/client";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default function BlogId({ blog }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const publishedAt = "作成日 : " + dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD');
  return (
    <Layout title={blog.title}>
      <h3 className={styles.title}>{blog.title}</h3>
      <img
        className="mt-6 rounded-lg shadow-xl"
        src={blog.eyecatch.url}
        alt=""
        decoding="async"
        loading="lazy"
        width="640" height="480"
      />
      <p className={styles.publishedAt}>{publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
        className={styles.post}
      ></div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "blogs",
  });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};

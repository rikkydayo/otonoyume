import { client } from "../../libs/client";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { TableOfContents } from '../../components/TableOfContents';
import { renderToc } from '../../libs/render-toc';
import { Share } from "../../components/Share";
import { CommentsField } from "../../components/CommentField";

export default function BlogId({ blog }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const publishedAt = "作成日 : " + dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD');
  const toc = renderToc(blog.content);
  return (
    <Layout title={blog.title} url={`https://utanoyume.com/blog/${blog.id}`}  image={blog.eyecatch.url}>
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
      <TableOfContents toc={toc} />
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
        className={styles.post}
      ></div>
      
      <CommentsField blogId={blog.id} blogTitle={blog.title}/>
      <Share text={blog.title} url={`https://utanoyume.com/blog/${blog.id}`} ></Share>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "blogs",
  });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: 'blocking' };
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

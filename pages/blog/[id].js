import { client } from "../../libs/client";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Link from "next/link";
import { TableOfContents } from "../../components/TableOfContents";
import { renderToc } from "../../libs/render-toc";
import { Share } from "../../components/Share";
import { CommentsField } from "../../components/CommentField";

export default function BlogId({ blog, prevEntry, nextEntry }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const publishedAt =
    "作成日 : " +
    dayjs.utc(blog.publishedAt).tz("Asia/Tokyo").format("YYYY-MM-DD");
  const toc = renderToc(blog.content);
  return (
    <Layout
      title={blog.title}
      url={`https://utanoyume.com/blog/${blog.id}`}
      image={blog.eyecatch.url}
    >
      <h3 className={styles.title}>{blog.title}</h3>
      <img
        className="mt-6 rounded-lg shadow-xl"
        src={blog.eyecatch.url}
        alt=""
        decoding="async"
        loading="lazy"
        width="640"
        height="480"
      />
      <p className={styles.publishedAt}>{publishedAt}</p>
      <TableOfContents toc={toc} />
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
        className={styles.post}
      ></div>
      <CommentsField blogId={blog.id} />
      <div className={styles["prev-next-link"]}>
        {Object.keys(prevEntry).length !== 0 && (
          <Link href={`/blog/${prevEntry.id}`}>
            <a className={styles["prev-link"]}>
              <p className={styles["prev-next-label"]}>前の記事</p>
              <div className={styles["thumb-wrap"]}>
                <img src={prevEntry.eyecatch.url} alt="前記事サムネ"></img>
                <p>{prevEntry.title}</p>
              </div>
            </a>
          </Link>
        )}
        {Object.keys(nextEntry).length !== 0 && (
          <Link href={`/blog/${nextEntry.id}`}>
            <a className={styles["next-link"]}>
              <p className={styles["prev-next-label"]}>次の記事</p>
              <div className={styles["thumb-wrap"]}>
                <img src={nextEntry.eyecatch.url} alt="次記事サムネ"></img>
                <p>{nextEntry.title}</p>
              </div>
            </a>
          </Link>
        )}
      </div>
      <Share
        text={blog.title}
        url={`https://utanoyume.com/blog/${blog.id}`}
      ></Share>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({
    endpoint: "blogs",
  });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const fields = "id,title,eyecatch,publishedAt";

  const data = await client.get({ endpoint: "blogs", contentId: id });
  const prev = await client.get({
    endpoint: "blogs",
    queries: {
      limit: 1,
      orders: "-publishedAt",
      fields,
      filters: `publishedAt[less_than]${data.publishedAt}`,
    },
  });
  const next = await client.get({
    endpoint: "blogs",
    queries: {
      limit: 1,
      orders: "publishedAt",
      fields,
      filters: `publishedAt[greater_than]${data.publishedAt}`,
    },
  });
  const prevEntry = prev.contents[0] || {};
  const nextEntry = next.contents[0] || {};
  return {
    props: {
      blog: data,
      prevEntry,
      nextEntry,
    },
  };
};

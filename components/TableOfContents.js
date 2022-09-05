import styles from "../styles/Home.module.scss";

export const TableOfContents = ({ toc }) => {
    return (
      <div className={styles.l_toc}>
        <p className="TableOfContentsHead">目次</p>
        <ul>
          {toc.map(data => (
            <li key={data.id}>
              <a href={`#${data.id}`}>
                {data.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
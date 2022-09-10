//components/Pagination.js
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import cx from 'classnames'

export const Pagination = ({ maxPageNumber, currentPageNumber }) => {
  currentPageNumber = Number(currentPageNumber);
  maxPageNumber = Number(maxPageNumber);
  const prevPage = currentPageNumber - 1;
  const secoundPrevPage = currentPageNumber - 2;
  const nextPage = currentPageNumber + 1;
  const secoundNextPage = currentPageNumber + 2;

  return (
    <ul className={styles.Pagination}>
      {currentPageNumber !== 1 && (
        <li className= {styles["Pagination-Item"]}>
          <Link
            className={styles["Pagination-Item-Link"]}
            href={`/blog/page/1`}
          >
            <a className={styles["Pagination-Item-Link"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles["Pagination-Item-Link-Icon"]}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </a>
          </Link>
        </li>
      )}
      {currentPageNumber !== 1 && prevPage !== 1 && (
        <li className={styles["Pagination-Item"]}>
          <a className={styles["Pagination-Item-Link"]}>
            <Link
              className={styles["Pagination-Item-Link"]}
              href={`/blog/page/${secoundPrevPage}`}
            >
              <span>{secoundPrevPage}</span>
            </Link>
          </a>
        </li>
      )}
      {currentPageNumber !== 1 && (
        <li className= {styles["Pagination-Item"]}>
          <a className={styles["Pagination-Item-Link"]}>
            <Link
              className={styles["Pagination-Item-Link"]}
              href={`/blog/page/${prevPage}`}
            >
              <span>{prevPage}</span>
            </Link>
          </a>
        </li>
      )}
      <li className= {styles["Pagination-Item"]}>
        <a className={cx(styles["Pagination-Item-Link"],styles.isActive)}>
          <span>{currentPageNumber}</span>
        </a>
      </li>
      {currentPageNumber !== maxPageNumber && (
        <li className= {styles["Pagination-Item"]}>
          <Link
            className={styles["Pagination-Item-Link"]}
            href={`/blog/page/${nextPage}`}
          >
            <a className={styles["Pagination-Item-Link"]}>
              <span>{nextPage}</span>
            </a>
          </Link>
        </li>
      )}
      {currentPageNumber !== maxPageNumber && nextPage !== maxPageNumber && (
        <li className= {styles["Pagination-Item"]}>
          <Link
            className={styles["Pagination-Item-Link"]}
            href={`/blog/page/${secoundNextPage}`}
          >
            <a className={styles["Pagination-Item-Link"]}>
              <span>{secoundNextPage}</span>
            </a>
          </Link>
        </li>
      )}
      {currentPageNumber !== maxPageNumber && (
        <li className= {styles["Pagination-Item"]}>
          <Link href={`/blog/page/${maxPageNumber}`}>
            <a className={styles["Pagination-Item-Link"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles["Pagination-Item-Link-Icon"]}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

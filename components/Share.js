import React from 'react'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton ,LineIcon,LineShareButton} from 'react-share'


export const Share = ({ text, url }) => {
  return (
    <ul className="flex justify-center list-none">
      <li className="mr-8">
        <TwitterShareButton url={url} title={text}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </li>
      <li className="mr-8">
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </li>
      <li>
        <LineShareButton url={url}>
          <LineIcon size={32} round={true} />
        </LineShareButton>
      </li>
    </ul>
  )
}
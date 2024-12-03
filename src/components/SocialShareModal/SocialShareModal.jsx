import React from "react";
import Modal from "react-modal";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";
import "./SocialShareModal.scss";

const SocialShareModal = ({ open, setOpen, currentUrl }) => {
  const handleClose = () => setOpen(false);

  const socialIcons = [
    { component: EmailShareButton, icon: <EmailIcon />, label: "Email" },
    {
      component: LinkedinShareButton,
      icon: <LinkedinIcon />,
      label: "LinkedIn",
    },
    {
      component: FacebookShareButton,
      icon: <FacebookIcon />,
      label: "Facebook",
    },
    { component: TwitterShareButton, icon: <TwitterIcon />, label: "X" },
    { component: RedditShareButton, icon: <RedditIcon />, label: "Reddit" },
  ];

  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        className="share-modal"
        overlayClassName="share-modal__overlay"
      >
        <div className="share-modal__content">
          <h2 className="share-modal__title">Share options</h2>
          <ul className="share-modal__list">
            {socialIcons.map((social, index) => {
              const ShareButtonComponent = social.component;
              return (
                <li className="share-modal__list-item" key={index}>
                  <ShareButtonComponent url={currentUrl}>
                    <div className="share-modal__list-item-icon">
                      {social.icon}
                    </div>
                    <div className="share-modal__list-item-text">
                      <span>{social.label}</span>
                    </div>
                  </ShareButtonComponent>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default SocialShareModal;

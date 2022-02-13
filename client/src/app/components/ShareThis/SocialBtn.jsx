import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "mdi-react/TwitterIcon";
import FacebookIcon from "mdi-react/FacebookIcon";
import InstagramIcon from "mdi-react/InstagramIcon";
import './SocialBtn.scss';

function SocialBtn(props) {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={"social-btn-icon " + (className || '')}>
      <IconButton
        title={t("Footer.social.twitter")}
        href="https://twitter.com/tropipay"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        title={t("Footer.social.facebook")}
        href="https://www.facebook.com/tropipay/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        title={t("Footer.social.instagram")}
        href="https://www.instagram.com/tropipay"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
      </IconButton>
    </div>
  );
}
export default SocialBtn;

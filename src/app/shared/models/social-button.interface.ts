import { SOCIAL_LOGINS } from "../components/login/social-buttons.option";

export interface SocialButton {
    texto: string;
    icone: string;
    background: string;
    backgroundHover: string;
    callback: (source: SOCIAL_LOGINS) => void;
    fontColor: string;
    source: SOCIAL_LOGINS;
}

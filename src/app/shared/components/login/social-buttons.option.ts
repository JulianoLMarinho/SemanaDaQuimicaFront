import { SocialButton } from "../../models/social-button.interface";

export type SOCIAL_LOGINS = 'FACEBOOK' | 'GOOGLE';

export const socialButtons: SocialButton[] = [
    
]

export function getSocialButtons(callback: (source: SOCIAL_LOGINS) => void): SocialButton[] {

    const socialButtons: SocialButton[] = [
        {
            background: '#ffffff',
            backgroundHover: '#eeeeee',
            icone: '../../../../assets/imgs/google-icon.png',
            texto: 'Logar com o Google',
            fontColor: '#000000',
            callback: callback,
            source: 'GOOGLE'
          },
          {
            background: '#4267B2',
            backgroundHover: '#eeeeee',
            icone: '../../../../assets/imgs/facebook-white.png',
            texto: 'Logar com o Facebook',
            fontColor: '#ffffff',
            callback: callback,
            source: 'FACEBOOK'
          }
        ]
    return socialButtons;
}

import rubikRegular from '../src/assets/fonts/Rubik-Regular.ttf';
import rubikSemiBold from '../src/assets/fonts/Rubik-SemiBold.ttf';
import rubikBold from '../src/assets/fonts/Rubik-Bold.ttf';
import rubikExtraBold from '../src/assets/fonts/Rubik-ExtraBold.ttf';
import rubikMedium from '../src/assets/fonts/Rubik-Medium.ttf';
import { FontFamilyType } from '@proxym/themes';

export const loadStorybookFonts = () => {
  const fontStyles = `
    @font-face {
      src: url(${rubikRegular});
      font-family: ${FontFamilyType.primary};
    }

    @font-face {
      src: url(${rubikSemiBold});
      font-family: ${FontFamilyType.primarySemiBold};
    }

    @font-face {
      src: url(${rubikBold});
      font-family: ${FontFamilyType.primaryBold};
    }

    @font-face {
      src: url(${rubikExtraBold});
      font-family: ${FontFamilyType.primaryExtraBold};
    }
     @font-face {
      src: url(${rubikMedium});
      font-family: ${FontFamilyType.primaryExtraBold};
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(fontStyles));

  document.head.appendChild(style);
};

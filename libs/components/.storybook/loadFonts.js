import muliRegular from '../src/assets/fonts/Muli-Regular.ttf';
import muliSemiBold from '../src/assets/fonts/Muli-SemiBold.ttf';
import muliBold from '../src/assets/fonts/Muli-Bold.ttf';
import muliExtraBold from '../src/assets/fonts/Muli-ExtraBold.ttf';
import { FontFamilyType } from '@proxym/themes';

export const loadStorybookFonts = () => {
  const fontStyles = `
    @font-face {
      src: url(${muliRegular});
      font-family: ${FontFamilyType.primary};
    }

    @font-face {
      src: url(${muliSemiBold});
      font-family: ${FontFamilyType.primarySemiBold};
    }

    @font-face {
      src: url(${muliBold});
      font-family: ${FontFamilyType.primaryBold};
    }

    @font-face {
      src: url(${muliExtraBold});
      font-family: ${FontFamilyType.primaryExtraBold};
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(fontStyles));

  document.head.appendChild(style);
};

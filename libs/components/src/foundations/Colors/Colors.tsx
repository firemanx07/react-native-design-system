import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { Fragment, useCallback } from 'react';

import { BaseText, TextVariant } from '../../atoms/BaseText';
import ColorPreview, { PropsType as ColorPreviewProps } from './ColorPreview';

type SectionItem = {
  title: string;
  data: ColorPreviewProps[];
};

export const Colors = () => {
  const { colors } = useNamespacedTheme();

  const sections: SectionItem[] = [
    {
      title: 'Primary colors:',
      data: [
        {
          name: 'primary',
          color: colors.primary,
          textColor: colors.light,
        },
        {
          name: 'dark',
          color: colors.dark,
          textColor: colors.light,
        },
        {
          name: 'light',
          color: colors.light,
          textColor: colors.dark,
        },
      ],
    },
    {
      title: 'Secondary colors:',
      data: [
        {
          name: 'secondary',
          color: colors.secondary,
          textColor: colors.dark,
        },
        {
          name: 'secondaryDark',
          color: colors.secondaryDark,
          textColor: colors.dark,
        },
      ],
    },
    {
      title: 'Alert colors:',
      data: [
        {
          name: 'error',
          color: colors.error,
          textColor: colors.light,
        },
        {
          name: 'errorLight',
          color: colors.errorLight,
          textColor: colors.dark,
        },
        {
          name: 'success',
          color: colors.success,
          textColor: colors.light,
        },
        {
          name: 'successLight',
          color: colors.successLight,
          textColor: colors.dark,
        },
      ],
    },
    {
      title: 'Accent colors:',
      data: [
        {
          name: 'accent',
          color: colors.accent,
          textColor: colors.light,
        },
        {
          name: 'accentDark',
          color: colors.accentDark,
          textColor: colors.light,
        },
      ],
    },
    {
      title: 'Grayscale colors:',
      data: [
        {
          name: 'grayDark',
          color: colors.grayDark,
          textColor: colors.light,
        },
        {
          name: 'graySoft',
          color: colors.graySoft,
          textColor: colors.dark,
        },
        {
          name: 'grayLight',
          color: colors.grayLight,
          textColor: colors.dark,
        },
        {
          name: 'grayUltraLight',
          color: colors.grayUltraLight,
          textColor: colors.dark,
        },
      ],
    },
  ];

  const renderColor = useCallback(
    (item: ColorPreviewProps) => <ColorPreview key={item.name} {...item} />,
    [],
  );

  const renderSection = useCallback(
    (item: SectionItem) => (
      <Fragment key={item.title}>
        <BaseText variant={TextVariant.H2}>{item.title}</BaseText>
        <Section>{item.data.map(renderColor)}</Section>
      </Fragment>
    ),
    [],
  );

  return <Container>{sections.map(renderSection)}</Container>;
};

const Container = styled.View`
  padding: 20px;
`;

const Section = styled.View`
  width: 720px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export default Colors;

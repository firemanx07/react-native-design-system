import { styled, useNamespacedTheme } from '@proxym/themes';
import React, { useCallback, useMemo, Fragment } from 'react';

import { BaseText, TextVariant } from '../../atoms';

export const Spacing = () => {
  const { spacing } = useNamespacedTheme();

  const spacingKeys = useMemo(
    () =>
      Object.values(spacing).filter(
        (value: string | number) => typeof value === 'string',
      ) as string[],
    [],
  );

  const renderSpace = useCallback((key: any) => {
    return (
      <Fragment key={key}>
        <BaseText variant={TextVariant.M}>{key}</BaseText>
        <Space height={spacing[key] as unknown as number} />
      </Fragment>
    );
  }, []);

  return <Container>{spacingKeys.map(renderSpace)}</Container>;
};

const Container = styled.View`
  padding: ${({ theme }) => theme.ds.spacing.mediumSmall}px;
  flex: 1;
  background-color: ${({ theme }) => theme.ds.colors.graySoft};
  width: 400px;
`;

type SpaceType = {
  height: number;
};

const Space = styled.View<SpaceType>`
  background-color: ${({ theme }) => theme.ds.colors.light};
  margin-bottom: ${({ theme }) => theme.ds.spacing.primary}px;
  height: ${({ height }) => height}px;
`;

export default Spacing;

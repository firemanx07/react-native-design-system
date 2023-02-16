import { styled, css } from '@proxym/themes';
import { rgba } from 'polished';

import {
  Badge,
  BadgeSize,
  BadgeVariant,
  Checkbox,
  MenuIcon,
  BaseButton,
  ButtonSize,
  ButtonVariant,
  LockIcon,
  BaseText,
  TextVariant,
  TextWeight,
} from '../../atoms';

enum Layer {
  One = 1,
  Two = 2,
  Three = 3,
}

type StyledCommonType = {
  size: number;
};

export const Container = styled.View<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  overflow: hidden;
`;

export const MediaTileImage = styled.Image<StyledCommonType>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

export const NewBadge = styled(Badge).attrs({
  size: BadgeSize.Small,
  variant: BadgeVariant.Square,
  textStyle: {
    letterSpacing: 1.5,
  },
})`
  background-color: ${({ theme }) => theme.ds.colors.success};
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: ${Layer.One};
  padding-horizontal: 6px;
`;

export const StyledCommentIcon = styled(MenuIcon).attrs(({ theme }) => ({
  width: theme.ds.iconSize.primary,
  height: theme.ds.iconSize.primary,
  fill: theme.ds.colors.light,
}))`
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: ${Layer.One};
`;

export const absoluteFillObject = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Overlay = styled.View`
  ${absoluteFillObject};
  z-index: ${Layer.Two};
  background-color: ${({ theme }) => rgba(theme.ds.colors.dark, 0.5)};
`;

export const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: ${Layer.Three};
`;

export const ButtonWrapper = styled.View`
  ${absoluteFillObject};
  justify-content: center;
  align-items: center;
  z-index: ${Layer.Three};
`;

export const ButtonUnlock = styled(BaseButton).attrs(({ theme }) => ({
  textStyle: {
    color: theme.ds.colors.light,
  },
  size: ButtonSize.Small,
  variant: ButtonVariant.Outline,
}))`
  height: 28px;
  border-color: ${({ theme }) => theme.ds.colors.light};
  background-color: transparent;
  align-self: center;
  padding-horizontal: ${({ theme }) => theme.ds.spacing.small}px;
`;

export const StyledLockKeyIcon = styled(LockIcon).attrs(({ theme }) => ({
  fill: theme.ds.colors.light,
}))``;

export const VideoDurationText = styled(BaseText).attrs({
  variant: TextVariant.S,
  weight: TextWeight.Bold,
})`
  color: ${({ theme }) => theme.ds.colors.light};
  text-shadow: ${({ theme }) => '0 0 2px ' + rgba(theme.ds.colors.dark, 0.5)};
  position: absolute;
  top: 5px;
  left: 8px;
  z-index: ${Layer.Two};
`;

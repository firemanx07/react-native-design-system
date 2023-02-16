import React, { memo } from 'react';
import { ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';

import { TestIDType } from '../../types';
import {
  ButtonWrapper,
  ButtonUnlock,
  StyledLockKeyIcon,
  Container,
  NewBadge,
  StyledCommentIcon,
  Overlay,
  StyledCheckbox,
  MediaTileImage,
  VideoDurationText,
} from './MediaTile.styles';

export type PropsType = {
  source: ImageSourcePropType;
  labels: {
    new: string;
    unlock: string;
  };
  isNew?: boolean;
  hasComment?: boolean;
  isSelectable?: boolean;
  isSelected?: boolean;
  showUnlockButton?: boolean;
  videoDuration?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
} & TestIDType;

export const MediaTile = ({
  source,
  size = 124,
  style,
  labels,
  isNew,
  hasComment,
  isSelectable,
  isSelected,
  showUnlockButton,
  videoDuration,
  testID,
}: PropsType) => {
  const renderUnlockButton = () => {
    if (!showUnlockButton) {
      return null;
    }
    return (
      <ButtonWrapper>
        <ButtonUnlock
          renderIcon={(iconSize: number) => (
            <StyledLockKeyIcon width={iconSize} height={iconSize} />
          )}
          disabled
        >
          {labels.unlock}
        </ButtonUnlock>
      </ButtonWrapper>
    );
  };

  return (
    <Container size={size} style={style} testID={testID}>
      {isNew && <NewBadge>{labels.new.toUpperCase()}</NewBadge>}
      {hasComment && !isSelectable && <StyledCommentIcon />}
      {(isSelected || showUnlockButton) && <Overlay />}
      {isSelectable && <StyledCheckbox isChecked={isSelected} />}
      {!!videoDuration && (
        <VideoDurationText>{videoDuration}</VideoDurationText>
      )}
      {renderUnlockButton()}
      <MediaTileImage size={size} source={source} />
    </Container>
  );
};

export default memo(MediaTile);

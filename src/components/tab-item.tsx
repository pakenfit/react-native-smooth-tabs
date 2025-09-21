import {
  type LayoutChangeEvent,
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

type TabItemProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
  onMeasure: (layout: LayoutRectangle) => void;
  itemStyle?: StyleProp<ViewStyle>;
  onLongPressStart: () => void;
  onLongPressEnd: () => void;
  itemTextStyle?: StyleProp<TextStyle>;
  itemActiveTextStyle?: StyleProp<TextStyle>;
};

export const TabItem = ({
  title,
  isActive,
  onPress,
  onMeasure,
  itemStyle,
  onLongPressStart,
  onLongPressEnd,
  itemTextStyle,
  itemActiveTextStyle,
}: TabItemProps) => {
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onMeasure(event.nativeEvent.layout);
    },
    [onMeasure]
  );

  const tapGesture = Gesture.Tap().onStart(() => {
    scheduleOnRN(onPress);
  });

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scheduleOnRN(onLongPressStart);
    })
    .onEnd(() => {
      scheduleOnRN(onLongPressEnd);
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(tapGesture, longPressGesture)}>
      <Animated.View
        style={[
          itemStyle,
          styles.container,
          isActive && styles.activeContainer,
        ]}
        onLayout={onLayout}
      >
        <Text
          style={[styles.text, itemTextStyle, isActive && itemActiveTextStyle]}
        >
          {title}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  activeContainer: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

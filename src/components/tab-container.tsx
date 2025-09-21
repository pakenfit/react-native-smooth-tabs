import { TabItem } from './tab-item';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
  ScrollView as RNScrollView,
  type TextStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useEvent,
  useHandler,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
  useAnimatedRef,
} from 'react-native-reanimated';
import { type TabItemType } from '../types/tab-types';
import { useTab } from './tab-context';
import PagerView from 'react-native-pager-view';
import { scheduleOnRN } from 'react-native-worklets';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);
const { width: screenWidth } = Dimensions.get('window');

const springConfig = {
  damping: 50,
  stiffness: 900,
  mass: 5,
  energyThreshold: 0.01603773585,
  reduceMotion: ReduceMotion.System,
};

const usePagerScrollHandler = (handlers: any, dependencies?: any) => {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
};

type TabContainerProps = {
  tabs: TabItemType[];
  children: React.ReactNode;
  tabItemStyle?: StyleProp<ViewStyle>;
  tabContainerStyle?: StyleProp<ViewStyle>;
  tabItemTextStyle?: StyleProp<TextStyle>;
  tabItemActiveTextStyle?: StyleProp<TextStyle>;
  scrollViewContainerStyle?: StyleProp<ViewStyle>;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  tabAnimatedIndicatorStyle?: StyleProp<ViewStyle>;
};

export const TabContainer = ({
  tabs,
  children,
  tabItemStyle,
  tabContainerStyle,
  tabItemTextStyle,
  tabItemActiveTextStyle,
  scrollViewContentContainerStyle,
  tabAnimatedIndicatorStyle,
  scrollViewContainerStyle,
}: TabContainerProps) => {
  const { activeTab, setActiveTab } = useTab();
  const [measures, setMeasures] = useState<
    { index: number; layout: LayoutRectangle }[]
  >([]);
  const scale = useSharedValue(1);
  const pagerRef = useRef<PagerView>(null);
  const scrollProgress = useSharedValue(0);
  const scrollViewRef = useRef<RNScrollView>(null);
  const animatedRef = useAnimatedRef();
  const [scrollTrigger, setScrollTrigger] = useState<
    'press' | 'scroll' | 'none'
  >('scroll');

  useEffect(() => {
    if (
      scrollViewRef.current &&
      measures.length === tabs.length &&
      scrollTrigger === 'scroll'
    ) {
      const activeTabMeasure = measures.find((m) => m.index === activeTab);

      if (activeTabMeasure) {
        const { x, width } = activeTabMeasure.layout;

        const targetX = x + width / 2 - screenWidth / 2;

        (scrollViewRef.current as any)?.scrollTo({
          x: Math.max(0, targetX),
          animated: true,
        });
      }
    }
  }, [activeTab, measures, tabs.length, scrollTrigger]);

  const onMeasure = useCallback(
    (layout: LayoutRectangle, index: number) => {
      if (measures?.some((m) => m.index === index)) {
        setMeasures((prev) =>
          prev.map((m) => (m.index === index ? { ...m, layout } : m))
        );
        return;
      }
      setMeasures((prev) => [...prev, { index, layout }]);
    },
    [measures]
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (measures.length === 0) {
      return {
        width: 0,
        height: 0,
        transform: [{ translateX: 0 }, { scale: scale.value }],
      };
    }

    // Calculate interpolated position and width based on scroll progress
    const currentTab = Math.floor(scrollProgress.value);
    const nextTab = Math.min(currentTab + 1, measures.length - 1);
    const progress = scrollProgress.value - currentTab;

    const currentMeasure = measures[currentTab];
    const nextMeasure = measures[nextTab];

    if (!currentMeasure || !nextMeasure) {
      return {
        width: measures[activeTab]?.layout.width ?? 0,
        height: measures[activeTab]?.layout.height ?? 0,
        transform: [
          { translateX: measures[activeTab]?.layout.x ?? 0 },
          { scale: scale.value },
        ],
      };
    }

    const interpolatedX = interpolate(
      progress,
      [0, 1],
      [currentMeasure.layout.x, nextMeasure.layout.x],
      Extrapolation.CLAMP
    );

    const interpolatedWidth = interpolate(
      progress,
      [0, 1],
      [currentMeasure.layout.width, nextMeasure.layout.width],
      Extrapolation.CLAMP
    );

    return {
      width: interpolatedWidth,
      height: currentMeasure.layout.height,
      transform: [
        {
          translateX: withSpring(interpolatedX, {
            damping: 30,
          }),
        },
        { scale: scale.value },
      ],
    };
  });

  const onLongPressStart = useCallback(
    (index: number) => {
      setScrollTrigger('press');
      setActiveTab(index);
      pagerRef.current?.setPage(index);
      scrollProgress.value = index;
      scale.value = withSpring(1.2, springConfig);
    },
    [scale, setActiveTab, scrollProgress]
  );

  const onLongPressEnd = useCallback(() => {
    scale.value = withSpring(1, springConfig);
  }, [scale]);

  const tabPress = useCallback(
    (index: number) => {
      setScrollTrigger('press');
      setActiveTab(index);
      pagerRef.current?.setPage(index);
      scrollProgress.value = index;
    },
    [setActiveTab, scrollProgress]
  );

  const pagerScrollHandler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      const { position, offset } = e;
      scrollProgress.value = position + offset;
    },
  });

  const onPageSelected = useCallback(
    (e: any) => {
      const position = e.nativeEvent.position;
      setActiveTab(position);
      scrollProgress.value = position;
      if (scrollTrigger === 'press') {
        scheduleOnRN(setScrollTrigger, 'none');
        return;
      }
      scheduleOnRN(setScrollTrigger, 'scroll');
    },
    [setActiveTab, scrollProgress, scrollTrigger]
  );

  return (
    <View style={[styles.container, tabContainerStyle]}>
      <View style={[styles.scrollView, scrollViewContainerStyle]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainer,
            scrollViewContentContainerStyle,
          ]}
        >
          <Animated.View
            ref={animatedRef}
            style={[
              styles.animatedView,
              animatedStyle,
              tabAnimatedIndicatorStyle,
            ]}
          />
          {tabs.map((tab) => (
            <TabItem
              key={tab.index}
              {...tab}
              isActive={activeTab === tab.index}
              onPress={() => tabPress(tab.index)}
              onMeasure={(layout) => onMeasure(layout, tab.index)}
              itemStyle={tabItemStyle}
              itemTextStyle={tabItemTextStyle}
              itemActiveTextStyle={tabItemActiveTextStyle}
              onLongPressStart={() => onLongPressStart(tab.index)}
              onLongPressEnd={onLongPressEnd}
            />
          ))}
        </ScrollView>
      </View>
      <AnimatedPager
        style={styles.pagerView}
        initialPage={activeTab}
        onPageScroll={pagerScrollHandler}
        onPageSelected={onPageSelected}
        ref={pagerRef}
      >
        {children}
      </AnimatedPager>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  scrollView: {
    position: 'relative',
    zIndex: 10,
    paddingTop: 20,
  },
  pagerView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  animatedView: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(181, 181, 181, 0.15)',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 70,
    flexGrow: 1,
  },
});

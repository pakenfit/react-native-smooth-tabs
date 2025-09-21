import { TabContainer } from './components/tab-container';
import { TabProvider, useTab } from './components/tab-context';

export const Tab = {
  Container: TabContainer,
  Provider: TabProvider,
};

export { useTab };
export { type TabItemType } from './types/tab-types';

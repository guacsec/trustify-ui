import type { ITabState } from "./useTabState";

export interface ITabDerivedStateArgs<TTabKey extends string> {
  tabState: ITabState<TTabKey>;
}

export interface ITabDerivedState<TTabKey extends string> {
  isTabActive: (tabKey: TTabKey) => boolean;
  setActiveTab: (tabKey: TTabKey) => void;
}

export const getTabDerivedState = <TTabKey extends string>({
  tabState,
}: ITabDerivedStateArgs<TTabKey>): ITabDerivedState<TTabKey> => {
  const isTabActive = (tabKey: TTabKey) => {
    return tabKey === tabState.activeTab?.tabKey;
  };

  const setActiveTab = (tabKey: TTabKey) => {
    tabState.setActiveTab({ tabKey });
  };

  return { isTabActive, setActiveTab };
};

import * as NavigationIcons from './groups/navigation.icons';

type IconNames<T> = keyof T;

export type Icon =
  | IconNames<typeof NavigationIcons>;

export * from './groups/navigation.icons';

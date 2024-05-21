import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Settings = {
  connection?: string;
};

export const settings = atomWithStorage('settings', {} as Settings);

export const useSettings = () => {
  return useAtom(settings);
};

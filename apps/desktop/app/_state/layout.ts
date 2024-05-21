import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const leftBarVisibilityAtom = atomWithStorage('leftBarVisibility', true);
export const useLeftBarVisibility = () => useAtomValue(leftBarVisibilityAtom);
export const useSetLeftBarVisibility = () => useSetAtom(leftBarVisibilityAtom);

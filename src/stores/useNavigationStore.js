import { create } from "zustand";

const useNavigationStore = create((set, get) => ({
    historyStack: [],

    nowPageParams: {
        path: "/home",
        params: {},
        preParams: {},
    },

    initializeNavigation: (initialPage) => {
        if (!initialPage?.path) {
            return false;
        }

        set({
            historyStack: [],

            nowPageParams: {
                path: initialPage.path,
                params: { ...(initialPage.params ?? {}) },
                preParams: {},
            },
        });

        return true;
    },

    goForward: (nextPage) => {

        // 화면경로없이 호출되는것 막음
        if (!nextPage?.path) {
            return false;
        }

        set((state) => {
            const currentPage = {
                path: state.nowPageParams.path,

                // 객체 복사해서 저장. 복사하지 않고 저장하면 이후에 원래 변수를 수정하면 현재 화면 상태도 같이 바뀜
                params: { ...(state.nowPageParams.params ?? {}) },
            };

            const nextPageParams = {
                path: nextPage.path,
                params: { ...(nextPage.params ?? {}) },
                preParams: {},
            };

            return {
                historyStack: [
                    ...state.historyStack,
                    currentPage,
                ],

                nowPageParams: nextPageParams
            }
        })
        return true;
    },

    goBack: (num = 1, preParams = {}) => {

        /// goBack 0, -1등을 막음 (비정상 호출)
        if (!Number.isInteger(num) || num < 1) {
            return false;
        }

        const { historyStack } = get();

        if (historyStack.length < num) {
            return false;
        }

        const targetIndex = historyStack.length - num;
        const targetPage = historyStack[targetIndex];
        const nextHistoryStack = historyStack.slice(0, targetIndex)

        set(() => ({
            historyStack: nextHistoryStack,

            nowPageParams: {
                path: targetPage.path,
                params: { ...(targetPage.params ?? {}) },
                preParams: { ...preParams },
            },
        }));

        return true;
}


}));

export default useNavigationStore;


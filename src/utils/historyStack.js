// historyStack.js의 역할
// 화면 이동 기록을 쌓아두는 순수 기록 장부
// React Router의 navigate(-1)은 브라우저 히스토리를 다룰 뿐, "어디서 어떤 파라미터를 들고 왔는지"는
// 기억하지 못해서, 뒤로가기 시 파라미터를 유지하거나 이전 화면 정보를 참고하려면 별도 기록이 필요함
// 화면을 다시 그릴 필요가 없는 값이라 useState 대신 모듈 스코프 배열로 관리

// 기록 하나의 모양 : { path, params, prevParams }
// - path       : 이동한 화면의 경로
// - params     : 그 화면으로 이동하면서 함께 넘긴 현재 파라미터
// - prevParams : 그 화면에 진입하기 직전 화면이 들고 있던 파라미터 (뒤로 왔을 때 참고용)
let stack = [];

// 새 화면으로 이동할 때 기록을 쌓음
export function push(entry) {
    stack.push(entry);
}

// 뒤로가기 할 때 마지막 기록을 꺼내면서 제거
// 기록이 없으면 undefined 반환
export function pop() {
    return stack.pop();
}

// 마지막 기록을 지우지 않고 읽기만 함 (직전 화면의 파라미터가 필요할 때)
export function peek() {
    return stack[stack.length - 1];
}

// 메인 화면으로 이동하는 등, 지금까지 쌓인 기록이 더 이상 의미 없어질 때 전부 비움
export function clear() {
    stack = [];
}

// 현재 기록 개수 (디버깅/테스트용)
export function size() {
    return stack.length;
}

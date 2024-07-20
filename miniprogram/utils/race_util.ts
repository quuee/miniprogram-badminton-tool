
//方法一 根据人数 、方案 计算场数
function calcSession(playerNum: number, session: number) {
  let st: number;
  let last: number = (playerNum * session) % 4;
  if (last == 0) {
    st = session;
  } else {
    let sss: number = calcSession(playerNum, session + 1)
    st = sss;
  }
  return st;
}

function doublePlayerSession(playerNum: number, all: boolean) {
  if (playerNum < 9) {
    return calcSession(playerNum, playerNum - 1);
  } else {
    if (all) {
      let ls: number = (playerNum * (playerNum - 1)) % 4;
      if (ls == 0) {
        return calcSession(playerNum, playerNum - 1);
      }
    }
    return calcSession(playerNum, 8);
  }
}

export function getDoublePlayerSession(playerNum: number) {
  const s1: number = doublePlayerSession(playerNum, false)
  const s2: number = doublePlayerSession(playerNum, true)
  return Array.from(new Set([s1, s2]))
}

//方法二 根据人数 计算需要最少场地数
export function calcFieldNum(players:number,playingNum:number){
  let num:number = players/playingNum
  num = Math.floor(num)
  return num;
}

export type GroupedArray<T> = {
  [key: number]: T[];
};

export function groupBy<T>(array: T[], keyGetter: (item: T) => number): GroupedArray<T> {
  return array.reduce((result, item) => {
    const key = keyGetter(item);
    // 使用类型断言确保key可以作为一个字符串索引
    (result[key as keyof GroupedArray<T>] ||= []).push(item);
    return result;
  }, {} as GroupedArray<T>);
}
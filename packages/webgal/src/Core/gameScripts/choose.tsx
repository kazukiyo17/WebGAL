import { ISentence } from '@/Core/controller/scene/sceneInterface';
import { IPerform } from '@/Core/Modules/perform/performInterface';
import { changeScene } from '@/Core/controller/scene/changeScene';
import { jmp } from '@/Core/gameScripts/function/jmp';
import ReactDOM from 'react-dom';
import React from 'react';
import styles from './performStyles/choose.module.scss';
import { webgalStore } from '@/store/store';
import { textFont } from '@/store/userDataInterface';
import { PerformController } from '@/Core/Modules/perform/performController';
import { useSEByWebgalStore } from '@/hooks/useSoundEffect';
import { WebGAL } from '@/Core/WebGAL';

/**
 * 显示选择枝
 * @param sentence
 */
export const choose = (sentence: ISentence): IPerform => {
  let chooseList = sentence.content.split('|');
  // const chooseListFull = chooseList.map((e) => e.split(':'));
  const chooseListFull = chooseList.map((e) => {
    const index = e.indexOf(':');
    if (index === -1) {
      return [e, ''];
    } else {
      return [e.slice(0, index), e.slice(index + 1)];
    }
  });
  const fontFamily = webgalStore.getState().userData.optionData.textboxFont;
  const font = fontFamily === textFont.song ? '"思源宋体", serif' : '"WebgalUI", serif';
  const { playSeEnterChoose, playSeClickChoose } = useSEByWebgalStore();
  const chooseElements = chooseListFull.map((e, i) => {
    return (
      <div
        className={styles.Choose_item}
        style={{ fontFamily: font }}
        key={e[0] + i}
        onClick={() => {
          playSeClickChoose();
          // 匹配'/api/scene/xxx'
          if (e[1].match(/^\/api\/.+/)) {
            changeScene(e[1], e[0]);
          } else {
            jmp(e[1]);
          }
          // if (e[1].match(/\./)) {
          //   changeScene(e[1], e[0]);
          // } else {
          //   jmp(e[1]);
          // }
          WebGAL.gameplay.performController.unmountPerform('choose');
        }}
        onMouseEnter={playSeEnterChoose}
      >
        {e[0]}
      </div>
    );
  });
  ReactDOM.render(
    <div className={styles.Choose_Main}>{chooseElements}</div>,
    document.getElementById('chooseContainer'),
  );
  return {
    performName: 'choose',
    duration: 1000 * 60 * 60 * 24,
    isHoldOn: false,
    stopFunction: () => {
      ReactDOM.render(<div />, document.getElementById('chooseContainer'));
    },
    blockingNext: () => true,
    blockingAuto: () => true,
    stopTimeout: undefined, // 暂时不用，后面会交给自动清除
  };
};

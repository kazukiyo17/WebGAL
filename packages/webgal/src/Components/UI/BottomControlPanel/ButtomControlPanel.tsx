import {
  AlignTextLeftOne,
  DoubleRight,
  FolderOpen,
  Home,
  PlayOne,
  PreviewCloseOne,
  PreviewOpen,
  ReplayMusic,
  Save,
  SettingTwo,
  DoubleDown,
  DoubleUp,
} from '@icon-park/react';
import styles from './bottomControlPanel.module.scss';
import { switchAuto } from '@/Core/controller/gamePlay/autoPlay';
import { switchFast } from '@/Core/controller/gamePlay/fastSkip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setMenuPanelTag, setVisibility } from '@/store/GUIReducer';
import { componentsVisibility, MenuPanelTag } from '@/store/guiInterface';
import { backToTitle } from '@/Core/controller/gamePlay/backToTitle';
import { saveGame } from '@/Core/controller/storage/saveGame';
import { loadGame } from '@/Core/controller/storage/loadGame';

export const BottomControlPanel = () => {
  const strokeWidth = 2.5;
  const size = 48;
  const GUIStore = useSelector((state: RootState) => state.GUI);
  const stageState = useSelector((state: RootState) => state.stage);
  const dispatch = useDispatch();
  const setComponentVisibility = (component: keyof componentsVisibility, visibility: boolean) => {
    dispatch(setVisibility({ component, visibility }));
  };
  const setMenuPanel = (menuPanel: MenuPanelTag) => {
    dispatch(setMenuPanelTag(menuPanel));
  };

  const saveData = useSelector((state: RootState) => state.userData.saveData);
  let fastSlPreview = (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '125%' }}>暂无存档</div>
    </div>
  );
  if (saveData[0]) {
    const data = saveData[0];
    fastSlPreview = (
      <div className={styles.slPreviewMain}>
        <div className={styles.imgContainer}>
          <img style={{ height: '100%' }} alt="q-save-preview image" src={data.previewImage} />
        </div>
        <div className={styles.textContainer}>
          <div>{data.nowStageState.showName}</div>
          <div style={{ fontSize: '75%', color: 'rgb(55,60,56)' }}>{data.nowStageState.showText}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ToCenter}>
      {GUIStore.showTextBox && stageState.enableFilm === '' && (
        <div className={styles.main}>
          {GUIStore.showTextBox && (
            <span className={styles.singleButton} onClick={() => setComponentVisibility('showTextBox', false)}>
              <PreviewCloseOne
                className={styles.button}
                theme="outline"
                size={size}
                fill="#f5f5f7"
                strokeWidth={strokeWidth}
              />
              <span className={styles.button_text}>隐藏</span>
            </span>
          )}
          {!GUIStore.showTextBox && (
            <span className={styles.singleButton} onClick={() => setComponentVisibility('showTextBox', true)}>
              <PreviewOpen
                className={styles.button}
                theme="outline"
                size={size}
                fill="#f5f5f7"
                strokeWidth={strokeWidth}
              />
              <span className={styles.button_text}>显示</span>
            </span>
          )}
          <span
            className={styles.singleButton}
            onClick={() => {
              setComponentVisibility('showBacklog', true);
              setComponentVisibility('showTextBox', false);
            }}
          >
            <AlignTextLeftOne
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>回想</span>
          </span>
          <span
            className={styles.singleButton}
            onClick={() => {
              let VocalControl: any = document.getElementById('currentVocal');
              if (VocalControl !== null) {
                VocalControl.currentTime = 0;
                VocalControl.pause();
                VocalControl.play();
              }
            }}
          >
            <ReplayMusic
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>重播</span>
          </span>
          <span id="Button_ControlPanel_auto" className={styles.singleButton} onClick={switchAuto}>
            <PlayOne className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>自动</span>
          </span>
          <span id="Button_ControlPanel_fast" className={styles.singleButton} onClick={switchFast}>
            <DoubleRight
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>快进</span>
          </span>
          <span
            className={styles.singleButton + ' ' + styles.fastsave}
            onClick={() => {
              saveGame(0);
            }}
          >
            <DoubleDown
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>快速存档</span>
            <div className={styles.fastSlPreview + ' ' + styles.fastSPreview}>{fastSlPreview}</div>
          </span>
          <span
            className={styles.singleButton + ' ' + styles.fastload}
            onClick={() => {
              loadGame(0);
            }}
          >
            <DoubleUp className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>快速读档</span>
            <div className={styles.fastSlPreview + ' ' + styles.fastLPreview}>{fastSlPreview}</div>
          </span>
          <span
            className={styles.singleButton}
            onClick={() => {
              setMenuPanel(MenuPanelTag.Save);
              setComponentVisibility('showMenuPanel', true);
            }}
          >
            <Save className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>存档</span>
          </span>
          <span
            className={styles.singleButton}
            onClick={() => {
              setMenuPanel(MenuPanelTag.Load);
              setComponentVisibility('showMenuPanel', true);
            }}
          >
            <FolderOpen
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>读档</span>
          </span>
          <span
            className={styles.singleButton}
            onClick={() => {
              setMenuPanel(MenuPanelTag.Option);
              setComponentVisibility('showMenuPanel', true);
            }}
          >
            <SettingTwo
              className={styles.button}
              theme="outline"
              size={size}
              fill="#f5f5f7"
              strokeWidth={strokeWidth}
            />
            <span className={styles.button_text}>选项</span>
          </span>
          <span
            className={styles.singleButton}
            onClick={() => {
              backToTitle();
            }}
          >
            <Home className={styles.button} theme="outline" size={size} fill="#f5f5f7" strokeWidth={strokeWidth} />
            <span className={styles.button_text}>标题</span>
          </span>
        </div>
      )}
    </div>
  );
};

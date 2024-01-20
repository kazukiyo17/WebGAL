import axios from 'axios';

/**
 * 初始场景获取
 * @param sceneUrl 场景文件路径
 */
export const startSceneFetcher = async () => {
  let getStartScene = '/api/v1/game/startScene';
  let url = './game/scene/end.txt';
  // let sceneId = 'start.txt';
  try {
    // 会返回一个链接，这个链接是一个场景文件
    const resp = (await axios.get(getStartScene)).data;
    if (resp.code === 200) {
      url = resp.data.url;
      // sceneId = resp.data.sceneId;
    }
  } catch (error) {
    console.log(error);
  }
  return new Promise<{ rawScene: string; url: string }>((resolve) => {
    axios.get(url).then((response) => {
      const rawScene: string = response.data.toString();
      resolve({ rawScene, url });
    });
  });
};

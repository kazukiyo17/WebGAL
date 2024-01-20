import axios from 'axios';

/**
 * 原始场景文件获取函数
 * @param sceneUrl 场景文件路径
 */
export const sceneFetcher = async (sceneUrl: string) => {
  console.log('sceneUrl', sceneUrl);
  let url = './game/scene/end.txt';
  let checkUrl = '/api/v1/game/scene?url=' + sceneUrl;
  try {
    const resp = await fetch(checkUrl);
    if (resp.status === 200) {
      url = sceneUrl;
    }
  } catch (error) {
    console.log(error);
  }
  return new Promise<string>((resolve) => {
    axios.get(url).then((response) => {
      const rawScene: string = response.data.toString();
      resolve(rawScene);
    });
  });
};

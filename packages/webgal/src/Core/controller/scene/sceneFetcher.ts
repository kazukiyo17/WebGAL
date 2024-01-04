import axios from 'axios';

/**
 * 原始场景文件获取函数
 * @param sceneUrl 场景文件路径
 */
export const sceneFetcher = async (sceneUrl: string) => {
  let url = sceneUrl;
  let checkUrl = 'http://172.18.0.5:8081/api/v1/game/scene?url=' + sceneUrl;
  // sceneUrl 如果结果为404，则使用默认场景 end.txt
  try {
    await axios.get(url);
    // 发送get 请求
    const resp = await axios.get(checkUrl);
    if (resp.data.message !== 'success') {
      url = './game/scene/end.txt';
    }
  } catch (error) {
    url = './game/scene/end.txt';
  }
  console.log('sceneUrl', url);
  return new Promise<string>((resolve) => {
    axios.get(url).then((response) => {
      const rawScene: string = response.data.toString();
      resolve(rawScene);
    });
  });
};

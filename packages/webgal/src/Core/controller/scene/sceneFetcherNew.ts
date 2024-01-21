import axios from 'axios';
import { logger } from '@/Core/util/etc/logger';

/**
 * 原始场景文件获取函数
 * @param sceneUrl 场景文件路径
 */
export const sceneFetcherNew = async (sceneUrl: string) => {
  if (!sceneUrl.startsWith('/api')) {
    return new Promise<string>((resolve) => {
      axios.get(sceneUrl).then((response) => {
        const rawScene: string = response.data.toString();
        resolve(rawScene);
      });
    });
  }
  let url = './game/scene/end.txt';
  try {
    const resp = (await axios.get(sceneUrl)).data;
    if (resp.code === 200) {
      url = resp.data.url;
    }
  } catch (error) {
    logger.error(error);
  }

  return new Promise<string>((resolve) => {
    axios.get(url).then((response) => {
      const rawScene: string = response.data.toString();
      resolve(rawScene);
    });
  });
};

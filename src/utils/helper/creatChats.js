import {API} from '../endpoints/EndPoints';
import {postApi, getApi} from '../apicalls/ApiCalls';
import {errorRes} from './helperFunctions';

export const sendMessage = async params => {
  let url = API.MESSAGE;
  try {
    const result = await postApi(url, params);
    // console.log({result})
    if (result.data.success) {
      const data = result.data.data;
      return data;
    } else {
      throw new Error(result);
    }
  } catch (e) {
    errorRes(e);
  }
};

export const getMessage = async conversationId => {
  let url = API.MESSAGE + '/' + conversationId;
  // console.log({url})
  try {
    const result = await getApi(url);
    // console.log({result});
    if (result.data.success) {
      const data = result.data.data;
      return data;
    } else {
      throw new Error(result);
    }
  } catch (e) {
    errorRes(e);
    throw new Error(result);
  }
};

export const createCon = async data => {
  const api = API.GET_CONVERSATIONLIST;
  try {
    console.log('fetching');
    let result = await postApi(api, data);
    console.log({result: result});
    console.log('fetching success');
    if (result.data.success) {
      const data = result.data;
      return data;
    } else {
      return;
    }
  } catch (e) {
    console.log('-------------e',e);
    // errorRes(e);
  }
};

export const conversationExsits = async (param) => {
  const api = API.CONVERSATION_EXSTIS;
  try {
    const result = await postApi(api, param);
    const data = result?.data;
    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (e) {
    errorRes(e);
  }
};

import {API} from '../endpoints/EndPoints';
import {postApi} from '../apicalls/ApiCalls';
import {errorRes} from '../helper/helperFunctions';

export const grpAddLeftNotify_handle = async (
  gname,
  member_uid,
  left_member_uid,
) => {
  const api = API.GROUP_NOTI;
  const params = {
    members: member_uid,
    groupName: gname,
    leftMembers: left_member_uid,
  };
  try {
    const result = await postApi(api, params);
    console.log({result: result.data});
    if (result.data.success) {
    }
  } catch (e) {
    errorRes(e);
  }
};

export const blockUnblockUserNotify_handle = async (uid,block) => {
  const api = API.BLOCKUNBLOCKUSER_NOTI;
  const params = {
    userUid: uid.toString(),
    block: block,
  };
  try {
    const result = await postApi(api, params);
    console.log({result: result.data});
    if (result.data.success) {

    }
  } catch (e) {
    errorRes(e);
  }
};

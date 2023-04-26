import {environment} from '../Constant';
class Endpoints {
  baseUrl = environment.baseUrl;
  REGISTER = this.baseUrl + 'auth/register';
  LOGIN = this.baseUrl + 'auth/login';
  VERIFY_OTP = this.baseUrl + '/auth/verify_otp';
  RESEND_OTP = this.baseUrl + 'auth/resend-otp';
  CREATE_PROFILE = this.baseUrl + 'users/';
  PARENTUSERNAME = this.baseUrl + 'users/getUserName/';
  GET_USER = this.baseUrl + 'users/';
  GET_CHILD = this.baseUrl + 'users/getChilds/';
  GET_USERSLIST = this.baseUrl +'users';
  MESSAGE = this.baseUrl+ 'message';
  CREATE_GROUP = this.baseUrl + 'group';
  GROUP_LIST = this.baseUrl + 'group';
  GROUP_INFO = this.baseUrl + 'group/';
  LEAVE_GROUP = this.baseUrl + 'group/leavegroup';
  GET_CONVERSATIONLIST = this.baseUrl + 'conversation';
  CONVERSATION_EXSTIS = this.baseUrl + 'conversation/conversationExist';
  APPROVED_CHILD = this.baseUrl + 'users/approveChild';
  BLOCK_USER = this.baseUrl + 'users/blockuser/';
  UPLOAD_PROFILEPIC = this.baseUrl + 'users/upload-pic/'
  LOG_OUT = this.baseUrl + 'auth/logout'
  CHILD_FRIENDLIST = this.baseUrl + 'users/parent/childFriendlist/'
  PARENT_OF_CHILD = this.baseUrl + 'users/parent/details?parentId='
  CALL_HISTORY = this.baseUrl + 'callhistory?userUid='
  CALL_HISTORY_DELETE = this.baseUrl + 'callhistory/delete?'
  EDIT_USER = this.baseUrl + 'users/update-setting/'
  GROUP_NOTI = this.baseUrl + 'notification/groupNotifications'
  BLOCKUNBLOCKUSER_NOTI = this.baseUrl + 'notification/blockUnblockNotifications'
  AUTH_ME = this.baseUrl + 'auth/me'
}

export const API = new Endpoints();

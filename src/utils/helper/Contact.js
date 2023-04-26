import Contacts from 'react-native-contacts';
import {Platform, PermissionsAndroid} from 'react-native';
import {API} from '../endpoints/EndPoints';
import {getApi} from '../apicalls/ApiCalls';
import {errorRes} from './helperFunctions';

export const getContact = async () => {
  // if (Platform.OS === 'android') {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //   })
  //     .then(() => {
  //       console.log('permission success');
  //       return loadContacts();
  //     })
  // } else {
  return loadContacts();
  // }
};

export const loadContacts = async () => {
  return Contacts.getAll()
    .then(async (contacts) => {
      contacts.sort(
        (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      console.log({contacts: contacts.length});

      let result = await getUsersList(contacts);
      console.log('---------------result', result?.length);
      return result;
    })
    .catch((e) => {
      alert(
        'Permission to access contacts was denied, please allow contacts permission from Device Setting',
      );
      console.warn('Permission to access contacts was denied', e);
    });
};

export const getUsersList = async (phoneContactList) => {
  const api = API.GET_USERSLIST;
  try {
    const result = await getApi(api);
    if (result?.data?.success) {
      const dataSource = result?.data?.data;

      console.log({cometuser: dataSource.length});
      const user = dataSource.map((item) => ({
        ...item,
        number: item.phoneCountryCode + item.phone,
      }));

      let arr1 = user.filter((o1) =>
        phoneContactList.some((o2) =>
          o2.phoneNumbers.some(
            (o3) => {
              if(o1.number == o3.number.replace(/\s+/g, '')){
                return (o1.name = o2.displayName);
              }
             },
          ),
        ),
      );
      let arr2 = user.filter((o1) =>
        phoneContactList.some((o2) =>
          o2.phoneNumbers.some(
            (o3) => 
            {
              if(o1.phone == o3.number.replace(/\s+/g, '')){
                return (o1.name = o2.displayName);
              }
             },
          ),
        ),
      );

      const arr3 = [...arr1, ...arr2];

      console.log('5555555555555555555555555', arr3.length);

      return arr3;
    } else {
    }
  } catch (e) {
    console.log(e);
    errorRes(e);
  }
};

const testPhone = [
  {
    displayName: 'mohit',
    givenName: 'mohit',
    phoneNumbers: [{id: '3', label: 'mobile', number: '+919691012427', phone:'9691012427'},
    {id: '3', label: 'mobile', number: '+919691012427', phone:'9691012427'}],
  },
  {
    displayName: 'Rr',
    givenName: 'Rr',
    phoneNumbers: [{id: '3', label: 'mobile', phone: '+917828352598', number: '7828352598'}],
  },
];

const testUser = [
  {
    FCMToken: '',
    __v: 0,
    _id: '637b66ee3c168ef27b103835',
    blockedByUsers: [Array],
    cometchatAuthtoken: '',
    cometchatStatusMessage: '',
    createdAt: '2022-11-21T11:54:22.238Z',
    email: '',
    isEmailVerified: false,
    isOnline: false,
    isParentVerified: false,
    name: 'chandra',
    parentId: null,
    parentPhoneCountryCode: '',
    parent_username: 'chan2427',
    phone: '9691012427',
    phoneCountryCode: '+91',
    profileComplete: false,
    role: 'parent',
    uid: '',
    updatedAt: '2022-11-21T11:54:22.238Z',
    user_image_path: '',
    number : '+919691012427'
  },
  {
    FCMToken: '',
    __v: 0,
    _id: '637b66b03c168ef27b103824',
    blockedByUsers: [Array],
    cometchatAuthtoken:
      '637b66b03c168ef27b103824_16690316638d923befdcc85c5595e1e156265469',
    cometchatStatusMessage: '',
    createdAt: '2022-11-21T11:53:20.491Z',
    dob: '2022-11-21T00:00:00.000Z',
    email: 'pushpendra1@gmail.com',
    gender: 'Male',
    isEmailVerified: true,
    isOnline: false,
    isParentVerified: false,
    name: 'pushpendra',
    parentId: '637b66ee3c168ef27b103835',
    parentPhoneCountryCode: '',
    parent_name: 'chandra',
    parent_number: '9691012427',
    parent_username: 'chan2427',
    phone: '7828352598',
    phoneCountryCode: '+91',
    profileComplete: true,
    role: 'user',
    uid: '637b66b03c168ef27b103824',
    updatedAt: '2022-11-21T11:54:35.021Z',
    user_image_path: '/uploads/avatar_1669031631197.jpg',
  },
  {
    FCMToken: '',
    __v: 0,
    _id: '637b5c393c168ef27b10361d',
    blockedByUsers: [Array],
    cometchatAuthtoken:
      '637b5c393c168ef27b10361d_1669029075fe43239a043ff97784a4f85dbc06e7',
    cometchatStatusMessage: '',
    createdAt: '2022-11-21T11:08:41.200Z',
    dob: '1991-11-21T00:00:00.000Z',
    email: 'aman@graffersid.com',
    gender: 'Male',
    isEmailVerified: true,
    isOnline: false,
    isParentVerified: false,
    name: 'aman',
    parentId: null,
    parentPhoneCountryCode: '',
    parent_username: 'aman4330',
    phone: '7000924330',
    phoneCountryCode: '+91',
    profileComplete: true,
    role: 'parent',
    uid: '637b5c393c168ef27b10361d',
    updatedAt: '2022-11-21T11:11:39.740Z',
    user_image_path: '',
    number : '+917000924330'
  },
];



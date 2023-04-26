import {StyleSheet, Platform, Dimensions} from 'react-native';
import {colors, size, family} from './Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  flex: {flex: 1},
  row: {flexDirection: 'row'},

  inputs: {padding: 10, height: 50},
  logosty:{alignSelf:'center', marginTop:15},
  dropdown: {
    // marginTop: 10,
    borderColor: colors.danger,
    borderWidth: 0.7,
    borderRadius: 50,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    height: 50,
  },
  err_dropdown: {
    // marginTop: 10,
    borderColor: 'red',
    borderWidth: 0.7,
    borderRadius: 50,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    height: 50,
  },
  inputRoundgrey: (focused) => ({
    height: 50,
    borderColor: focused ? "#c62910" : colors.danger,
    borderWidth: 0.7,
    borderRadius :50,
    color: "#c32a12",
}),
inputRoundred: (focused) => ({
    height: 50,
    borderColor: focused ? "#c62910" : "#EB5757",
    borderWidth: 1,
    borderRadius :50,
    color: "#EB5757",
}),

  pd20: {padding: 20},
  pd_H20: {paddingHorizontal: 20},
  pd_T10: {paddingTop: 10},
  pd_L20: {paddingLeft: 20},
  pd_V10: {paddingVertical: 15},
  mr_H20: {marginHorizontal: 20},
  mt15: {marginTop: 15},
  mr15: {marginRight: 15},
  mt50: {marginTop: '50%'},
  mb10: {marginBottom: 10},
  mrV15:{marginVertical:15},

  center: {justifyContent: 'center', alignItems: 'center', flex: 1},
  align_C: {alignItems: 'center'},
  align_E: {alignItems: 'flex-end'},
  justify_C: {justifyContent: 'center'},
  justify: {justifyContent: 'flex-end'},
  justify_S: {justifyContent: 'space-between'},

  tx10: {fontSize: 10, color: colors.black, fontFamily: family.regular},
  tx12: {
    fontSize: size.label,
    color: colors.warning,
    fontFamily: family.regular,
  },
  tx14: {
    fontSize: size.subtitle,
    color: colors.warning,
    fontFamily: family.regular,
  },
  tx16: {
    fontSize: size.title,
    color: colors.warning,
    fontFamily: family.regular,
  },
  tx18: {fontSize: size.mytitle, color: '#000', fontFamily: family.medium},
  tx20: {
    fontSize: size.subheading,
    color: colors.warning,
    fontFamily: family.medium,
  },
  tx22: {fontSize: 22, color: '#000', fontFamily: family.medium},
  tx24: {
    fontSize: size.heading,
    color: colors.warning,
    fontFamily: family.medium,
  },

  tx_M: {fontFamily: family.semibold},
  tx_m: {fontFamily: family.medium},

  txAlignC: {textAlign: 'center'},
  txAlignJ: {textAlign: 'justify'},
  txAlignR: {textAlign: 'right'},
  txAlignL: {textAlign: 'left'},

  txCap : {textTransform:"capitalize"},

  txDecor: {textDecorationLine: 'underline'},

  color_S: {color: colors.success},
  color_L: {color: colors.light},
  color_B: {color: colors.dark},
  color_W: {color: colors.light},

  bg_S: {backgroundColor: colors.success},
  bgS : {backgroundColor: '#fff',elevation:2},

  ItemSeparatorView: {height: 0.8, width: '100%', backgroundColor: '#C8C8C8'},
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },

  modalView_attachment:{
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // alignItems:'center',
    margin:30,
    position:'absolute',
    bottom:40
  },

  modalView_center: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    margin:20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headersty: {
    backgroundColor: colors.success,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wdh10: {
    width: '10%',
  },
  wdh48:{
      width:"48%"
  },
  wdh90: {
    width: '90%',
  },
  wdh20: {
    width: '20%',
  },
  wdh80: {
    width: '80%',
  },
  wdh50:{
    width:"50%"
  },
  wdh30:{
    width:'30%'
  },
  wdh60:{
   width:"60%"
  },

  iconSty: {
    width: 20,
    height: 20,
  },
  SearchInput: {
    backgroundColor: colors.light,
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 45,
  },
  search_icon: {
    position: 'absolute',
    right: 15,
    zIndex: 999,
    top: 15,
  },
  adminCon:{
    backgroundColor:colors.success,
    paddingVertical:3,
    paddingHorizontal:8,
    borderRadius:50
  },
  avatarsty:{
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: 40,
      height: 40,
      backgroundColor: 'rgba(51,153,255,0.25)',
      borderRadius:40/2
  }
});

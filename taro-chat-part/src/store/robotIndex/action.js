

export const getRobotIndexData = (param) => {
  return {
    type: 'getCategaryData',
    cateName: param
  }
}
export const getUserInfo = (userInfo) => {
  return{
    type: 'getUserInfo',
    userInfo: userInfo
  }
}

export const getRuleType = (ruleList) => {
  return{
    type: 'getRuleType',
    ruleList: ruleList
  }
}

export const getPopMenuStatus = (status) => {
  return{
    type: 'getPopMenuStatus',
    status: status
  }
}

export const getPopSearchStatus = (status) => {
  return{
    type: 'getPopSearchStatus',
    status: status
  }
}

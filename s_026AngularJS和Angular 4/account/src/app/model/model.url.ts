const host = 'http://127.0.0.1:3000';

export const Urls= {
  GetBillTypes: host + '/api/bill/getbilltypes', // 获取记账类型
  GetBills: host +  '/api/bill/GetBills', // 获取列表
  GetCount: host +  '/api/bill/GetCount', // 获取统计信息
  GetTotallCount: host +  '/api/bill/GetTotallCount', // 获取求和数据
  AddBills: host +  '/api/bill/AddBills', // 添加记账信息
  DeleteBill: host +  '/api/bill/DeleteBill', // 删除记账信息
};
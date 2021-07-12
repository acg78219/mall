//axios最好独立一个文件，减少vue对其的依赖性
import axios from "axios";

//config是用户需要填写的请求服务器的相关信息
export function request(config) {
  //1.创建axios实例
  //不要用全局的axios，使用axios.create创建axios实例,每个实例管理一种类型的url，减少服务器负载
  const instance = axios.create({
    //一开始在实例中可以放入默认配置
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  });

  //2.axios拦截器：有时候需要对请求到的数据进行一些拦截操作
  //使用axios实例的interceptors方法
  //request：请求拦截，发生在客户向服务器发生请求的过程
  instance.interceptors.request.use(res => {  //use()接收两个参数：成功时，失败时
    //拦截完之后一定要记得return出去，否则数据将一直停留在拦截这里
    return res;
  },err => {

  })
  //响应拦截
  //response：发生在服务器向客户返回数据的过程
  instance.interceptors.response.use(res => {
    //我们可以对发送的数据先进行一层处理再发送出去
    //不管是response还是request拦截，都要记得return出去
    return res.data;
  })

  //3.执行axios实例(config)，并将其返回
  //因为实例和axios一样，返回的是Promise，
  //所以直接返回出去，这样也可以将请求的输出返回到用户文件，而不是这个文件，放在这个文件没有意义
  return instance(config)
}

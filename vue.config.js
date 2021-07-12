module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //  起路径别名，@ 是 src
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'components': '@/components',
        'views': '@/views'
      }
    }
  }
}

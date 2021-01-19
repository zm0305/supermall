module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //默认配置的别名
        // '@':'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
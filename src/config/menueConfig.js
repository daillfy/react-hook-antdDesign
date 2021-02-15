
const menuList=[
    {
        title: '首页', // 菜单标题名称
        key: '/admin/home', // 对应的path
        isPublic: true, // 公开的
        icon:'PieChartOutlined'
      },
      {
        title: '商品',
        key: '"/admin/products',
        icon:'ShoppingOutlined',
        children: [ // 子菜单列表
          {
            title: '品类管理',
            key: '/admin/products/category',
            icon: 'ShoppingOutlined'
          },
          {
            title: '商品管理',
            key: '/admin/products/product',
            icon:'ShoppingOutlined',
          },
        ]
      },
    
      {
        title: '用户管理',
        key: '/admin/userr',
        icon: 'UserOutlined',
      },
      {
        title: '角色管理',
        key: '/admin/role',
        icon: 'UserSwitchOutlined',
      },
    
      {
        title: '图形图表',
        key: '/charts',
        icon: 'AreaChartOutlined',
        children: [
          {
            title: '柱形图',
            key: '/admin/charts/bar',
            icon: 'BarChartOutlined',
          },
          {
            title: '折线图',
            key: '/admin/charts/line',
            icon: 'LineChartOutlined',
          },
          {
            title: '饼图',
            key: '/admin/charts/pie',
            icon: 'PieChartOutlined' ,
          },
        ]
      },
    
      {
        title: '订单管理',
        key: '/admin/order',
        icon: 'WindowsOutlined',
      },

]

export default menuList;
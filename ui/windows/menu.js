function buildMenu() {
    var menu = new Menu('menuContainer', menu$menuTemplete);
    addNewComponentById('menu', menu.instance());
}
menu$menuTemplete = [
    {
        id: 'file',
        content: '文件',
        subMenu: [
            {
                id: 'newProject',
                exe: showNewProjectWindow,
                content: '新建工程',
            },
            {
                id: 'openProject',
                exe: null,
                content: '打开',
            },
            {
                id: 'saveProject',
                exe: null,
                content: '保存',
            },
            {
                id: 'import',
                exe: null,
                content: '导入',
            },
            {
                id: 'export',
                exe: null,
                content: '导出',
            },
        ]
    },
    {
        id: 'edit',
        content: '编辑',
        subMenu: [
            {
                id: 'new',
                subMenu: [
                    {
                        id: 'newText',
                        exe: null,
                        content: '文本',
                    },
                ],
                content: '新建',
            },
            {
                id: 'undo',
                exe: null,
                content: '撤销',
            },
            {
                id: 'redo',
                exe: null,
                content: '重做',
            }
        ]
        
    },
    {
        id: 'view',
        content: '视图',
        subMenu: [
            {
                id: 'viewReset',
                exe: null,
                content: '重置',
            },
        ]
    },
    {
        id: 'filter',
        content: '滤镜',
        subMenu: [
            {
                id: 'more',
                exe: null,
                content: '...',
            }
        ]
    },
    {
        id: 'helpMenu',
        content: '帮助',
        subMenu: [
            {
                id: 'helpDocumentation',
                exe: null,
                content: '帮助文档',
            }
        ]
    },
];

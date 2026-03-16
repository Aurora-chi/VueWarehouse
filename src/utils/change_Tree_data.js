export function buildMenuTree(menuList) {
    // 创建一个map，方便通过id查找
    const menuMap = {};
    const tree = [];

    // 第一次遍历：创建所有菜单项的映射
    menuList.forEach((menu) => {
        menuMap[menu.id] = {
            ...menu,
            children: [],
        };
    });

    // 第二次遍历：构建树形结构
    menuList.forEach((menu) => {
        const menuItem = menuMap[menu.id];

        if (menu.parentId === 0) {
            // 顶级菜单
            tree.push(menuItem);
        } else {
            // 子菜单，找到父菜单并添加
            const parent = menuMap[menu.parentId];
            if (parent) {
                parent.children.push(menuItem);
            } else {
                // 如果父菜单不存在，也作为顶级菜单处理
                tree.push(menuItem);
            }
        }
    });
    return tree;
}
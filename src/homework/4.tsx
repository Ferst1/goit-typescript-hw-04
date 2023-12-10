import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

// Опис типу SelectedMenu
type SelectedMenu = {
  id: MenuIds;
};

// Опис типу MenuSelected
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// Опис типу MenuAction
type MenuAction = {
  onSelectedMenu: (selectedMenu: SelectedMenu) => void;
};

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: {
    id: "first",
  },
});

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

// Опис типу PropsProvider
type PropsProvider = {
  children: ReactNode;
};

function MenuProvider({ children }: PropsProvider) {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({
    id: "first",
  });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

// Опис типу PropsMenu
type PropsMenu = {
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { MenuInfo } from "rc-menu/lib/interface";

interface SearchFilterProps {
  setSearchFilterValue: (value: keyof typeof SEARCH_VALUE | null) => void;
}

export enum SEARCH_VALUE {
  id = 1,
  name,
  pack,
  clear,
}

export const SearchFilter = ({ setSearchFilterValue }: SearchFilterProps) => {
  const [searchValue, setSearchValue] =
    useState<keyof typeof SEARCH_VALUE | null>();

  const handleMenuClick = useCallback(
    ({ key }: MenuInfo) => {
      const numberKey = Number(key);
      const menuValue =
        numberKey !== SEARCH_VALUE.clear
          ? (SEARCH_VALUE[numberKey] as keyof typeof SEARCH_VALUE)
          : null;
      setSearchValue(menuValue);
      setSearchFilterValue(menuValue);
    },
    [setSearchFilterValue]
  );

  const menu = useMemo(
    () => (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key={SEARCH_VALUE.id}>By: ID</Menu.Item>
        <Menu.Item key={SEARCH_VALUE.name}>By: Name</Menu.Item>
        <Menu.Item key={SEARCH_VALUE.pack}>By: Pack Name</Menu.Item>
        <Menu.Divider />
        <Menu.Item key={SEARCH_VALUE.clear}>Clear Filter</Menu.Item>
      </Menu>
    ),
    [handleMenuClick]
  );

  return (
    <Dropdown overlay={menu}>
      <span className="link">
        Filter Search By {searchValue} <DownOutlined />
      </span>
    </Dropdown>
  );
};
